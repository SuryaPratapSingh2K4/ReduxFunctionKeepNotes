import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { addExpense, addMember, deleteExpense, deleteMember, editExpense, editMemberName } from '../store/groupSlice';

function GroupDetails() {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const group = useSelector(s => s.group.groups.find(g => g.id === groupId));

    const [newMember, setNewMember] = useState("");
    const [editingMemberId, setEditingMemberId] = useState(null);
    const [editingMemberName, setEditingMemberName] = useState("");
    const [expenseForm, setExpenseForm] = useState({
        description: "",
        amount: "",
        payerId: "",
        sharedWith: []
    })
    const [editingExpenseId, setEditingExpenseId] = useState(null);


    const handleAddMember = () => {
        dispatch(addMember({ id: groupId, name: newMember.trim() }))
        setNewMember("");
    }

    const handleSaveMember = () => {
        dispatch(editMemberName({ groupId, memberId: editingMemberId, name: editingMemberName.trim() }))
        setEditingMemberName("")
        setEditingMemberId(null)
    }

    const resetExpenseForm = () => {
        setExpenseForm({
            description: "",
            amount: "",
            payerId: "",
            sharedWith: []
        });
    }

    const handleAddExpense = () => {
        const { description, amount, payerId, sharedWith } = expenseForm;
        if (!description || !amount || !payerId || !sharedWith.length) {
            return alert("Please fill all fields");
        }
        dispatch(addExpense({
            groupId,
            expense: {
                description,
                amount: parseFloat(amount),
                payerId,
                sharedWith
            }
        }));
        setEditingExpenseId(null);
        resetExpenseForm();
    }

    const handleUpdateExpense = () => {
        const { description, amount, payerId, sharedWith } = expenseForm;
        dispatch(
            editExpense({
                groupId,
                expenseId: editingExpenseId,
                expense: {
                    description,
                    amount: parseFloat(amount),
                    payerId,
                    sharedWith
                }
            })
        )
        setEditingExpenseId(null);
        resetExpenseForm();
    }

    const handleEditExpense = (ex) => {
        setEditingExpenseId(ex.id);
        setExpenseForm({
            description: ex.description,
            amount: ex.amount,
            payerId: ex.payerId,
            sharedWith: ex.sharedWith
        });
    }


    return (
        <div className='max-w-4xl mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-2'>{group?.name}</h1>

            <section className='mb-6'>
                <h2 className='text-xl font-semibold mb-2'>Members of {group.name}</h2>
                <div className='flex gap-2 mb-2'>
                    <input
                        type="text"
                        value={newMember}
                        onChange={e => setNewMember(e.target.value)}
                        placeholder='New Member Name'
                        className='border p-1 rounded flex-1'
                    />
                    <button
                        onClick={handleAddMember}
                        className='px-3 py-1 bg-blue-600 text-white rounded'
                    >
                        Add
                    </button>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">Members</h2>
                    {group.members.map((m) => (
                        <div key={m.id} className="flex items-center justify-between border p-2 rounded mb-1">
                            {editingMemberId === m.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingMemberName}
                                        onChange={(e) => setEditingMemberName(e.target.value)}
                                        className="border-b-2 outline-none"
                                    />
                                    <button onClick={handleSaveMember} className="text-xs text-green-600 border rounded">
                                        Save
                                    </button>
                                </>
                            ) : (
                                <span className="text-sm text-blue-600">{m.name}</span>
                            )}

                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingMemberId(m.id);
                                        setEditingMemberName(m.name);
                                    }}
                                    className="text-xs text-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => dispatch(deleteMember({ groupId, memberId: m.id }))}
                                    className="text-xs text-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            <section>
                <h2 className='text-xl font-semibold mb-2'>Expenses</h2>
                <div className='grid gap-2 mb-4 border p-3 rounded'>
                    <input
                        type="text"
                        placeholder='description'
                        value={expenseForm.description}
                        onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                        className='border p-1 rounded'
                    />
                    <input
                        type="number"
                        placeholder='amount'
                        value={expenseForm.amount}
                        onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                        className='border p-1 rounded'
                    />
                    <select
                        value={expenseForm.payerId}
                        onChange={(e) => setExpenseForm({ ...expenseForm, payerId: e.target.value })}
                        className='border p-1 rounded'
                    >
                        <option value="">
                            Who Paid?
                        </option>
                        {
                            group.members.map((m) =>
                            (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            )
                            )
                        }
                    </select>
                    <div>
                        <span className='text-sm mr-2'>Shared With:</span>
                        {
                            group.members.map((m) => (
                                <label key={m.id}>
                                    <input
                                        type="checkbox"
                                        checked={expenseForm.sharedWith.includes(m.id)}
                                        onChange={(e) => {
                                            const arr = expenseForm.sharedWith;
                                            const next = e.target.checked ?
                                                [...arr, m.id] :
                                                arr.filter(id => id !== m.id);
                                            setExpenseForm({ ...expenseForm, sharedWith: next })
                                        }}
                                    />
                                    {m.name}
                                </label>
                            ))
                        }
                    </div>
                    <div>
                        {
                            editingExpenseId ? (
                                <div>
                                    <button
                                        onClick={handleUpdateExpense}
                                        className='mr-2 px-3 py-1 bg-green-600 text-white rounded'
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => { resetExpenseForm(), setEditingExpenseId(null) }}
                                        className='mr-2 px-3 py-1 bg-red-600 text-white rounded'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) :
                                (
                                    <div>
                                        <button
                                            onClick={handleAddExpense}
                                            className='px-3 py-1 bg-blue-600 text-white rounded'
                                        >
                                            Add Expense
                                        </button>
                                    </div>
                                )
                        }
                    </div>
                </div>

                <div>
                    {
                        group.expenses.map((ex) => (
                            <div key={ex.id}
                                className='flex items-center justify-between p-2 border rounded'
                            >
                                <span>
                                    {ex.description} - ${ex.amount} Paid by {
                                        group.members.find(m => m.id == ex.payerId).name
                                    }
                                </span>
                                <div>
                                    <button onClick={() => handleEditExpense(ex.id)}
                                        className='text-xs text-blue-600 mr-2'>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => dispatch(deleteExpense({ groupId, expenseId: ex.id }))}
                                        className='text-xs text-red-600'
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default GroupDetails
