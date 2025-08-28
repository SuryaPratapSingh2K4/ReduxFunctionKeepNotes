import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGroup, deleteGroup } from "../store/groupSlice";
import { Link } from "react-router-dom";

export default function GroupList() {
    const groups = useSelector((state) => state.group.groups);
    const dispatch = useDispatch();
    const [groupName, setGroupName] = useState("");

    const handleAdd = () => {
        if (groupName.trim()) {
            dispatch(addGroup(groupName));
            setGroupName("");
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Trip Groups</h1>

            <div className="flex gap-2 mb-4">
                <input
                    className="border rounded p-2 flex-1"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <button onClick={handleAdd} className="bg-blue-500 text-white px-4 rounded">
                    Add
                </button>
            </div>

            <ul className="space-y-3">
                {groups.map((g) => (
                    <li key={g.id} className="p-3 bg-gray-100 rounded flex justify-between">
                        <Link to={`/group/${g.id}`} className="font-medium">{g.name}</Link>
                        <button
                            onClick={() => dispatch(deleteGroup(g.id))}
                            className="text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
