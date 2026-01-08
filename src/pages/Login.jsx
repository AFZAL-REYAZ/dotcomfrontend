import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import { loginUser } from "../redux/slices/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post(
        "/useroutes/login",
        formData
      );

      const { token, user } = res.data;

      // Save token
      localStorage.setItem("token", token);

      // Update redux
      dispatch(loginUser({ token, user }));

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check credentials."
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

          {/* MOBILE */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              required
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 block w-full text-black rounded-md border border-gray-300 p-2.5 focus:ring-2 focus:ring-black outline-none"
              placeholder="Enter your mobile number"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full text-black rounded-md border border-gray-300 p-2.5 pr-10 focus:ring-2 focus:ring-black outline-none"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-md font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
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

        <p className="text-center text-sm">
          <Link
            to="/reset-password"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
