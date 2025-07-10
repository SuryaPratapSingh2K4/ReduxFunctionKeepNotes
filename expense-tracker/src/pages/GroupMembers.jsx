import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addMember } from '../store/groupSlice';

function GroupMembers() {
    const { groupId } = useParams();
    // const group = useSelector((state) => state.group.groups.find((g) => String(g.id) === String(groupId)))
    const group = useSelector((state) =>
        Array.isArray(state.group.groups)
            ? state.group.groups.find((g) => String(g.id) === String(groupId))
            : null
    );
    const [name, setName] = useState("")
    const dispatch = useDispatch();

    // useEffect(() => {
    //     localStorage.setItem("groups", JSON.stringify(group));
    // }, [group]);


    const handleAdd = () => {
        if (name.trim()) {
            dispatch(addMember({ groupId, memberName: name }))
            console.log({ name });

            setName("")
        }
    }

    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>Members of {group.name}</h2>
            <div>
                <input
                    type="text"
                    placeholder='Enter Members name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border p-2 rounded w-full'
                />
                <button
                    onClick={handleAdd}
                    className='bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded'>Add</button>
            </div>


            <ul className="list-disc ml-6">
                {group.members && group.members.length > 0 ? (
                    group.members.map((m) => (
                        <li key={m.id} className="border-b py-2">{m.name}</li>
                    ))
                ) : (
                    <p className="text-gray-500">No members added yet.</p>
                )}
            </ul>


        </div>
    )
}

export default GroupMembers
