import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://dotcombackend-xu8o.onrender.com/api/useroutes";

const token = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
});


// =====================================
// ⭐ FETCH ADDRESSES
// =====================================
export const fetchAddresses = createAsyncThunk("address/fetch", async () => {
  const res = await axios.get(`${API}/addresses`, { headers: token() });
  return res.data;
});

// =====================================
// ⭐ ADD ADDRESS
// customer can add adress 
// =====================================
export const addAddress = createAsyncThunk("address/add", async (data) => {
  const res = await axios.post(`${API}/add-address`, data, { headers: token() });
  return res.data.addresses;
});

// =====================================
// ⭐ DELETE ADDRESS
// from here customer can delete address 
// =====================================
export const deleteAddress = createAsyncThunk("address/delete", async (id) => {
  const res = await axios.delete(`${API}/address/${id}`, { headers: token() });
  return res.data.addresses;
});

// =====================================
// ⭐ UPDATE ADDRESS
// customer can updated address 
// =====================================
export const updateAddress = createAsyncThunk(
  "address/update",
  async ({ id, data }) => {
    const res = await axios.put(`${API}/address/${id}`, data, { headers: token() });
    return res.data.addresses;
  }
);

// =====================================
// ⭐ SET DEFAULT ADDRESS
// this is customer default parmanent detail where product will delever
// =====================================
export const setDefaultAddress = createAsyncThunk(
  "address/default",
  async (id) => {
    const res = await axios.patch(`${API}/address/set-default/${id}`, {}, { headers: token() });
    return res.data.addresses;
  }
);
