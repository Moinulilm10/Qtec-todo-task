import { useParams } from "react-router-dom";
import TopNav from "../Utils/TopNav";
import PageNotFound from "./PageNotFound";

const TaskDetails = () => {
  const { id } = useParams();
  const items = JSON.parse(localStorage.getItem("todoItems"));

  const details = items.find((val) => val.id.toString() === id);
  console.log("🚀 ~ TaskDetails ~ details:", details);

  if (!details) {
    return <PageNotFound />;
  }

  return (
    <div className=" w-full relative min-h-screen bg-purple-600">
      <div className=" max-w-[1300px] px-10 max-md:px-5 m-auto">
        <div>
          <TopNav title={"Task Details"} />

          <div className=" rounded-2xl bg-purple-700 max-w-[600px] m-auto mt-16 py-10 px-8 max-sm:p-5 text-white">
            <h1 className=" text-center text-4xl max-sm:text-2xl font-bold">
              Task
            </h1>

            <div className=" mt-8">
              <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-base min-w-28">
                  Task Name:
                </h2>
                <p className=" text-left text-base max-sm:text-sm font-normal">
                  {details.title}
                </p>
              </div>

              <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-base min-w-28">
                  Description:
                </h2>
                <p className="text-left text-base max-sm:text-sm font-normal">
                  {details.description ? details.description : "-"}
                </p>
              </div>

              <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-base min-w-28">
                  Priority:
                </h2>
                <p className="text-left text-base max-sm:text-sm font-normal">
                  {details.priority}
                </p>
              </div>

              <div className="text-xl max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className=" text-left text-lg max-sm:text-base min-w-28">
                  Created:
                </h2>
                <p className="text-left text-base max-sm:text-sm font-normal">
                  {details.currentTime}
                </p>
              </div>

              <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-base min-w-28">
                  Complete:
                </h2>
                <p className=" text-left text-base max-sm:text-sm font-normal">
                  {details.check ? "Completed" : "Not completed"}
                </p>
              </div>

              <div className="max-sm:text-base font-semibold flex gap-4 items-center pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-base min-w-28">
                  Catagory:
                </h2>

                <div className="flex flex-wrap gap-3">
                  {details.catagory.map((val, index) => (
                    <p
                      className="text-left text-base bg-purple-600 rounded-2xl px-3 py-1 max-sm:text-sm font-normal"
                      key={index}
                    >
                      <span className=" text-xl max-sm:text-lg">
                        {val.emoji}
                      </span>{" "}
                      {val.catagory}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
