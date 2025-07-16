import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

function GroupDetails() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const group = useSelector(state.group.groups.find((g) => g.id === groupId))
    const [newMember, setNewMember] = useState("");
    const [newExpense, setNewExpense] = useState("");

    const [editingGroup, setEditingGroup] = useState(false);
    const [editGroupName, setEditGroupName] = useState("")

    const handleEditGroup = () => {
        dispatch(editGroupName({groupId, newName: editGroupName}))
        setEditingGroup(false);
        setEditGroupName("");
    }

    return (
        <div className='max-w-4xl mx-auto'>
            <button
                onClick={() => navigate('/group')}
                className='text-sm text-gray-300 hover:underline flex items-center mb-4'>
                Back to Groups
            </button>

            <div>
                {
                    editingGroup ?
                        (
                            <div className='flex gap-2'>
                                <input
                                    type="text"
                                    placeholder='Enter the new Group Name'
                                    value={editGroupName}
                                    onChange={(e) => setEditGroupName(e.target.value)}
                                    className='px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg'
                                />
                                <button
                                    onClick={handleEditGroup}
                                    className='bg-blue-600 px-3 py-2 rounded-lg'
                                >
                                    Save
                                </button>
                            </div>

                        ) :
                        (
                            <h2 className='text-2xl font-semibold'>{group.name}</h2>
                        )
                }
            </div>

            <div className='bg-gray-800 p-4 rounded-lg'>
                <h3 className='text-xl font-semibold'>Members of {group.name}</h3>
            </div>

        </div>
    )
}

export default GroupDetails
