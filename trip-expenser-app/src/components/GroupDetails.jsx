import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    addMember,
    editGroup,
    deleteGroup,
    editMember,
    deleteMember,
} from "../store/groupSlice";

export default function GroupDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const group = useSelector((state) =>
        state.group.groups.find((g) => g.id === id)
    );

    const [newMember, setNewMember] = useState("");
    const [editingGroupName, setEditingGroupName] = useState(false);
    const [groupName, setGroupName] = useState(group?.name || "");

    if (!group) return <p className="text-center p-6">Group not found</p>;

    // ✅ Add Member
    const handleAddMember = () => {
        if (newMember.trim()) {
            dispatch(addMember({ groupId: group.id, name: newMember }));
            setNewMember("");
        }
    };

    // ✅ Delete Group
    const handleDeleteGroup = () => {
        if (window.confirm("Are you sure you want to delete this group?")) {
            dispatch(deleteGroup({ groupId: group.id }));
            navigate("/"); // redirect to home
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Group Header */}
            <div className="flex justify-between items-center mb-6">
                {editingGroupName ? (
                    <input
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        onBlur={() => {
                            dispatch(editGroup({ groupId: group.id, name: groupName }));
                            setEditingGroupName(false);
                        }}
                        className="border rounded p-2 text-lg font-semibold"
                        autoFocus
                    />
                ) : (
                    <h2
                        className="text-2xl font-bold cursor-pointer"
                        onClick={() => setEditingGroupName(true)}
                    >
                        {group.name}
                    </h2>
                )}

                <button
                    onClick={handleDeleteGroup}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Delete Group
                </button>
            </div>

            {/* Add Member */}
            <div className="flex gap-2 mb-6">
                <input
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    placeholder="New member name"
                    className="border rounded p-2 flex-1"
                />
                <button
                    onClick={handleAddMember}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add
                </button>
            </div>

            {/* Members List */}
            <h3 className="text-xl font-semibold mb-2">Members</h3>
            <ul className="space-y-2 mb-6">
                {group.members.map((m) => (
                    <li
                        key={m.id}
                        className="flex justify-between items-center border rounded p-2"
                    >
                        <span>{m.name}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    const newName = prompt("Edit member name:", m.name);
                                    if (newName?.trim()) {
                                        dispatch(
                                            editMember({ groupId: group.id, memberId: m.id, name: newName })
                                        );
                                    }
                                }}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() =>
                                    dispatch(deleteMember({ groupId: group.id, memberId: m.id }))
                                }
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Link to Expenses */}
            <Link
                to={`/group/${group.id}/expenses`}
                className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
            >
                Manage Expenses
            </Link>
        </div>
    );
}
