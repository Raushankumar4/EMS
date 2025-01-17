import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import EmployeeServices from "../components/Axios/EmployeeServices";

export const useUpdateTaskStatus = () => {
  const query = useQueryClient();
  const { mutate: updateWorkStatus } = useMutation({
    mutationFn: (id) => EmployeeServices.updateTaskStatus(id),
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["myTask"] });
      console.log(data);
      
      toast.success( data?.message || "Task updated successfully");
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { updateWorkStatus };
};
