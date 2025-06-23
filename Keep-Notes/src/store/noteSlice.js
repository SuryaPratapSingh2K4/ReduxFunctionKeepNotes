import { createSlice } from "@reduxjs/toolkit"

const LoadNotes = () => {
    try {
        const data = localStorage.getItem('notes')
        return data ? JSON.parse(data) : []
    } catch (error) {
        return [error]
    }
}

const SaveNotes = (note) => {
    localStorage.setItem('notes',JSON.stringify(note))
}


const initialState = {
    notes : LoadNotes()
}

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNotes: (state, action) => {
            state.notes.push(action.payload);
            // localStorage.setItem('notes', JSON.stringify(state.notes));
            SaveNotes(state.notes)
        },

        deleteNotes: (state, action) => {
            const filtered = state.notes.filter((note) => note.id !== action.payload);
            localStorage.setItem('notes', JSON.stringify(filtered));
            state.notes = filtered;
        },

        editNotes: (state, action) => {
            const { id, title, content } = action.payload;
            const note = state.notes.find((note) => note.id === id);
            if (note) {
                note.title = title;
                note.content = content;
                localStorage.setItem('notes', JSON.stringify(state.notes));
            }
        }
    }
});

export const {addNotes,deleteNotes,editNotes} = noteSlice.actions;

export default noteSlice.reducer
