import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../services/api";
import { Link } from "react-router-dom";


const SearchPage = () => {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const navigate = useNavigate();

   
    useEffect(() => {
        const fetchResults = async () => {
            try{
                setLoading(true);
                const res= await api.get(`/products?keyword=${keyword}`);
                setResults(res.data.products || []); // because backend returns {products, page, totalPage...}
            } catch (err){
                console.error('Search error:', err);
            } finally {
                setLoading(false);
            }
        };
        if (keyword) fetchResults();
    }, [keyword]);

    if (loading) return <p className='p-6'>Loading...</p>
  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-300 via-white to-blue-300 p-6'>
      <h1 className='text-3xl font-extrabold text-center mb-8 text-gray-800'>Search Results for: {" "} <span className="text-indigo-600">"{keyword}"</span></h1>
       {results.length ===0 ? (
        <div className="text-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076507.png"
            alt="No results"
            className="mx-auto w-32 h-32 mb-6 opacity-80"
          />
          <p className="text-lg text-gray-600">
            Oops! No products found for <b>"{keyword}"</b>.
          </p>
        </div>
       ): (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">{results.map((product) => (
            <div key={product._id} className='g-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:border-indigo-400 transform hover:-translate-y-2 transition duration-300 p-5 flex flex-col'>
                <div className="relative">
                <img
                  src={product.images || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow">
                  ₹{product.price}
                </span>
              </div>

              <h2 className="font-bold text-lg text-gray-800 mt-4 flex-1">
                {product.title}
              </h2>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  to={`/product/${product._id}`}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow hover:bg-indigo-700 transition"
                >
                  View Details
                </Link>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
