import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import GroupDetails from "./pages/GroupMembers";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group/:groupId" element={<GroupDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
