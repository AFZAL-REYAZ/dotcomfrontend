import React, { useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";

const PayWithReward = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
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
        amount: value,
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

    // 📱 Mobile validation
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      alert("❌ Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/paywithreward",
        formData
      );

      if (res.status === 200 || res.status === 201) {
        alert("✅ Submitted successfully!");

        setFormData({
          name: "",
          mobile: "",
          amount: "",
          rewardCoins: 0,
        });
      }
    } catch (error) {
      console.error("PayWithReward error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex pt-20 items-center justify-center bg-gradient-to-br from-blue-50 via-white to-amber-50 px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg border border-blue-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Pay for Reward
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Enter details to earn instant reward coins 💰
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full border border-gray-300 text-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              required
              maxLength="10"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile"
              className="w-full border border-gray-300 text-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Amount to Pay (₹)
            </label>
            <input
              type="number"
              name="amount"
              required
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full border border-gray-300 text-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {formData.amount && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-green-700 font-medium"
              >
                🎉 You will earn {formData.rewardCoins} reward coin
                {formData.rewardCoins > 1 ? "s" : ""}
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
              readOnly
              value={formData.rewardCoins}
              className="w-full bg-gray-50 border text-gray-600 border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-sky-600 transition shadow-md"
          >
            Submit
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
};

export default PayWithReward;
