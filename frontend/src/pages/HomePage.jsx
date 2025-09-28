import React, { useEffect, useState } from 'react';
import api from "../services/api";
import { Link } from "react-router-dom";

const HomePage = () => {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {  //The load function fetches products from your backend API for the current page.
      try{
        const res = await api.get(`/products?page=${page}&limit=8`);
        setProducts(res.data.products || res.data); //res.data.products means the backend sent an object with a products array inside it.
        setTotalPages(res.data.totalPages || 1); //res.data.totalPages means the backend also sent how many total pages of products exist.
                                                //res is the response object you get after calling your backend API with api.get(...).
                                                // res.data is the actual data sent back by your backend server in the response body.
      } catch(err){
        console.error(err);
      }
    };
    load();
  }, [page]);

  //So, when the component first loads or when you click "Next" or "Prev" to change the page, useEffect triggers the API call to get the products for that page.
  // This keeps your product list updated according to the page number.

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-800 to-black p-6">
      <h1 className='text-4xl font-bold text-center text-white mb-10 drop-shadow-md'>✨ Luxora presents you ... ✨</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p._id} className="bg-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden"> {/*key is a special React prop used to help React identify which items in a list have changed, been added, or removed.  */}
            <div className="h-40 bg-gray-100 mb-10 flex items-center justify-center">
              <img src={p.images} alt=""  className="w-full h-48 mt-9 object-cover rounded" />
            </div>
            <h3 className="font-semibold text-lg text-white">{p.title}</h3>
            <p className="text-sm text-gray-400 mb-3">{p.description?.slice(0,60)}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className='bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md'>₹{p.price}</span>
              <Link to={`/product/${p._id}`} className="text-indigo-400 font-medium hover:underline">View</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4"> {/* page is the current page number. */}
        <button disabled={page <= 1} onClick={()=>setPage(p=>p-1)} className='px-4 py-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-semibold shadow-md hover:scale-105 transition disabled:opacity-50'> ⬅ Prev</button>
        <span>Page {page}/ {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() =>setPage(p => p+1)} className='px-4 py-2 rounded-full bg-gradient-to-r from-pink-400 to-indigo-500 text-white font-semibold shadow-md hover:scale-105 transition disabled:opacity-50'>Next ➡</button>
      </div>
      
    </div>
  );
}

export default HomePage
