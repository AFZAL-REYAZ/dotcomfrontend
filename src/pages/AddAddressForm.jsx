import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/thunks/addressThunk";

export default function AddAddressForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    houseNo: "",
    area: "",
    landmark: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitAddress = () => {
    dispatch(addAddress(form)).then((res) => {
      if (!res.error) alert("✅ Address added successfully");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Add Delivery Address
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            This address will be used for order delivery
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">

          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FloatingInput
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
            <FloatingInput
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              inputMode="numeric"
            />
          </div>

          {/* Pincode */}
          <FloatingInput
            label="Pincode"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            inputMode="numeric"
          />

          {/* Address */}
          <FloatingInput
            label="House / Flat / Building"
            name="houseNo"
            value={form.houseNo}
            onChange={handleChange}
          />

          <FloatingInput
            label="Area / Locality"
            name="area"
            value={form.area}
            onChange={handleChange}
          />

          {/* City + State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FloatingInput
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
            <FloatingInput
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          {/* Landmark */}
          <FloatingInput
            label="Landmark (Optional)"
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
          />

          {/* Button */}
          <button
            onClick={submitAddress}
            className="w-full mt-6 bg-black text-white py-3 rounded-xl text-lg font-semibold
            hover:bg-gray-900 transition-all duration-200 shadow-lg"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===================================
   🔹 Professional Floating Input
=================================== */
function FloatingInput({
  label,
  name,
  value,
  onChange,
  inputMode = "text",
}) {
  return (
    <div className="relative">
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        inputMode={inputMode}
        className="peer w-full px-4 py-3 rounded-xl border border-gray-300
        outline-none text-gray-900 bg-white
        focus:border-black focus:ring-1 focus:ring-black transition"
      />
      <label
        className="absolute left-4 top-3 text-gray-500 bg-white px-1 transition-all
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base"
      >
        {label}
      </label>
    </div>
  );
}
