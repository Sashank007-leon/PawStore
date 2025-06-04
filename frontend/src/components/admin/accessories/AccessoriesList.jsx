import React, { useEffect, useState, useContext } from "react";
import api from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import AccessoryForm from "./AccessoryForm";
import { Icon } from "@iconify/react";

const AccessoriesList = () => {
  const [accessories, setAccessories] = useState([]);
  const [editingAccessory, setEditingAccessory] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const token = user?.token || JSON.parse(localStorage.getItem("user"))?.token;

  const fetchAccessories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/accessories");
      setAccessories(res.data);
    } catch (err) {
      alert("Failed to fetch accessories");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  const handleSave = async (accessory) => {
    try {
      if (accessory._id) {
        await api.put(`/accessories/${accessory._id}`, accessory, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/accessories", accessory, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setEditingAccessory(null);
      fetchAccessories();
    } catch (err) {
      alert(
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        "Failed to save accessory"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this accessory?")) return;
    try {
      await api.delete(`/accessories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAccessories();
    } catch {
      alert("Failed to delete accessory");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-bold font-poppins text-[#E58608]">Accessories</h3>
        <button
          className="flex items-center gap-2 bg-[#E58608] text-white px-5 py-2 rounded-xl font-medium shadow hover:bg-[#cf7605]"
          onClick={() => setEditingAccessory({})}
        >
          <Icon icon="ic:round-add" className="text-xl" />
          Add Accessory
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-600 text-lg">Loading accessories...</div>
      ) : accessories.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-xl font-medium">
          No accessories found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessories.map((accessory) => (
            <div
              key={accessory._id}
              className="bg-white border border-[#FFD4A3] rounded-3xl shadow-lg p-6"
            >
              {accessory.image && (
                <img
                  src={accessory.image}
                  alt={accessory.name}
                  className="w-full h-44 object-cover rounded-xl border border-[#FFD4A3] mb-4"
                />
              )}
              <h4 className="text-2xl font-semibold text-[#E58608] mb-1">{accessory.name}</h4>
              <div className="text-lg font-bold text-gray-700 mb-1">Rs. {accessory.price}</div>
              <div
                className={`text-sm mb-4 ${
                  accessory.stock < 5 ? "text-red-500" : "text-gray-700"
                }`}
              >
                Stock: {accessory.stock}
              </div>
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-[#FFD4A3] text-[#5c3b00] font-medium py-1.5 rounded-xl hover:bg-[#ffc37e]"
                  onClick={() => setEditingAccessory(accessory)}
                >
                  Edit
                </button>
                <button
                  className="flex-1 bg-red-200 text-red-700 font-medium py-1.5 rounded-xl hover:bg-red-300"
                  onClick={() => handleDelete(accessory._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingAccessory !== null && (
        <AccessoryForm
          initial={editingAccessory}
          onSave={handleSave}
          onCancel={() => setEditingAccessory(null)}
        />
      )}
    </div>
  );
};

export default AccessoriesList;