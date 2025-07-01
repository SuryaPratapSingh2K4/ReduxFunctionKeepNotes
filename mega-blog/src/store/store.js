import {configureStore} from '@reduxjs/toolkit'
import postReducer from '../store/postSlice'

export const store = configureStore({
    reducer: {
        post: postReducer
    }
})