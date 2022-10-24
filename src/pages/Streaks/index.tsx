import { Route, Routes } from "react-router-dom";
import Form from "./Form";
import List from "./List";

const Streaks = () => {
  return (
    <Routes>
      <Route path="" element={<List />} />
      <Route path=":streakId" element={<Form />} />
    </Routes>
  );
};

export default Streaks;
