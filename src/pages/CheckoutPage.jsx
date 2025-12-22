import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartThunk } from "../redux/thunks/cartThunk";
import { deleteAddress, fetchAddresses } from "../redux/thunks/addressThunk";
import { useNavigate } from "react-router-dom";
import { placeOrderThunk } from "../redux/thunks/orderThunk";
import {
  createPaymentOrderThunk,
  verifyPaymentThunk,
} from "../redux/thunks/paymentThunk";



export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { addresses } = useSelector((state) => state.address);
  const [razorpayOrder, setRazorpayOrder] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const { loading } = useSelector((state) => state.payment);
  const [paymentOpening, setPaymentOpening] = useState(false);

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discount = Math.floor(total * 0.45);
  //   const saveMore = 238;
  const deleveryCharges = 1;
  const promiseFee = 1;

  const finalAmount = total + promiseFee + deleveryCharges;



  useEffect(() => {
    dispatch(fetchCartThunk());
    dispatch(fetchAddresses());
  }, []);

  useEffect(() => {
    if (paymentMethod === "Online" && finalAmount > 0) {
      dispatch(createPaymentOrderThunk({ amount: finalAmount }))
        .then((res) => {
          if (res.payload) {
            setRazorpayOrder(res.payload);
          }
        });
    }
  }, [paymentMethod, finalAmount, dispatch]);

  useEffect(() => {
    if (paymentMethod === "COD") {
      setRazorpayOrder(null);
    }
  }, [paymentMethod]);




  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr ? defaultAddr._id : addresses[0]._id);
    }
  }, [addresses]);




  const placeOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    // 🔴 CASH ON DELIVERY
    if (paymentMethod === "COD") {
      dispatch(
        placeOrderThunk({
          addressId: selectedAddress,
          paymentMethod: "COD",
        })
      ).then((res) => {
        if (!res.error) navigate("/order-success");
      });
      return;
    }

    // 🟢 ONLINE PAYMENT (MOBILE SAFE)
    if (!razorpayOrder) {
      alert("Payment is preparing, please wait...");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "Dotcom Gadgets",
      description: "Order Payment",
      order_id: razorpayOrder.id,

      handler: async (response) => {
        await dispatch(
          verifyPaymentThunk({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            addressId: selectedAddress,
            totalAmount: finalAmount,
          })
        );
        setPaymentOpening(false);
        navigate("/order-success");
      },

      theme: { color: "#000000" },
    };
    if (paymentOpening) return;
    setPaymentOpening(true);
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", () => {
      alert("Payment failed or cancelled");
      setPaymentOpening(false);
    });

    rzp.open();
  };



  return (
    <div className="max-w-4xl mx-auto pt-20 p-6 bg-white min-h-screen text-black">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* ============================
            ADDRESS SECTION
      ============================ */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Delivery Address</h2>

        {addresses.length === 0 ? (
          <div className="text-center py-8 border rounded-xl bg-gray-50">
            <img
              src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
              className="w-10 mx-auto opacity-80"
              alt="No Address"
            />
            <h3 className="text-xl font-semibold mt-4">No Saved Address</h3>
            <p className="text-gray-600 mt-1">
              Add an address to continue your order.
            </p>

            <button
              onClick={() => navigate("/add-address")}
              className="mt-5 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Add New Address
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <label
                key={address._id}
                className={`border p-4 rounded-xl flex gap-4 cursor-pointer shadow-sm 
                  transition ${selectedAddress === address._id
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
                  <p className="font-semibold">{address.fullName}</p>
                  <p>{address.houseNo}, {address.area}</p>
                  <p>{address.city}, {address.state} - {address.pincode}</p>
                  <p className="text-gray-600">Phone: {address.phone}</p>

                  {address.isDefault && (
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded mt-2 inline-block">
                      Default
                    </span>
                  )}
                </div>

                <button
                  onClick={() => dispatch(deleteAddress(address._id))}
                  className="text-red-600 text-sm ml-auto"
                >
                  Remove
                </button>
              </label>
            ))}
          </div>
        )}
      </section>

      {/* ============================
            ORDER SUMMARY (Flipkart Style)
      ============================ */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>

        {/* Product List */}
        {items.map((item) => (
          <div key={item._id} className="flex items-center justify-between gap-4 py-4 border-b">
            <img
              src={item.product.image[0]}
              className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.product.name}</p>
              <p className="text-gray-500 text-sm">
                Qty: {item.quantity}
              </p>
            </div>

            <p className="font-medium text-gray-900">
              ₹{item.product.price * item.quantity}
            </p>
          </div>
        ))}

        {/* Price Details Box */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 mt-8">
          <div className="px-4 py-3 border-b">
            <h3 className="font-semibold text-lg">Price Details</h3>
          </div>

          <div className="px-4 py-3 text-gray-700 space-y-3">

            <div className="flex justify-between">
              <span>Price ({items.length} items)</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delevery Charges</span>
              <span className="text-green-600 font-semibold">₹ {deleveryCharges}</span>
            </div>


            <div className="flex justify-between">
              <span>Protect Promise Fee</span>
              <span>₹{promiseFee}</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">
              <span>Total Amount</span>
              <span>₹{finalAmount}</span>
            </div>
          </div>

          <div className="bg-green-50 text-green-700 text-center py-3 font-semibold text-sm border-t">
            {/* 🎉 You'll save ₹{discount + saveMore + coupons} on this order! */}
            🎉 You'll earn 1 Super Gold Coin on every 100 rupees
          </div>
        </div>
      </section>

      {/* ============================
            PAYMENT
      ============================ */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Payment Method</h2>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery (COD)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "Online"}
            onChange={() => setPaymentMethod("Online")}
          />
          Online Payment
        </label>
      </section>

      {/* PLACE ORDER BUTTON */}
      <button
        onClick={placeOrder}
        disabled={
          (paymentMethod === "Online" && !razorpayOrder) || paymentOpening
        }
        className="w-full mt-10 py-4 bg-black text-white rounded-lg text-lg font-semibold disabled:opacity-60"
      >
        {paymentOpening
          ? "Opening Payment..."
          : paymentMethod === "Online" && !razorpayOrder
            ? "Preparing Payment..."
            : "Place Order"}
      </button>

    </div>
  );
}


