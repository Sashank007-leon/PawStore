import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../api/axios";

const Checkout = () => {
  const { cart, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, address } = formData;

    if (!name || !phone || !address) {
      toast.error("Please fill in all the fields.");
      return;
    }

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name || item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        shipping: { name, phone, address },
        totalAmount: totalPrice,
      };

      await api.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast.success("Order placed successfully with Cash on Delivery!");
      clearCart();
      navigate("/thank-you");
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("Failed to place the order. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Your cart is empty. Add items before checking out.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6 border"
      >
        {/* Shipping Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Shipping Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 h-24"
            required
          />
        </div>

        {/* Order Summary */}
        <div className="border-t pt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between text-gray-800">
              <span>
                {item.name || item.title} x {item.quantity}
              </span>
              <span>Rs.{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg text-green-700">
            <span>Total:</span>
            <span>Rs.{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Payment Method</h2>
          <label className="flex items-center gap-2 text-gray-800">
            <input type="radio" checked readOnly />
            Cash on Delivery (COD)
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium mt-4 w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;