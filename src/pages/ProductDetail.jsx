import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { fetchSingleProductThunk } from "../redux/thunks/productThunk";
import { addToCartRedux } from "../redux/slices/cartSlice";


export default function ProductDetail() {
  const { id } = useParams();              // ✅ product id from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProduct: product, loading } = useSelector(
    (state) => state.product
  );

  const [quantity, setQuantity] = useState(1);
  const [size] = useState("M");

  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ FETCH FROM REDUX
  useEffect(() => {
    dispatch(fetchSingleProductThunk(id));
  }, [dispatch, id]);

  // ✅ Set default image when product loads
  useEffect(() => {
    if (product?.image?.length) {
      setSelectedImage(product.image[0]);
    }
  }, [product]);

  if (loading) {
    return <p className="pt-32 text-center">Loading...</p>;
  }

  if (!product) {
    return <p className="pt-32 text-center">Product not found</p>;
  }


const addToCart = () => {
  const cartItem = {
    _id: product._id,
    name: product.name,
    price: product.price,
    image: product.image[0],
    quantity,
    size: "M",
  };
  dispatch(addToCartRedux(cartItem));
  navigate("/addtocart");
};


  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 pt-16">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGES */}
        <motion.div>
          <img
            src={selectedImage}
            className="rounded-lg shadow-md w-full object-cover"
          />

          <div className="flex gap-3 mt-4">
            {product.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded border-2 cursor-pointer ${
                  selectedImage === img
                    ? "border-amber-700"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* DETAILS */}
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-black">{product.name}</h2>

          <div className="flex text-amber-500">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} fill="currentColor" size={18} />
            ))}
          </div>

          <p className="text-2xl text-gray-700 font-bold">₹{product.price}</p>

          <p className="text-gray-700">{product.description}</p>

          <div className="flex text-gray-700 items-center gap-3">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
              <Minus />
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>
              <Plus />
            </button>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              className="flex-1 py-3 border-2 border-amber-800 text-amber-800 rounded"
              onClick={addToCart}
            >
              Add to cart
            </button>

            <button
              className="flex-1 py-3 bg-amber-800 text-white rounded"
              onClick={() => navigate("/contactus")}
            >
              Buy now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
