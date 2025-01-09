import React from "react";
import { Link } from "react-router-dom";
import InputField from "./InputField";
import { useRegister } from "../hooks/useRegister";

const RegisterUser = () => {
  const {
    isLoading,
    isError,
    error,
    register,
    handleSubmit,
    errors,
    onSubmit,
    status,
  } = useRegister();

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
      {/* Backdrop Filter Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-lg z-0"></div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-[#f5f5f5] dark:bg-gray-800 rounded-2xl shadow-2xl relative z-10"
      >
        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Register User
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <InputField
            type="text"
            label="Name"
            placeholder="Enter your name"
            autoComplete="name"
            disabled={status === "pending"}
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            disabled={status === "pending"}
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <InputField
            type="password"
            icon
            placeholder="Enter your password"
            autoComplete="new-password"
            disabled={status === "pending"}
            label="Password"
            error={errors.password?.message}
            {...register("password", { required: "Password is required" })}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            disabled={status === "pending"}
            type="submit"
            className="w-full px-6 py-2 bg-blue-500 text-white text-md rounded-lg shadow hover:bg-blue-600 focus:outline-none transition-all duration-300"
          >
            {status === "pending" ? "Loading..." : "Register"}
          </button>
        </div>

        {/* Error Message */}
        {isError && (
          <div className="mt-4 text-center text-red-500">
            <p>{error?.response?.data?.message || "Something went wrong"}</p>
          </div>
        )}

        {/* Already Have Account Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
