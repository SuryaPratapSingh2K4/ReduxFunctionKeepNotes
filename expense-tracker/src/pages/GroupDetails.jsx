import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    addMember,
    addExpense,
    editMemberName,
    editExpense,
    editGroupName,
    deleteGroup,
    deleteMember,
    deleteExpense,
} from "../store/groupSlice";
import MemberList from "../components/MemberList";
import ExpenseList from "../components/ExpenseList";
import { calculateBalances } from "../components/calculateBalance";

const GroupDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const group = useSelector((state) =>
        state.group.groups.find((g) => g.id === id)
    );

    const [newMember, setNewMember] = useState("");
    const [newExpense, setNewExpense] = useState({
        description: "",
        amount: "",
        payerId: "",
        sharedWith: [],
    });
    const [groupNameEdit, setGroupNameEdit] = useState(group?.name || "");

    if (!group) return <div className="p-6">Group not found</div>;

    const handleAddMember = () => {
        if (newMember.trim()) {
            dispatch(addMember({ groupId: id, name: newMember }));
            setNewMember("");
        }
    };

    const handleEditMember = (member) => {
        const newName = prompt("Edit member name:", member.name);
        if (newName && newName.trim() && newName !== member.name) {
            dispatch(editMemberName({ groupId: id, memberId: member.id, name: newName }));
        }
    };

    const handleDeleteMember = (memberId) => {
        if (confirm("Are you sure you want to delete this member?")) {
            dispatch(deleteMember({ groupId: id, memberId }));
        }
    };

    const handleAddExpense = () => {
        const { description, amount, payerId, sharedWith } = newExpense;
        if (description && amount && payerId && sharedWith.length) {
            dispatch(
                addExpense({
                    groupId: id,
                    expense: {
                        description,
                        amount: parseFloat(amount),
                        payerId,
                        sharedWith,
                    },
                })
            );
            setNewExpense({ description: "", amount: "", payerId: "", sharedWith: [] });
        }
    };

    const handleEditExpense = (expense) => {
        const newDescription = prompt("Edit description:", expense.description);
        const newAmount = prompt("Edit amount:", expense.amount);
        if (newDescription && newAmount) {
            dispatch(
                editExpense({
                    groupId: id,
                    expenseId: expense.id,
                    updates: {
                        description: newDescription,
                        amount: parseFloat(newAmount),
                    },
                })
            );
        }
    };

    const handleDeleteExpense = (expenseId) => {
        if (confirm("Are you sure you want to delete this expense?")) {
            dispatch(deleteExpense({ groupId: id, expenseId }));
        }
    };

    const handleGroupNameEdit = () => {
        if (groupNameEdit.trim() && groupNameEdit !== group.name) {
            dispatch(editGroupName({ groupId: id, name: groupNameEdit }));
        }
    };

    const handleDeleteGroup = () => {
        if (confirm("Are you sure you want to delete this group?")) {
            dispatch(deleteGroup({ groupId: id }));
            navigate("/");
        }
    };

    const balances = calculateBalances(group.members, group.expenses);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2">
                <input
                    value={groupNameEdit}
                    onChange={(e) => setGroupNameEdit(e.target.value)}
                    className="text-2xl font-bold border-b border-gray-300 focus:outline-none"
                />
                <button
                    onClick={handleGroupNameEdit}
                    className="px-2 py-1 text-sm bg-blue-600 text-white rounded">
                    Save
                </button>
                <button
                    onClick={handleDeleteGroup}
                    className="px-2 py-1 text-sm bg-red-600 text-white rounded">
                    Delete Group
                </button>
            </div>

            {/* Members */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Members</h2>
                <div className="flex space-x-2 mb-3">
                    <input
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                        placeholder="New member name"
                        className="border p-2 rounded w-full"
                    />
                    <button
                        onClick={handleAddMember}
                        className="bg-green-600 text-white px-4 rounded">
                        Add
                    </button>
                </div>
                <MemberList
                    members={group.members}
                    onEdit={handleEditMember}
                    onDelete={handleDeleteMember}
                />
            </div>

            {/* Expenses */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Expenses</h2>
                <div className="space-y-2 mb-4">
                    <input
                        type="text"
                        placeholder="Description"
                        value={newExpense.description}
                        onChange={(e) =>
                            setNewExpense({ ...newExpense, description: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newExpense.amount}
                        onChange={(e) =>
                            setNewExpense({ ...newExpense, amount: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                    />
                    <select
                        value={newExpense.payerId}
                        onChange={(e) =>
                            setNewExpense({ ...newExpense, payerId: e.target.value })
                        }
                        className="border p-2 rounded w-full">
                        <option value="">Select payer</option>
                        {group.members.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                    <div className="space-y-1">
                        <label className="font-medium">Shared with:</label>
                        {group.members.map((m) => (
                            <div key={m.id}>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={newExpense.sharedWith.includes(m.id)}
                                        onChange={(e) => {
                                            const updated = e.target.checked
                                                ? [...newExpense.sharedWith, m.id]
                                                : newExpense.sharedWith.filter((id) => id !== m.id);
                                            setNewExpense({ ...newExpense, sharedWith: updated });
                                        }}
                                    />
                                    <span>{m.name}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleAddExpense}
                        className="bg-purple-600 text-white px-4 py-2 rounded mt-2">
                        Add Expense
                    </button>
                </div>
                <ExpenseList
                    expenses={group.expenses}
                    members={group.members}
                    onEdit={handleEditExpense}
                    onDelete={handleDeleteExpense}
                />
            </div>

            {/* Balances */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Balances</h2>
                <ul className="space-y-1">
                    {group.members.map((m) => (
                        <li key={m.id}>
                            {m.name}: {balances[m.id] === 0
                                ? "settled up"
                                : balances[m.id] > 0
                                    ? `gets ₹${balances[m.id].toFixed(2)}`
                                    : `owes ₹${Math.abs(balances[m.id]).toFixed(2)}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GroupDetails;