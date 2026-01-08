import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddresses,deleteAddress } from "../redux/thunks/addressThunk";

const SavedAddresses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addresses } = useSelector((state) => state.address);

  const [selectedAddress, setSelectedAddress] = useState(null);

  // ✅ Auto-select default address
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr ? defaultAddr._id : addresses[0]._id);
    }
  }, [addresses]);

  useEffect(()=>{
    dispatch(fetchAddresses());
  },[])

  const handleDelete = (e, id) => {
    e.stopPropagation(); // ❗ prevent radio selection
    dispatch(deleteAddress(id));
  };

  return (
    <section className="mb-8 pt-20">
      <div className="flex flex-row items-center justify-between gap-3 mb-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Delivery Address
        </h2>

        <button
          onClick={() => navigate("/add-address")}
          className="
            inline-flex items-center justify-center
            px-4 py-2
            text-sm font-semibold
            text-blue-600
            border border-blue-600/30
            rounded-lg
            hover:bg-blue-50
            transition
          "
        >
          + Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-8 border rounded-xl bg-gray-50">
          <img
            src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
            className="w-10 mx-auto opacity-80"
            alt="No Address"
          />
          <h3 className="text-xl font-semibold mt-4 text-gray-600">No Saved Address</h3>
          <p className="text-gray-600 mt-1">
            Add an address to continue your order.
          </p>

          <button
            onClick={() => navigate("/add-address")}
            className="mt-5 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition text-gray-600"
          >
            Add New Address
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <label
              key={address._id}
              className={`border p-4 rounded-xl flex gap-4 cursor-pointer shadow-sm transition
                ${
                  selectedAddress === address._id
                    ? "border-black bg-gray-100"
                    : "border-gray-300"
                }`}
            >
              <input
                type="radio"
                name="address"
                checked={selectedAddress === address._id}
                onChange={() => setSelectedAddress(address._id)}
                className="mt-1"
              />

              <div>
                <p className="font-semibold text-gray-600">{address.fullName}</p>
                <p className="text-gray-600">
                  {address.houseNo}, {address.area}
                </p>
                <p className="text-gray-600">
                  {address.city}, {address.state} - {address.pincode}
                </p>
                <p className="text-gray-600">
                  Phone: {address.phone}
                </p>

                {address.isDefault && (
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded mt-2 inline-block">
                    Default
                  </span>
                )}
              </div>

              <button
                onClick={(e) => handleDelete(e, address._id)}
                className="text-red-600 text-sm ml-auto hover:underline"
              >
                Remove
              </button>
            </label>
          ))}
        </div>
      )}
    </section>
  );
};

export default SavedAddresses;


