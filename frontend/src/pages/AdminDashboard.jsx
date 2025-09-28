import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';


const AdminDashboard = () => {

    const {token, user} = useAuth();
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    //new states for editing

    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({title: "", price: ""});

    useEffect(()=> {
        const fetchData = async() => {
            try{
                const {data} = await api.get("/admin/products", {
                    headers:{Authorization: `Bearer ${token}`},
                });

                setProducts(data.products || []);
                const orderRes = await api.get("/admin/orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(orderRes.data.orders || []);
            } catch(err){
                console.error("Admin fetch error", err);
            }
        };
        if (user?.role === "admin") fetchData();
    }, [token, user]);

    if (user?.role !== "admin" ){
        return <p className='text-red-500 text-center text-2xl'>Access Denied</p>
    }

    const handleDelete = async(id) => {
        try{
            await api.delete(`/products/${id}`,{
                headers: {Authorization: `Bearer ${token}`},
            });
            setProducts(products.filter((p) => p._id !== id));
        } catch (err) {
            console.error("Delete product error", err);
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product._id);
        setFormData({title: product.title, price: product.price});
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleUpdate = async(id) => {
        try{
            const {data} = await api.put(`/products/${id}`, formData, {
                headers: {Authorization: `Bearer ${token}`},
            });

            setProducts(products.map((p) => (p._id === id ? data.product : p)));
            setEditingProduct(null);
        } catch(err){
            console.error("Update product error", err);
        }
    };


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-white to-blue-400 p-8">
        <div className='max-w-6xl mx-auto'>
      <h1 className='text-4xl font-extrabold text-gray-800 text-center mb-12 drop-shadow-sm'>Admin Dashboard</h1>

      <section className='mb-12 bg-white shadow-lg rounded-2xl p-6'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-6 border-b pb-3'>Products</h2>
        <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-200 to-purple-200 text-gray-700">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, idx) => (
                  <tr
                    key={p._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-indigo-50 transition`}
                  >
                    <td className="p-3 text-sm text-gray-600">{p._id}</td>

                    {/* Editable cells */}
                    <td className="p-3">
                      {editingProduct === p._id ? (
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="border p-2 rounded w-full focus:ring focus:ring-indigo-300"
                        />
                      ) : (
                        <span className="font-medium">{p.title}</span>
                      )}
                    </td>
                    <td className="p-3">
                      {editingProduct === p._id ? (
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className="border p-2 rounded w-full focus:ring focus:ring-indigo-300"
                        />
                      ) : (
                        <span className="text-gray-700">₹{p.price}</span>
                      )}
                    </td>

                    <td className="p-3">
                      {editingProduct === p._id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdate(p._id)}
                            className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg text-white shadow"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded-lg text-white shadow"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg text-white shadow"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white shadow"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </section>

      {/* Orders Section */}
        <section className="bg-white shadow-lg rounded-2xl p-6">
  <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">
    Orders
  </h2>
  <ul className="space-y-3">
    {orders.map((o) => (
      <li
        key={o._id}
        className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-800 font-medium">
              Order #{o._id} -{" "}
              <span className="text-indigo-600 font-semibold">
                ₹{o.totalPrice}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Placed on: {new Date(o.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Dropdown for status */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700 font-medium">
              Status:
            </label>
            <select
              value={o.status}
              onChange={async (e) => {
                try {
                  const { data } = await api.put(
                    `/admin/orders/${o._id}/status`,
                    { status: e.target.value },
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  setOrders(
                    orders.map((ord) =>
                      ord._id === o._id ? data.order : ord
                    )
                  );
                } catch (err) {
                  console.error("Error updating order status:", err);
                }
              }}
              className="border rounded-lg p-2 text-sm focus:ring focus:ring-indigo-300"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="shipped">Shipped</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <strong className="text-gray-700">Items:</strong>
          <ul className="list-disc pl-6 mt-2 text-gray-600 space-y-1">
            {o.orderItems.map((item, i) => (
              <li key={i} className="text-sm">
                {item.name}{" "}
                <span className="text-gray-500">(x{item.qty})</span> -{" "}
                <span className="font-medium text-indigo-700">
                  ₹{item.price * item.qty}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </li>
    ))}
  </ul>
</section>
    </div>
    </div>
    
  );
};

export default AdminDashboard;
