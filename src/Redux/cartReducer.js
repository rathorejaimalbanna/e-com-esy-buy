import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart slice
const INITIAL_STATE = {
    cartItems: [] // Initial state with an empty array for cart items
};

// Define the cart slice using createSlice
const cartSlice = createSlice({
    name: "cart", // Name of the slice
    initialState: INITIAL_STATE, // Initial state of the slice
    reducers: {
        // Action to add an item to the cart
        addCart: (state, action) => {
            state.cartItems.push(action.payload); // Mutating state by pushing new item
        },
        // Action to remove an item from the cart
        removeCart: (state, action) => {
            // Update cartItems array by filtering out the item to be removed
            state.cartItems = state.cartItems.filter(item => item.name !== action.payload);
        },
        // Action to update the quantity of an item in the cart
        updateCart: (state, action) => {
            // Update quantity of the item in cartItems array if it matches the payload
            state.cartItems = state.cartItems.map(item => {
                if (item.name === action.payload) {
                    item.quantity += 1; // Increase quantity if item exists
                }
                return item;
            });
        }
    }
});

// Extract action creators and reducer from the cart slice
export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// Selector function to access the cart state
export const cartSelectors = (state) => state.cartReducer;
