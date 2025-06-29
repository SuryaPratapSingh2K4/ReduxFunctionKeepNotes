import {createSlice} from '@reduxjs/toolkit'

let savedData = []

try {
    const parsed = JSON.parse(localStorage.getItem("tasks"))
    if(parsed){
        savedData = parsed;
    }
} catch {
    savedData = []
}

const initialState = {
    tasks: savedData,
};

export const taskslice = createSlice({
    name: "task",
    initialState,
    reducers:{
        addTask: (state,action) => {
            const newTask = {
                id: Date.now(),
                title: action.payload.title,
                priority: action.payload.priority
            };
            state.tasks.push(newTask);
            console.log("after add : ", state.tasks);
            
            localStorage.setItem("tasks",JSON.stringify(state.tasks))
        },
        deleteTask: (state,action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
            localStorage.setItem("tasks",JSON.stringify(state.tasks))
        }
    }
})

export default taskslice.reducer;
export const {addTask,deleteTask} = taskslice.actions;