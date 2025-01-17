import React from "react";
import MyTask from "./MyTask";
import { useGetAllTasks } from "../hooks/useGetAllTask";
import { useSelector } from "react-redux";
import { useGetProfile } from "../hooks/useGetProfile";
import WorkerDashBoard from "./Amin/Work/WorkerDashBoard";

const EmployeDashBoad = () => {
  const { profile } = useGetProfile();
  const { profile: user, allTasks } = useSelector((state) => state.user);
  const id = user?._id;
  const { myTasks, isLoading, isError, error, status } = useGetAllTasks(id);

  return (
    <div>
      <WorkerDashBoard />
    </div>
  );
};

export default EmployeDashBoad;
