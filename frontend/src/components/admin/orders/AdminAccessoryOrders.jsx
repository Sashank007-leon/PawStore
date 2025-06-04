import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

const AdminAccessoryOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/admin", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to fetch orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(
        `/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success(`Order marked as ${status}`);
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success("Order deleted");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto font-poppins">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#E58608]">Accessory Orders</h1>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 text-lg">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-gray-600 text-xl font-medium">
          No accessory orders found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-[#FFD4A3] rounded-3xl p-6 shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold text-lg mb-1 text-[#E58608]">
                    Order ID: {order._id}
                  </p>
                  <p className="text-gray-700">
                    User: {order.user?.name || "Unknown"}
                  </p>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold h-fit ${
                    statusColors[order.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-gray-800 font-medium"
                  >
                    <p>
                      {item.name} × {item.quantity}
                    </p>
                    <p>Rs. {item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <p className="text-right font-semibold text-gray-900 text-lg">
                Total: Rs. {order.totalAmount}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {order.status === "Pending" && (
                  <button
                    onClick={() => updateStatus(order._id, "Accepted")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
                  >
                    <Icon icon="mdi:check" className="inline mr-1" />
                    Accept
                  </button>
                )}
                {order.status === "Accepted" && (
                  <button
                    onClick={() => updateStatus(order._id, "Completed")}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
                  >
                    <Icon icon="mdi:check-circle" className="inline mr-1" />
                    Complete
                  </button>
                )}
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition flex items-center gap-1"
                >
                  <Icon icon="ic:baseline-delete" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAccessoryOrders;
