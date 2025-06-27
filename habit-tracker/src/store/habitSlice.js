import { createSlice } from '@reduxjs/toolkit';

const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];

const habitSlice = createSlice({
  name: 'habit',
  initialState: {
    habits: savedHabits, // { id, title, completedDays: [dates] }
  },
  reducers: {
    addHabit: (state, action) => {
      state.habits.push({
        id: Date.now(),
        title: action.payload,
        completedDays: [],
      });
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },
    toggleHabitDay: (state, action) => {
      const { id, date } = action.payload;
      const habit = state.habits.find(h => h.id === id);
      if (habit) {
        if (habit.completedDays.includes(date)) {
          habit.completedDays = habit.completedDays.filter(d => d !== date);
        } else {
          habit.completedDays.push(date);
        }
      }
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },
    deleteHabit: (state, action) => {
      state.habits = state.habits.filter(h => h.id !== action.payload);
      localStorage.setItem("habits", JSON.stringify(state.habits));
    }
  }
});

export const { addHabit, toggleHabitDay, deleteHabit } = habitSlice.actions;
export default habitSlice.reducer;
