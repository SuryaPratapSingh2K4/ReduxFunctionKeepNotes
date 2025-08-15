import React,{useState} from 'react'
import { deleteGroup } from '../store/groupSlice';
import { editGroupName } from '../store/groupSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function GroupItem({ group }) {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [val, setVal] = useState(group.name);

    const save = () => {
        if (val.trim() && val.trim() !== group.name) {
            dispatch(editGroupName({ groupId: group.id, name: val.trim() }));
        }
        setEditing(false);
    };

    return (
        <div className=" bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between">
            <div className="flex-1">
                {editing ? (
                    <div className="flex gap-2">
                        <input className="input" value={val} onChange={(e) => setVal(e.target.value)} />
                        <button className="btn-primary" onClick={save}>Save</button>
                        <button className="btn-outline" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <Link to={`/group/${group.id}`} className="text-lg font-medium text-indigo-700 hover:underline">
                            {group.name}
                        </Link>
                        <p className="text-sm text-gray-500">
                            {group.members.length} member{group.members.length !== 1 ? "s" : ""} • {group.expenses.length} expense{group.expenses.length !== 1 ? "s" : ""}
                        </p>
                    </>
                )}
            </div>
            {!editing && (
                <div className="flex gap-2">
                    <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50" onClick={() => setEditing(true)}>Edit</button>
                    <button
                        className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50"
                        onClick={() => dispatch(deleteGroup({ groupId: group.id }))}
                    >
                        Delete
                    </button>
                    <Link to={`/group/${group.id}`} className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700">Open</Link>
                </div>
            )}
        </div>
    );
}

export default GroupItem
