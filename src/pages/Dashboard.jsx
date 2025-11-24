import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-blue-100 via-sky-200 to-amber-100 flex flex-col items-center justify-center px-6 py-12 font-[Poppins] relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-150"></div>

      {/* Main content */}
      <div className="z-10 w-full max-w-4xl text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          📊 Admin Control Center
        </h2>
        <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
          Manage user activity dashboards effortlessly — monitor location data and reward statistics in real-time.
        </p>

        {/* Dashboard Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Location Dashboard */}
          <Link
            to="/location-dashboard"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-transparent hover:border-blue-500"
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-sky-500 text-white rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21.75c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.5v6l4 2"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 group-hover:text-blue-600">
                User Location Dashboard
              </h2>
              <p className="text-slate-500 text-sm">
                Track and analyze live user locations on an interactive map.
              </p>
            </div>
          </Link>
          {/* Reward Dashboard */}
          <Link
            to="/pay-with-reward"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-transparent hover:border-amber-500"
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 12h19.5m-19.5 0A2.25 2.25 0 0 1 4.5 9.75h15a2.25 2.25 0 0 1 2.25 2.25v6.75A2.25 2.25 0 0 1 19.5 21H4.5A2.25 2.25 0 0 1 2.25 18.75v-6.75z"
                  />
                </svg>

              </div>
              <h2 className="text-2xl font-semibold text-slate-800 group-hover:text-amber-600">
                Pay for Coins
              </h2>
              <p className="text-slate-500 text-sm">
                Pay securely and earn bonus rewards in coins instantly.
              </p>
            </div>
          </Link>
          {/* Reward Dashboard */}
          <Link
            to="/reward-dashboard"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-transparent hover:border-amber-500"
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8.25v7.5m3.75-3.75h-7.5M12 3.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 group-hover:text-amber-600">
                User Reward Dashboard
              </h2>
              <p className="text-slate-500 text-sm">
                Manage reward records, balances, and performance reports easily.
              </p>
            </div>
          </Link>

          <Link
            to="/addproduct"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-transparent hover:border-amber-500"
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8.25v7.5m3.75-3.75h-7.5M12 3.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 group-hover:text-amber-600">
                Add Product
              </h2>
              <p className="text-slate-500 text-sm">
                Manage reward records, balances, and performance reports easily.
              </p>
            </div>
          </Link>
          {/* Reward Dashboard */}
          <Link
            to="/user-management"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-transparent hover:border-amber-500"
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8.25v7.5m3.75-3.75h-7.5M12 3.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 group-hover:text-amber-600">
                User Management Dashboard
              </h2>
              <p className="text-slate-500 text-sm">
                Manage User records.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
