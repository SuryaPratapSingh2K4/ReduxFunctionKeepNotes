import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addGroup } from '../store/groupSlice';
import {Link} from 'react-router-dom'

function GroupList() {
    const group = useSelector(state => state.group.groups)
    const {name,setName} = useState("");
    const dispatch = useDispatch()
    const handleSubmit = () => {
        if(name.trim()){
            dispatch(addGroup(name));
            setName('')
        }
    }
    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>Your Trip Expenser</h2>
            <div>
                <input
                type="text"
                placeholder='enter group name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border p-2 rounded w-full'
                />
                <button
                onClick={handleSubmit}
                className='bg-green-600 hover:bg-green-800 text-white  px-4 py-2 rounded'>
                    Add
                </button>
            </div>
            <ul className='space-y-2'>
                {group.map((group) => (
                    <li key={group.id} className="bg-gray-400 shadow p-4 rounded">
                        <Link to={`group/${group.id}`}
                        className='text-blue-600 font-semibold'
                        >{group.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GroupList
