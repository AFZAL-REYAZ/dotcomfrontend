import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const { successOrder } = useSelector((state) => state.order);
  const location = useLocation();

  // orderId from navigation (optional)
  const orderId = successOrder?._id || location.state?.orderId;

  // address snapshot
  const address = successOrder?.address;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-gray-50 px-6">
      
      {/* Success Icon */}
      <div className="bg-green-600 text-white rounded-full p-6 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-green-700">Order Placed Successfully!</h2>

      {/* Order ID */}
      {orderId && (
        <p className="mt-2 text-lg text-gray-600">
          Your Order ID: <span className="font-semibold">{orderId}</span>
        </p>
      )}

      {/* Address */}
      {address && (
        <div className="bg-white p-5 rounded-lg shadow-md mt-6 w-full max-w-md text-gray-800">
          <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
          <p>{address.fullName}</p>
          <p>{address.houseNo}, {address.area}</p>
          <p>{address.city}, {address.state} - {address.pincode}</p>
          <p className="text-gray-600">Phone: {address.phone}</p>
        </div>
      )}

      {/* Continue Shopping */}
      <Link
        to="/"
        className="mt-8 bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
