import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PayWithReward = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    rewardCoins: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      const numericValue = Number(value);
      const coins = numericValue > 0 ? Math.ceil(numericValue / 100) : 0;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        rewardCoins: coins,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://dotcombackend.onrender.com/api/paywithreward",
        formData
      );

      if (res.status === 201 || res.status === 200) {
        alert(
          `✅ Payment saved successfully!\nYou earned ${formData.rewardCoins} reward coin(s)!`
        );
        setFormData({ name: "", email: "", amount: "", rewardCoins: 0 });
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex pt-20 items-center justify-center bg-gradient-to-br from-blue-50 via-white to-amber-50 relative overflow-hidden font-[Poppins] px-4">
      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-150"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg relative z-10 border border-blue-100"
      >
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 text-white shadow-md mb-3">
            {/* Credit Card Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 12h19.5m-19.5 0A2.25 2.25 0 0 1 4.5 9.75h15a2.25 2.25 0 0 1 2.25 2.25v6.75A2.25 2.25 0 0 1 19.5 21H4.5A2.25 2.25 0 0 1 2.25 18.75v-6.75z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Pay with Reward</h2>
          <p className="text-slate-500 mt-1 text-sm">
            Complete your payment and earn instant reward coins 💰
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
              className="w-full border border-gray-300 text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Enter Email
            </label>
            <input
              type="email" // CORRECTED
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              // Removed pattern and maxLength
              className="w-full border border-gray-300 text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          {/* Mobile Number */}
          {/* <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
              pattern="[6-9]{1}[0-9]{9}"
              maxLength="10"
              className="w-full border border-gray-300 text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div> */}

          {/* Amount */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Amount to Pay (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
              className="w-full border border-gray-300 text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {formData.amount && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-green-600 font-medium"
              >
                🎉 You will earn {formData.rewardCoins} reward coin
                {formData.rewardCoins > 1 ? "s" : ""}!
              </motion.p>
            )}
          </div>

          {/* Reward Coins */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Reward Coins
            </label>
            <input
              type="text"
              value={formData.rewardCoins}
              readOnly
              className="w-full bg-gray-50 text-gray-900 border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-sky-600 transition shadow-md"
          >
            💳 Make Payment
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default PayWithReward;
