import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import GroupDetails from "./pages/GroupDetails";
import { setInitialGroups } from "./store/groupSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedGroups = localStorage.getItem("tripGroups");
    if (savedGroups) {
      dispatch(setInitialGroups(JSON.parse(savedGroups)));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/group/:id" element={<GroupDetails />} />
    </Routes>
  );
};

export default App;
