import { useDispatch } from "react-redux";
import { deleteExpense, editExpense } from "../store/groupSlice";
import { useState } from "react";

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

export default function ExpenseList({ groupId, expenses, members }) {
//   const dispatch = useDispatch();

  const nameOf = (id) => members.find((m) => m.id === id)?.name || "Unknown";

  if (!expenses?.length) {
    return <p className="text-sm text-gray-500">No expenses yet.</p>;
  }

  return (
    <div className="space-y-2">
      {expenses
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((e) => (
          <ExpenseRow
            key={e.id}
            e={e}
            groupId={groupId}
            members={members}
            nameOf={nameOf}
          />
        ))}
    </div>
  );
}

function ExpenseRow({ e, groupId, members, nameOf }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(e.title);
  const [amount, setAmount] = useState(String(e.amount));
  const [date, setDate] = useState(e.date);
  const [payerId, setPayerId] = useState(e.payerId);
  const [sharedWith, setSharedWith] = useState(e.sharedWith);
  const [note, setNote] = useState(e.note || "");

  const toggleShared = (id) => {
    setSharedWith((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const save = () => {
    const amt = parseFloat(amount);
    if (!title.trim() || isNaN(amt) || amt <= 0 || !payerId || sharedWith.length === 0) {
      return;
    }
    dispatch(
      editExpense({
        groupId,
        expenseId: e.id,
        updates: { title: title.trim(), amount: amt, date, payerId, sharedWith, note: note.trim() }
      })
    );
    setEditing(false);
  };

  return (
    <div className="card p-4">
      {editing ? (
        <div className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="label">Title</label>
              <input className="input" value={title} onChange={(ev) => setTitle(ev.target.value)} />
            </div>
            <div>
              <label className="label">Amount</label>
              <input className="input" type="number" min="0" step="0.01" value={amount} onChange={(ev) => setAmount(ev.target.value)} />
            </div>
            <div>
              <label className="label">Date</label>
              <input className="input" type="date" value={date} onChange={(ev) => setDate(ev.target.value)} />
            </div>
            <div>
              <label className="label">Payer</label>
              <select className="input" value={payerId} onChange={(ev) => setPayerId(ev.target.value)}>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Shared With</label>
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
            <label className="label">Note</label>
            <input className="input" value={note} onChange={(ev) => setNote(ev.target.value)} />
          </div>

          <div className="flex gap-2 justify-end">
            <button className="btn-outline" onClick={() => setEditing(false)}>Cancel</button>
            <button className="btn-primary" onClick={save}>Save</button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-medium text-gray-900">{e.title}</p>
            <p className="text-sm text-gray-600">
              {formatINR(e.amount)} • {new Date(e.date).toLocaleDateString()} • Payer: <span className="font-medium">{nameOf(e.payerId)}</span>
            </p>
            <p className="text-sm text-gray-600">
              Shared with: {e.sharedWith.map(nameOf).join(", ")}
            </p>
            {e.note ? <p className="text-sm text-gray-500">Note: {e.note}</p> : null}
          </div>
          <div className="flex gap-2">
            <button className="btn-outline" onClick={() => setEditing(true)}>Edit</button>
            <button
              className="btn-outline"
              onClick={() => dispatch(deleteExpense({ groupId, expenseId: e.id }))}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
