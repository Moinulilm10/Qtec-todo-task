import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import TaskDetails from "./components/TaskDetails";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <>
      <DataProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/addTodo" element={<AddTodo />} />

            <Route path="/edit" element={<EditTodo />} />

            <Route path="/todo/:id" element={<TaskDetails />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </DataProvider>
    </>
  );
}

export default App;
