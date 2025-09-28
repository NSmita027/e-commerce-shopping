import React, { useEffect, useState } from 'react';
import api from "../services/api";
import { useAuth } from '../context/AuthContext';


const OrdersPage = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const {data} = await api.get("/orders/myorders", {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setOrders(data);
            } catch (err){
                console.error("Error fetching orders:", err);
            }
        };

        if (token) fetchOrders();
    }, [token]);


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-white to-blue-300 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-10 drop-shadow">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt="No Orders"
              className="w-28 h-28 mx-auto mb-6 opacity-80"
            />
            <p className="text-lg font-medium text-gray-700 mb-2">
              No orders found.
            </p>
            <p className="text-sm text-gray-500">
              Looks like you haven’t placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-white via-blue-50 to-white shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">
                      Order ID:
                    </span>{" "}
                    {order._id}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-green-700">
                    Total: ₹{order.totalPrice}
                  </p>
                  <span
           className={`px-4 py-1 rounded-full text-sm font-bold shadow-md ${
                order.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "delivered"
                  ? "bg-blue-100 text-blue-700"
                  : order.status === "shipped"
                  ? "bg-pink-100 text-pink-500"
                  : order.status === "processing"
                  ? "bg-purple-100 text-purple-700"
                  : order.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700" // default fallback
              }`}
             >
                   {order.status}
                </span>
                </div>

                <div className="mt-4">
                  <strong className="text-gray-700">Items:</strong>
                  <ul className="list-disc pl-6 mt-2 text-gray-600 space-y-1">
                    {order.orderItems
                    .filter(item => item.product?.title || item.name) // skip empty ones
                    .map((item, i) => (
                       <li key={i} className="text-sm">
                         {item.product?.title || item.title}{" "}
                         <span className="text-gray-500">(x{item.quantity})</span> -{" "}
                         <span className="font-medium text-indigo-700">
                           ₹{((item.product?.price || item.price || 0) * item.quantity)}
                         </span>
                       </li>
                     ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage
