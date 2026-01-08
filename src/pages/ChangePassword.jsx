import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setIsError(false);
    setLoading(true);

    try {
      const res = await axiosInstance.put(
        "/useroutes/change-password",
        form
      );

      setMsg(res.data.message || "Password updated successfully");
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setIsError(true);
      setMsg(
        err.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-6">

        {/* HEADER */}
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-black text-white rounded-full">
            <Lock size={18} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Change Password
          </h2>
        </div>

        {/* MESSAGE */}
        {msg && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded-lg ${
              isError
                ? "bg-red-50 text-red-600 border border-red-100"
                : "bg-green-50 text-green-700 border border-green-100"
            }`}
          >
            {msg}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* CURRENT PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-black focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Create a new password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-black focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 6 characters
            </p>
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
