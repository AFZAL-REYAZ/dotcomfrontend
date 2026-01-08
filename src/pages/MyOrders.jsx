import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrdersThunk } from "../redux/thunks/orderThunk";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const dispatch = useDispatch();
  const { myOrders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrdersThunk());
  }, []);

  if (loading)
    return <p className="pt-32 text-center text-lg text-gray-700">Loading orders...</p>;

  if (!myOrders || myOrders.length === 0)
    return <p className="pt-32 text-center text-gray-600">No orders found</p>;

  return (
    <div className="max-w-4xl mx-auto pt-20 p-6 min-h-screen bg-white text-black">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      <div className="space-y-6">
        {myOrders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-5 bg-gray-50 shadow-sm"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                {/* <p className="text-gray-700">
                  <span className="font-semibold">Order ID:</span> {order._id}
                </p> */}
                <p className="text-gray-600 text-sm">
                  Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* <span
                className={`px-3 py-1 text-sm rounded font-semibold ${
                  order.orderStatus === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : order.orderStatus === "Shipped"
                    ? "bg-blue-100 text-blue-600"
                    : order.orderStatus === "Confirmed"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {order.orderStatus}
              </span> */}
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center  gap-4">
                  <img
                    src={item.product?.image?.[0]}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.product?.name}</p>
                    <p className="text-gray-600 text-sm">
                      Qty: {item.quantity} • Price: ₹{item.priceAtThatTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-5">
              <p className="font-bold text-lg">Total: ₹{order.totalAmount}</p>

              <Link
                to={`/order/${order._id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                View Order Status →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
