import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/* ==========================
   GET CART
========================== */
export const fetchCartThunk = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/cart");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Cart fetch failed"
      );
    }
  }
);

/* ==========================
   ADD TO CART
========================== */
export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity = 1, size = "M" }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/cart/add", {
        productId,
        quantity,
        size,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Add to cart failed"
      );
    }
  }
);

/* ==========================
   REMOVE FROM CART
========================== */
export const removeFromCartThunk = createAsyncThunk(
  "cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/cart/remove/${productId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Remove from cart failed"
      );
    }
  }
);

/* ==========================
   UPDATE CART QUANTITY
========================== */
export const updateCartQtyThunk = createAsyncThunk(
  "cart/updateQty",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `/cart/update/${cartItemId}`,
        { quantity }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update quantity failed"
      );
    }
  }
);
