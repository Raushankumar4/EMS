import React from "react";
import InputField from "../../InputField";
import { useCreateWorkForEmploye } from "../../../hooks/useCreateWork";
import { useParams } from "react-router-dom";

const AssignWork = () => {
  const { id } = useParams();

  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isLoading,
    error,
    status,
    isError,
  } = useCreateWorkForEmploye(id);

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  if (isError)
    return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="pt-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <InputField
            label="Work Name"
            error={errors.title?.message}
            placeholder="Enter Work Name"
            {...register("title", { required: "Title is required!" })}
          />
        </div>
        <div>
          <InputField
            label="Description"
            error={errors.description?.message}
            placeholder="Enter Description"
            {...register("description", {
              required: "Description is required!",
            })}
          />
        </div>
        <div>
          <InputField
            label="DeadLine"
            placeholder="Enter due date"
            type="date"
            {...register("dueDate", { required: "Due date is required" })}
            error={errors.dueDate?.message}
          />
        </div>
        <div className="text-center">
          <button
            disabled={status === "pending"}
            className="bg-gray-400 py-2 px-6 rounded-lg text-white disabled:opacity-50"
            type="submit"
          >
            {status === "pending" ? "Assigning..." : "Assign Work"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignWork;
