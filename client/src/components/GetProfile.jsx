import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import EmployeeServices from "./Axios/EmployeeServices";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { setProfile } from "../Redux/Slice/userSlice";

const GetProfile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile", isAuthenticated],
    queryFn: EmployeeServices.getProfile,
    staleTime: 0,
    cacheTime: 0,
    enabled: isAuthenticated,
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data),
  });

  useEffect(() => {
    if (profile?.user) {
      dispatch(setProfile(profile?.user));
    }
  }, [profile, dispatch]);

  if (isLoading) {
    return (
      <div className="p-6 max-w-md mx-auto space-y-4">
        {isAuthenticated &&
          Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={100} width={{ max: 400 }} />
            ))}
      </div>
    );
  }

  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <div className="min-h-screen pt-10  bg-gray-100 dark:bg-gray-900">
        {isAuthenticated && profile?.user && (
          <div className="max-w-xl  mx-auto p-10 bg-gray-100 rounded-lg shadow-md space-y-6">
            <h3 className="text-center text-4xl font-bold text-indigo-700 mb-6">
              User Profile
            </h3>
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                alt={profile?.user?.name}
                className="w-24 h-24 rounded-full border-4 border-indigo-500"
              />
            </div>
            <div className="space-y-4">
              <ul className="space-y-2 text-lg text-gray-800">
                <li className="flex space-x-4">
                  <span className="font-medium text-indigo-600">Name:</span>
                  <span className="text-gray-900">{profile?.user?.name}</span>
                </li>
                <li className="flex space-x-4">
                  <span className="font-medium text-indigo-600">
                    Job Title:
                  </span>
                  <span className="text-gray-900">
                    {profile?.user?.jobTitle ||
                      (profile?.user?.role === "admin" && "Admin") ||
                      "Please add job title"}
                  </span>
                </li>
                <li className="flex space-x-4">
                  <span className="font-medium text-indigo-600">
                    Department:
                  </span>
                  <span className="text-gray-900">
                    {profile?.user?.department ||
                      (profile?.user?.role === "admin" && "Admin") ||
                      "Please add department"}
                  </span>
                </li>
                <li className="flex space-x-4">
                  <span className="font-medium text-indigo-600">Role:</span>
                  <span className="text-gray-900">{profile?.user?.role}</span>
                </li>
                <li className="flex space-x-4">
                  <span className="font-medium text-indigo-600">Email:</span>
                  <span className="text-gray-900">{profile?.user?.email}</span>
                </li>
              </ul>
              <Link
                to="/updateProfile"
                className="w-full mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-center block"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GetProfile;
