import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMember } from "../store/groupSlice";

export default function MemberForm({ groupId }) {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (name.trim()) {
            dispatch(addMember({ groupId, name }));
            setName("");
        }
    };

    return (
        <div className="flex gap-2 mt-2">
            <input
                className="border rounded p-2 flex-1"
                placeholder="Enter member name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleAdd} className="bg-blue-500 text-white px-4 rounded">
                Add
            </button>
        </div>
    );
}
