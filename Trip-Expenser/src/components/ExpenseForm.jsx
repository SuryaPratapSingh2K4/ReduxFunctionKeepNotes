import { useDispatch } from "react-redux";
import { addExpense } from "../store/groupSlice";
import { useState } from "react";

export default function ExpenseForm({ groupId, members }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
    const [payerId, setPayerId] = useState(members[0]?.id || "");
    const [sharedWith, setSharedWith] = useState(members.map((m) => m.id));
    const [note, setNote] = useState("");

    const toggleShared = (id) => {
        setSharedWith((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const submit = (e) => {
        e.preventDefault();
        const amt = parseFloat(amount);
        if (!title.trim() || isNaN(amt) || amt <= 0 || !payerId || sharedWith.length === 0) return;

        dispatch(
            addExpense({
                groupId,
                expense: {
                    title: title.trim(),
                    amount: amt,
                    date,
                    payerId,
                    sharedWith,
                    note: note.trim()
                }
            })
        );

        // reset minimal
        setTitle("");
        setAmount("");
        setNote("");
    };

    return (
        <form onSubmit={submit} className=" bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Add Expense</h3>
            <div className="grid md:grid-cols-2 gap-3">
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Lunch" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" min="0" step="0.01" placeholder="e.g., 850" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">Payer</label>
                    <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={payerId} onChange={(e) => setPayerId(e.target.value)}>
                        {members.map((m) => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700 mb-1">Shared With</label>
                <div className="flex flex-wrap gap-2">
                    {members.map((m) => (
                        <label key={m.id} className="inline-flex items-center gap-2 border rounded-md px-2 py-1">
                            <input
                                type="checkbox"
                                checked={sharedWith.includes(m.id)}
                                onChange={() => toggleShared(m.id)}
                            />
                            <span className="text-sm">{m.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="label">Note (optional)</label>
                <input className="input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g., Paid via UPI" />
            </div>

            <div className="flex justify-end">
                <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700" type="submit">Add Expense</button>
            </div>
        </form>
    );
}
