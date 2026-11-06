
import { useEffect, useState } from "react";
import { ArrowLeft, Package } from "lucide-react";
import API from "../services/api";

export default function ManageOrders({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statuses = [
    "Placed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  // Fetch all customer orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders/all");
        setOrders(response.data.orders);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await API.patch(
        `/orders/${orderId}/status`,
        { orderStatus: newStatus }
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? response.data.order : order
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to update order status."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Orders
          </h1>
          <p className="mt-2 text-gray-500">
            View customer orders and update their delivery status.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : orders.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <Package className="mx-auto mb-3 text-gray-400" size={40} />
            <p className="text-gray-600">No orders found yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap justify-between gap-4 border-b pb-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Order #{order._id.slice(-8)}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-orange-600">
                      ₹{order.totalAmount}
                    </p>
                    <p className="text-sm text-gray-500">
                      Cash on Delivery
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 py-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-800">
                      Customer Details
                    </h3>
                    <p className="text-sm text-gray-600">
                      Name: {order.user?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Email: {order.user?.email || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: {order.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      Address: {order.deliveryAddress}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-gray-800">
                      Ordered Items
                    </h3>
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {item.name} × {item.quantity} — ₹
                        {item.price * item.quantity}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                  <span className="font-medium text-gray-700">
                    Order Status
                  </span>

                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-orange-500"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
