import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addExpenses } from '../store/groupSlice'; // ✅ correct import

function AddExpenses() {
    const { groupId } = useParams();
    const group = useSelector(state => state.group.groups.find(g => String(g.id) === String(groupId)));
    const dispatch = useDispatch();
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [payerId, setPayerId] = useState("");
    const [sharedWith, setSharedWith] = useState([]);
    const navigate = useNavigate();

    const toggleSharedWith = (id) => {
        setSharedWith(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const handleSubmit = () => {
        if (!amount || !description || !payerId || sharedWith.length === 0) return;
        dispatch(addExpenses({ groupId, payerId, amount, description, sharedWith }));
        // console.log("AddExpenses");
        
        navigate(`/group/${groupId}`);
    };

    if (!group) return <p className="text-red-500">Group not found.</p>;

    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>Add Expenses</h2>
            <input
                type="number"
                placeholder='Enter the amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='border p-4 rounded w-full mb-2'
            />
            <input
                type="text"
                placeholder='Give the details'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='border p-4 rounded w-full mb-2'
            />
            <select
                value={payerId}
                onChange={(e) => setPayerId(e.target.value)}
                className='border p-2 rounded w-full mb-2'
            >
                <option value="">Select Payer</option>
                {group.members.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                ))}
            </select>
            <fieldset className='mb-2'>
                <legend className='mb-1 font-semibold'>Shared With:</legend>
                {group.members.map(m => (
                    <label key={m.id} className='block'>
                        <input
                            type="checkbox"
                            checked={sharedWith.includes(m.id)}
                            onChange={() => toggleSharedWith(m.id)}
                        />
                        {m.name}
                    </label>
                ))}
            </fieldset>
            <button
                onClick={handleSubmit}
                className='bg-green-600 hover:bg-green-800 px-4 py-2 rounded shadow text-white'
            >
                Add Expenses
            </button>
        </div>
    );
}

export default AddExpenses;
