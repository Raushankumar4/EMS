import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <NavBar />
      <Outlet />
      <div
        onClick={scrollToTop}
        className="fixed cursor-pointer bottom-4 right-4  bg-blue-500 rounded-full h-14 w-14 text-center hover:bg-blue-600 text-white py-2 px-4 "
      >
        &uarr;
      </div>
    </div>
  );
};

export default App;
