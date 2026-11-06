import { useState } from "react";
import { MapPin, Phone, CreditCard, ArrowLeft } from "lucide-react";

export default function Checkout({ cartItems, cartSubtotal, onBack, onPlaceOrder }) {
  const [formData, setFormData] = useState({
    phone: "",
    deliveryAddress: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder(formData);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] px-4 py-10">
      <div className="mx-auto max-w-6xl">

        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 font-semibold text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </button>

        <h1 className="mb-2 text-3xl font-extrabold">
          Checkout
        </h1>

        <p className="mb-8 text-gray-500">
          Complete your details to place your order.
        </p>

        <div className="grid gap-8 md:grid-cols-3">

          {/* Delivery Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl bg-white p-6 shadow-sm md:col-span-2"
          >
            <h2 className="text-xl font-bold">Delivery Details</h2>

            <div>
              <label className="mb-2 block font-medium">
                Phone Number
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4">
                <Phone size={18} className="text-gray-400" />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full py-3 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Delivery Address
              </label>

              <div className="flex items-start gap-3 rounded-xl border border-gray-300 px-4">
                <MapPin size={18} className="mt-3 text-gray-400" />

                <textarea
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="House number, street, area, city, PIN code"
                  rows={4}
                  className="w-full resize-none py-3 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold">
                Payment Method
              </h2>

              <div className="flex items-center gap-3 rounded-xl border-2 border-orange-500 bg-orange-50 p-4">
                <CreditCard className="text-orange-600" />

                <div>
                  <p className="font-semibold">
                    Cash on Delivery
                  </p>
                  <p className="text-sm text-gray-500">
                    Pay when your food arrives.
                  </p>
                </div>

                <span className="ml-auto h-4 w-4 rounded-full border-4 border-orange-600" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-orange-600 py-4 font-bold text-white hover:bg-orange-700"
            >
              Place Order · ₹{cartSubtotal}
            </button>
          </form>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-between border-t pt-4 text-lg font-bold">
              <span>Total</span>
              <span>₹{cartSubtotal}</span>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Payment will be collected upon delivery.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}