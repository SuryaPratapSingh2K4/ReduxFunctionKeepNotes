import {configureStore} from "@reduxjs/toolkit"
import taskReducer from '../store/taskslice'

export const store = configureStore({
    reducer: {
        task : taskReducer
    }
})