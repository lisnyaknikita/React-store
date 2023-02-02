import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../store/slices/filterSlice'
import cartReducer from '../store/slices/cartSlice'
import pizzaReducer from '../store/slices/pizzasSlice'

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        pizza: pizzaReducer,
    }
})