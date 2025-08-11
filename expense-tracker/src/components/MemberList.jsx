import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMember, editMemberName, deleteMember } from "../store/groupSlice";

const MemberList = ({ group }) => {
    const [memberName, setMemberName] = useState("");
    const dispatch = useDispatch();

    const handleAddMember = (e) => {
        e.preventDefault();
        if (!memberName.trim()) return;
        dispatch(addMember({ groupId: group.id, name: memberName }));
        setMemberName("");
    };

    const handleEdit = (memberId, currentName) => {
        const newName = prompt("Edit member name", currentName);
        if (newName && newName.trim()) {
            dispatch(editMemberName({ groupId: group.id, memberId, name: newName }));
        }
    };

    const handleDelete = (memberId) => {
        if (confirm("Delete this member?")) {
            dispatch(deleteMember({ groupId: group.id, memberId }));
        }
    };

    return (
        <div>
            {/* Add member form */}
            <form onSubmit={handleAddMember} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Enter member name"
                    className="border rounded p-2 flex-1"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add
                </button>
            </form>

            {/* Member list */}
            {group.members.length === 0 ? (
                <p className="text-gray-500">No members yet.</p>
            ) : (
                <ul className="space-y-2">
                    {group.members.map((m) => (
                        <li
                            key={m.id}
                            className="flex justify-between items-center p-2 border rounded"
                        >
                            <span>{m.name}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(m.id, m.name)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(m.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MemberList;
