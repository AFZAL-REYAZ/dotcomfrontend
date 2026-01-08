import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetailsThunk } from "../../redux/thunks/orderThunk";
import axiosInstance from "../../api/axiosInstance";

export default function AdminOrderDetails() {
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
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading order details…
      </div>
    );
  }

  const order = orderDetails;

  /* ✅ READ PRICES DIRECTLY FROM ORDER (DB ONLY) */
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
      a.click();
      window.URL.revokeObjectURL(url);
      // ✅ show popup
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    } catch {
      alert("Failed to download invoice");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow border">

        {/* ================= HEADER ================= */}
        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b bg-slate-50">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>

            <h2 className="mt-2 text-gray-800 font-medium">
              Order #{order._id.slice(-6)}
            </h2>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={downloadInvoice}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
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

        {/* ================= BODY ================= */}
        <div className="p-6 space-y-8">

          {/* ================= STATUS ================= */}
          <div className="bg-white rounded-xl border p-5 text-gray-600">
            <h3 className="font-semibold text-gray-700 mb-4">Order Status</h3>
            <OrderTimeline
              status={order.orderStatus}
              createdAt={order.createdAt}
            />
          </div>

          {/* ================= INFO CARDS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">

            <InfoCard title="Customer Details">
              <Info label="Phone" value={order.address.phone} />
            </InfoCard>

            <InfoCard title="Payment Summary">
              <Info label="Method" value={paymentMethod} />
              <Info label="Status" value={paymentStatus} />
              <Info
                label="Grand Total"
                value={`₹${grandTotal.toFixed(2)}`}
                strong
              />
            </InfoCard>

            <InfoCard title="Delivery Address" full>
              <p className="font-medium text-gray-900">
                {order.address.fullName}
              </p>
              <p className="text-gray-700">
                {order.address.houseNo}, {order.address.area}
              </p>
              <p className="text-gray-700">
                {order.address.city}, {order.address.state}
              </p>
              <p className="text-sm text-gray-500">
                Pincode: {order.address.pincode}
              </p>
            </InfoCard>

          </div>

          {/* ================= ITEMS ================= */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3 text-gray-600">
              Ordered Items
            </h3>

            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-gray-600">
                  <tr>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-center">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={i} className="border-t text-gray-600">
                      <td className="p-3">
                        {item.product?.name || "Product removed"}
                      </td>
                      <td className="p-3 text-center">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-center font-medium">
                        ₹{item.priceAtThatTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= PRICE BREAKUP ================= */}
          <div className="bg-white rounded-xl border p-5 text-gray-600">
            <h3 className="font-semibold text-gray-700 mb-3">
              Price Breakdown
            </h3>

            <Row label="Subtotal" value={subTotal} />
            <Row label="Delivery Charges" value={deliveryCharge} />
            <Row label="CGST (9%)" value={cgst} />
            <Row label="SGST (9%)" value={sgst} />

            {promiseFee > 0 && (
              <Row label="Promise Fee" value={promiseFee} />
            )}

            <hr className="my-3" />
            <Row label="Grand Total" value={grandTotal} bold />
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function InfoCard({ title, children, full }) {
  return (
    <div className={`border rounded-xl p-5 ${full ? "md:col-span-2" : ""}`}>
      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
        {title}
      </h4>
      <div className="text-sm text-gray-700 space-y-1">{children}</div>
    </div>
  );
}

function Info({ label, value, strong }) {
  return (
    <p>
      <span className="text-gray-500">{label}: </span>
      <span className={strong ? "font-semibold text-gray-900" : ""}>
        {value}
      </span>
    </p>
  );
}

const Row = ({ label, value, bold }) => (
  <div className={`flex justify-between mb-2 ${bold ? "font-bold" : ""}`}>
    <span>{label}</span>
    <span>₹{Number(value).toFixed(2)}</span>
  </div>
);

/* ================= ORDER TIMELINE ================= */

function OrderTimeline({ status, createdAt }) {
  const steps = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const activeIndex = steps.indexOf(status);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step} className="flex gap-4 text-gray-600">
          <div className="flex flex-col items-center">
            <div
              className={`w-3 h-3 rounded-full ${
                index <= activeIndex ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            {index !== steps.length - 1 && (
              <div
                className={`w-[2px] h-8 ${
                  index <= activeIndex ? "bg-green-300" : "bg-gray-200"
                }`}
              />
            )}
          </div>

          <div>
            <p
              className={`text-sm font-medium ${
                index <= activeIndex
                  ? "text-gray-900"
                  : "text-gray-400"
              }`}
            >
              {step}
            </p>
            {index === activeIndex && (
              <p className="text-xs text-gray-600">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
