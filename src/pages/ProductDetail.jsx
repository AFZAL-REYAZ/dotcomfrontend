import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Minus, Plus, Share2, Star, ChevronDown, ChevronUp, Ruler } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const { state:product } = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  // ✅ track which image is selected
  const [selectedImage, setSelectedImage] = useState(
    product?.image ? product.image[0] : product?.image
  );

  if (!product) {
    return (
      <div className="pt-20 text-center">
        <p>Product not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 border rounded-full text-gray-900 hover:bg-gray-900 hover:text-white transition"
        >
          Go back
        </button>
      </div>
    );
  }

  const handlepayment = () => {
    navigate("/contactus");
  };

  const addToCart = () => {
    const item = {
      title: product.title,
      price: product.price,
      image: product.image || product.images?.[0],
      size,
      quantity,
    };
    const existing = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const idx = existing.findIndex(
      (i) => i.title === item.title && i.size === item.size
    );
    if (idx >= 0) {
      existing[idx].quantity = (existing[idx].quantity || 1) + item.quantity;
    } else {
      existing.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(existing));
    navigate("/addtocart");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Product Image + Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Image */}
          <div className="relative">
            <img
              src={selectedImage}
              alt={product.title}
              className="rounded-lg shadow-md w-full object-cover"
            />
            {product.sale && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-md font-medium">
                SALE
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.image && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product.image.map((img, i) => (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  key={i}
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage === img
                      ? "border-amber-700"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Product Details */}
        <motion.div 
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="border-b pb-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md text-sm font-medium">
                Premium
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-amber-500 mt-2 ">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} fill={i < 4 ? "currentColor" : "none"} size={18} />
                ))}
              <span className="ml-2 text-sm text-gray-500">(24 reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 ">
            <span className="line-through text-gray-400 text-lg">
              Rs. {product.price || (product.price * 1.2).toFixed(0)}
            </span>
            <span className="text-2xl font-semibold text-gray-900">
              Rs. {product.price}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-md font-medium">
              20% OFF
            </span>
          </div>
          
          <p className="text-gray-600">
            {product.description}
          </p>
          {/* Quantity */}
          <div className="mt-4">
            <p className="font-medium text-gray-900">Quantity</p>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="p-2 border rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="text-lg font-medium text-gray-700 w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
              <p className="text-sm text-amber-600 ml-4">● In Stock</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
               className="flex-1 py-3 border-2 border-amber-800 text-amber-800 rounded-md font-medium hover:bg-amber-50 transition-colors"
               onClick={addToCart}
             >
               Add to cart
             </button>
            <button
              className="flex-1 py-3 rounded-md font-medium bg-amber-800 text-white hover:bg-amber-900 transition-colors"
              onClick={handlepayment}
            >
              Buy it now
            </button>
          </div>

        </motion.div>
      </div>
      
    </div>
  );
}
