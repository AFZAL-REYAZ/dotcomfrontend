import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// =====================================
// ⭐ FETCH ADDRESSES
// =====================================
export const fetchAddresses = createAsyncThunk(
  "address/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/useroutes/addresses");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch addresses"
      );
    }
  }
);

// =====================================
// ⭐ ADD ADDRESS
// =====================================
export const addAddress = createAsyncThunk(
  "address/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "/useroutes/add-address",
        data
      );
      return res.data.addresses;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add address"
      );
    }
  }
);

// =====================================
// ⭐ DELETE ADDRESS
// =====================================
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(
        `/useroutes/address/${id}`
      );
      return res.data.addresses;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete address"
      );
    }
  }
);

// =====================================
// ⭐ UPDATE ADDRESS
// =====================================
export const updateAddress = createAsyncThunk(
  "address/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `/useroutes/address/${id}`,
        data
      );
      return res.data.addresses;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update address"
      );
    }
  }
);

// =====================================
// ⭐ SET DEFAULT ADDRESS
// =====================================
export const setDefaultAddress = createAsyncThunk(
  "address/default",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(
        `/useroutes/address/set-default/${id}`
      );
      return res.data.addresses;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to set default address"
      );
    }
  }
);
