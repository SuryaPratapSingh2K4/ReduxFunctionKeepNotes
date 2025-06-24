// src/store.js
import { configureStore } from '@reduxjs/toolkit';
// import bookmarkReducer from './features/bookmarkSlice';
import bookmarkReducer from '../store/BookSlice'

export const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
  },
});

// export default store;
