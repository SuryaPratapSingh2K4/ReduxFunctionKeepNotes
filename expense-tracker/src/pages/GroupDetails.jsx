import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { addMember,deleteMember,editMemberName } from '../store/groupSlice';

function GroupDetails() {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const group = useSelector(s => s.group.groups.find(g => g.id === groupId));

    const [newMember, setNewMember] = useState("");
    const [editingMemberId,setEditingMemberId] = useState(null);
    const [editingMemberName,setEditingMemberName] = useState("");
    const [expenseForm,setExpenseForm] = useState({
        description: "",
        amount: "",
        payerId: "",
        sharedWith: []
    })

    const handleAddMember = () => {
        dispatch(addMember({ id: groupId, name: newMember.trim() }))
        setNewMember("");
    }

    const handleSaveMember = () => {
        dispatch(editMemberName({groupId,memberId: editingMemberId, name: editingMemberName.trim()}))
        setEditingMemberName("")
        setEditingMemberId(null)
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
                    {
                        group.map(m => (
                            editingMemberId === m.id ?
                            (
                                <div className='flex items-center justify-between border p-2 rounded'>
                                    <input
                                    type="text"
                                    value={editingMemberName}
                                    onChange={e => setEditingMemberName(e.target.value)}
                                    className='border-b-2 outline-none'
                                    />
                                    <button
                                    onClick={handleSaveMember}
                                    className='text-xs text-green-600'
                                    >
                                        Save
                                    </button>
                                </div>
                            ) :
                            (
                                <div key={m.id} className='flex items-center justify-between p-2 rounded'>
                                    <span>{m.name}</span>
                                    <div className='flex gap-2'>
                                        <button
                                        onClick={() => {
                                            setEditingMemberId(m.id)
                                            setEditingMemberName(m.name)
                                        }}
                                        className='text-xs text-blue-600'
                                        >
                                            Edit
                                        </button>
                                        <button
                                        onClick={() => dispatch(deleteMember({groupId,memberId: m.id}))}
                                        className='text-xs text-red-600'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        ))
                    }
                </div>
            </section>


            <section>

            </section>
        </div>
    )
}

export default GroupDetails
