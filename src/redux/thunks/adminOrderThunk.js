import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/* ==========================
   GET ALL ORDERS (ADMIN)
========================== */
export const getAllOrdersAdminThunk = createAsyncThunk(
  "admin/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/admin/all");
      return res.data.orders;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

/* ==========================
   UPDATE ORDER STATUS (ADMIN)
========================== */
export const updateOrderStatusThunk = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `/orders/update-status/${orderId}`,
        { status }
      );
      return res.data.order;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update order status"
      );
    }
  }
);
