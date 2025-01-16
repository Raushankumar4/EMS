import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import AdminServices from "../components/Axios/AdminServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCreateWorkForEmploye = (id) => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { mutate, isLoading, error, status, isError } = useMutation({
    mutationFn: (data) => AdminServices.ctreateWorKForEmplpyees(id, data),

    onSuccess: (data) => {
      toast.success(data?.message || "Task created successfully!");
      navigate(-1)
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onSubmit = (data) => {
    try {
      mutate(data,{
        onSuccess: () => {
          reset();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    errors,
    register,
    handleSubmit,
    reset,
    onSubmit,
    isLoading,
    error,
    status,
    isError,
  };
};
