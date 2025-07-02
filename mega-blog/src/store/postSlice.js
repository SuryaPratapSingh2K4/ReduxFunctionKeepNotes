import {createSlice} from '@reduxjs/toolkit'

let savedPosts = []

try {
    const parsed = JSON.stringify(localStorage.getItem("posts"));
    if(parsed){
        savedPosts = parsed;
    }
} catch {
    savedPosts = []
}

const initialState = {
    posts: savedPosts
}

export const postSlice = createSlice({
    name:'post',
    initialState,
    reducers: {
        UploadPost: (state,action) => {
            const newPost = {
                id: Date.now(),
                title: action.payload.title,
                content: action.payload.content,
                author: action.payload.author,
                tags: action.payload.tags,
                image: action.payload.image
            };
            state.posts.push(newPost);
            localStorage.setItem("posts",JSON.stringify(state.posts));
        },

        deletePost: (state,action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload)
            localStorage.setItem("posts",JSON.stringify(state.posts));
        },

        updatePost: (state,action) => {
            const index = state.posts.find((p) => p.id === action.payload.id)
            if(index){
                state.posts[index] = action.payload;
                localStorage.setItem("posts",JSON.stringify(state.posts));
            }
        }
    }
})

export default postSlice.reducer;
export const {UploadPost,deletePost,updatePost} = postSlice.actions;