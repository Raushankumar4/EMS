import { useQuery } from "@tanstack/react-query";
import AdminServices from "../components/Axios/AdminServices";
import { useDispatch } from "react-redux";
import { setUsers } from "../Redux/Slice/userSlice";
import { useEffect } from "react";

export const useGetAllWorkers = () => {
  const dispatch = useDispatch();
  const {
    data: allWorker,
    isError,
    isLoading,
    error,
    status,
  } = useQuery({
    queryKey: ["wokers"],
    queryFn: AdminServices.getAllEmployes,
    staleTime: 0,
    cacheTime: 0,
    enabled: true,
    onSuccess: (data) => {
      console.log(data);
    },

    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (allWorker) {
      dispatch(setUsers({ allUsers: allWorker?.user }));
      console.log("All users:", allWorker?.user)
    }
  }, [allWorker, dispatch]);

  return { allWorker, isError, isLoading, error, status };
};
