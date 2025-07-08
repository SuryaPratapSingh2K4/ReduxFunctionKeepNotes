import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addMember } from '../store/groupSlice';

function GroupMembers() {
    const { groupId } = useParams();
    const group = useSelector(state => state.group.groups.find((g) => g.id === groupId))
    const [member, setMember] = useState("")
    const dispatch = useDispatch();
    const handleAdd = () => {
        if (member.trim()) {
            dispatch(addMember(groupId, member))
            setMember("")
        }
    }
    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>Members of {group.name}</h2>
            <div>
                <input
                    type="text"
                    placeholder='Members name'
                    value={member}
                    onChange={(e) => setMember(e.target.value)}
                    className='border p-2 rounded w-full'
                />
                <button onClick={handleAdd} className='bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded'>Add</button>
            </div>
            <ul>
                {
                    group.member.map(m => (
                        <li key={m.id}>{m.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default GroupMembers
