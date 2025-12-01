import { createSlice } from "@reduxjs/toolkit";

// ✅ Safe loader from localStorage
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(), // ✅ Persistent load
  },

  reducers: {
    addToCartRedux: (state, action) => {
      const item = action.payload;

      const existing = state.items.find(
        (p) => p._id === item._id && p.size === item.size
      );

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },

    removeFromCartRedux: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },

    updateQtyRedux: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((p) => p._id === id);
      if (item) item.quantity = qty;
    },

    clearCartRedux: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCartRedux,
  removeFromCartRedux,
  updateQtyRedux,
  clearCartRedux,
} = cartSlice.actions;

export default cartSlice.reducer;
