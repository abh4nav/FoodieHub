import { CheckCircle, Package, Home } from "lucide-react";

export default function OrderSuccess({ order, onHome }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFBF7] px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-lg">

        <div className="mb-6 flex justify-center">
          <CheckCircle size={75} className="text-green-500" />
        </div>

        <h1 className="mb-3 text-3xl font-extrabold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mb-8 text-gray-500">
          Thank you for ordering from FoodieHub. Your delicious food is on its way!
        </p>

        <div className="mb-6 rounded-2xl bg-orange-50 p-5 text-left">
          <div className="mb-4 flex items-center gap-3">
            <Package className="text-orange-600" />
            <span className="font-semibold">Order Details</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-gray-500">Order ID</span>
              <span className="font-semibold">
                {order._id}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-bold text-orange-600">
                ₹{order.totalAmount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-semibold">
                Cash on Delivery
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Order Status</span>
              <span className="font-semibold text-green-600">
                {order.orderStatus}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onHome}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 py-4 font-bold text-white hover:bg-orange-700"
        >
          <Home size={19} />
          Back to Home
        </button>

      </div>
    </div>
  );
}