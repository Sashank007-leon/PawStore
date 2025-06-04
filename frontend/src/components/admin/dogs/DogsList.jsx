import React, { useEffect, useState, useContext } from "react";
import DogForm from "./DogForm";
import api from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import { Icon } from "@iconify/react";

const DogsList = () => {
  const [dogs, setDogs] = useState([]);
  const [editingDog, setEditingDog] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const token = user?.token || JSON.parse(localStorage.getItem("user"))?.token;

  const fetchDogs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/dogs");
      setDogs(res.data);
    } catch (err) {
      alert("Failed to fetch dogs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const handleSave = async (dog) => {
    try {
      if (dog._id) {
        await api.put(`/dogs/${dog._id}`, dog, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/dogs", dog, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setEditingDog(null);
      fetchDogs();
    } catch (err) {
      alert(
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        "Failed to save dog"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this dog?")) return;
    try {
      await api.delete(`/dogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDogs();
    } catch {
      alert("Failed to delete dog");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-bold font-poppins text-[#E58608]">Dogs</h3>
        <button
          className="flex items-center gap-2 bg-[#E58608] text-white px-5 py-2 rounded-xl font-medium shadow hover:bg-[#cf7605]"
          onClick={() => setEditingDog({})}
        >
          <Icon icon="ic:round-add" className="text-xl" />
          Add Dog
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-600 text-lg">Loading dogs...</div>
      ) : dogs.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-xl font-medium">
          No dogs found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dogs.map((dog) => (
            <div
              key={dog._id}
              className="bg-white border border-[#FFD4A3] rounded-3xl shadow-lg p-6 text-center"
            >
              <img
                src={dog.image}
                alt={dog.name}
                className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-[#FFD4A3] mb-4"
              />
              <h4 className="text-xl font-semibold text-[#E58608] mb-1">{dog.name}</h4>
              <div className="text-gray-700 mb-1">Breed: {dog.breed}</div>
              <div className="text-gray-700 mb-1">Age: {dog.age} months</div>
              <div className="text-[#E58608] font-bold mb-4">Rs. {dog.price}</div>
              <div className="flex gap-3 justify-center">
                <button
                  className="bg-[#FFD4A3] text-[#5c3b00] font-medium px-4 py-1.5 rounded-xl hover:bg-[#ffc37e]"
                  onClick={() => setEditingDog(dog)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-200 text-red-700 font-medium px-4 py-1.5 rounded-xl hover:bg-red-300"
                  onClick={() => handleDelete(dog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingDog !== null && (
        <DogForm
          initial={editingDog}
          onSave={handleSave}
          onCancel={() => setEditingDog(null)}
        />
      )}
    </div>
  );
};

export default DogsList;