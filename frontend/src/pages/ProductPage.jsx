import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../services/api";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className='text-center mt-10'>Loading...</p>;

  


  const handleAddToCart = async () => {
    try{
      await api.post('/cart', {productId: product._id, quantity: 1});
      alert('Added to cart !');
    } catch(err){
      console.error(err);
      alert('Error adding to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-white to-blue-300 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-gray-100 rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.title}
            className="w-full max-h-[500px] object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
              {product.title}
            </h1>
            <p className="text-2xl font-semibold text-red-700 mb-4">
              ₹{product.price}
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Extra Info */}
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium text-gray-800">Brand:</span>{" "}
                {product.brand || "N/A"}
              </p>
              <p>
                <span className="font-medium text-gray-800">Department:</span>{" "}
                {product.department}
              </p>
              <p>
                <span className="font-medium text-gray-800">Category:</span>{" "}
                {product.category || "N/A"}
              </p>
              <p>
                <span className="font-medium text-gray-800">Stock:</span>{" "}
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    In Stock ({product.stock} left)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </p>
              <p>
                <span className="font-medium text-gray-800">Rating:</span>{" "}
                ⭐ {product.rating} ({product.ratingCount} reviews)
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <button onClick={() => navigate("/")} className="w-full py-3 rounded-xl text-lg font-semibold shadow-md transition hover:scale-105 bg-green-500 text-gray-800 hover:bg-red-500 mb-5"> ⬅ Back to Home </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-4 rounded-xl text-lg font-semibold shadow-md transition transform hover:scale-105 ${
                product.stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600"
              }`}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart 🛒"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
