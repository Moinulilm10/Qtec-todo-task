/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [edit, setEdit] = useState({});
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(null);

  const [addNotificationTitle, setAddNotificationTitle] = useState("");
  const [editNotificationTitle, setEditNotificationTitle] = useState("");
  const [deleteNotificationTitle, setDeleteNotificationTitle] = useState("");
  const [addNotification, setAddNotification] = useState(false);
  const [editNotification, setEditNotification] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState(false);

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
        addNotificationTitle,
        editNotificationTitle,
        deleteNotificationTitle,
        setDeleteNotificationTitle,
        addNotification,
        editNotification,
        deleteNotification,
        setDeleteNotification,
        setAddNotificationTitle,
        setAddNotification,
        setEditNotificationTitle,
        setEditNotification,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
