// src/pages/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice"; // ⭐ Redux action

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ⭐ Initialize Redux dispatch

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://dotcombackend.onrender.com/api/useroutes/login",
        formData
      );

      if (res.status === 200) {
        alert("Login Successful!");

        const { token, user } = res.data;

        // ⭐ Set axios token for future API calls
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // ⭐ Redux login action (saves to store + localStorage)
        dispatch(loginUser({ token, user }));

        // ⭐ Navigate without refresh
        navigate("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full text-black rounded-md border border-gray-300 p-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-black font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full text-black rounded-md border border-gray-300 p-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-md font-semibold transition ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
