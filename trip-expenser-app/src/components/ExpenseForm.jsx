import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/groupSlice";

export default function ExpenseForm({ group }) {
    const [payerId, setPayerId] = useState("");
    const [amount, setAmount] = useState("");
    const [desc, setDesc] = useState("");
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (payerId && amount) {
            dispatch(addExpense({ groupId: group.id, payerId: Number(payerId), amount, description: desc }));
            setPayerId("");
            setAmount("");
            setDesc("");
        }
    };

    return (
        <div className="flex gap-2 mt-2">
            <select
                className="border p-2 rounded"
                value={payerId}
                onChange={(e) => setPayerId(e.target.value)}
            >
                <option value="">Select Payer</option>
                {group.members.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                ))}
            </select>
            <input
                className="border p-2 rounded w-24"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                className="border p-2 rounded flex-1"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={handleAdd} className="bg-blue-500 text-white px-4 rounded">
                Add
            </button>
        </div>
    );
}
