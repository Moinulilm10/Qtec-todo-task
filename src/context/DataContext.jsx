/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [edit, setEdit] = useState({});
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("todoItems"));
    setData(items || []);
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        edit,
        setEdit,
        index,
        setIndex,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
