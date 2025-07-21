import React from 'react'

function ExpenseList({ expenses, members, onEdit }) {
    const getMemberName = (id) => members.find((m) => m.id === id)?.name || "Unknown";
    return (
        <ul className="space-y-3">
            {expenses.map((expense) => (
                <li key={expense.id} className="p-3 bg-gray-100 rounded shadow">
                    <p>
                        <strong>{getMemberName(expense.payerId)}</strong> paid ₹{expense.amount} for "{expense.description}"
                    </p>
                    <p className="text-sm text-gray-500">
                        Shared with: {expense.sharedWith.map(getMemberName).join(", ")}
                    </p>
                    <button
                        className="mt-1 text-blue-600 hover:underline text-sm"
                        onClick={() => onEdit(expense)}>
                        Edit
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default ExpenseList
