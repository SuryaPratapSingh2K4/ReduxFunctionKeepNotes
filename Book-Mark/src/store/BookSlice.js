// src/features/bookmarkSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('bookmarks');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return error;
  }
};

const saveToLocalStorage = (state) => {
  localStorage.setItem('bookmarks', JSON.stringify(state));
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: loadFromLocalStorage(),
  reducers: {
    addBookmark: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    deleteBookmark: (state, action) => {
      const filtered = state.filter((b) => b.id !== action.payload);
      saveToLocalStorage(filtered);
      return filtered;
    },
    editBookmark: (state, action) => {
      const { id, title, url, category } = action.payload;
      const bookmark = state.find((b) => b.id === id);
      if (bookmark) {
        bookmark.title = title;
        bookmark.url = url;
        bookmark.category = category;
        saveToLocalStorage(state);
      }
    },
  },
});

export const { addBookmark, deleteBookmark, editBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
