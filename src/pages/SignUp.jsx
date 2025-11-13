import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    try{
        const res=axios.post("https://dotcombackend.onrender.com/api/useroutes/signup",formData);
        if(res.status===200 || res.status===201){
            alert("Signup Successfully");
            setFormData({name:"", email:"",password:""});
        }
    }catch(err){
        console.error("Signup error:", err);
      alert(
        err.response?.data?.message ||
          "❌ Signup failed. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full text-black rounded-md border border-gray-300 p-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
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
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full text-black rounded-md border border-gray-300 p-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-md font-semibold hover:bg-gray-900 transition"
          >
            Sign Up
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
