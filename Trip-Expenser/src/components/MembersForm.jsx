import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMember } from "../store/groupSlice";

export default function MemberForm({ groupId }) {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const submit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        dispatch(addMember({ groupId, name: name.trim() }));
        setName("");
    };

    return (
        <form onSubmit={submit} className=" bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-2">
            <label className="text-sm font-medium text-gray-700 mb-1 text-lg font-semibold text-gray-900">Add Member</label>
            <div className="flex gap-2">
                <input
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Rahul"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700" type="submit">Add</button>
            </div>
        </form>
    );
}
