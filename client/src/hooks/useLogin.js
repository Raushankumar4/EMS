// import { useState } from "react";
// import axios from "axios";
// import { loginUrl } from "../constant";
// import toast from "react-hot-toast";

// export const useLogin = () => {
//   const [userData, setUserData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleLoginuser = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/v1/user/login",
//         { userData }
//       );
//       toast.success(data.message);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
//   return { userData, handleOnChange, handleLoginuser };
// };

// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { loginUrl } from "../constant";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../Redux/Slice/authSlice";
// import { useNavigate } from "react-router-dom";
// export const useLoginUser = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${loginUrl}/login`, data);
//       dispatch(loginUser({ token: response?.data?.token }));
//       toast.success(response?.data?.message);
//       navigate("/home");
//       reset();
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//     }
//   };
//   return { register, handleSubmit, errors, reset, onSubmit };
// };
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import EmployeeServices from "../components/Axios/EmployeeServices";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";

export const useLoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isLoading, error, status, isError } = useMutation({
    mutationFn: EmployeeServices.loginUser,
    onSuccess: (data) => {
      dispatch(loginUser({ token: data?.token }));
      toast.success(data?.message || "User registered successfully!");
      navigate("/");
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
    register,
    handleSubmit,
    errors,
    isLoading,
    error,
    isError,
    onSubmit,
    status,
  };
};
