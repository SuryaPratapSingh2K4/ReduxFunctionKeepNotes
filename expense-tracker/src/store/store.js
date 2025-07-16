import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "../store/groupSlice"

export const store = configureStore({
    reducer: {
        group: groupReducer
    }
})