import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const GroupList = () => {
    const { groups, searchTerm } = useSelector((state) => state.group);

    const filteredGroups = groups.filter((group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredGroups.length === 0 ? (
                <p className="text-center col-span-2 text-gray-500">No groups found.</p>
            ) : (
                filteredGroups.map((group) => (
                    <Link
                        to={`/group/${group.id}`}
                        key={group.id}
                        className="p-4 bg-white rounded-xl shadow hover:shadow-lg border"
                    >
                        <h2 className="text-xl font-semibold">{group.name}</h2>
                        <p className="text-gray-600">
                            👥 {group.members.length} members | 💸 {group.expenses.length} expenses
                        </p>
                    </Link>
                ))
            )}
        </div>
    );
};

export default GroupList;
