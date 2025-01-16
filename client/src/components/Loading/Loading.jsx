import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div class="relative flex justify-center items-center">
        <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-500"></div>
      </div>
    </div>
  );
};

export default Loading;
