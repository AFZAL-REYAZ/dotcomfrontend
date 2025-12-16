// src/pages/EditProfile.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/authSlice.js";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user from Redux store
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",     
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(
    user?.avatar ||
      `https://ui-avatars.com/api/?name=${(user?.name || "User")
        .replace(" ", "+")}&background=0D8ABC&color=fff&size=150`
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type))
      return alert("Only PNG/JPG allowed");

    if (file.size > 2 * 1024 * 1024)
      return alert("Max 2MB allowed");

    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("mobile", formData.mobile); // 

      if (avatarFile) fd.append("avatar", avatarFile);

      const res = await axios.put(
        "https://dotcombackend-xu8o.onrender.com/api/useroutes/update-profile",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = res.data.updatedUser;

      // Update Redux store instantly
      dispatch(setUser(updatedUser));

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-6 bg-white shadow-xl rounded-3xl border">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col items-center">
          <img
            src={preview}
            alt="avatar preview"
            className="w-28 h-28 rounded-full object-cover shadow-md"
          />

          <label className="mt-3 cursor-pointer text-sm text-gray-700">
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            <span className="px-3 py-1 bg-gray-50 border rounded-lg">Change Photo</span>
          </label>
        </div>

        <div>
          <label className="text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl text-black bg-gray-50 focus:ring-2"
            required
          />
        </div>

        <div>
          <label className="text-gray-700 font-medium">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            className="w-full p-3 border rounded-xl text-black bg-gray-50 focus:ring-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-black text-white font-medium"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
