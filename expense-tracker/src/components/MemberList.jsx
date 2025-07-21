import React from 'react'

function MemberList({ members, onEdit }) {
    return (
        <ul className="space-y-2">
            {members.map((member) => (
                <li key={member.id} className="flex justify-between items-center">
                    <span>{member.name}</span>
                    <button
                        className="text-blue-500 hover:underline text-sm"
                        onClick={() => onEdit(member)}>
                        Edit
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default MemberList
