import React, { useEffect } from "react";
import { useGetAllWorkers } from "../../hooks/useGetAllWorker";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";


const GetAllWorker = () => {
  const navigate = useNavigate();
  const { allWorker, isError, isLoading, error, status } = useGetAllWorkers();

  if (isError) {
    return <p className="text-center text-lg text-red-500">{error.message}</p>;
  }

  const handleNavigate = (id) => {
    navigate("/worker-dashboard/" + id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg space-y-4 p-4">
          <Skeleton className="w-full h-24 rounded-lg" />
          <Skeleton className="w-full h-24 rounded-lg" />
          <Skeleton className="w-full h-24 rounded-lg" />
          <Skeleton className="w-full h-24 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allWorker?.user?.length > 0 ? (
          allWorker?.user?.map((worker) => (
            <div
              key={worker._id}
              className="bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center space-x-6 mb-6">
                {/* Profile Image */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-indigo-500">
                  <img
                    src="https://via.placeholder.com/150"
                    alt={worker?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Worker Details */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {worker?.name}
                  </h3>
                  <p className="text-lg text-gray-600">{worker?.email}</p>
                  <p className="text-sm text-gray-500">
                    Job Title: {worker?.jobTitle || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Department: {worker?.department || "N/A"}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between space-x-4 mt-auto">
                <button
                  onClick={() => handleNavigate(worker?._id)}
                  className="flex-1 px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition duration-300"
                >
                  Assign Work
                </button>
                <button className="flex-1 px-6 py-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none transition duration-300">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">No workers found</p>
        )}
      </div>
    </div>
  );
};

export default GetAllWorker;
