import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; 

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out', 
      once: false, 
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      {/* Hero Section */}
      <section
        className="flex  flex-col items-center justify-center text-center py-20 px-6"
        data-aos="fade-down" 
      >
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Empower Your Workforce
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          A comprehensive solution for managing employees, boosting
          productivity, and achieving organizational excellence.
        </p>
        <Link
          to="/dashboard"
          className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
          data-aos="fade-up" // Added AOS effect
        >
          Explore Dashboard
        </Link>
      </section>

      {/* Key Metrics Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900 text-center">
        <h2 className="text-4xl font-semibold mb-12" data-aos="fade-up">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="p-8 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-md"
            data-aos="fade-up"
          >
            <h3 className="text-3xl font-bold">800+</h3>
            <p className="text-lg">Employees Managed</p>
          </div>
          <div
            className="p-8 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-md"
            data-aos="fade-up"
          >
            <h3 className="text-3xl font-bold">60+</h3>
            <p className="text-lg">Active Projects</p>
          </div>
          <div
            className="p-8 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-md"
            data-aos="fade-up"
          >
            <h3 className="text-3xl font-bold">98%</h3>
            <p className="text-lg">Retention Rate</p>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-16 px-6 bg-blue-100 dark:bg-gray-800">
        <h2 className="text-4xl font-semibold text-center mb-12" data-aos="fade-up">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div
            className="p-6 border-l-4 border-blue-500 rounded-lg bg-white dark:bg-gray-700 shadow-lg"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-semibold mb-3">
              Streamlined Operations
            </h3>
            <p className="text-md">
              Efficient tools to manage employee records, tasks, and performance
              seamlessly.
            </p>
          </div>

          <div
            className="p-6 border-l-4 border-blue-500 rounded-lg bg-white dark:bg-gray-700 shadow-lg"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-semibold mb-3">Data Security</h3>
            <p className="text-md">
              Ensure maximum security with encrypted databases and secure access
              control.
            </p>
          </div>

          <div
            className="p-6 border-l-4 border-blue-500 rounded-lg bg-white dark:bg-gray-700 shadow-lg"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-semibold mb-3">
              Intelligent Insights
            </h3>
            <p className="text-md">
              Real-time analytics and dashboards to monitor productivity and
              growth.
            </p>
          </div>
        </div>
      </section>
      {/* Testimonial Section */}
      <section className="p-10 bg-blue-50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
          What Our Clients Say
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div
            className="max-w-md bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
            data-aos="fade-up"
          >
            <p className="italic">
              "This system has transformed our workforce management. Highly
              recommended!"
            </p>
            <h4 className="font-bold mt-4">- John Doe, HR Manager</h4>
          </div>
          <div
            className="max-w-md bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
            data-aos="fade-up"
          >
            <p className="italic">
              "A must-have tool for every business! Simplifies employee tracking
              immensely."
            </p>
            <h4 className="font-bold mt-4">- Jane Smith, CEO</h4>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="text-center py-8 bg-blue-700 text-white">
        <p>
          &copy; {new Date().getFullYear()} Employee Management System | All
          Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Home;
