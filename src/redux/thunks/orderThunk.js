import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/* =====================================================
   ⭐ PLACE ORDER
===================================================== */
export const placeOrderThunk = createAsyncThunk(
  "order/placeOrder",
  async ({ addressId, paymentMethod }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/orders/create", {
        addressId,
        paymentMethod,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Order failed"
      );
    }
  }
);

/* =====================================================
   ⭐ GET MY ORDERS
===================================================== */
export const getMyOrdersThunk = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/my-orders");
      return res.data.orders;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

/* =====================================================
   ⭐ GET ORDER DETAILS
===================================================== */
export const getOrderDetailsThunk = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/orders/details/${orderId}`);
      return res.data.order;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch order details"
      );
    }
  }
);

/* =====================================================
   ⭐ CHECKOUT PRICE SUMMARY (FROM BACKEND)
===================================================== */
export const getCheckoutSummaryThunk = createAsyncThunk(
  "order/getCheckoutSummary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/checkout-summary");
      return res.data; 
      // { subTotal, gstAmount, deliveryCharge, promiseFee, grandTotal, cgst, sgst }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load checkout summary"
      );
    }
  }
);



