import React from "react";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../store/groupSlice";

export default function ExpenseList({ group }) {
    const dispatch = useDispatch();

    // Simple balance calculation
    const balances = {};
    group.members.forEach((m) => (balances[m.id] = 0));
    const share = group.expenses.reduce((acc, e) => acc + e.amount, 0) / (group.members.length || 1);
    group.expenses.forEach((e) => {
        balances[e.payerId] += e.amount - share;
    });

    const owes = [];
    group.members.forEach((m) => {
        if (balances[m.id] < 0) {
            const creditor = group.members.find((c) => balances[c.id] > 0);
            if (creditor) {
                owes.push(`${m.name} owes ${creditor.name} ₹${Math.abs(balances[m.id]).toFixed(2)}`);
            }
        }
    });

    return (
        <div className="mt-3">
            <ul className="space-y-2">
                {group.expenses.map((e) => (
                    <li key={e.id} className="flex justify-between p-2 bg-gray-100 rounded">
                        {group.members.find((m) => m.id === e.payerId)?.name} paid ₹{e.amount} ({e.description})
                        <button
                            onClick={() => dispatch(deleteExpense({ groupId: group.id, expenseId: e.id }))}
                            className="text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <h4 className="mt-4 font-semibold">Settlements:</h4>
            <ul className="list-disc ml-5">
                {owes.length > 0 ? owes.map((o, i) => <li key={i}>{o}</li>) : <li>All settled!</li>}
            </ul>
        </div>
    );
}
