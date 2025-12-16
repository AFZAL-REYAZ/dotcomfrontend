import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://dotcombackend-xu8o.onrender.com/api/orders";

// Send token as Bearer <token> — REQUIRED by your backend
const token = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/* =====================================================
   ⭐ 1. PLACE ORDER
===================================================== */
export const placeOrderThunk = createAsyncThunk(
  "order/placeOrder",
  async ({ addressId, paymentMethod }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/create`,
        { addressId, paymentMethod },
        { headers: token() }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Order failed");
    }
  }
);

/* =====================================================
   ⭐ 2. GET MY ORDERS (Order History)
===================================================== */
export const getMyOrdersThunk = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/my-orders`, { headers: token() });
      return res.data.orders;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch orders");
    }
  }
);

/* =====================================================
   ⭐ 3. GET ORDER DETAILS
===================================================== */
export const getOrderDetailsThunk = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/details/${orderId}`, {
        headers: token(),
      });
      return res.data.order;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch details");
    }
  }
);



