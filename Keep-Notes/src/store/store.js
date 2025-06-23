import { configureStore } from "@reduxjs/toolkit";
import notesReducer from '../store/noteSlice';

export const store = configureStore({
    reducer: {
        notes: notesReducer
    }
})

export default store