import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; 

const DarKMode = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", darkMode);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("darkMode");
    }
  }, [darkMode]);

  const handleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <div>
      <button
        onClick={handleDarkMode}
        className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-200 rounded transition-colors"
      >
        {darkMode ? (
          <FaMoon className="text-blue-500" />
        ) : (
          <FaSun className="text-yellow-500" />
        )}
      </button>
    </div>
  );
};

export default DarKMode;
