import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/* =====================================================
   ✅ ADD PRODUCT (ADMIN)
===================================================== */
export const addProductThunk = createAsyncThunk(
  "product/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ✅ override ONLY here
          },
        }
      );
      return res.data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Add product failed"
      );
    }
  }
);


/* =====================================================
   ✅ GET ALL PRODUCTS (WITH FILTERS)
===================================================== */
export const fetchProductsThunk = createAsyncThunk(
  "product/getAll",
  async ({ category = "", search = "" }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/products?category=${category}&search=${search}`
      );
      return res.data.products;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch products failed"
      );
    }
  }
);

/* =====================================================
   ✅ GET SINGLE PRODUCT
===================================================== */
export const fetchSingleProductThunk = createAsyncThunk(
  "product/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load product"
      );
    }
  }
);

/* =====================================================
   ✅ DELETE PRODUCT (ADMIN)
===================================================== */
export const deleteProductThunk = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Delete product failed"
      );
    }
  }
);
