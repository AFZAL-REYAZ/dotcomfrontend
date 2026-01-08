import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchAddresses, deleteAddress } from "../redux/thunks/addressThunk";
import {
  getCheckoutSummaryThunk,
  placeOrderThunk,
} from "../redux/thunks/orderThunk";
import {
  createPaymentOrderThunk,
  verifyPaymentThunk,
} from "../redux/thunks/paymentThunk";
import { clearCart } from "../redux/slices/cartSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= REDUX STATE ================= */
  const { checkoutSummary } = useSelector((state) => state.order);
  const { addresses } = useSelector((state) => state.address);
  const { loading: paymentLoading } = useSelector((state) => state.payment);

  /* ================= LOCAL STATE ================= */
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [razorpayOrder, setRazorpayOrder] = useState(null);
  const [paymentOpening, setPaymentOpening] = useState(false);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(getCheckoutSummaryThunk());
  }, [dispatch]);

  /* ================= AUTO SELECT DEFAULT ADDRESS ================= */
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr ? defaultAddr._id : addresses[0]._id);
    }
  }, [addresses]);



  /* ================= PRICE DATA FROM BACKEND ================= */
  const {
  items = [],
  price = {},
} = checkoutSummary || {};

const {
  subTotal = 0,
  deliveryCharge = 0,
  promiseFee = 0,
  cgst = 0,
  sgst = 0,
  grandTotal = 0,
} = price || {};

  const finalAmount = grandTotal;

  /* ================= CREATE RAZORPAY ORDER ================= */
  useEffect(() => {
    if (paymentMethod === "Online" && finalAmount > 0) {
      dispatch(createPaymentOrderThunk({ amount: finalAmount })).then((res) => {
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

  if (!checkoutSummary) {
    return <p className="mt-10 text-center text-gray-600">Loading checkout…</p>;
  }
  /* ================= PLACE ORDER ================= */
  const placeOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    // 🔴 COD
    if (paymentMethod === "COD") {
      dispatch(
        placeOrderThunk({
          addressId: selectedAddress,
          paymentMethod: "COD",
        })
      ).then((res) => {
        if (!res.error){
          dispatch(clearCart());
          navigate("/order-success");
        }
      });
      return;
    }

    // 🟢 ONLINE
    if (!razorpayOrder) {
      alert("Preparing payment, please wait...");
      return;
    }

    if (paymentOpening) return;
    setPaymentOpening(true);

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
        dispatch(clearCart()); 
        navigate("/order-success");
      },

      theme: { color: "#000000" },
    };

    if (!window.Razorpay) {
      alert("Payment service not loaded");
      setPaymentOpening(false);
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", () => {
      alert("Payment failed");
      setPaymentOpening(false);
    });

    rzp.open();
  };

  return (
    <div className="max-w-4xl mx-auto pt-20 p-6">

      {/* ================= ADDRESS ================= */}
      <section className="mb-8">
        <div className="flex justify-between mb-3 text-gray-600">
          <h2 className="text-xl font-semibold text-gray-600">Delivery Address</h2>
          <button
            onClick={() => navigate("/add-address")}
            className="px-4 py-2 border rounded text-gray-600"
          >
            + Add Address
          </button>
        </div>

        {addresses.map((address) => (
          <label
            key={address._id}
            className={`flex gap-4 p-4 border rounded mb-3 text-gray-600 cursor-pointer ${
              selectedAddress === address._id
                ? "border-black bg-gray-100"
                : ""
            }`}
          >
            <input
              type="radio"
              checked={selectedAddress === address._id}
              onChange={() => setSelectedAddress(address._id)}
            />
            <div className="flex-1 text-gray-600">
              <p className="font-semibold ">{address.fullName}</p>
              <p>{address.houseNo}, {address.area}</p>
              <p>{address.city}, {address.state} - {address.pincode}</p>
              <p className="text-sm">Phone: {address.phone}</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteAddress(address._id));
              }}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </label>
        ))}
      </section>

      {/* ================= ITEMS ================= */}
      <section className="mb-8 text-gray-600">
        <h2 className="text-xl font-semibold mb-3">Order Items</h2>
        {items.map((item, i) => (
          <div key={i} className="flex justify-between border-b py-3">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.total}</span>
          </div>
        ))}
      </section>

      {/* ================= PRICE ================= */}
      <section className="bg-gray-50 p-5 rounded text-gray-600">
        <Row label="Subtotal" value={subTotal} />
        <Row label="Delivery Charges" value={deliveryCharge} />
        <Row label="CGST (9%)" value={cgst} />
        <Row label="SGST (9%)" value={sgst} />

        {promiseFee > 0 && (
          <Row label="Promise Fee" value={promiseFee} />
        )}

        <hr className="my-3" />

        <Row label="Grand Total" value={grandTotal} bold />


        {/* ================= PAYMENT ================= */}
        <div className="mt-6 space-y-3">
          <label className="flex gap-3">
            <input
              type="radio"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label className="flex gap-3">
            <input
              type="radio"
              checked={paymentMethod === "Online"}
              onChange={() => setPaymentMethod("Online")}
            />
            Online Payment
          </label>
        </div>

        <button
          onClick={placeOrder}
          disabled={paymentLoading}
          className="w-full mt-4 bg-black text-white py-3 rounded"
        >
          {paymentMethod === "COD" ? "Place Order" : "Proceed to Pay"}
        </button>
      </section>
    </div>
  );
}

/* ================= ROW ================= */
const Row = ({ label, value, bold }) => (
  <div className={`flex justify-between mb-2 ${bold ? "font-bold" : ""}`}>
    <span>{label}</span>
    <span>₹{Number(value).toFixed(2)}</span>
  </div>
);
