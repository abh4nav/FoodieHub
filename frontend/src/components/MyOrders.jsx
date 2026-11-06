import { useEffect, useState } from "react";
import { Package, ArrowLeft, Clock } from "lucide-react";
import API from "../services/api";

export default function MyOrders({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders/my-orders");
        setOrders(response.data.orders);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Preparing":
        return "bg-yellow-100 text-yellow-700";
      case "Out for Delivery":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 font-semibold text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold">My Orders</h1>
          <p className="mt-2 text-gray-500">
            View your previous orders and track their status.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500">
            Loading your orders...
          </div>
        ) : error ? (
          <div className="rounded-xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <Package size={55} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-bold">No orders yet</h2>
            <p className="mt-2 text-gray-500">
              Your delicious food orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-bold">{order._id}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(order.orderStatus)}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div className="space-y-3 py-5">
                  {order.items.map((item, index) => (
                    <div
                      key={`${order._id}-${index}`}
                      className="flex justify-between gap-4"
                    >
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Payment: {order.paymentMethod === "COD"
                        ? "Cash on Delivery"
                        : order.paymentMethod}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      <Clock size={14} className="mr-1 inline" />
                      Payment status: {order.paymentStatus}
                    </p>
                  </div>

                  <p className="text-lg font-extrabold text-orange-600">
                    Total: ₹{order.totalAmount}
                  </p>
                </div>

                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Delivery Address
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {order.deliveryAddress}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}