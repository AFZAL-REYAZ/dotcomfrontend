import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/* =====================================================
   🟢 CREATE RAZORPAY ORDER
===================================================== */
export const createPaymentOrderThunk = createAsyncThunk(
  "payment/createOrder",
  async ({ amount }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "/payment/create-order",
        { amount },
        { timeout: 15000 } // ⏱️ 15 sec timeout (mobile safe)
      );
      return res.data;
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        return rejectWithValue(
          "Payment service is slow. Please try again."
        );
      }
      return rejectWithValue(
        err.response?.data?.message || "Failed to create payment order"
      );
    }
  }
);

/* =====================================================
   🟢 VERIFY PAYMENT
===================================================== */
export const verifyPaymentThunk = createAsyncThunk(
  "payment/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payment/verify", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Payment verification failed"
      );
    }
  }
);
