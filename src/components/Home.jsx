import { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RxPlus } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import DisplayTodos from "../Utils/DisplayTodos";
import Greeting from "../Utils/Greeting";
import SortBar from "../Utils/SortTodos";
import DataContext from "../context/DataContext";

const Home = () => {
  const {
    data,
    setData,
    edit,
    setEdit,
    addNotificationTitle,
    editNotificationTitle,
    deleteNotificationTitle,
    setDeleteNotificationTitle,
    addNotification,
    editNotification,
    deleteNotification,
    setDeleteNotification,
    setTaskDetails,
  } = useContext(DataContext);

  const navigate = useNavigate();

  const [sortCriteria, setSortCriteria] = useState("");

  // Function to handle sorting
  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    // Implement sorting logic here
    let sortedData = [...data];
    switch (criteria) {
      case "low":
      case "medium":
      case "high":
        sortedData.sort((a, b) => a.priority.localeCompare(b.priority));
        break;
      case "lowToHigh":
        sortedData.sort((a, b) => {
          // First, sort by priority (low -> medium -> high)
          const priorityComparison = a.priority.localeCompare(b.priority);
          // If priorities are the same, sort by the creation time
          if (priorityComparison === 0) {
            return new Date(a.currentTime) - new Date(b.currentTime);
          }
          return priorityComparison;
        });
        break;
      case "highToLow":
        sortedData.sort((a, b) => b.priority.localeCompare(a.priority));
        break;
      default:
        // No sorting
        break;
    }
    setData(sortedData);
  };

  // console.log("🚀 ~ Home ~ data:", data);

  return (
    <div className=" w-full relative min-h-screen pb-60 bg-gradient-to-r from-purple-700 to-purple-500">
      <div className=" max-w-[1300px] px-3 m-auto">
        <div>
          <Greeting />

          <div className="flex items-center justify-center gap-24 max-sm:gap-[31px]">
            <div>
              <h1 className="font-bold text-3xl max-sm:text-base text-[#fff]">
                Add Task 👉
              </h1>
            </div>
            <div
              onClick={() => navigate("/addTodo")}
              className="w-16 h-16 max-sm:w-9 max-sm:h-9 cursor-pointer bg-white grid place-items-center rounded-full left-[50%] -translate-x-[50%]"
            >
              <RxPlus className=" text-4xl max-sm:text-3xl plusIcon" />
            </div>

            <SortBar onSort={handleSort} />
          </div>

          <DisplayTodos
            data={data}
            setData={setData}
            edit={edit}
            setEdit={setEdit}
            setDeleteNotificationTitle={setDeleteNotificationTitle}
            setDeleteNotification={setDeleteNotification}
            setTaskDetails={setTaskDetails}
          />

          {addNotification && (
            <div className=" min-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[10px] max-sm:border-l-8 flex items-center gap-2 border-green-600 fixed bottom-32 left-[50%] -translate-x-[50%]">
              <FaCheck className=" text-2xl max-sm:text-xl text-green-500" />
              <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
                Added task - {addNotificationTitle}
              </h2>
            </div>
          )}

          {editNotification && (
            <div className=" min-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[10px] max-sm:border-l-8 flex items-center gap-2 border-green-600 fixed bottom-32 left-[50%] -translate-x-[50%]">
              <FaCheck className=" text-2xl max-sm:text-xl text-green-500" />{" "}
              <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
                Task {editNotificationTitle} updated
              </h2>
            </div>
          )}

          {deleteNotification && (
            <div className=" min-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[10px] max-sm:border-l-8 flex items-center gap-2 border-green-600 fixed bottom-32 left-[50%] -translate-x-[50%]">
              <FaCheck className=" text-2xl max-sm:text-xl text-green-500" />
              <h2 className="max-md:text-xs text-sm text-slate-600 font-semibold">
                Deleted Task - {deleteNotificationTitle}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
