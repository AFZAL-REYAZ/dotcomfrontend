import React from "react";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const UserManagement = () => {
    const [user,setUser]=useState([]);

  const userDetail=async()=>{
    try{
        const users=await axios.get("https://dotcombackend.onrender.com/api/useroutes/allUser");
        setUser(users.data.users || []);

    }catch(err){
        console.log(err);
        
    }
  }

  useEffect(()=>{
    userDetail();
  },[]);


  const handleRoleChange = async (userId, newRole) => {
  try {
    const res = await axios.put(
      "https://dotcombackend.onrender.com/api/useroutes/update-role",
      { userId, role: newRole }
    );

    if (res.status === 200) {
      alert("Role updated successfully!");
      // refresh the user list
      userDetail();
    }
  } catch (err) {
    console.log("Role change error:", err);
    alert("Failed to update role");
  }
};






  return (
    <div className="p-6 pt-20">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>

        <button className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition">
          <UserPlus size={18} /> Add New User
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {user?.length > 0?(user.map((user,id) => (
              <tr
                key={id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-black">{user.name}</td>
                <td className="px-6 py-4 text-black">{user.email}</td>
                <td className="px-6 py-4 text-black">
                    <select
                        className="border rounded-md px-3 py-2 text-black"
                        value={user.role || "user"}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <button className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))):(<tr>
                <td colSpan="4" className="text-center py-4">No users found</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
