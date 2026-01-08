// src/App.jsx

import React, { useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import AddToCart from "./pages/AddToCart";
import LocationPopup from "./components/LocationPopup";
import Dashboard from "./pages/Dashboard";
import PayWithReward from "./pages/PayWithReward";
import LocationDashboard from "./pages/LocationDashboard";
import RewardDetail from "./pages/RewardDetail";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import UnderDevelopmentPopup from "./components/UnderDevelopmentPopup";
import UserManagement from "./pages/admin/UserManagement";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";

import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/slices/authSlice"; // ⭐ refresh thunk
import AddProduct from "./pages/admin/AddProduct";
import { fetchProductsThunk } from "./redux/thunks/productThunk";
import AddAddress from "./pages/AddAddressForm";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import ScrollToTop from "./components/ScrollToTop";
import ContactUs from "./pages/ContactUs";
import Privacy from "./pages/Privacy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CancellationRefund from "./pages/CancellationRefund";
import ShippingDelivery from "./pages/policyPages/ShippingDelivery";
import AllProduct from "./components/AllProduct";
import OrderDashboard from "./pages/admin/OrderDashboard";
import AdminOrderDashboard from "./pages/admin/AdminOrderDashboard";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import OrderDetails from "./pages/OrderDetails";
import SavedAddresses from "./pages/SavedAdresses";

const App = () => {
    const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) return;

    dispatch(refreshUser());
    dispatch(fetchProductsThunk());
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <UnderDevelopmentPopup />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/location" element={<LocationPopup />} />

        <Route path="/products" element={<AllProduct />} />
        <Route path="/products/:category" element={<AllProduct />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
        <Route path="/pay-with-reward" element={<PayWithReward />} />
        <Route path="/location-dashboard" element={<LocationDashboard />} />
        <Route path="/reward-dashboard" element={<RewardDetail />} />
        {/* <Route path="/order-dashboard" element={<OrderDashboard />} /> */}
        <Route path="/order-dashboard" element={<AdminOrderDashboard />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/check-out" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/saved-addresses" element={<SavedAddresses />} />

        
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/cancellation-refund-policy" element={<CancellationRefund />} />
        <Route path="/shipping-delivery-policy" element={<ShippingDelivery />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
