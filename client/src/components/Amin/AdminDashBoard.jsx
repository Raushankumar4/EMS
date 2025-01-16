import React, { useEffect } from "react";
import GetAllWorker from "./GetAllWorker";
import { useGetProfile } from "../../hooks/useGetProfile";
import { useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const { profile } = useGetProfile();
  if (profile?.user?.role !== "admin") {
     navigate("/");
  }
  
  return (
    <div>
      <GetAllWorker />
    </div>
  );
};

export default AdminDashBoard;
