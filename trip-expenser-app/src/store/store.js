    import { configureStore } from "@reduxjs/toolkit";
    import groupReducer from "./groupSlice";

    const store = configureStore({
    reducer: {
        group: groupReducer,
    },
    });

    export default store;
