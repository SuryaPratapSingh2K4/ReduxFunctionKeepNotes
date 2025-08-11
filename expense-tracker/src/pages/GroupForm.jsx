import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { addGroup } from "../features/groupSlice";
import { addGroup } from "../store/groupSlice";

const GroupForm = () => {
    const [groupName, setGroupName] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!groupName.trim()) return;
        dispatch(addGroup(groupName));
        setGroupName("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                className="border rounded p-2 flex-1"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Group
            </button>
        </form>
    );
};

export default GroupForm;
