import React, { useEffect, useState } from 'react';
import api from "../services/api";
import { Link, useNavigate } from 'react-router-dom';


const CartPage = () => {

    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

     // Fetch cart when page loads
    useEffect(() => {
        const fetchCart = async () => {
            try{
                const res = await api.get('/cart');
                setCart(res.data);
            } catch(err){
                console.error('Error fetching cart:', err);
            }
        };
        fetchCart();
    }, []);

    //update quantity

    const handleUpdateQuantity = async(productId, quantity) => {
        try{
            const res = await api.put('/cart', {productId, quantity});
            setCart(res.data);
        } catch (err){
            console.error('Error updating quantity', err);
        }
    };

    //remove item

    const handleRemove = async (productId) => {
        try{
            await api.delete(`/cart/${productId}`);
            setCart({
                ...cart,
                items: cart.items.filter((item) => item.product._id !== productId),
            });
        } catch(err){
            console.error('Error removing item', err);
        }
    };

    if (!cart) return <p className='text-center mt-10'>Loading cart...</p>;


    if(cart.items.length === 0)
        return(
            <div className="min-h-screen text-center p-10 bg-gradient-to-r from-blue-300 via-white to-blue-300 rounded-xl shadow-inner">
               <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="Empty Cart"
                className="w-28 h-28 mx-auto mb-6 opacity-80"
              />
             <p className="text-lg font-semibold text-gray-700 mb-3">
                  Your cart is empty.
             </p>
             <Link
               to="/"
               className="inline-block px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300"
             >
               🛍 Go Shopping
             </Link>
           </div>
        );

        const total = cart.items.reduce(
           (sum, item) => sum + item.product.price * item.quantity,
           0
        );

  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-white to-blue-300 py-10 px-6">
        <div className='max-w-5xl mx-auto bg-blue-100 rounded-2xl shadow-lg p-8'>
        <h1 className='text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4'>Your Cart</h1>

      <div className="space-y-6">
          {cart.items.map((item) => (
            <div key={item.product._id} className="flex items-center justify-between bg-gray-50 border rounded-xl p-4 shadow-sm hover:shadow-md transition">
              {/* Product Info */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800"> {item.product.title}</h2>
                <p className="text-gray-500">₹{item.product.price}</p>
              </div>

              {/* Quantity & Remove */}
              <div className="flex items-center space-x-4">
                <input type="number" value={item.quantity} min="1" onChange={(e) => handleUpdateQuantity(item.product._id, Number(e.target.value))}
                  className="w-20 border rounded-lg px-3 py-2 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button onClick={() => handleRemove(item.product._id)} className="text-red-500 hover:text-red-700 font-medium transition"> Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Total + Checkout */}
        <div className="mt-10 flex justify-between items-center border-t pt-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Total: ₹{total}
          </h2>
          <button onClick={() => navigate("/")} className="py-3 px-5 rounded-xl text-lg font-semibold shadow-md transition hover:scale-105 bg-purple-500 text-gray-800 hover:bg-red-500"> ⬅ Back to Home </button>
          <button
            onClick={() => navigate("/checkout")}
            className="px-8 py-3 rounded-xl text-lg font-semibold shadow-md transition transform hover:scale-105 bg-gradient-to-r from-green-400 to-green-600 text-white"
          >
            Proceed to Checkout →
          </button>
        </div>
    </div>

    </div>
    
  );
};

export default CartPage
