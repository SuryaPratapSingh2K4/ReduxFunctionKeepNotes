import { useDispatch, useSelector } from "react-redux";
import { setSearchItem } from "../store/groupSlice";

export default function SearchBar() {
    const dispatch = useDispatch();
    const searchTerm = useSelector((s) => s.group.searchTerm);

    return (
        <div className=" bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <label className="text-sm font-medium text-gray-700 mb-1">Search Groups</label>
            <div className="flex pt-2">
                <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type group name..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchItem(e.target.value))}
            />
            </div>
        </div>
    );
}
