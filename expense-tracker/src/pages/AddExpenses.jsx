import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

function AddExpenses() {
    const { groupId } = useParams()
    const group = useSelector(state => state.group.groups.find(g => String(g.id) === String(groupId)))
    const dispatch = useDispatch()
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [payerId, setPayerId] = useState("")
    const [sharedWith, setSharedWith] = useState([])
    const navigate = useNavigate()

    const toggleSharedWith = (id) => {
        setSharedWith(prev => prev.includes(id) ? prev.filter(p => p.id !== id) : [...prev, id])
    }

    const handleExpenses = () => {
        if (!amount || !description || !payerId || !sharedWith) return;
        dispatch(AddExpenses(groupId, payerId, amount, description, sharedWith))
        navigate(`/group/${groupId}`)
    }

    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>Add Expenses</h2>
            <input
                type="number"
                placeholder='enter the amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='border p-4 rounded w-full mb-2'
            />
            <input
                type="number"
                placeholder='give the details'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='border p-4 rounded w-full mb-2'
            />
            <select value={payerId} onChange={(e) => setPayerId(e.target.value)}
                className='border p-2 rounded w-full mb-2'>
                <option value="">Select Payers</option>
                {group.members.map(m => (
                    <option key={m.id}>{m.name}</option>
                ))}
            </select>
            <fieldset className='mb-2'>
                <legend className='mb-1 font-semibold'>Shared With:</legend>
                {
                    group.members.map(m => (
                        <label key={m.id} className='block'>
                            <input
                                type="checkbox"
                                checked={sharedWith.includes(m.id)}
                                onChange={() => toggleSharedWith(m.id)}
                            />
                            {m.name}
                        </label>
                    ))
                }
            </fieldset>
            <button onClick={handleExpenses} className='bg-green-600 hover:bg-green-800 px-4 py-2 rounded shadow text-white'>Add Expenses</button>
        </div>
    )
}

export default AddExpenses
