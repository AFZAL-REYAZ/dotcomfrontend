import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://dotcombackend-xu8o.onrender.com/api/orders";

const token = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/* ==========================
   GET ALL ORDERS (ADMIN)
========================== */
export const getAllOrdersAdminThunk = createAsyncThunk(
  "admin/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/admin/all`, {
        headers: token(),
      });
      return res.data.orders;
    } catch (err) {
      return rejectWithValue("Failed to fetch orders");
    }
  }
);

/* ==========================
   UPDATE ORDER STATUS
========================== */
export const updateOrderStatusThunk = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API}/admin/update-status/${orderId}`,
        { status },
        { headers: token() }
      );
      return res.data.order;
    } catch (err) {
      return rejectWithValue("Failed to update status");
    }
  }
);
