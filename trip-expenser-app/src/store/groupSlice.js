    import { createSlice } from "@reduxjs/toolkit";

    // Load from localStorage
    const loadState = () => {
    try {
        const state = localStorage.getItem("trip_expenser");
        return state ? JSON.parse(state) : { groups: [] };
    } catch {
        return { groups: [] };
    }
    };

    // Save to localStorage
    const saveState = (state) => {
    localStorage.setItem("trip_expenser", JSON.stringify(state));
    };

    const groupSlice = createSlice({
    name: "group",
    initialState: loadState(),

    reducers: {
        addGroup: (state, action) => {
        state.groups.push({
            id: Date.now(),
            name: action.payload,
            members: [],
            expenses: [],
        });
        saveState(state);
        },

        editGroup: (state, action) => {
        const { id, name } = action.payload;
        const group = state.groups.find((g) => g.id === id);
        if (group) group.name = name;
        saveState(state);
        },

        deleteGroup: (state, action) => {
        state.groups = state.groups.filter((g) => g.id !== action.payload);
        saveState(state);
        },

        addMember: (state, action) => {
        const { groupId, name } = action.payload;
        const group = state.groups.find((g) => g.id === groupId);
        if (group) {
            group.members.push({ id: Date.now(), name });
            saveState(state);
        }
        },

        editMember: (state, action) => {
        const { groupId, memberId, name } = action.payload;
        const group = state.groups.find((g) => g.id === groupId);
        if (group) {
            const member = group.members.find((m) => m.id === memberId);
            if (member) member.name = name;
            saveState(state);
        }
        },

        deleteMember: (state, action) => {
        const { groupId, memberId } = action.payload;
        const group = state.groups.find((g) => g.id === groupId);
        if (group) {
            group.members = group.members.filter((m) => m.id !== memberId);
            saveState(state);
        }
        },

        addExpense: (state, action) => {
        const { groupId, payerId, amount, description } = action.payload;
        const group = state.groups.find((g) => g.id === groupId);
        if (group) {
            group.expenses.push({
            id: Date.now(),
            payerId,
            amount: Number(amount),
            description,
            });
            saveState(state);
        }
        },

        editExpense: (state, action) => {
        const { groupId, expenseId, payerId, amount, description } = action.payload;
        const group = state.groups.find((g) => g.id === groupId);
        if (group) {
            const exp = group.expenses.find((e) => e.id === expenseId);
            if (exp) {
            exp.payerId = payerId;
            exp.amount = Number(amount);
            exp.description = description;
            }
            saveState(state);
        }
        },

        deleteExpense: (state, action) => {
        const { groupId, expenseId } = action.payload;
        const group = state.groups.find((g) => g.id === groupId);
        if (group) {
            group.expenses = group.expenses.filter((e) => e.id !== expenseId);
            saveState(state);
        }
        },
    },
    });

    export const {
    addGroup, editGroup, deleteGroup,
    addMember, editMember, deleteMember,
    addExpense, editExpense, deleteExpense,
    } = groupSlice.actions;

    export default groupSlice.reducer;
