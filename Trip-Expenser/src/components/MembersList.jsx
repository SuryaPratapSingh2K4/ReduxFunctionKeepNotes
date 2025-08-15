import { useDispatch } from "react-redux";
import { deleteMember, editMemberName } from "../store/groupSlice";
import { useState } from "react";

export default function MemberList({ groupId, members }) {
    //   const dispatch = useDispatch();

    if (!members?.length) {
        return <p className="text-sm text-gray-500">No members yet.</p>;
    }

    return (
        <div className="space-y-2">
            {members.map((m) => (
                <MemberRow key={m.id} groupId={groupId} member={m} />
            ))}
        </div>
    );
}

function MemberRow({ groupId, member }) {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [val, setVal] = useState(member.name);

    const save = () => {
        if (val.trim() && val.trim() !== member.name) {
            dispatch(editMemberName({ groupId, memberId: member.id, name: val.trim() }));
        }
        setEdit(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex items-center justify-between">
            {edit ? (
                <div className="flex gap-2 w-full">
                    <input className="input" value={val} onChange={(e) => setVal(e.target.value)} />
                    <button className="btn-primary" onClick={save}>Save</button>
                    <button className="btn-outline" onClick={() => setEdit(false)}>Cancel</button>
                </div>
            ) : (
                <>
                    <span className="font-medium">{member.name}</span>
                    <div className="flex gap-2">
                        <button className="btn-outline" onClick={() => setEdit(true)}>Edit</button>
                        <button
                            className="btn-outline"
                            onClick={() => dispatch(deleteMember({ groupId, memberId: member.id }))}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
