import React, { useState, useEffect, memo } from "react";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMarkAsCompleted } from "../hooks/useMarkAsCompleted";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";

const MyTask = memo(() => {
  const { mutate: deleteTask, isLoading } = useDeleteTask();
  const { mutate: markAsCompleted } = useMarkAsCompleted();
  const { updateWorkStatus } = useUpdateTaskStatus();
  const { profile: user, allTasks: myTasks } = useSelector(
    (state) => state.user
  );

  const calculateDaysLeft = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDifference = dueDateObj - currentDate;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const calculateTimeLeft = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDifference = dueDateObj - currentDate;

    // If 1 day is left, calculate hours and minutes
    if (timeDifference > 0 && timeDifference <= 1000 * 60 * 60 * 24) {
      const hoursLeft = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutesLeft = Math.floor((timeDifference / (1000 * 60)) % 60);
      return { hoursLeft, minutesLeft };
    }

    return null;
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8">
      {myTasks?.length > 0 ? (
        myTasks?.map((task) => {
          const daysLeft = calculateDaysLeft(task?.dueDate);
          const timeLeft = calculateTimeLeft(task?.dueDate);

          return (
            <div
              key={task?._id}
              className="bg-white shadow-2xl p-8 rounded-xl border border-gray-200 flex flex-col sm:flex-row-reverse space-y-6 sm:space-y-0 sm:space-x-6 transition-transform transform "
            >
              {/* Right Section - Task Actions (on the left side for RTL) */}
              <div className="flex mx-4 flex-col space-y-4 w-full sm:w-1/3 bg-gradient-to-b from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-white">
                  {task?.status === "completed"
                    ? "Congratulations You Have Completed The Task"
                    : daysLeft === 0
                    ? "Overdue ❌"
                    : `Days Left : ${daysLeft}`}
                </h2>
                {task?.status === "in-progress" ||
                task?.status === "completed" ? (
                  <button
                    disabled={daysLeft === 0}
                    onClick={() => markAsCompleted(task?._id)}
                    className={`w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 ${
                      daysLeft === 0
                        ? "line-through opacity-80 bg-red-600 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {daysLeft === 0
                      ? "You are up to date 😢"
                      : task?.status === "completed"
                      ? "Mark As Incomplete "
                      : "Mark As Completed "}
                  </button>
                ) : (
                  task?.status === "pending" && (
                    <button
                      disabled={daysLeft === 0}
                      onClick={() => updateWorkStatus(task?._id)}
                      className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 ${
                        daysLeft === 0
                          ? "line-through opacity-80 bg-red-600 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Start Work
                    </button>
                  )
                )}

                {task?.status === "completed" ? (
                  <div className="flex flex-col space-y-4 bg-green-100 p-4 rounded-lg border border-green-500 shadow-lg">
                    <h1 className="text-xl font-semibold text-green-700">
                      🎉 You Have Completed The Task!
                    </h1>
                    <p className="text-md text-green-600">
                      Congratulations on finishing the task. Keep up the great
                      work!
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <button
                      disabled={
                        task?.status === "completed" ||
                        daysLeft === 0 ||
                        task?.status === "pending"
                      }
                      onClick={() => updateWorkStatus(task?._id)}
                      className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 text-center
                ${
                  task?.status === "completed" || daysLeft === 0
                    ? "line-through opacity-80 bg-red-600 cursor-not-allowed"
                    : ""
                }`}
                    >
                      Update Work Status : {task?.status.toUpperCase()}
                    </button>
                    <button
                      disabled={task?.status === "completed" || daysLeft === 0}
                      className={`w-full px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition-colors duration-300 ${
                        task?.status === "completed" || daysLeft === 0
                          ? "line-through opacity-80 bg-red-600 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {daysLeft === 0
                        ? "Overdue"
                        : daysLeft === 1
                        ? `Time Left : ${timeLeft.hoursLeft}h ${timeLeft.minutesLeft}m`
                        : `Days Left : ${daysLeft}`}
                    </button>
                  </div>
                )}
              </div>

              {/* Left Section - Task Details (on the right side for RTL) */}
              <div className="flex flex-col space-y-4 w-full sm:w-2/3 bg-gray-100 p-6 rounded-xl shadow-lg">
                {/* Action Buttons at the Top */}
                {user?.role === "admin" && (
                  <div className="flex space-x-4">
                    {/* Delete Task Button */}
                    <button
                      onClick={() =>
                        confirm("Are you sure you want to delete this task?") &&
                        deleteTask(task?._id)
                      }
                      disabled={isLoading}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md disabled:opacity-50 transition-colors duration-300 hover:bg-red-700"
                    >
                      {isLoading ? "Deleting..." : "Delete"}
                    </button>

                    {/* Edit Task Button */}
                    <Link
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700"
                      to={`/update-work/${task?._id}`}
                    >
                      Edit
                    </Link>
                  </div>
                )}

                {/* Task Details */}
                <p className="text-lg font-semibold text-gray-800">
                  <strong>Task: </strong> {task?.title}
                </p>
                <p className="text-md text-gray-700">
                  <strong>Description: </strong> {task?.description}
                </p>
                <p className="text-md text-gray-700">
                  <strong>Status: </strong> {task?.status}
                </p>
                <p className="text-md text-gray-700">
                  <strong>Days Left: </strong>{" "}
                  {daysLeft > 0
                    ? `${daysLeft} days`
                    : daysLeft === 0
                    ? "Due today"
                    : `${Math.abs(daysLeft)} days overdue`}
                </p>

                {/* Created Date at the Bottom in Small Text */}
                <h1 className="text-sm text-gray-500 mt-4">
                  <strong>Task Assign Date: </strong>
                  {formatDate(task?.createdAt)}
                </h1>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-lg text-gray-600">No tasks found</p>
      )}
    </div>
  );
});

export default MyTask;
