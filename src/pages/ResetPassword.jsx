import { useState } from "react";
import {
  sendOtpApi,
  verifyOtpApi,
  resetPasswordApi,
} from "../api/userApi";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      await sendOtpApi(mobile);
      setStep(2);
      setMessage("OTP sent to your WhatsApp");
    } catch {
      setMessage("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      await verifyOtpApi(mobile, otp);
      setStep(3);
      setMessage("OTP verified successfully");
    } catch {
      setMessage("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");
    try {
      await resetPasswordApi(mobile, password);
      setMessage("Password reset successful 🎉");
    } catch {
      setMessage("Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Secure your account with OTP verification
          </p>
        </div>

        {/* STEP INDICATOR */}
        <div className="flex justify-between text-xs text-gray-500">
          <span className={step >= 1 ? "font-semibold text-black" : ""}>
            1. Mobile
          </span>
          <span className={step >= 2 ? "font-semibold text-black" : ""}>
            2. OTP
          </span>
          <span className={step >= 3 ? "font-semibold text-black" : ""}>
            3. Password
          </span>
        </div>

        {/* MESSAGE */}
        {message && (
          <p className="text-center text-sm text-blue-600 bg-blue-50 py-2 rounded">
            {message}
          </p>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-black outline-none"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading || mobile.length !== 10}
              className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition disabled:bg-gray-400"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-black outline-none"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading || otp.length < 4}
              className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition disabled:bg-gray-400"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-black outline-none"
            />
            <button
              onClick={handleResetPassword}
              disabled={loading || password.length < 6}
              className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
