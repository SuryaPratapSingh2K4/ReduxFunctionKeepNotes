import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

function GroupDashboard() {
    const { groupId } = useParams();
    console.log("groupid from url: ", groupId);
    
    const group = useSelector((state) => state.group.groups.find((g) => String(g.id) === String(groupId)))
    if (!group) {
        return <p className="text-red-600">Group not found or deleted.</p>;
    }
    const member = (id) => group.member.find((m) => m.id === id)?.name || 'unknown';
    const balance = {}
    group.expenses.forEach((exp) => {
        const share = exp.amount / exp.sharedWith.length;
        if (member !== exp.payerId) {
            balance[member] = (balance[member] || 0) - share;
            balance[exp.payerId] = (balance[exp.payerId] || 0) + share;
        }
    })
    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>{group.name}</h2>
            <div>
                <Link to={`/group/${groupId}/add-expense`}
                    className="bg-green-600 hover:bg-green-800
                text-white px-4 py-2 rounded"
                >Add Expenses
                </Link>
                <Link to={`/group/${groupId}/members`}
                    className="bg-blue-600 hover:bg-blue-800 text-white
                px-4 py-2 rounded"
                >Manage Members
                </Link>
            </div>
            <h3 className='text-lg font-semibold mb-2'>Balances:</h3>
            <ul className='mb-6'>
                {
                    Object.entries(balance).map(([id, bal]) => (
                        <li key={id} className='mb-1'>
                            {member(id)} : {bal} ₹
                        </li>
                    ))
                }
            </ul>
            <h3 className='text-lg font-semibold mb-2'>Expenses:</h3>
            <ul>
                {
                    group?.expenses.map(exp => (
                        <li key={exp.id}
                            className='bg-white p-3 rounded shadow'>
                            <strong>{member(exp.payerId)}</strong> Paid ₹ {exp.amount} for <em>{exp.description}</em>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default GroupDashboard
