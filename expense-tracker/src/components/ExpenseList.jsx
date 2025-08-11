import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense, editExpense, deleteExpense } from "../store/groupSlice";

const ExpenseList = ({ group }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [payerId, setPayerId] = useState("");
    const [sharedWith, setSharedWith] = useState([]);

    const handleAddExpense = (e) => {
        e.preventDefault();
        if (!title.trim() || !amount || !payerId) return;

        dispatch(
            addExpense({
                groupId: group.id,
                expense: {
                    title,
                    amount: parseFloat(amount),
                    payerId,
                    sharedWith,
                },
            })
        );

        setTitle("");
        setAmount("");
        setPayerId("");
        setSharedWith([]);
    };

    const handleToggleShared = (memberId) => {
        setSharedWith((prev) =>
            prev.includes(memberId)
                ? prev.filter((id) => id !== memberId)
                : [...prev, memberId]
        );
    };

    const handleEdit = (expense) => {
        const newTitle = prompt("Edit expense title", expense.title);
        if (newTitle && newTitle.trim()) {
            dispatch(
                editExpense({
                    groupId: group.id,
                    expenseId: expense.id,
                    updates: { title: newTitle },
                })
            );
        }
    };

    const handleDelete = (expenseId) => {
        if (confirm("Delete this expense?")) {
            dispatch(deleteExpense({ groupId: group.id, expenseId }));
        }
    };

    return (
        <div>
            {/* Add Expense Form */}
            <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Expense title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded p-2"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border rounded p-2"
                />
                <select
                    value={payerId}
                    onChange={(e) => setPayerId(e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="">Select Payer</option>
                    {group.members.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.name}
                        </option>
                    ))}
                </select>
                <div className="flex flex-wrap gap-2">
                    {group.members.map((m) => (
                        <label key={m.id} className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={sharedWith.includes(m.id)}
                                onChange={() => handleToggleShared(m.id)}
                            />
                            {m.name}
                        </label>
                    ))}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-full"
                >
                    Add Expense
                </button>
            </form>

            {/* Expense List */}
            {group.expenses.length === 0 ? (
                <p className="text-gray-500">No expenses yet.</p>
            ) : (
                <ul className="space-y-2">
                    {group.expenses.map((e) => (
                        <li
                            key={e.id}
                            className="p-2 border rounded flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{e.title} - ₹{e.amount}</p>
                                <p className="text-sm text-gray-500">
                                    Paid by {group.members.find((m) => m.id === e.payerId)?.name}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(e)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(e.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpenseList;
