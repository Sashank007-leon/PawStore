import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import BREEDS from "../data/breedOptions";

const Dogs = () => {
  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    breed: "",
    minPrice: "",
    maxPrice: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const res = await api.get("/dogs");
        setDogs(res.data);
      } catch (err) {
        console.error("Failed to fetch dogs:", err);
      }
    };
    fetchDogs();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const breed = params.get("breed") || "";
    const search = params.get("search") || "";

    setFilters((prev) => ({
      ...prev,
      breed,
      search,
    }));
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [dogs, filters]);

  const applyFilters = () => {
    let result = [...dogs];

    if (filters.search) {
      result = result.filter((dog) =>
        dog.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.breed) {
      result = result.filter((dog) => dog.breed === filters.breed);
    }

    if (filters.minPrice) {
      result = result.filter((dog) => dog.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((dog) => dog.price <= Number(filters.maxPrice));
    }

    setFilteredDogs(result);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      breed: "",
      minPrice: "",
      maxPrice: "",
    });
    navigate("/dogs");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto font-poppins min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#E58608] text-center">
        Available Dogs
      </h1>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="border border-gray-300 px-4 py-2 rounded-md flex-1"
          />
          <select
            value={filters.breed}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, breed: e.target.value }))
            }
            className="border border-gray-300 px-4 py-2 rounded-md flex-1"
          >
            <option value="">All Breeds</option>
            {BREEDS.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
            }
            className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-[#E58608]"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
            }
            className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-[#E58608]"
          />
          <button
            onClick={resetFilters}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Dog Cards */}
      {filteredDogs.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-20">
          No dogs found matching your filters.
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredDogs.map((dog) => (
            <div
              key={dog._id}
              className="bg-white border border-[#FFD4A3] rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer p-5"
              onClick={() => navigate(`/dogs/${dog._id}`)}
            >
              <img
                src={dog.image}
                alt={dog.name}
                className="w-full h-52 object-cover rounded-xl border border-[#FFD4A3] mb-4"
              />
              <h2 className="text-xl font-bold text-[#E58608]">{dog.name}</h2>
              <p className="text-gray-700 text-sm mt-1">
                <span className="font-semibold">Breed:</span> {dog.breed}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Age:</span> {dog.age} months
              </p>
              <p className="text-gray-800 font-bold text-lg mt-2">
                Rs.{dog.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dogs;
