import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logoutUser } from "../../redux/slices/authSlice";
import axiosInstance from "../../api/axiosInstance";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);

  /* ==========================
     FETCH USERS
  ========================== */
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/useroutes/allUser");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ==========================
     UPDATE ROLE
  ========================== */
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axiosInstance.put(
        "/useroutes/update-role",
        { userId, role: newRole }
      );

      alert("Role updated successfully!");
      fetchUsers();

      // ⭐ If admin updates own role → sync Redux
      if (loggedInUser?._id === userId) {
        dispatch(setUser(res.data.updatedUser));
      }
    } catch (err) {
      console.error("Role change error:", err);
      alert("Failed to update role");
    }
  };

  /* ==========================
     DELETE USER
  ========================== */
  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(
        `/useroutes/delete-user/${userId}`
      );

      alert("User deleted successfully");
      fetchUsers();

      // ⭐ If admin deletes himself → logout
      if (loggedInUser?._id === userId) {
        dispatch(logoutUser());
      }
    } catch (err) {
      console.error("Delete user error:", err);
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="p-6 pt-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          User Management
        </h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Mobile</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-black">
                    {u.name}
                  </td>
                  <td className="px-6 py-4 text-black">
                    {u.mobile}
                  </td>

                  <td className="px-6 py-4 text-black">
                    <select
                      className="border rounded-md px-3 py-2"
                      value={u.role || "user"}
                      onChange={(e) =>
                        handleRoleChange(u._id, e.target.value)
                      }
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <button className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6">
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
