import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/authSlice.js"; // adjust path if needed

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://dotcombackend-xu8o.onrender.com/api/useroutes/allUser"
      );
      setUsers(res.data.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axios.put(
        "https://dotcombackend-xu8o.onrender.com/api/useroutes/update-role",
        { userId, role: newRole }
      );

      if (res.status === 200) {
        alert("Role updated successfully!");
        fetchUsers();

        // ⭐ If logged-in user changed their own role → update Redux + localStorage
        if (loggedInUser?._id === userId) {
          dispatch(setUser(res.data.updatedUser));
        }
      }
    } catch (err) {
      console.log("Role change error:", err);
      alert("Failed to update role");
    }
  };

  return (
    <div className="p-6 pt-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Mobile no</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-black">{u.name}</td>
                  <td className="px-6 py-4 text-black">{u.mobile}</td>

                  <td className="px-6 py-4 text-black">
                    <select
                      className="border rounded-md px-3 py-2 text-black"
                      value={u.role || "user"}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
