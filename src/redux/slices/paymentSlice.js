import { createSlice } from "@reduxjs/toolkit";
import {
  createPaymentOrderThunk,
  verifyPaymentThunk,
} from "../thunks/paymentThunk";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    razorpayOrder: null,
    success: false,
    error: null,
  },

  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.razorpayOrder = null;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // CREATE ORDER
      .addCase(createPaymentOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.razorpayOrder = action.payload;
      })
      .addCase(createPaymentOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // VERIFY PAYMENT
      .addCase(verifyPaymentThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPaymentThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyPaymentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
