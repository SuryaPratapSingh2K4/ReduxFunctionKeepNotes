import React from 'react'
import { useSelector } from 'react-redux';
import GroupItem from './GroupItem';

function GroupList() {
    const { groups, searchTerm } = useSelector((s) => s.group);
    const filtered = groups.filter((g) =>
        g.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0) {
        return <p className="text-center text-gray-500">No groups yet. Create one above!</p>;
    }

    return (
        <div className="space-y-3">
            {filtered.map((g) => (
                <GroupItem key={g.id} group={g} />
            ))}
        </div>
    )
}

export default GroupList


// import { useSelector } from "react-redux";
// import GroupItem from "./GroupItem";

// export default function GroupList() {
//     const { groups, searchTerm } = useSelector((s) => s.group);
//     const filtered = groups.filter((g) =>
//         g.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (filtered.length === 0) {
//         return <p className="text-center text-gray-500">No groups yet. Create one above!</p>;
//     }

//     return (
//         <div className="space-y-3">
//             {filtered.map((g) => (
//                 <GroupItem key={g.id} group={g} />
//             ))}
//         </div>
//     );
// }
