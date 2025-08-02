import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GroupCard from '../components/GroupCard';
import { addGroup, editGroupName, setSearchItem } from '../store/groupSlice';

function Home() {
    const dispatch = useDispatch();
    const groups = useSelector((s) => s.group.groups.filter((g) => g.name.toLowerCase().includes(s.group.searchTerm.toLowerCase())));
    const search = useSelector((s) => s.group.searchTerm);

    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingValue, seteditingValue] = useState("");

    const handleAdd = () => {
        if (newName.trim()) {
            dispatch(addGroup(newName));
            setNewName("");
        }
    }

    const handleSaveEdit = () => {
        dispatch(editGroupName({ groupId: editingId, name: editingValue }));
        setEditingId(null);
        setNewName("");
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className='text-2xl font-bold mb-4'>Trip Expenser</h1>

            <input
                type="text"
                value={search}
                onChange={e => dispatch(setSearchItem(e.target.value))}
                placeholder='SearchGroups...'
                className='w-full mb-4 p-2 border rounded'
            />

            <div className='flex gap-2 mb-4'>
                <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder='New Group Name'
                    className='flex-1 p-2 border rounded'
                />
                <button onClick={handleAdd} className='px-4 py-2 bg-blue-600 text-white rounded'>
                    Add
                </button>
            </div>

            {
                groups.map((g) => (
                    <div key={g.id} className='border rounded p-3 mb-2 flex justify-between items-center'>
                        {editingId === g.id ?
                            (
                                <div>
                                    <input
                                        type="text"
                                        value={editingValue}
                                        onChange={e => seteditingValue(e.target.value)}
                                        className='border p-2 rounded w-full mb-2'
                                    />
                                    <button
                                        className='text-sm text-green-600 rounded'
                                        onClick={handleSaveEdit}
                                    >
                                        Save
                                    </button>
                                </div>
                            ) :
                            (
                                <Link to={`/group/${g.id}`} className='text-blue-600 font-semibold hover:underline'>
                                    {g.name}
                                </Link>
                            )
                        }
                        <div className='flex gap-2'>
                            <button
                                onClick={() => {
                                    setEditingId(g.id)
                                    seteditingValue(g.name)
                                }}
                                className='text-sm text-blue-600 rounded'
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => dispatch({ groupId: g.id })}
                                className='text-sm text-red-600 rounded'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home
