import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Icon } from "@iconify/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const AccessoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accessory, setAccessory] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, cart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAccessory = async () => {
      try {
        const res = await api.get(`/accessories/${id}`);
        setAccessory(res.data);
      } catch (err) {
        console.error("Failed to fetch accessory:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessory();
  }, [id]);

  const getCartQuantity = () => {
    const item = cart.find((item) => item._id === accessory._id);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.info("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    if (getCartQuantity() < accessory.stock) {
      addToCart({ ...accessory, type: "accessory" });
      toast.success("Accessory added to cart!");
    } else {
      toast.warning("No more stock available.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500">
        Loading...
      </div>
    );
  }

  if (!accessory) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        Accessory not found.
      </div>
    );
  }

  const isOutOfStock = accessory.stock <= getCartQuantity();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-poppins min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center text-[#E58608] hover:underline font-medium"
      >
        <Icon icon="ic:round-arrow-back" className="mr-1 text-lg" />
        Back to Accessories
      </button>

      <div className="bg-white shadow-xl rounded-3xl border border-[#FFD4A3] p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-center">
        <img
          src={accessory.image}
          alt={accessory.name}
          className="w-full max-w-xs h-72 object-cover rounded-2xl border-2 border-[#FFD4A3] shadow-sm"
        />
        <div className="flex-1 flex flex-col gap-5 text-left">
          <h2 className="text-3xl font-bold text-[#E58608]">{accessory.name}</h2>
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-gray-800">Category:</span> {accessory.category}
          </p>
          <p className="text-base text-gray-700">{accessory.description}</p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Price:</span> Rs.{accessory.price}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Stock:</span>{" "}
            {accessory.stock - getCartQuantity()} available
          </p>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`mt-4 font-semibold py-3 px-6 rounded-full w-fit transition ${
              isOutOfStock
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#E58608] hover:bg-orange-600 text-white"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessoryDetails;