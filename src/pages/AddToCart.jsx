import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCartThunk,
  removeFromCartThunk,
  updateCartQtyThunk,
} from "../redux/thunks/cartThunk";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  fetchAddresses,
  deleteAddress,
} from "../redux/thunks/addressThunk";
import { useState } from "react";

export default function AddToCart() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { addresses } = useSelector((state) => state.address);
  useEffect(() => {
    dispatch(fetchCartThunk());
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr ? defaultAddr._id : addresses[0]._id);
    }
  }, [addresses]);

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (loading) return <p className="pt-32 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto pt-20 p-6 bg-white text-black min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">Cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border-b py-4">
              <img
                src={item.product.image[0]}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-gray-600">₹{item.product.price}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      dispatch(
                        updateCartQtyThunk({
                          cartItemId: item._id,
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      )
                    }
                  >
                    <Minus size={18} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(
                        updateCartQtyThunk({
                          cartItemId: item._id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCartThunk(item.product._id))}
                className="text-red-600"
              >
                <Trash2 />
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </>
      )}


      <h2 className="text-2xl font-bold mt-10 mb-4">Select Delivery Address</h2>

      {addresses.length === 0 ? (
        <p className="text-center text-gray-600">No saved addresses</p>
      ) : (
        <>
          <div className="space-y-4">
            {addresses.map((address) => (
              <label
                key={address._id}
                className={`border p-4 rounded-lg cursor-pointer flex items-start gap-4 transition 
          ${selectedAddress === address._id ? "border-black bg-gray-100" : "border-gray-300"}`}
              >
                {/* Radio Button */}
                <input
                  type="radio"
                  name="selectedAddress"
                  value={address._id}
                  checked={selectedAddress === address._id}
                  onChange={() => setSelectedAddress(address._id)}
                  className="mt-1"
                />

                {/* Address Details */}
                <div>
                  <p className="font-semibold text-lg">{address.fullName}</p>
                  <p>{address.houseNo}, {address.area}</p>
                  <p>{address.city}, {address.state} - {address.pincode}</p>
                  <p className="text-gray-600">Phone: {address.phone}</p>

                  {address.isDefault && (
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded mt-2 inline-block">
                      Default Address
                    </span>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => dispatch(deleteAddress(address._id))}
                  className="text-red-600 text-sm ml-auto"
                >
                  Delete
                </button>
              </label>
            ))}
          </div>

          <button
            onClick={() => console.log("Selected Address:", selectedAddress)}
            className="w-full mt-6 py-3 bg-black text-white rounded"
          >
            Deliver to This Address
          </button>
        </>
      )}


    </div>
  );
}
