import { createSlice } from "@reduxjs/toolkit"

let savedData = [];

try {
    const stored = localStorage.getItem('groups')
    savedData = stored ? JSON.parse(stored) : []
} catch {
    savedData = []
}

// const savedData = JSON.parse(localStorage.getItem("groups")) || []

const initialState = {
    groups: savedData
}

export const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers:{
        addGroup: (state,action) => {
            const newGroup = {
                id: Date.now().toString(),
                name: action.payload,
                members: [],
                expenses: []
            }
            if (!Array.isArray(state.groups)) {
                state.groups = [];
            }
            state.groups.push(newGroup)
            localStorage.setItem("groups",JSON.stringify(state.groups))
        },

        addMember: (state,action) => {
            const {groupId, memberName} = action.payload;
            const group = state.groups.find(g => g.id === groupId);
            if(group){
                group.members.push({id: Date.now(), name: memberName});
                localStorage.setItem("groups",JSON.stringify(state.groups))
            }
        },

        addExpenses: (state,action) => {
            const {groupId,payerId,amount,description,sharedWith} = action.payload;
            const group = state.groups.find(g => g.id === groupId);
            if(group){
                group.expenses.push({
                    id: Date.now(),
                    payerId,
                    amount: parseFloat(amount),
                    description,
                    sharedWith
                });
                localStorage.setItem("groups",JSON.stringify(state.groups))
            }
        }
    }
})

export default groupSlice.reducer;
export const {addGroup,addMember,addExpenses} = groupSlice.actions;