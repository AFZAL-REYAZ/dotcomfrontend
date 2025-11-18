// src/pages/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [formData, setFormData] = useState({
    name: storedUser.name || "",
    email: storedUser.email || ""
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(storedUser.avatar || `https://ui-avatars.com/api/?name=${(storedUser.name||"User").replace(" ","+")}&background=0D8ABC&color=fff&size=150`);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // revoke object URL on unmount
    return () => { if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview); };
  }, [preview]);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // simple client-side validation
    if (!["image/png","image/jpeg","image/jpg"].includes(file.type)) return alert("Only PNG/JPG allowed");
    if (file.size > 2 * 1024 * 1024) return alert("Max 2MB allowed");
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
      fd.append("email", formData.email);
      if (avatarFile) fd.append("avatar", avatarFile);

      const res = await axios.put(
        "https://dotcombackend.onrender.com/api/useroutes/update-profile",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Profile updated!");
      // Save updated user into localStorage
      localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
      navigate("/user-profile");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-6 bg-white shadow-xl rounded-3xl border">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img src={preview} alt="avatar preview" className="w-28 h-28 rounded-full object-cover shadow-md" />
          </div>

          <label className="mt-3 cursor-pointer inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            <span className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-sm hover:bg-gray-100">Change Photo</span>
            <small className="text-xs text-gray-400 ml-2">PNG/JPG, max 2MB</small>
          </label>
        </div>

        <div>
          <label className="text-gray-700 font-medium">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            className="w-full text-black mt-1 p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-black outline-none" required />
        </div>

        <div>
          <label className="text-gray-700 font-medium">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full text-black mt-1 p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-black outline-none" required />
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium shadow-sm hover:bg-gray-100 transition-all duration-200">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
