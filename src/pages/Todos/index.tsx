import { Route, Routes } from "react-router-dom";
import List from "./List";
import Form from "./Form";

const Todos = () => {
  return (
    <Routes>
      <Route path="" element={<List />} />
      <Route path=":todoId" element={<Form />} />
    </Routes>
  );
};

export default Todos;
