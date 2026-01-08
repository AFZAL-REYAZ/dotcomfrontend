import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import {
  MdLocationOn,
  MdOutlineShoppingBag,
  MdArrowForwardIos,
  MdHelpOutline,
  MdQuestionAnswer,
  MdGavel,
  MdCall,
} from "react-icons/md";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto pt-20 pb-10 bg-gray-100 min-h-screen pt-4">

      {/* TOP: Back + Title */}
      <div className="flex items-center gap-3 px-4 mb-4">
        <button onClick={() => navigate(-1)} className="text-2xl text-gray-600 font-light">
          ←
        </button>
        <h2 className="text-gray-600 font-semibold">My Account</h2>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-sm mx-4 p-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <img
            src={
              user?.avatar
                ? user.avatar
                : `https://ui-avatars.com/api/?name=${(user?.name || "User").replace(
                    " ",
                    "+"
                  )}&background=0D8ABC&color=fff&size=100`
            }
            className="w-16 h-16 rounded-full border border-gray-200"
            alt="User Avatar"
          />

          {/* User Details */}
          <div>
            <p className="font-semibold text-gray-600 text-lg">{user ? user.name : "Guest User"}</p>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-600">{user?.mobile}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-4"></div>

        {/* HOME TAG */}
        <div className="flex justify-start">
  {user ? (
    <span
      className={`mt-2 px-4 py-1 text-sm rounded-full uppercase tracking-wider font-semibold ${
        user.role === "admin"
          ? "bg-green-100 text-green-700 border border-green-300"
          : "bg-blue-100 text-blue-700 border border-blue-300"
      }`}
    >
      {user.role}
    </span>
  ) : (
    <span className="mt-2 px-4 py-1 text-sm rounded-full bg-gray-100 text-gray-400 border">
      Not Logged In
    </span>
  )}
</div>

      </div>

      {/* OPTIONS ROW */}
      <div className="bg-white rounded-2xl shadow-sm mx-4 mt-4 p-4 grid grid-cols-2 gap-3">
        <div
          className="flex flex-col items-center py-3 border-r border-gray-200 cursor-pointer"
          onClick={() => navigate("/saved-addresses")}
        >
          <MdLocationOn className="text-2xl text-gray-700" />
          <span className="mt-2 text-sm text-gray-600 font-medium">Manage Address</span>
        </div>
        <div
          className="flex flex-col items-center py-3 cursor-pointer"
          onClick={() => navigate("/my-orders")}
        >
          <MdOutlineShoppingBag className="text-2xl text-gray-700" />
          <span className="mt-2 text-sm text-gray-600 font-medium">My Orders</span>
        </div>
      </div>

      {/* REWARDS CARD */}
      <div className="bg-white rounded-2xl shadow-sm mx-4 mt-4 p-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Rewards</p>
          <MdArrowForwardIos className="text-gray-400 text-sm" />
        </div>

        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm">Available Reward Points</p>
          <span className="text-xl">🪙</span> <span className="font-semibold text-gray-600 text-lg">
            {user?.rewardCoins ?? 0}
          </span>

          <div className="flex justify-between text-blue-500 text-sm mt-3">
            <button>How to earn</button>
            <button>How to redeem</button>
          </div>
        </div>
      </div>

      {/* MORE SECTION */}
      <div className="bg-white rounded-2xl shadow-sm mx-4 mt-4 p-2">
        <p className="px-4 py-3 font-semibold text-gray-700">More</p>

        {[
          // { label: "Notification Center", icon: <MdNotificationsNone />, path: "/change-password", },
          { label: "Help and Support", icon: <MdHelpOutline />, path: "/contact-us", },
          { label: "Change Password", icon: <MdQuestionAnswer />, path: "/change-password", },
          { label: "Saved-Addresses", icon: <MdQuestionAnswer />, path: "/saved-addresses", },
          { label: "Terms & conditions", icon: <MdGavel />, path: "/terms-conditions", },
          { label: "Get in touch", icon: <MdCall />, path: "/contact-us", },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center px-4 py-3 border-t cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <MdArrowForwardIos className="text-gray-400 text-sm" />
          </div>
        ))}
      </div>

      {/* LOGOUT BUTTON */}
      <div className="mx-4 mt-6">
  {user ? (
    <button
      onClick={handleLogout}
      className="w-full py-3 rounded-xl bg-red-50 border border-red-200 
                 text-red-700 font-semibold shadow-sm
                 hover:bg-red-100 transition-all"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => navigate("/login")}
      className="w-full py-3 rounded-xl bg-indigo-600 
                 text-white font-semibold shadow-sm
                 hover:bg-indigo-700 transition-all"
    >
      Login
    </button>
  )}
      </div>

    </div>
  );
};

export default UserProfile;
