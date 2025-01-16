import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DarKMode from "./DarKMode";
import { useSelector } from "react-redux";
import { Logout } from "./Logout";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const HandleLogout = Logout();

  return (
    <nav className="sticky top-0 z-50 bg-white text-black capitalize font-semibold shadow-md w-full">
      {/* Mobile Hamburger Button */}
      <div className="flex justify-between items-center p-4 lg:hidden">
        <button
          className="focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className={`w-8 h-8 transform transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <DarKMode />
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 text-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link onClick={toggleMenu} to="/" className="hover:text-blue-300">
          Home
        </Link>
        <Link
          onClick={toggleMenu}
          to="/services"
          className="hover:text-blue-300"
        >
          Services
        </Link>
        <Link
          onClick={toggleMenu}
          to="/contact"
          className="hover:text-blue-300"
        >
          Contact
        </Link>
        {!isAuthenticated ? (
          <>
            <Link
              onClick={toggleMenu}
              to="/login"
              className="hover:text-blue-300"
            >
              Login
            </Link>
            <Link
              onClick={toggleMenu}
              to="/register"
              className="hover:text-blue-300"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              HandleLogout();
              toggleMenu();
            }}
            className="text-red-500 hover:text-red-300"
          >
            Logout
          </button>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex justify-between items-center px-8 py-4 w-full">
        <h1 onClick={handleNavigate} className="text-2xl cursor-pointer font-bold text-blue-600">
          Employee Management
        </h1>
        <div className="flex items-center space-x-6">
          <DarKMode />
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-200 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-blue-200 transition-all duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <div onClick={() => setShow(!show)} className="cursor-pointer">
                <img
                  className="w-7 h-7 rounded-full"
                  src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                  alt="User"
                />
              </div>
              <div
                className={`absolute right-0 mt-2 py-2 w-32 bg-white shadow-lg rounded-lg transition-opacity duration-300 ease-in-out ${
                  show ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <Link
                  onClick={() => setShow(false)}
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  onClick={() => setShow(false)}
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    HandleLogout();
                    setShow(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
