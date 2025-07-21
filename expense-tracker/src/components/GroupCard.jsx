import { Link } from "react-router-dom";

const GroupCard = ({ group }) => {
    return (
        <Link to={`/group/${group.id}`}
            className="block p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-bold">{group.name}</h2>
            <p className="text-sm text-gray-500">
                {group.members?.length || 0} members • {group.expenses?.length || 0} expenses
            </p>
        </Link>
    );
};

export default GroupCard;