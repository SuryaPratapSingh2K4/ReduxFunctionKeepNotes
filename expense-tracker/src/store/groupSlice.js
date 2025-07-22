    // src/features/groupSlice.js
    import { createSlice, nanoid } from "@reduxjs/toolkit";

    // Load from localStorage
    const loadFromLocalStorage = () => {
    try {
        const data = localStorage.getItem("trip-expense-groups");
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error loading from localStorage", err);
        return [];
    }
    };

    // Save to localStorage
    const saveToLocalStorage = (groups) => {
    try {
        localStorage.setItem("trip-expense-groups", JSON.stringify(groups));
    } catch (err) {
        console.error("Error saving to localStorage", err);
    }
    };

    const initialState = {
    groups: loadFromLocalStorage(),
    };

    const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        addGroup: (state, action) => {
        state.groups.push({
            id: nanoid(),
            name: action.payload,
            members: [],
            expenses: [],
        });
        saveToLocalStorage(state.groups);
        },
        deleteGroup: (state, action) => {
        state.groups = state.groups.filter(
            (g) => g.id !== action.payload.groupId
        );
        saveToLocalStorage(state.groups);
        },
        editGroupName: (state, action) => {
        const group = state.groups.find((g) => g.id === action.payload.groupId);
        if (group) {
            group.name = action.payload.name;
            saveToLocalStorage(state.groups);
        }
        },
        addMember: (state, action) => {
        const group = state.groups.find((g) => g.id === action.payload.groupId);
        if (group) {
            group.members.push({ id: nanoid(), name: action.payload.name });
            saveToLocalStorage(state.groups);
        }
        },
        editMemberName: (state, action) => {
        const group = state.groups.find((g) => g.id === action.payload.groupId);
        if (group) {
            const member = group.members.find(
            (m) => m.id === action.payload.memberId
            );
            if (member) {
            member.name = action.payload.name;
            saveToLocalStorage(state.groups);
            }
        }
        },
        deleteMember: (state, action) => {
        const group = state.groups.find((g) => g.id === action.payload.groupId);
        if (group) {
            group.members = group.members.filter(
            (m) => m.id !== action.payload.memberId
            );
            group.expenses = group.expenses.filter(
            (e) =>
                e.payerId !== action.payload.memberId &&
                !e.sharedWith.includes(action.payload.memberId)
            );
            saveToLocalStorage(state.groups);
        }
        },
        addExpense: (state, action) => {
        const group = state.groups.find((g) => g.id === action.payload.groupId);
        if (group) {
            group.expenses.push({ id: nanoid(), ...action.payload.expense });
            saveToLocalStorage(state.groups);
        }
        },
        editExpense: (state, action) => {
        const group = state.groups.find((g) => g.id === action.payload.groupId);
        if (group) {
            const expense = group.expenses.find(
            (e) => e.id === action.payload.expenseId
            );
            if (expense) {
            Object.assign(expense, action.payload.updates);
            saveToLocalStorage(state.groups);
            }
        }
        },
        deleteExpense: (state, action) => {
        const group = state.groups.find((g) => g.id === action.payload.groupId);
        if (group) {
            group.expenses = group.expenses.filter(
            (e) => e.id !== action.payload.expenseId
            );
            saveToLocalStorage(state.groups);
        }
        },
        setInitialGroups: (state, action) => {
            state.groups = action.payload;
            saveToLocalStorage(state.groups);
        },
    },
    });

    export const {
    addGroup,
    deleteGroup,
    editGroupName,
    addMember,
    editMemberName,
    deleteMember,
    addExpense,
    editExpense,
    deleteExpense,
    setInitialGroups,
    } = groupSlice.actions;

    export default groupSlice.reducer;
