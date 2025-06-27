import { configureStore } from "@reduxjs/toolkit";
import habitReducer from '../store/habitSlice'
export const store = configureStore({
    reducer: {
        habits: habitReducer,
    },
})
