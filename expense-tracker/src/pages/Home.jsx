import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GroupCard from '../components/GroupCard';

function Home() {
    const groups = useSelector((state) => state.group.groups);
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Trip Groups</h1>
                <Link
                    to="/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                    + New Group
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map((group) => (
                    <GroupCard key={group.id} group={group} />
                ))}
            </div>
        </div>
    )
}

export default Home
