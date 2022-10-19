
import { Route, Routes } from "react-router-dom";
import Form from "./Form";
import List from "./List";

const Cards = () => {
  return (
    <Routes>
      <Route path="" element={<List />} />
      <Route path=":cardId" element={<Form />} />
    </Routes>
  );
};

export default Cards;
