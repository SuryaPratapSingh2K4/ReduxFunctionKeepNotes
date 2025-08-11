import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setSearchItem } from "../features/groupSlice";
import { setSearchItem } from "../store/groupSlice";

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.group.searchTerm);

    return (
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchItem(e.target.value))}
            placeholder="Search groups..."
            className="border rounded p-2 w-full mb-4"
        />
    );
};

export default SearchBar;
