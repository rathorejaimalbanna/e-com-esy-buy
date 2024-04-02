import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productReducer"; // Import productReducer from separate file
import { cartReducer } from "./cartReducer"; // Import cartReducer from separate file

// Configure Redux store using configureStore from Redux Toolkit
export const store = configureStore({
    reducer: { // Combine reducers for product and cart
        productReducer, // Assign productReducer to handle product-related state
        cartReducer // Assign cartReducer to handle cart-related state
    }
});
