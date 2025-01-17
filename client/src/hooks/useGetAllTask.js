import { useQuery } from "@tanstack/react-query";
import EmployeeServices from "../components/Axios/EmployeeServices";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setMyTasks } from "../Redux/Slice/taskSlice";
import { setALlTasks } from "../Redux/Slice/userSlice";

export const useGetAllTasks = (id) => {
  const dispatch = useDispatch();

  const {
    data: myTasks,
    isLoading,
    isError,
    error,
    status,
  } = useQuery({
    queryKey: ["myTask"],
    queryFn: () => EmployeeServices.getMyTask(id),
    enabled: !!id,
    staleTime: 0,
    gcTime: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    dispatch(setALlTasks(myTasks?.task));
  }, [dispatch, myTasks]);
  return { myTasks, isLoading, isError, error, status };
};
