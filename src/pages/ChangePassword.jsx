import React, { useState } from "react";
import axios from "axios";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await axios.put(
        "https://dotcombackend-xu8o.onrender.com/api/useroutes/change-password",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMsg(res.data.message);
      setForm({ oldPassword: "", newPassword: "" });

    } catch (err) {
      setMsg(
        err.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-600">
          Change Password
        </h2>

        {msg && (
          <p className="text-center text-sm mb-3 text-red-600 text-gray-600">
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Current Password"
            value={form.oldPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded text-gray-600"
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded text-gray-600"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
