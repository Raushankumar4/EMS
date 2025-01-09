// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { loginUrl } from "../constant";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { useState } from "react";

// export const useRegister = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post(`${loginUrl}/register`, data);
//       toast.success(response?.data?.message);
//       navigate("/login");
//       reset();
//       setIsLoading(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//       console.log(error);
//       setIsLoading(false);
//     }
//   };
//   return { register, handleSubmit, errors, reset, isLoading, onSubmit };
// };

import { useMutation } from "@tanstack/react-query";
import EmployeeServices from "../components/Axios/EmployeeServices";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isLoading, error, isError, status } = useMutation({
    mutationFn: EmployeeServices.registerUser,
    onSuccess: (data) => {
      toast.success(data?.message || "User registered successfully!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (data) => {
    try {
      mutate(data);
    } catch (error) {
      console.log(error);
    }
    if (status === "success" || status === "error") {
      reset();
    }
  };
  return {
    isLoading,
    isError,
    error,
    register,
    handleSubmit,
    errors,
    onSubmit,
    status,
  };
};
