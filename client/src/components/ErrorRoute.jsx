import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorRoute = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Oops, something went wrong
      </h1>
      {error.error && (
        <>
          <p className="text-lg text-gray-700">{error.error.message}</p>
          <pre className="bg-gray-200 p-4 rounded-md shadow-md my-2">
            <code>{error.error.stack}</code>
          </pre>
        </>
      )}
      <p className="text-sm text-gray-500">{error.status}</p>
      <p className="text-sm text-gray-500">{error.statusText}</p>
    </div>
  );
};

export default ErrorRoute;
