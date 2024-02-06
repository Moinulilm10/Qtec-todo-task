import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { catagory } from "../Data/Data";
import CatagoryBtn from "./CatagoryBtn";

const FormInputs = ({
  data,
  setData,
  setAddNotification,
  setAddNotificationTitle,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const [emptyInputError, setEmptyInputError] = useState(false);

  const [nameCountError, setNameCountError] = useState("");
  const [descriptionCountError, setDescriptionCountError] = useState("");

  const [CategoryOpen, setCategoryOpen] = useState(false);

  const [selectedCatagory, setSelectedCatagory] = useState([]);

  const [maxSelectedError, setMaxSelectedError] = useState(false);

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleName = (e) => {
    let title = e.target.value;
    setTaskName(e.target.value);

    if (title.length > 35) {
      setNameCountError("Name should be less than or equal to 30 characters");
    } else {
      setNameCountError("");
    }
  };
  const handleDescription = (e) => {
    let description = e.target.value;
    setTaskDescription(e.target.value);

    if (description.length > 250) {
      setDescriptionCountError(
        "Description should be less than or equal to 200 characters"
      );
    } else {
      setDescriptionCountError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new Date object
    const now = new Date();

    const date = now.getDate();

    const month = now.getMonth() + 1;

    const year = now.getFullYear();

    // Get the hours (in 24-hour format)
    let hours = now.getHours();

    // Determine whether it's AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = (hours % 12 || 12).toString().padStart(2, "0");

    // Get the minutes
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const id = uuidv4();
    const title = taskName;
    const description = taskDescription;
    const currentTime = `${date}/${month}/${year} ,${hours}:${minutes} ${amOrPm}`;
    const check = false;

    if (taskName === "") {
      setEmptyInputError(true);

      setTimeout(() => {
        setEmptyInputError(false);
      }, 4000);
    } else {
      const newTask = {
        id: id,
        title: title,
        description: description,
        currentTime: currentTime,
        check: check,
        catagory: selectedCatagory,
        priority: selectedPriority,
      };

      localStorage.setItem("todoItems", JSON.stringify([...data, newTask]));
      setData([...data, newTask]);
      setTaskName("");
      setTaskDescription("");
      setEmptyInputError(false);
      navigate("/");

      setAddNotificationTitle(taskName);
      setAddNotification(true);
      setTimeout(() => {
        setAddNotification(false);
        setAddNotificationTitle("");
      }, 4000);
    }
  };

  const handleSelected = (catagoryObj) => {
    setSelectedCatagory([...selectedCatagory, catagoryObj]);

    const isCategorySelected = selectedCatagory.filter(
      (val) => val.id === catagoryObj.id
    );

    if (isCategorySelected.length) {
      const updatedCatagories = selectedCatagory.filter(
        (val) => val.id !== catagoryObj.id
      );
      setSelectedCatagory(updatedCatagories);
    } else {
      if (selectedCatagory.length < 3) {
        setMaxSelectedError(false);
        setSelectedCatagory([...selectedCatagory, catagoryObj]);
      } else {
        setMaxSelectedError(true);
        setTimeout(() => {
          setMaxSelectedError(false);
        }, 4000);
        setSelectedCatagory([...selectedCatagory]);
      }
    }

    // const isCategorySelected = selectedCatagory.includes(catagory);

    // if (isCategorySelected) {
    //   const updatedCategories = selectedCatagory.filter(
    //     (val) => val !== catagory
    //   );
    //   setSelectedCatagory(updatedCategories);
    //   console.log(updatedCategories);
    // } else {
    //   if (selectedCatagory.length < 3) {
    //     setMaxSelectedError(false);
    //     setSelectedCatagory([...selectedCatagory, catagory]);
    //   } else {
    //     setMaxSelectedError(true);
    //     setTimeout(() => {
    //       setMaxSelectedError(false);
    //     }, 4000);
    //     const updatedCategories = [...selectedCatagory];
    //     setSelectedCatagory(updatedCategories);
    //   }
    // }
  };

  const catagoryRef = useRef();

  useEffect(() => {
    let handleCatagoryTouch = (e) => {
      if (!catagoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleCatagoryTouch);

    return () => document.removeEventListener("mousedown", handleCatagoryTouch);
  });

  return (
    <div className=" py-10">
      <form onSubmit={handleSubmit} className="max-w-[600px] m-auto">
        {/* todo name Section */}
        <div>
          <label
            className={`text-sm ${
              nameCountError ? "text-red-500" : "text-purple-200"
            } text-purple-200`}
            htmlFor="taskName"
          >
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            placeholder="Enter task name"
            value={taskName}
            onChange={handleName}
            onKeyDown={handleKeyDown}
            className={`w-full h-14 max-sm:h-12 ${
              nameCountError ? "border-red-500 border-2" : "border-none"
            } rounded-xl p-4 text-base max-sm:placeholder:text-base mt-1 outline-none`}
          />
          <p className="text-red-500 text-base max-sm:text-xs mt-1">
            {nameCountError}
          </p>
        </div>

        {/* todo description Section */}
        <div className=" mt-4 max-sm:mt-4">
          <label
            className={`text-sm ${
              descriptionCountError ? "text-red-500" : "text-purple-200"
            } text-purple-200`}
            htmlFor="taskDescription"
          >
            Task Description
          </label>
          <textarea
            id="taskDescription"
            placeholder="Enter task description"
            value={taskDescription}
            onChange={handleDescription}
            className={`resize-none ${
              descriptionCountError ? "border-red-500 border-2" : "border-none"
            }  w-full rounded-xl p-4 max-sm:p-3 mt-1 text-base max-sm:placeholder:text-base h-48 max-sm:h-36 outline-none`}
          ></textarea>
          <p className="text-red-500 text-base max-sm:text-xs mt-1">
            {descriptionCountError}
          </p>
        </div>

        {/* Task Priority Section */}
        <div className="mt-4 mb-4">
          <label className="text-sm text-purple-200">Priority</label>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="w-full h-12 max-sm:h-10 rounded-xl p-4 text-base mt-1 outline-none"
          >
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Category Section */}
        <div ref={catagoryRef}>
          <label className="text-sm text-purple-200">Category</label>

          <div
            onClick={() => setCategoryOpen(!CategoryOpen)}
            className=" bg-white flex gap-10 cursor-pointer justify-between items-center max-sm:text-xs p-3 rounded-xl w-full min-h-16 min-sm:h-14 mt-1"
          >
            <div className=" flex gap-3 flex-wrap items-center">
              {selectedCatagory.map((val, index) => (
                <p
                  key={index}
                  className=" bg-purple-500 text-white text-sm px-3 py-2 max-sm:py-1 rounded-lg"
                >
                  <span className=" text-xl max-sm:text-lg">{val.emoji}</span>{" "}
                  {val.catagory}
                </p>
              ))}
            </div>

            <div className=" ms-auto">
              {CategoryOpen ? (
                <IoIosArrowUp className=" text-2xl" />
              ) : (
                <IoIosArrowDown className=" text-2xl" />
              )}
            </div>
          </div>
          {CategoryOpen ? (
            <div className="mt-3">
              <ul className=" p-2 bg-purple-400 flex flex-col gap-2 max-sm:gap-1 rounded-xl">
                {catagory.map((val, index) => (
                  <CatagoryBtn
                    key={index}
                    val={val}
                    selectedCatagory={selectedCatagory}
                    handleSelected={handleSelected}
                  />
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="text-center mt-4">
          <button
            disabled={nameCountError || descriptionCountError ? true : false}
            type="submit"
            className={`${
              nameCountError || descriptionCountError
                ? "bg-purple-700 cursor-not-allowed text-purple-400"
                : "hover:bg-purple-800 text-white "
            } transition text-xl font-bold bg-purple-400 p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full`}
          >
            Create Task
          </button>
        </div>
      </form>

      {emptyInputError && (
        <div className=" max-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[10px] flex items-center gap-2 border-red-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
          <IoIosCloseCircle className=" text-2xl max-sm:text-xl text-red-500" />{" "}
          <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
            Please enter a task name
          </h2>
        </div>
      )}

      {maxSelectedError && (
        <div className=" max-sm:w-[320px] px-3 py-2 max-sm:px-2 max-sm:py-1 rounded-md bg-white border-l-[10px] flex items-center gap-2 border-red-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
          <IoIosCloseCircle className=" text-3xl max-sm:text-2xl text-red-500" />{" "}
          <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
            You cannot add more than 3 catagories
          </h2>
        </div>
      )}
    </div>
  );
};
export default FormInputs;
