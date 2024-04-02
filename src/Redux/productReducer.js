import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state for the product slice
const INITIAL_STATE = {
    products:[]
};

// Async thunk for fetching products
export const productAsync = createAsyncThunk("product/fetchproductAsync", async (payload) => {
    const res = await fetch(payload);
    const data = await res.json();
    return data;
});



// Async thunk for deleting a product
export const deleteProductAsync = createAsyncThunk("product/deleteProduct", async (payload) => {
    fetch('https://my-json-server.typicode.com/rathorejaimalbanna/jsonapi/products', {
        method: 'DELETE'
    });
    const data = {
        name:payload
    };
    return data;
});

// Async thunk for updating a product
export const updateProductAsync = createAsyncThunk("product/updateProduct", async (payload) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
            id: payload.id,
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            address: { city: payload.city }
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await res.json();
    data.id = payload.id;
    return data;
});

// Slice for product management
const productSlice = createSlice({
    name:'product',
    initialState:INITIAL_STATE,
    reducers:{
        sortProducts:(state)=>{
            state.products.sort((a,b)=> a.price - b.price)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(productAsync.fulfilled,(state,action)=>{
            state.products = action.payload;
        })
        .addCase(deleteProductAsync.fulfilled,(state,action)=>{
            state.products = state.products.filter((item)=> item.name !== action.payload.name);
        })
        .addCase(updateProductAsync.fulfilled,(state,action)=>{
            state.products = state.products.map((item)=> {
                if(item.id === action.payload.id) {
                    item.name = action.payload.name;
                    item.address.city = action.payload.address.city;
                    item.phone = action.payload.phone;
                    item.email = action.payload.email;
                }
                return item;
            });
        });
    }
});

// Exporting reducer, actions, and selectors
export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export const productSelectors = (state)=> state.productReducer;
