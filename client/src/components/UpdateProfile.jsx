import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EmployeeServices from "./Axios/EmployeeServices";
import MyForm from "./MyForm";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: EmployeeServices.updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const onSubmit = (data, reset) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="pt-10">
      <MyForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};

export default UpdateProfile;
