import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import "./App.css"
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from './pages/ProductDetail';
import ContactUs from './pages/ContactUs';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Home from './pages/Home';
import AddToCart from './pages/AddToCart';
import LocationPopup from './components/LocationPopup';
import Dashboard from './pages/Dashboard';
import PayWithReward from './pages/PayWithReward';
import LocationDashboard from './pages/LocationDashboard';
import RewardDetail from './pages/RewardDetail';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import UnderDevelopmentPopup from './components/UnderDevelopmentPopup';
import UserManagement from './pages/admin/UserManagement';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import axios from 'axios';

const App = () => {

  // ⭐ REFRESH USER DATA ON APP LOAD
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          "https://dotcombackend.onrender.com/api/useroutes/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("🔄 User refreshed:", res.data.user);

      } catch (err) {
        console.log("User refresh failed:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Header/>
      <UnderDevelopmentPopup/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/ProductDetail" element={<ProductDetail />}/>
        <Route path="/addtocart" element={<AddToCart />}/>
        <Route path="/location" element={<LocationPopup />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pay-with-reward" element={<PayWithReward />} />
        <Route path="/location-dashboard" element={<LocationDashboard />} />
        <Route path="/reward-dashboard" element={<RewardDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
