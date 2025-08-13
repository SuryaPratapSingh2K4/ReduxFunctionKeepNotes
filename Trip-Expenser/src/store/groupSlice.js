import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("trip-expense-groups");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return [];
  }
};

const saveToLocalStorage = (groups) => {
  try {
    localStorage.setItem("trip-expense-groups", JSON.stringify(groups));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const initialState = {
  groups: loadFromLocalStorage(),
  searchTerm: ""
};


const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setSearchItem: (state, action) => {
      state.searchTerm = action.payload;
    },

    addGroup: (state, action) => {
      state.groups.push({
        id: nanoid(),
        name: action.payload,
        members: [],
        expenses: []
      });
      saveToLocalStorage(state.groups);
    },
    editGroupName: (state, action) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group) {
        group.name = action.payload.name;
        saveToLocalStorage(state.groups);
      }
    },
    deleteGroup: (state, action) => {
      state.groups = state.groups.filter((g) => g.id !== action.payload.groupId);
      saveToLocalStorage(state.groups);
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
      const member = group?.members.find((m) => m.id === action.payload.memberId);
      if (member) {
        member.name = action.payload.name;
        saveToLocalStorage(state.groups);
      }
    },
    deleteMember: (state, action) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group) {
        // remove member
        group.members = group.members.filter((m) => m.id !== action.payload.memberId);
        // purge related expenses where they were payer or shared beneficiary
        group.expenses = group.expenses.filter(
          (e) =>
            e.payerId !== action.payload.memberId &&
            !e.sharedWith.includes(action.payload.memberId)
        );
        saveToLocalStorage(state.groups);
      }
    },

    addExpense: (state, action) => {
      const { groupId, expense } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        group.expenses.push({ id: nanoid(), ...expense });
        saveToLocalStorage(state.groups);
      }
    },
    editExpense: (state, action) => {
      const { groupId, expenseId, updates } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        const expense = group.expenses.find((e) => e.id === expenseId);
        if (expense) {
          Object.assign(expense, updates);
          saveToLocalStorage(state.groups);
        }
      }
    },
    deleteExpense: (state, action) => {
      const { groupId, expenseId } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        group.expenses = group.expenses.filter((e) => e.id !== expenseId);
        saveToLocalStorage(state.groups);
      }
    }
  }
});

export const {
  setSearchItem,
  addGroup,
  editGroupName,
  deleteGroup,
  addMember,
  editMemberName,
  deleteMember,
  addExpense,
  editExpense,
  deleteExpense
} = groupSlice.actions;

export default groupSlice.reducer;
