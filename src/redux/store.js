import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";
import orderReducer from "./slices/orderSlice";
import paymentReducer from "./slices/paymentSlice";
import adminOrderReducer from "./slices/adminOrderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    payment: paymentReducer,
    adminOrder: adminOrderReducer,
  },
});

// ✅ AUTO SAVE CART ON EVERY CHANGE
store.subscribe(() => {
  const { cart } = store.getState();
  localStorage.setItem("cart", JSON.stringify(cart.items));
});


