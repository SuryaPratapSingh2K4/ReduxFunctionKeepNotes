import { createSlice } from "@reduxjs/toolkit"

const LoadDataFromLocalStorage = JSON.parse(localStorage.getItem('habits')) || [];

const SaveDataToLocalStorage = (state) => {
    localStorage.setItem('habits',JSON.stringify(state));
}

const initialState = {
    habits: LoadDataFromLocalStorage
}

export const habitSlice = createSlice({
    name: "habit",
    initialState,
    reducers: {
        addHabit: (state,action) => {
            state.push(
                {
                    id: Date.now(),
                    title: action.payload,
                    completedays: []
                }
            )
            SaveDataToLocalStorage(state)
        },

        toggleHabits : (state,action) => {
            const {id,date} = action.payload
            const habit = state.habits((h) => h.id === id);
            if(habit){
                if(habit.completedays.includes(date)){
                    habit.completedays = habit.completedays.filter(d => d !== date)
                }else{
                    habit.completedays.push(date)
                }
            }
            SaveDataToLocalStorage(state)
        },

        deleteHbaits: (state,action) => {
            const filtered =  state.filter((h) => h.id !== action.payload)
            SaveDataToLocalStorage(filtered)
        }
    }
})