import { useMutation, useQueryClient } from "@tanstack/react-query";
import AdminServices from "../components/Axios/AdminServices";
import toast from "react-hot-toast";


export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (id) => AdminServices.deleteTask(id), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTask"] });
      toast.success("Task deleted successfully");
    },
    onError: (err) => {
      console.error("Error deleting task: ", err);
      toast.error("Error deleting task");
    },
  });

  return { mutate, isLoading, isError, error };
};
