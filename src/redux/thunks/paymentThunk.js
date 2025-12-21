import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/payment";

// 🟢 Create Razorpay Order
export const createPaymentOrderThunk = createAsyncThunk(
  "payment/createOrder",
  async ({ amount }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/create-order`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to create payment order");
    }
  }
);

// 🟢 Verify Payment & Place Order
export const verifyPaymentThunk = createAsyncThunk(
  "payment/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/verify`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Payment verification failed");
    }
  }
);
