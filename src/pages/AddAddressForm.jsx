import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/thunks/addressThunk";

/* 🇮🇳 Indian States */
const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
  "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi","Jammu and Kashmir","Ladakh","Puducherry","Chandigarh",
  "Andaman and Nicobar Islands","Dadra and Nagar Haveli and Daman and Diu","Lakshadweep"
];

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

  const [loadingPin, setLoadingPin] = useState(false);
  const [pinMsg, setPinMsg] = useState("");

  /* 🔄 Fetch city & state from pincode */
  const fetchFromPincode = async (pin) => {
    try {
      setLoadingPin(true);
      setPinMsg("");

      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pin}`
      );
      const data = await res.json();

      if (data[0]?.Status === "Success") {
        setForm((prev) => ({
          ...prev,
          city: data[0].PostOffice[0].District,
          state: data[0].PostOffice[0].State,
        }));
        setPinMsg("City & State auto-filled");
      } else {
        setPinMsg("Invalid pincode");
      }
    } catch (err) {
      setPinMsg("Failed to fetch from pincode");
    } finally {
      setLoadingPin(false);
    }
  };

  /* ✏️ Handle input change */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // 📌 Trigger pincode lookup
    if (name === "pincode" && value.length === 6) {
      fetchFromPincode(value);
    }
  };

  /* 🚀 Submit */
  const submitAddress = () => {
    dispatch(addAddress(form)).then((res) => {
      if (!res.error) {
        alert("Address added successfully");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#eafff5] px-4 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h3 className="text-xl font-semibold text-[#0b6b4f]">
          Delivery Address
        </h3>
        <p className="text-sm text-[#0b6b4f]/80 mt-1">
          Enter your shipping details
        </p>

        <hr className="my-5 border-[#7be0b5]" />

        <div className="space-y-4">

          {/* Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MintInput label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
            <MintInput label="Phone Number" name="phone" value={form.phone} onChange={handleChange} inputMode="numeric" />
          </div>

          {/* Pincode */}
          <div>
            <MintInput
              label="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              inputMode="numeric"
              placeholder="6 digit pincode"
            />

            {loadingPin && (
              <p className="text-xs text-gray-800 mt-1">Fetching city & state…</p>
            )}

            {pinMsg && (
              <p className="text-xs mt-1 text-[#0b6b4f]">{pinMsg}</p>
            )}
          </div>

          {/* Address */}
          <MintInput label="House / Flat / Building" name="houseNo" value={form.houseNo} onChange={handleChange} />
          <MintInput label="Area / Locality" name="area" value={form.area} onChange={handleChange} />

          {/* City + State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MintInput label="City" name="city" value={form.city} onChange={handleChange} />

            <div>
              <label className="block text-xs font-medium text-[#0b6b4f] mb-1">
                State
              </label>
              <input
                list="indian-states"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="Select or search state"
                className="w-full px-3 py-2 rounded-md border border-[#b6e7d2] bg-[#f5fffb] text-sm text-gray-700 outline-none focus:border-[#0b6b4f]"
              />
              <datalist id="indian-states">
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Landmark */}
          <MintInput label="Landmark (Optional)" name="landmark" value={form.landmark} onChange={handleChange} />

          {/* Submit */}
          <button
            onClick={submitAddress}
            className="mt-6 w-full py-2.5 rounded-lg text-sm font-medium bg-[#0b6b4f] text-white hover:bg-[#095a42]"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Input */
function MintInput({ label, name, value, onChange, placeholder, inputMode="text" }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#0b6b4f] mb-1">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        inputMode={inputMode}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-md border border-[#b6e7d2] bg-[#f5fffb] text-sm text-gray-700 outline-none focus:border-[#0b6b4f]"
      />
    </div>
  );
}
