import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://dotcombackend-xu8o.onrender.com/api/cart";

const getToken = () => localStorage.getItem("token");

// ✅ Axios config helper
const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ✅ Get cart
export const fetchCartThunk = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API, authConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Cart fetch failed"
      );
    }
  }
);

// ✅ Add to cart
export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity = 1, size = "M" }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/add`,
        { productId, quantity, size },
        authConfig()
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Add to cart failed"
      );
    }
  }
);

// ✅ Remove from cart
export const removeFromCartThunk = createAsyncThunk(
  "cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${API}/remove/${productId}`,
        authConfig()
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Remove from cart failed"
      );
    }
  }
);

// ✅ Update quantity
export const updateCartQtyThunk = createAsyncThunk(
  "cart/updateQty",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API}/update/${cartItemId}`,
        { quantity },
        authConfig()
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update quantity failed"
      );
    }
  }
);



