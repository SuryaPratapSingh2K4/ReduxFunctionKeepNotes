import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MemberList from "../components/MemberList";
import ExpenseList from "../components/ExpenseList";
// import { editGroupName, deleteGroup } from "../features/groupSlice";
import { editGroupName, deleteGroup } from "../store/groupSlice";
import BalanceSummary from "../components/BalanceSummary";

const GroupDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const group = useSelector((state) =>
        state.group.groups.find((g) => g.id === id)
    );

    if (!group) {
        return (
            <div className="p-6">
                <p className="text-center text-red-500">Group not found</p>
            </div>
        );
    }

    const handleEditName = () => {
        const newName = prompt("Enter new group name", group.name);
        if (newName && newName.trim()) {
            dispatch(editGroupName({ groupId: id, name: newName }));
        }
    };

    const handleDeleteGroup = () => {
        if (confirm("Are you sure you want to delete this group?")) {
            dispatch(deleteGroup({ groupId: id }));
            navigate("/");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{group.name}</h1>
                <div className="flex gap-2">
                    <button
                        onClick={handleEditName}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                        Edit Name
                    </button>
                    <button
                        onClick={handleDeleteGroup}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Delete Group
                    </button>
                </div>
            </div>

            {/* Members */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Members</h2>
                <MemberList group={group} />
            </section>

            {/* Expenses */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Expenses</h2>
                <ExpenseList group={group} />
            </section>

            {/* Balances */}
            <section>
                <BalanceSummary group={group} />
            </section>

        </div>
    );
};

export default GroupDetail;
