import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

// ✅ AUTO SAVE CART ON EVERY CHANGE
store.subscribe(() => {
  const { cart } = store.getState();
  localStorage.setItem("cart", JSON.stringify(cart.items));
});


