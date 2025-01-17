import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import EmployeeServices from "../components/Axios/EmployeeServices";

export const useMarkAsCompleted = () => {
  const query = useQueryClient();
  const { mutate, isLoading, isError, error, status } = useMutation({
    mutationFn: (id) => EmployeeServices.markAsCompleted(id),
    onSuccess: (data) => {
      console.log(data);
      query.invalidateQueries({ queryKey: ["myTask"] });
      toast.success(data?.message || "Task created successfully!");
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { mutate, isLoading, isError, error, status };
};
