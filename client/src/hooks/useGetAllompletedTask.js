import { useQuery } from "@tanstack/react-query";
import AdminServices from "../components/Axios/AdminServices";

export const useGetAllCompletedTask = () => {
  const {
    data: completedTask,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["completedTask"],
    queryFn: AdminServices.getAllCompletedTask,
    staleTime: 0,
    gcTime: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { completedTask, error, isError, isLoading };
};
