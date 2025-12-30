import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetailsThunk } from "../../redux/thunks/orderThunk";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderDetails, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderDetailsThunk(id));
  }, [dispatch, id]);

  if (loading || !orderDetails) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const order = orderDetails;

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6 pt-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Order Details #{order._id.slice(-6)}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600"
          >
            ← Back
          </button>
        </div>

        {/* CUSTOMER INFO */}
        <Section title="Customer">
          <p>Phone: {order.address.phone}</p>
        </Section>

        {/* ADDRESS */}
        <Section title="Delivery Address">
          <p>{order.address.fullName}</p>
          <p>{order.address.houseNo}, {order.address.area}</p>
          <p>{order.address.city}, {order.address.state}</p>
          <p>Pincode: {order.address.pincode}</p>
        </Section>

        {/* ITEMS */}
        <Section title="Ordered Items">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Product</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-2">{item.product?.name}</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-center">₹{item.priceAtThatTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* PAYMENT */}
        <Section title="Payment">
          <p>Method: {order.paymentMethod}</p>
          <p>Status: {order.paymentStatus}</p>
          <p>Total Amount: ₹{order.totalAmount}</p>
        </Section>

        {/* ORDER STATUS */}
        <Section title="Order Status">
          <span className="px-3 py-1 rounded-full bg-gray-200 text-sm">
            {order.orderStatus}
          </span>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className="text-gray-700 space-y-1">{children}</div>
    </div>
  );
}
