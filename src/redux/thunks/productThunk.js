import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://dotcombackend-xu8o.onrender.com/api/products";

// ✅ ADD PRODUCT
export const addProductThunk = createAsyncThunk(
  "product/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/add`, formData);
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Add product failed");
    }
  }
);

// ✅ GET ALL PRODUCTS
export const fetchProductsThunk = createAsyncThunk(
  "product/getAll",
  async ({category = "", search = ""}, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API}?category=${category}&search=${search}`
      );
      return res.data.products;
    } catch (err) {
      return rejectWithValue("Fetch products failed");
    }
  }
);



export const fetchSingleProductThunk = createAsyncThunk(
  "product/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/${id}`);
      return res.data.product;
    } catch (err) {
      return rejectWithValue("Failed to load product");
    }
  }
);





// ✅ DELETE PRODUCT
export const deleteProductThunk = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue("Delete failed");
    }
  }
);
