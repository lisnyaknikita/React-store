import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../store/slices/filterSlice'

export const store = configureStore({reducer: {filter: filterReducer}
})