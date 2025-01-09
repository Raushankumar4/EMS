import React from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { useSelector } from "react-redux";

const MyForm = ({ onSubmit, isLoading }) => {
  const user = useSelector((state) => state.user.profile);
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      jobTitle: user?.jobTitle || "",
      department: user?.department || "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data, reset);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 p-8 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h2>

      <InputField
        type="text"
        label="Name"
        placeholder="Enter your name"
        error={errors.name?.message}
        className="w-full"
        {...register("name", {
          required: "Name is required",
          minLength: { value: 3, message: "Minimum length is 3 characters" },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Only alphabets and spaces are allowed",
          },
        })}
      />

      <InputField
        type="email"
        label="Email"
        error={errors.email?.message}
        placeholder="Enter your email"
        className="w-full"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        })}
      />

      <InputField
        label="Job Title"
        error={errors.jobTitle?.message}
        placeholder="Enter your job title"
        className="w-full"
        {...register("jobTitle", {
          required: "Job Title is required",
        })}
      />

      <InputField
        label="Department"
        error={errors.department?.message}
        placeholder="Enter your department"
        className="w-full"
        {...register("department", {
          required: "Department is required",
        })}
      />

      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default MyForm;
