import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MemberForm from "../components/MembersForm";
import MemberList from "../components/MembersList";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { deleteGroup, editGroupName } from "../store/groupSlice";
import { useState } from "react";

export default function GroupDetails() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const group = useSelector((s) => s.group.groups.find((g) => g.id === groupId));

    const [editingTitle, setEditingTitle] = useState(false);
    const [name, setName] = useState(group?.name || "");

    if (!group) {
        return (
            <div className="text-center">
                <p className="text-gray-600">Group not found.</p>
                <Link to="/" className="btn-primary mt-3 inline-block">Back Home</Link>
            </div>
        );
    }

    const saveTitle = () => {
        if (name.trim() && name.trim() !== group.name) {
            dispatch(editGroupName({ groupId, name: name.trim() }));
        }
        setEditingTitle(false);
    };

    const removeGroup = () => {
        dispatch(deleteGroup({ groupId }));
        navigate("/");
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                {editingTitle ? (
                    <div className="flex gap-2 items-center">
                        <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
                        <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700" onClick={saveTitle}>Save</button>
                        <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50" onClick={() => setEditingTitle(false)}>Cancel</button>
                    </div>
                ) : (
                    <h1 className="text-2xl font-semibold">{group.name}</h1>
                )}
                <div className="flex gap-2">
                    {!editingTitle && (
                        <button className="btn-outline" onClick={() => setEditingTitle(true)}>Rename</button>
                    )}
                    <button className="btn-outline" onClick={removeGroup}>Delete Group</button>
                    <Link to="/" className="btn-primary">Back</Link>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">Members</h3>
                    <MemberForm groupId={groupId} />
                    <MemberList groupId={groupId} members={group.members} />
                </div>

                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">Expenses</h3>
                    <ExpenseForm groupId={groupId} members={group.members} />
                    <ExpenseList groupId={groupId} expenses={group.expenses} members={group.members} />
                </div>
            </div>
        </div>
    );
}
