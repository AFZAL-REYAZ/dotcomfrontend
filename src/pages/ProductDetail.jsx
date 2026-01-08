import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { fetchSingleProductThunk } from "../redux/thunks/productThunk";
import { addToCartThunk } from "../redux/thunks/cartThunk";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProduct: product, loading } = useSelector(
    (state) => state.product
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleProductThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.image?.length) {
      setSelectedImage(product.image[0]);
    }
  }, [product]);

  if (loading) {
    return <p className="pt-32 text-center text-gray-600">Loading...</p>;
  }

  if (!product) {
    return <p className="pt-32 text-center text-gray-600">Product not found</p>;
  }

  const addToCart = () => {
    dispatch(
      addToCartThunk({
        productId: product._id,
        quantity,
        size: "M",
      })
    );
    navigate("/addtocart");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

        {/* IMAGE SECTION */}
        <div>
          <motion.div
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            className="border rounded-xl bg-white p-4"
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[420px] object-contain rounded-lg"
            />
          </motion.div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4">
            {product.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition ${
                  selectedImage === img
                    ? "border-amber-600"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="flex flex-col gap-5">

          {/* TITLE */}
          <h2 className="text-2xl font-semibold text-gray-900">
            {product.name}
          </h2>

          {/* RATING */}
          <div className="flex items-center gap-1 text-amber-500">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              (4.8 rating)
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.mrp && (
              <span className="text-gray-400 line-through">
                ₹{product.mrp}
              </span>
            )}
          </div>
          {/* STOCK STATUS */}
          {product.stock > 0 ? (
            <p className="text-sm text-green-600 font-medium">
              In Stock ({product.stock} available)
            </p>
          ) : (
            <p className="text-sm text-red-600 font-semibold">
              Out of Stock
            </p>
          )}


          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm font-medium text-gray-700">
              Quantity
            </span>

            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={product.stock === 0}
              className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 text-gray-600"
            >
              <Minus size={16} />
            </button>

            <span className="px-5 text-sm font-medium text-gray-600">
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity((q) => Math.min(product.stock, q + 1))
              }
              disabled={quantity >= product.stock}
              className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 text-gray-600"
            >
              <Plus size={16} />
            </button>

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={addToCart}
              className="flex-1 py-3 rounded-lg border bg-amber-500 text-white-700 font-semibold hover:bg-amber-700 transition"
            >
              Add to Cart
            </button>

            {/* <button
              onClick={() => navigate("/contactus")}
              className="flex-1 py-3 rounded-lg bg-amber-700 text-white font-semibold hover:bg-amber-800 transition"
            >
              Buy Now
            </button> */}
          </div>

          {/* TRUST INFO */}
          <div className="mt-6 text-sm text-gray-500">
            ✔ 100% Original Product <br />
            ✔ Secure Payments <br />
            ✔ Easy Returns
          </div>

        </div>
      </div>
    </div>
  );
}
