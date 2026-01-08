import { createSlice } from "@reduxjs/toolkit";
import {
  placeOrderThunk,
  getMyOrdersThunk,
  getOrderDetailsThunk,
  getCheckoutSummaryThunk,
} from "../thunks/orderThunk";

const orderSlice = createSlice({
  name: "order",

  initialState: {
    checkoutSummary: null,

    placingOrder: false,
    fetchingOrders: false,
    fetchingOrderDetails: false,

    successOrder: null,
    myOrders: [],
    orderDetails: null,

    error: null,
  },

  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearSuccessOrder: (state) => {
      state.successOrder = null;
    },
  },

  extraReducers: (builder) => {
    /* ================= CHECKOUT SUMMARY ================= */
    builder
      .addCase(getCheckoutSummaryThunk.pending, (state) => {
        state.fetchingOrders = true;
      })
      .addCase(getCheckoutSummaryThunk.fulfilled, (state, action) => {
        state.fetchingOrders = false;
        state.checkoutSummary = action.payload;
      })
      .addCase(getCheckoutSummaryThunk.rejected, (state, action) => {
        state.fetchingOrders = false;
        state.error = action.payload;
      });

    /* ================= PLACE ORDER ================= */
    builder
      .addCase(placeOrderThunk.pending, (state) => {
        state.placingOrder = true;
      })
      .addCase(placeOrderThunk.fulfilled, (state, action) => {
        state.placingOrder = false;
        state.successOrder = action.payload.order;
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.placingOrder = false;
        state.error = action.payload;
      });

    /* ================= GET MY ORDERS ================= */
    builder
      .addCase(getMyOrdersThunk.pending, (state) => {
        state.fetchingOrders = true;
      })
      .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
        state.fetchingOrders = false;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrdersThunk.rejected, (state, action) => {
        state.fetchingOrders = false;
        state.error = action.payload;
      });

    /* ================= ORDER DETAILS ================= */
    builder
      .addCase(getOrderDetailsThunk.pending, (state) => {
        state.fetchingOrderDetails = true;
      })
      .addCase(getOrderDetailsThunk.fulfilled, (state, action) => {
        state.fetchingOrderDetails = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetailsThunk.rejected, (state, action) => {
        state.fetchingOrderDetails = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearOrderError,
  clearSuccessOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
