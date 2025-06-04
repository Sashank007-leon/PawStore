import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import ACCESSORIES from "../data/accessoryOptions";

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const res = await api.get("/accessories");
        setAccessories(res.data);
        setFilteredAccessories(res.data);
      } catch (err) {
        console.error("Failed to fetch accessories:", err);
      }
    };
    fetchAccessories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let result = [...accessories];

    if (filters.search) {
      result = result.filter((acc) =>
        acc.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((acc) => acc.category === filters.category);
    }

    if (filters.minPrice) {
      result = result.filter((acc) => acc.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((acc) => acc.price <= Number(filters.maxPrice));
    }

    setFilteredAccessories(result);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto font-poppins min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#E58608] text-center">
        Accessories
      </h1>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-[#E58608]"
          />

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-[#E58608]"
          >
            <option value="">All Categories</option>
            {ACCESSORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
            className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-[#E58608]"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
            className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-[#E58608]"
          />

          <button
            onClick={resetFilters}
            className="bg-gray-100 hover:bg-gray-200 text-sm font-medium px-4 py-2 rounded-md text-gray-800 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Accessories List */}
      {filteredAccessories.length === 0 ? (
        <div className="text-center text-gray-600 py-20 text-lg">
          No accessories found.
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAccessories.map((acc) => (
            <div
              key={acc._id}
              onClick={() => navigate(`/accessories/${acc._id}`)}
              className="bg-white border border-[#FFD4A3] rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer p-4"
            >
              <img
                src={acc.image}
                alt={acc.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-[#E58608]">
                  {acc.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Category: {acc.category}
                </p>
                <p className="text-lg font-bold text-gray-800 mt-2">
                  Rs.{acc.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accessories;