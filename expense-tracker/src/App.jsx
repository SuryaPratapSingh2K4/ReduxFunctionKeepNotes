import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import GroupDetail from "./pages/GroupDetail";
import GroupDetail from "./pages/GroupDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group/:id" element={<GroupDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
