import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAdminThunk,
  updateOrderStatusThunk,
} from "../../redux/thunks/adminOrderThunk";
import { useNavigate } from "react-router-dom";

export default function AdminOrderDashboard() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllOrdersAdminThunk());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatusThunk({ orderId, status }));
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 ">
      <div className="max-w-7xl mx-auto pt-20">

        {/* HEADER */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Admin Order Management
        </h2>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center text-gray-600">
              Loading orders...
            </div>
          ) : (
            <table className="w-full text-sm text-gray-800">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    User
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Update Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-10 text-center text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td
                        className="px-4 py-3 font-medium text-blue-600 cursor-pointer"
                        onClick={() => navigate(`/admin/orders/${order._id}`)}
                      >
                        #{order._id.slice(-6)}
                      </td>

                      <td className="px-4 py-3">
                        {order.user?.mobile || "—"}
                      </td>

                      <td className="px-4 py-3 font-semibold text-gray-900">
                        ₹{order.totalAmount}
                      </td>

                      <td className="px-4 py-3 capitalize">
                        {order.paymentMethod}
                      </td>

                      <td className="px-4 py-3">
                        <StatusBadge status={order.orderStatus} />
                      </td>

                      <td className="px-4 py-3">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option>Pending</option>
                          <option>Confirmed</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }) {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}
