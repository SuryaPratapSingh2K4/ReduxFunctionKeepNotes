import React from "react";
import GroupForm from "./GroupForm";
import SearchBar from "../components/SearchBar";
import GroupList from "../components/GroupList";

const Home = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Trip Expenser</h1>
            <GroupForm />
            <SearchBar />
            <GroupList />
        </div>
    );
};

export default Home;
