// src/api/userApi.js
import axiosInstance from "./axiosInstance";

export const sendOtpApi = (mobile) =>
  axiosInstance.post("/useroutes/send-otp", { mobile });

export const verifyOtpApi = (mobile, otp) =>
  axiosInstance.post("/useroutes/verify-otp", { mobile, otp });

export const resetPasswordApi = (mobile, newPassword) =>
  axiosInstance.post("/useroutes/reset-password", { mobile, newPassword });

