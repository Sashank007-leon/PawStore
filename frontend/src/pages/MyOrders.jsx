import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/get-orders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(data || []); 
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-poppins min-h-[70vh]">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
        My Orders
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl shadow-md p-6 bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p
                    className={`inline-block px-3 py-1 text-sm rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold text-lg text-amber-600">
                    Rs.{order.totalAmount}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Items Ordered</p>
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="py-2 flex justify-between items-center"
                    >
                      <span className="font-medium text-gray-700">
                        {item.name} (x{item.quantity})
                      </span>
                      <span className="text-gray-600">Rs.{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;