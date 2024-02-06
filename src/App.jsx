import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import TaskDetails from "./components/TaskDetails";
import { DataProvider } from "./context/DataContext";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <DataProvider>
          <div className={`h-full w-full ${darkMode ? "dark" : ""}`}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/addTodo" element={<AddTodo />} />

              <Route path="/edit" element={<EditTodo />} />

              <Route path="/todo/:id" element={<TaskDetails />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </DataProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
