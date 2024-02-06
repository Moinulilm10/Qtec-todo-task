import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import TasksOptions from "./TasksOptions";

const Todo = ({
  i,
  val,
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setTaskDetails,
}) => {
  console.log("🚀 ~ val:", val);
  const [openOptions, setOpenOptions] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // Determine background color based on priority
  // const priorityColors = {
  //   high: "bg-green-600",
  //   medium: "bg-yellow-500",
  //   low: "bg-red-500",
  // };
  const priorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-green-600";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-600";
      default:
        return "bg-purple-800";
    }
  };

  return (
    <div
      className={`flex justify-between gap-4 max-w-full items-center
     text-white  rounded-2xl px-6 py-5 max-sm:px-3 ${priorityColor(
       val.priority
     )}`}
    >
      {val.check && (
        <div className=" bg-purple-500 p-4 max-sm:p-2 rounded-2xl">
          <FaCheck className=" text-4xl" />
        </div>
      )}

      <div className="black w-full">
        <div
          className={`flex justify-between gap-10 items-center ${
            val.description ? "mb-3 max-sm:mb-1" : "mb-0"
          }`}
        >
          <h2
            className={`${
              val.check ? "line-through" : null
            } font-semibold text-lg displayInput max-sm:text-sm`}
          >
            {val.title}
          </h2>
          <p
            className={`${
              val.check ? "line-through" : null
            } min-w-[110px] max-sm:text-xs`}
          >
            {val.currentTime}
          </p>
        </div>
        <p
          className={`${
            val.check ? "line-through" : null
          } text-base max-sm:text-sm ${!val.description && "hidden"}`}
        >
          {val.description}
        </p>

        <div className="flex flex-row gap-24">
          <div
            className={`flex gap-3 items-center flex-wrap mt-3 ${
              !val.catagory.length && "hidden"
            }`}
          >
            {val.catagory.map((c, index) => (
              <h4
                className="bg-purple-600 rounded-2xl text-sm max-sm:text-xs px-3 py-1"
                key={index}
              >
                <span className=" text-xl max-sm:text-lg">{c.emoji}</span>{" "}
                {c.catagory}
              </h4>
            ))}
          </div>

          <div className={"flex gap-3 items-center flex-wrap mt-3"}>
            <h4 className="bg-purple-600 rounded-2xl text-sm max-sm:text-xs px-3 py-1">
              {val.priority}
            </h4>
          </div>
        </div>
      </div>

      <div ref={menuRef} className=" relative">
        <SlOptionsVertical
          onClick={() => setOpenOptions(!openOptions)}
          className=" text-lg cursor-pointer"
        />

        <div
          className={`${openOptions ? "animationActive" : "animationUnactive"}`}
        >
          {openOptions && (
            <TasksOptions
              index={i}
              val={val}
              data={data}
              setData={setData}
              setEdit={setEdit}
              setDeleteNotificationTitle={setDeleteNotificationTitle}
              setDeleteNotification={setDeleteNotification}
              setTaskDetails={setTaskDetails}
              setOpenOptions={setOpenOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
