import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGroup } from "../store/groupSlice";

export default function GroupForm() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        dispatch(addGroup(name.trim()));
        setName("");
    };

    return (
        <form onSubmit={onSubmit} className=" bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-3">
            <label className="text-sm font-medium text-gray-700 mb-1">Create New Group</label>
            <div className="flex gap-2">
                <input
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Goa Trip"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700" type="submit">Add</button>
            </div>
        </form>
    );
}
