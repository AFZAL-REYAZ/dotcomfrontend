import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  removeFromCartRedux,
  updateQtyRedux,
} from "../redux/slices/cartSlice";

export default function AddToCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto pt-20 p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-black">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-700">Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border-b py-4"
            >
              <img
                src={item.image}
                className="w-20 h-20 object-cover rounded border"
                alt={item.name}
              />

              <div className="flex-1">
                <p className="font-semibold text-black">{item.name}</p>
                <p className="text-gray-800">₹{item.price}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    className="border p-2 rounded text-black"
                    onClick={() =>
                      dispatch(
                        updateQtyRedux({
                          id: item._id,
                          qty: Math.max(1, item.quantity - 1),
                        })
                      )
                    }
                  >
                    <Minus size={18} />
                  </button>

                  <span className="font-semibold text-black">
                    {item.quantity}
                  </span>

                  <button
                    className="border p-2 rounded text-black"
                    onClick={() =>
                      dispatch(
                        updateQtyRedux({
                          id: item._id,
                          qty: item.quantity + 1,
                        })
                      )
                    }
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCartRedux(item._id))}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 />
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between text-xl font-bold text-black">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <button className="w-full mt-6 py-3 bg-black text-white rounded hover:bg-gray-900">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
