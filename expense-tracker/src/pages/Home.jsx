import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addGroup } from '../store/groupSlice';
import { Link } from 'react-router-dom';

function Home() {
    const [searchName, setSearchName] = useState('');
    const [groupName, setGroupName] = useState('');
    const dispatch = useDispatch();
    const groups = useSelector((state) => state.group.groups);

    const handleCreateGroup = (e) => {
        if (groupName.trim()) {
            e.preventDefault();
            dispatch(addGroup(groupName));
            setGroupName('');
        }
    }

    const filterGroups = groups.filter((g) =>
        g.name.toLowerCase().includes(searchName.toLowerCase())
    );

    return (
        <div className='max-w-4xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6 mt-4 text-center'>🌍 Trip Expenser</h1>
            <div className='flex flex-col items-center justify-between gap-4 mb-6'>
                <div className='flex items-center gap-2 w-full'>
                    <input
                        type="text"
                        placeholder="Enter your group name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className='px-3 py-2 w-full rounded-lg bg-gray-800 border border-gray-600 text-white'
                    />
                </div>
                <div className='flex items-center gap-2 w-full'>
                    <input
                        type="text"
                        placeholder='New group name'
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className='px-3 py-2 w-full rounded-lg bg-gray-800 border border-gray-600 text-white'
                    />
                    <button
                        onClick={handleCreateGroup}
                        className='bg-green-600 text-white hover:bg-green-800 px-4 py-2 rounded-lg items-center'
                    >
                        Create
                    </button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {
                        filterGroups.length > 0 ?
                        (
                            filterGroups.map((group) => (
                            <Link
                                key={group.id}
                                to={`/group/${group.id}`}
                                className='block bg-gray-800 hover:bg-gray-700 p-4 rounded-xl border-gray-600'
                            >
                                <h2 className='text-xl font-semibold mb-2'>{group.name}</h2>
                                <p className='text-sm text-gray-400'>{group.members.length} members & {group.expenses.length} expenses</p>
                            </Link>
                        ))
                        ) :
                        (
                            <p className='text-center col-span-2 text-gray-400'>No Groups found.</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
