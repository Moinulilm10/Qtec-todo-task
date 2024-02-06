import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import TaskDetails from "./components/TaskDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/addTodo" element={<AddTodo />} />

        <Route path="/edit" element={<EditTodo />} />

        <Route path="/todo/:id" element={<TaskDetails />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
