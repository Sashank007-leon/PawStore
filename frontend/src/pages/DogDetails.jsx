import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { Icon } from "@iconify/react";

const DogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const res = await api.get(`/dogs/${id}`);
        setDog(res.data);
      } catch (err) {
        console.error("Failed to fetch dog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500 font-poppins">
        Loading...
      </div>
    );
  }

  if (!dog) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500 font-poppins">
        Dog not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-poppins min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center text-[#E58608] hover:underline font-medium"
      >
        <Icon icon="ic:round-arrow-back" className="mr-1 text-lg" />
        Back to Dogs
      </button>

      {/* Dog Details */}
      <div className="bg-white shadow-xl rounded-3xl border border-[#FFD4A3] p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-center">
        <img
          src={dog.image}
          alt={dog.name}
          className="w-full max-w-xs h-72 object-cover rounded-2xl border-2 border-[#FFD4A3] shadow-sm"
        />

        <div className="flex-1 flex flex-col gap-5 text-left">
          <h2 className="text-3xl font-bold text-[#E58608]">{dog.name}</h2>

          <p className="text-lg text-gray-600">
            <span className="font-semibold text-gray-800">Breed:</span> {dog.breed}
          </p>

          <p className="text-lg text-gray-600">
            <span className="font-semibold text-gray-800">Age:</span>{" "}
            {dog.age} months{dog.age !== 1 ? "s" : ""}
          </p>

          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Price:</span> Rs.{dog.price}
          </p>

          <p className="text-base text-gray-700">
            Come meet <span className="font-semibold">{dog.name}</span> in person and see if
            they’re the perfect match for your family!
          </p>

          <Link
            to="/contact"
            className="mt-4 font-semibold py-3 px-6 rounded-full bg-[#E58608] hover:bg-orange-600 text-white w-fit transition"
          >
            Schedule a Visit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DogDetails;