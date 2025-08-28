import { Routes, Route } from "react-router-dom";
import GroupList from "./components/GroupList";
import GroupDetails from "./components/GroupDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GroupList />} />
      <Route path="/group/:id" element={<GroupDetails />} />
    </Routes>
  );
}
