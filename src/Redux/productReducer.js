import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state for the product slice
const INITIAL_STATE = {
    products: [] // Initial state with an empty array for products
};

// Async thunk for fetching products
export const productAsync = createAsyncThunk("product/fetchproductAsync", async (payload) => {
    const res = await fetch(payload); // Fetch products from the specified URL
    const data = await res.json(); // Parse response to JSON
    return data; // Return fetched data
});

// Async thunk for deleting a product
export const deleteProductAsync = createAsyncThunk("product/deleteProduct", async (payload) => {
    // Send DELETE request to delete a product
    fetch('https://my-json-server.typicode.com/rathorejaimalbanna/jsonapi/products', {
        method: 'DELETE'
    });
    // Prepare data object for action payload
    const data = {
        name: payload
    };
    return data; // Return payload data
});

// Async thunk for updating a product
export const updateProductAsync = createAsyncThunk("product/updateProduct", async (payload) => {
    // Send PUT request to update a product
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify(payload), // Convert payload to JSON string
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await res.json(); // Parse response to JSON
    data.id = payload.id; // Set id from payload
    return data; // Return updated data
});

// Slice for product management
const productSlice = createSlice({
    name: 'product', // Name of the slice
    initialState: INITIAL_STATE, // Initial state of the slice
    reducers: {
        // Action to sort products based on price
        sortProducts: (state) => {
            state.products.sort((a, b) => a.price - b.price);
        }
    },
    extraReducers: (builder) => {
        // Handle fulfilled action for fetching products
        builder.addCase(productAsync.fulfilled, (state, action) => {
            state.products = action.payload; // Update products with fetched data
        })
        // Handle fulfilled action for deleting a product
        .addCase(deleteProductAsync.fulfilled, (state, action) => {
            // Filter out the deleted product from the products array
            state.products = state.products.filter((item) => item.name !== action.payload.name);
        })
        // Handle fulfilled action for updating a product
        .addCase(updateProductAsync.fulfilled, (state, action) => {
            // Update the corresponding product in the products array
            state.products = state.products.map((item) => {
                if (item.id === action.payload.id) {
                    // Update product details with payload data
                    item.name = action.payload.name;
                    item.price = action.payload.price;
                    item.category = action.payload.category;
                    item.image = action.payload.image;
                }
                return item;
            });
        });
    }
});

// Exporting reducer, actions, and selectors
export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export const productSelectors = (state) => state.productReducer;
