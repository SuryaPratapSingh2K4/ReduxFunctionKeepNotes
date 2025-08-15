import GroupForm from "../components/GroupForm";
import SearchBar from "../components/SearchBar";
import GroupList from "../components/GroupList";

export default function Home() {
    return (
        <div className="space-y-4">
            <GroupForm />
            <SearchBar />
            <GroupList />
        </div>
    );
}
