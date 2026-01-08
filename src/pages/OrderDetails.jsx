import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetailsThunk } from "../redux/thunks/orderThunk";
import axiosInstance from "../api/axiosInstance";

export default function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);


  const { orderDetails, fetchingOrderDetails } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getOrderDetailsThunk(id));
  }, [dispatch, id]);

  if (fetchingOrderDetails || !orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  const order = orderDetails;

  /* ✅ READ DIRECTLY FROM ORDER (DB) */
  const {
    subTotal,
    gstAmount,
    deliveryCharge,
    promiseFee = 0,
    grandTotal,
    paymentMethod,
    paymentStatus,
  } = order;

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  /* ================= DOWNLOAD INVOICE ================= */
const downloadInvoice = async () => {
  try {
    const res = await axiosInstance.get(
      `/orders/invoice/${order._id}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${order._id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
     // ✅ show popup
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  } catch (err) {
    console.error("Invoice download failed:", err);
    alert("Failed to download invoice");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-20 pb-10">
      <div className="max-w-4xl mx-auto space-y-6 text-gray-600">

        {/* HEADER */}
        <div className="bg-white rounded-xl border p-5 flex justify-between items-center text-gray-600">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Order #{order._id.slice(-6)}
            </h2>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>
        </div>

        {/* ITEMS */}
        <div className="bg-white rounded-xl border p-5 text-gray-600">
          <h3 className="font-semibold text-gray-700 mb-4">Items</h3>

          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between border-b py-3 text-gray-600">
              <div>
                <p className="font-medium text-gray-800">
                  {item.product?.name || "Product"}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-gray-800">
                ₹{item.priceAtThatTime}
              </p>
            </div>
          ))}
        </div>

        {/* ADDRESS */}
        <div className="bg-white rounded-xl border p-5 text-gray-600">
          <h3 className="font-semibold text-gray-700 mb-3">Delivery Address</h3>

          <p className="font-medium text-gray-800">
            {order.address.fullName}
          </p>
          <p className="text-sm text-gray-600">
            {order.address.houseNo}, {order.address.area}
          </p>
          <p className="text-sm text-gray-600">
            {order.address.city}, {order.address.state} -{" "}
            {order.address.pincode}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Phone: {order.address.phone}
          </p>
        </div>

        {/* PRICE SUMMARY (DB ONLY) */}
        <div className="bg-white rounded-xl border p-5 text-gray-600">
          <h3 className="font-semibold text-gray-700 mb-3">Price Details</h3>

          <Row label="Subtotal" value={subTotal} />
          <Row label="Delivery Charges" value={deliveryCharge} />
          <Row label="CGST (9%)" value={cgst} />
          <Row label="SGST (9%)" value={sgst} />

          {promiseFee > 0 && (
            <Row label="Promise Fee" value={promiseFee} />
          )}

          <hr className="my-3" />

          <Row label="Grand Total" value={grandTotal} bold />

          <div className="mt-4 text-sm text-gray-600">
            Payment Method:{" "}
            <span className="font-medium">{paymentMethod}</span>
          </div>
          <div className="text-sm text-gray-600">
            Payment Status:{" "}
            <span className="font-medium">{paymentStatus}</span>
          </div>
        </div>

        {/* INVOICE */}
        <button
          onClick={downloadInvoice}
          className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Download Invoice
        </button>
        {showToast && (
          <div className="
            fixed top-6 right-6 z-50
            bg-green-600 text-white
            px-5 py-3 rounded-lg
            shadow-lg
            animate-fade-in
          ">
            ✅ Invoice downloaded successfully
          </div>
        )}


      </div>
    </div>
  );
}

/* ================= PRICE ROW ================= */
const Row = ({ label, value, bold }) => (
  <div className={`flex justify-between mb-2 ${bold ? "font-bold" : ""}`}>
    <span>{label}</span>
    <span>₹{Number(value).toFixed(2)}</span>
  </div>
);
