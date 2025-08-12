import React from "react";
import GroupForm from "./GroupForm";
import SearchBar from "../components/SearchBar";
import GroupList from "../components/GroupList";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-2xl space-y-6">
            <h1 className="text-4xl font-bold">Trip Expenser</h1>
            <GroupForm />
            <SearchBar />
            <GroupList />
        </div>
        </div>
    );
};

export default Home;
