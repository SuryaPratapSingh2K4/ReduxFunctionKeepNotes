import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import GroupDetails from "./pages/GroupDetails";
import NavBar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/group/:groupId" element={<GroupDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
