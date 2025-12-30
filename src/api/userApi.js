import axios from "axios";

const API = "https://dotcombackend-xu8o.onrender.com/api/useroutes";


export const sendOtpApi = (mobile) =>
  axios.post(`${API}/send-otp`, { mobile });

export const verifyOtpApi = (mobile, otp) =>
  axios.post(`${API}/verify-otp`, { mobile, otp });

export const resetPasswordApi = (mobile, newPassword) =>
  axios.post(`${API}/reset-password`, { mobile, newPassword });
