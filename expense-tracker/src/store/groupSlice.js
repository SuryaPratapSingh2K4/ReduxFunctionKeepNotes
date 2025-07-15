import { createSlice, nanoid} from "@reduxjs/toolkit"

const loadData = localStorage.getItem("groups") ? JSON.parse(localStorage.getItem("groups")) : [];

const savedData = (groups) => {
    localStorage.setItem("groups", JSON.stringify(groups));
}

// const savedData = JSON.parse(localStorage.getItem("groups")) || []

const initialState = {
    groups: loadData
}

export const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers:{
        addGroup: (state,action) => {
            const newGroup = {
                id: nanoid(),
                name: action.payload,
                members: [],
                expenses: []
            }
            if (!Array.isArray(state.groups)) {
                state.groups = [];
            }
            state.groups.push(newGroup)
            savedData(state.newGroup);
        },

        editGroupName : (state,action) => {
            const {groupId, newName} = action.payload;
            const group = state.groups.find((g) => g.id === groupId);
            if(group){
                group.name = newName;
                savedData(state.groups);
            }
        },

        deleteGroup : (state,action) => {
            state.groups = state.groups.filter((g) => g.id !== action.payload);
            savedData(state.groups);
        },

        addMember: (state,action) => {
            const {groupId, memberName} = action.payload;
            const group = state.groups.find((g) => g.id === groupId);
            if(group){
                if (!Array.isArray(group.members)) {
                    group.members = [];
                }
                group.members.push({
                    id: nanoid(),
                    name: memberName
                });
                savedData(state.groups);
            }
        },

        editMemberName: (state,action) => {
            const{groupId, memberId, newName} = action.payload;
            const group = state.groups.find((g) => g.id === groupId)
            if(group){
                const member = state.groups.members.find((m) => m.id === memberId);
                if(member){
                    member.name = newName;
                    savedData(state.groups)
                }
            }
        },

        deleteMember: (state,action) => {
            const {groupId,memberId} = action.payload;
            const group = state.groups.find((g) => g.id === groupId);
            if(group){
                group.members = group.members.filter((m) => m.id !== memberId);
                group.expenses = group.expenses.filter((e) => !e.sharedWith.includes(memberId))
                savedData(state.groups);
            }
        },

        addExpenses: (state,action) => {
            const {groupId,payerId,amount,description,sharedWith} = action.payload;
            const group = state.groups.find(g => g.id === groupId);
            if(group){
                group.expenses.push({
                    id: nanoid(),
                    payerId,
                    amount: parseFloat(amount),
                    description,
                    sharedWith,
                    date: new Date().toISOString()
                });
                savedData(state.groups);
            }
        },

        editExpense: (state, action) => {
            const {groupId,expenseId, updatedExpense} = action.payload;
            const group = state.groups.find(g => g.id === groupId);
            if(group){
                const expense = group.expenses.find(e => e.id === expenseId);
                if(expense){
                    expense.payerId = updatedExpense.payerId;
                    expense.amount = parseFloat(updatedExpense.amount);
                    expense.description = updatedExpense.description;
                    expense.sharedWith = updatedExpense.sharedWith;
                    expense.date = new Date().toISOString();
                    savedData(state.groups);
                }
            }
        },

        deleteExpense: (state, action) => {
            const {groupId,expenseId} = action.payload;
            const group = state.groups.find(g => g.id === groupId);
            if(group){
                group.expenses = group.expenses.filter(e => e.id !== expenseId);
                savedData(state.groups);
            }
        }
    }
})

export default groupSlice.reducer;
export const {addGroup,editGroupName,deleteGroup,addMember,editMemberName,deleteMember,addExpenses,editExpense,deleteExpense} = groupSlice.actions;