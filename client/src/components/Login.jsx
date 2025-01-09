import React from "react";
import { Link } from "react-router-dom";
import { useLoginUser } from "../hooks/useLogin";
import InputField from "./InputField";

const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    error,
    isError,
    onSubmit,
    status
  } = useLoginUser();


  console.log(status);

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Backdrop Filter Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg z-0"></div>

      {/* Login Form */}
      <form
        
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg md:max-w-md sm:max-w-sm p-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl relative z-10"
      >
        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Welcome Back!
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <InputField
            {...register("email", { required: "Email is required" })}
            label="Email"
            placeholder="Enter your email"
            type="email"
            error={errors.email?.message}
            disabled={status === "pending"}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <InputField
            {...register("password", { required: "Password is required" })}
            label="Password"
            placeholder="Enter your password"
            type="password"
            disabled={status === "pending"}
            icon
            error={errors.password?.message}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={status === "pending"}
            className="w-full px-6 py-2 bg-blue-600 text-white text-lg rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
          >
            {status === "pending" ? "Loading..." : "Login"}
          </button>
        </div>

        {/* Error Message */}
        {isError && (
          <div className="mt-4 text-center text-red-500 text-sm">
            <p>{error?.response?.data?.message || "Something went wrong!"}</p>
          </div>
        )}

        {/* Already Have an Account Section */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
