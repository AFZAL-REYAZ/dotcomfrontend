import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-6">
      {/* Outer Card */}
      <div className="relative bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 
                      hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300">

        {/* ⭐ Coins Badge - Top Right */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 
                          px-4 py-2 rounded-full shadow-md border border-yellow-300">
            <span className="text-xl">🪙</span>
            <span className="font-semibold text-lg">{user?.rewardCoins || 0}</span>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[3px] animate-pulse"></div>

            <img
              src={
                user?.avatar && user.avatar.trim() !== ""
                  ? user.avatar
                  : `https://ui-avatars.com/api/?name=${(user?.name || "User")
                      .replace(" ", "+")}&background=0D8ABC&color=fff&size=150`
              }
              alt="Profile"
              className="relative w-32 h-32 rounded-full object-cover bg-white shadow-lg"
            />
          </div>

          {/* Name */}
          <h1 className="mt-4 text-3xl font-bold text-gray-900 tracking-wide">
            {user?.name}
          </h1>

          {/* Role Badge */}
          <span
            className={`mt-2 px-4 py-1 text-sm rounded-full uppercase tracking-wider font-semibold ${
              user?.role === "admin"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-blue-100 text-blue-700 border border-blue-300"
            }`}
          >
            {user?.role}
          </span>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Details */}
        <div className="space-y-4 text-center">
          <p className="text-gray-700 text-lg">
            <strong className="text-gray-900">Email:</strong> {user?.email}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/edit-profile")}
            className="w-full py-3 rounded-xl bg-gray-50 border border-gray-200 
                       text-gray-800 font-medium shadow-sm 
                       hover:bg-gray-100 hover:shadow-md transition-all duration-200"
          >
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/change-password")}
            className="w-full py-3 rounded-xl bg-gray-50 border border-gray-200 
                       text-gray-800 font-medium shadow-sm
                       hover:bg-gray-100 hover:shadow-md transition-all duration-200"
          >
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl bg-red-50 border border-red-200 
                       text-red-700 font-medium shadow-sm
                       hover:bg-red-100 hover:shadow-md transition-all duration-200"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
