import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../store/postsSlice";

export const store = configureStore({
    reducer: {
        post: postReducer,
    },
});
