import { createSlice } from "@reduxjs/toolkit";
import {
  getAllOrdersAdminThunk,
  updateOrderStatusThunk,
} from "../thunks/adminOrderThunk";

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAdminThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrdersAdminThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (o) => o._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  },
});

export default adminOrderSlice.reducer;
