import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function GroupDashboard() {
    const {groupId} = useParams();
    const group = useSelector(state => state.group.groups(g => g.id === groupId))
    const member = (id) => group.member.find(m => m.id === id).name || 'unknown';
    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>{group.name}</h2>
            <div>
                <Link to={`group/${groupId}/add-expenses`}
                className="bg-green-600 hover:bg-green-800
                text-white px-4 py-2 rounded"
                >Add Expenses
                </Link>
                <Link to={`group/${groupId}/members`}
                className="bg-blue-600 hover:bg-blue-800 text-white
                px-4 py-2 rounded"
                >Manage Members
                </Link>
            </div>
            <h3 className='text-lg font-semibold mb-2'>Balances:</h3>
            {
                
            }
        </div>
    )
}

export default GroupDashboard
