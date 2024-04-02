import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    cartItems: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        addCart: (state, action) => {
            state.cartItems.push(action.payload); // Mutating state
        },
        removeCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.name !== action.payload);
        },
        updateCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item)=> {if(item.name === action.payload){item.quantity+=1}
        return item})
        }
    }
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const cartSelectors = (state)=> state.cartReducer;
