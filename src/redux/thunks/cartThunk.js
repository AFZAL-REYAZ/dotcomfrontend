import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://dotcombackend-xu8o.onrender.com/api/cart";

const getToken = () => localStorage.getItem("token");

// ✅ Get logged-in user's cart
export const fetchCartThunk = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue("Cart fetch failed");
    }
  }
);

// ✅ Add item to cart
export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity = 1, size = "M" }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/add`,
        { productId, quantity, size },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return res.data; // updated cart
    } catch (err) {
      return rejectWithValue("Add to cart failed");
    }
  }
);

// ✅ Remove product from cart (by productId)
export const removeFromCartThunk = createAsyncThunk(
  "cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API}/remove/${productId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data; // updated cart
    } catch (err) {
      return rejectWithValue("Remove from cart failed");
    }
  }
);

// ✅ Update quantity (by cartItemId)
export const updateCartQtyThunk = createAsyncThunk(
  "cart/updateQty",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API}/update/${cartItemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return res.data; // updated cart
    } catch (err) {
      return rejectWithValue("Update quantity failed");
    }
  }
);
