import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";

const CheckoutPage = () => {

    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const navigate = useNavigate();

    const handleCheckout = async(e) => {
        e.preventDefault();
        try{
            const shippingAddress ={
                fullName, address, city, postalCode, country,
            }
            const res = await api.post('/checkout', {shippingAddress, paymentMethod,});
            alert("✅ Order placed successfully!");
            navigate('/');
        } catch(err){
             console.error("Checkout error:", err);
             alert("❌ Error placing order");
        }
    }

  return (
        

        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-white to-blue-500 flex items-center justify-center px-4">
        <div className='bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-lg text-black'>
       <h1 className='text-3xl font-bold mb-6 text-center'>Checkout</h1>
       <form onSubmit={handleCheckout} className='space-y-5'>
        <div>
          <label className="block font-semibold mb-2">Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full bg-white border border-gray-600 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"/>
        </div>

        <div>
            <label className='block font-semibold mb-2'>Shipping Address</label>
            <textarea value={address} onChange={(e)=> setAddress(e.target.value)}required className='w-full bg-white border border-gray-600 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500'/>
        </div>

        <div>
          <label className="block font-semibold mb-2">City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full bg-white border border-gray-600 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>

        <div>
            <label className="block font-semibold mb-2">Postal Code</label>
            <input type="text" value={postalCode} onChange={(e)=> setPostalCode(e.target.value)} required className="w-full bg-white border border-gray-600 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>

        <div>
            <label className="block font-semibold mb-2">Country</label>
            <input type="text" value={country} onChange={(e)=> setCountry(e.target.value)} required className="w-full bg-white border border-gray-600 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>

        <div>
            <label className='block font-semibold mb-2'>Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className='w-full bg-white border border-gray-600 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500'>
                <option value="COD">Cash on Delivery</option>
                <option value="ONLINE" disabled>Online Payment(coming soon)</option>
            </select>
        </div>

        <button type='submit' className='bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:opacity-80 transition'> Place Order</button>
        <button onClick={() => navigate("/")} className="py-3 px-6 rounded-xl text-lg font-semibold shadow-md transition hover:scale-105 bg-green-500 text-gray-800 hover:bg-green-900 hover:text-white ml-10"> Back to Home </button>
       </form>
    </div>
    </div>
    
    
  );
};

export default CheckoutPage;
