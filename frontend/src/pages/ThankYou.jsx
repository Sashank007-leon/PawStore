import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your order has been placed successfully and will be delivered soon.
      </p>
      <Link
        to="/"
        className="text-white bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-medium"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYou;
