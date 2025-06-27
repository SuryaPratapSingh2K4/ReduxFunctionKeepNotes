import { configureStore } from '@reduxjs/toolkit'
import flashcardReducer from '../store/flashcardSlice'

export const store = configureStore({
    reducer: {
        flashcard: flashcardReducer
    },
})