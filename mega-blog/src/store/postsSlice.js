import { createSlice } from "@reduxjs/toolkit";

const savedPost = JSON.parse(localStorage.getItem("posts"))

const initialState = {
    // posts: JSON.parse(localStorage.getItem("posts")) || [],
    posts: savedPost
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
        const newPost = {
            id: Date.now(),
            title: action.payload.title,
            content: action.payload.content,
            author: action.payload.author,
            image: action.payload.image,
        };
        state.posts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(state.posts));
        },
        deletePost: (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        localStorage.setItem("posts", JSON.stringify(state.posts));
        },
        editPost: (state, action) => {
        const { id, title, content, image, author } = action.payload;
        const index = state.posts.findIndex((post) => post.id === id);
        if (index !== -1) {
            state.posts[index] = {
            ...state.posts[index],
            title,
            content,
            image,
            author,
            };
            localStorage.setItem("posts", JSON.stringify(state.posts));
        }
        },
    },
});

export const { addPost, deletePost, editPost } = postSlice.actions;
export default postSlice.reducer;
