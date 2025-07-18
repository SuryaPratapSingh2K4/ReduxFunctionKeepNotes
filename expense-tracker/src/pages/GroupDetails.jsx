import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { addMember, deleteGroup, deleteMember, editMemberName } from '../store/groupSlice';

function GroupDetails() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const group = useSelector((state) => state.group.groups.find((g) => g.id === groupId))
    const [newMember, setNewMember] = useState("");
    const [newExpense, setNewExpense] = useState({
        description: " ",
        amount: " ",
        payerId: " ",
        sharedWith: []
    });

    const [editingGroup, setEditingGroup] = useState(false);
    const [editGroupName, setEditGroupName] = useState("")

    const [editingName, setEditingName] = useState(false);
    const [editName, setEditName] = useState("");

    const handleEditGroup = () => {
        dispatch(editGroupName({ groupId, newName: editGroupName }))
        setEditingGroup(false);
        setEditGroupName("");
    }

    const handleNewMember = () => {
        if (newMember.trim()) {
            dispatch(addMember({ groupId, memberName: newMember }))
            setNewMember("");
        }
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
                <div>
                    <button
                        onClick={() => setEditingGroup(true)}
                        className='text-sm bg-yellow-600 hover:bg-yellow-500 text-black px-3 py-2 rounded-lg'
                    >
                        Edit Name
                    </button>
                    <button
                        onClick={() => {
                            dispatch(deleteGroup(groupId));
                            navigate('/')
                        }}
                        className='text-sm bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg'
                    >
                        Delete Group
                    </button>
                </div>
            </div>


            <div className='bg-gray-800 p-4 rounded-lg'>
                <h3 className='text-xl font-semibold'>Members of {group.name}</h3>
                <div className='flex gap-2 mb-3'>
                    <input
                        type="text"
                        placeholder='Add a new member'
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                        className='px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg w-full'
                    />
                    <button
                        onClick={handleNewMember}
                        className='bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg'
                    >
                        +
                    </button>
                    <div>
                        <ul>
                            {
                                group.members.map((member) => (
                                    <li key={member.id} className='flex justify-center mb-1'>
                                        {
                                            editingName ? (
                                                <div className='flex items-center'>
                                                    <input
                                                        type="text"
                                                        value={editName}
                                                        onChange={(e) => setEditName(e.target.value)}
                                                        className='px-2 py-1 bg-gray-700 text-white border border-gray-600 rounded-lg ml-2'
                                                    />
                                                    <button
                                                        className='bg-blue-600 px-3 py-2 rounded-lg'
                                                        onClick={() => {
                                                            dispatch(editMemberName({ groupId, memberId: member.id, newName: editName }));
                                                            setEditingName(false);
                                                            setEditName("");
                                                        }}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            ) : (
                                                <span>{member.name}</span>
                                            )
                                        }
                                        <button
                                            className='text-sm bg-yellow-600 hover:bg-yellow-500 text-black px-3 py-2 rounded-lg'
                                            onClick={() => setEditingName(true)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='text-red-600 hover:text-red-800 text-xs'
                                            onClick={() => { dispatch(deleteMember({ groupId, memberId: member.id })) }}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className='bg-gray-800 p-4 rounded-lg'>
                        <h3 className='text-lg font-semibold mb-2'>Add Expenses</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                            <input
                                type="text"
                                placeholder='Description'
                                value={newExpense.description}
                                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                                className='px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg'
                            />
                            <input
                                type="number"
                                placeholder="enter the amount"
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                className='px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg'
                            />
                            <select
                                value={newExpense.payerId}
                                onChange={(e) => setNewExpense({ ...newExpense, payerId: e.target.value })}
                                className='px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg'
                            >
                                <option value="">Select Payer</option>
                                {
                                    group.members.map((member) => (
                                        <option key={member.id} value={member.id}>{member.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default GroupDetails
