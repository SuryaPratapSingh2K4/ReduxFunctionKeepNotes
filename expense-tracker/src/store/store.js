import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "../store/groupSlice"

const store = configureStore({
    reducer: {
        group: groupReducer
    }
})

export default store;