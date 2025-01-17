import React, { lazy, Suspense } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import {
  Bar,
  Line,
  Pie,
  Doughnut,
  PolarArea,
  Radar,
  Scatter,
  Bubble,
} from "react-chartjs-2";
import { useGetAllTasks } from "../../../hooks/useGetAllTask";
import { Link, useParams } from "react-router-dom";
import MyTask from "../../MyTask";
import { useGetProfile } from "../../../hooks/useGetProfile";

const WorkerDashBoard = () => {
  const calculateDaysLeft = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDifference = dueDateObj - currentDate;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
  };
  defaults.maintainAspectRatio = false;
  defaults.responsive = true;
  defaults.plugins.title.display = true;
  defaults.plugins.title.text = "";
  defaults.plugins.title.align = "start";
  defaults.plugins.title.font.size = 24;
  defaults.plugins.title.color = "black";
  const { id } = useParams();

  const { profile: user } = useGetProfile();
  const { myTasks, isLoading, isError, error, status } = useGetAllTasks(id);

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  if (isError)
    return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <>
      <div className="bg-gray-50 min-h-[40vh] p-8">
        {user?.user?.role === "admin" && (
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-indigo-700">
              Admin Dashboard
            </h1>
            <Link
              to="create-work"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Add Task
            </Link>
          </div>
        )}

        <div className=" min-h-[40vh]">
          {myTasks?.task?.length > 0 ? (
            <Line
              data={{
                labels: myTasks?.task?.map((task) => task?.title),
                datasets: [
                  {
                    label: `My Tasks  `,
                    data: myTasks?.task?.map((task) =>
                      calculateDaysLeft(task?.dueDate)
                    ),
                    fill: true,
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 106, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                  },
                ],
              }}
            />
          ) : (
            <p className="text-center text-lg">No Task Found</p>
          )}
        </div>
      </div>
      <div className="p-4">
        <MyTask />
      </div>
    </>
  );
};

export default WorkerDashBoard;
