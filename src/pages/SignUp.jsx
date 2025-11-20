// src/pages/Signup.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://dotcombackend.onrender.com/api/useroutes/signup",
        formData
      );

      if (res.status === 200 || res.status === 201) {
        alert("Signup Successful 🎉");
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMsg(
        err.response?.data?.message ||
          "❌ Signup failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        {errorMsg && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full text-black rounded-md border border-gray-300 p-2.5 focus:ring-2 focus:ring-black outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full text-black rounded-md border border-gray-300 p-2.5 focus:ring-2 focus:ring-black outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full text-black rounded-md border border-gray-300 p-2.5 focus:ring-2 focus:ring-black outline-none"
              placeholder="Create a password"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-md font-semibold transition ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;



