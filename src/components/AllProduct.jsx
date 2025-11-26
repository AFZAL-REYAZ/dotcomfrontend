import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllProduct = () => {
  const [allProduct, setAllProduct] = useState([]);

  const getAllData = async () => {
    try {
      const res = await axios.get("https://dotcombackend.onrender.com/api/products");
      
      // Save only products array
      setAllProduct(res.data.products);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);
  console.log(allProduct);
  

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Featured Picks</h2>

  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
    {allProduct.map((p) => (
      <div
        key={p._id}
        className="group rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div className="aspect-square w-full overflow-hidden bg-gray-50">
          <img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform"
          />
        </div>

        <div className="p-4">
          <p className="text-gray-900 font-semibold tracking-tight">{p.name}</p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-indigo-700 font-bold">₹{p.price}</span>
            {/* No rating in backend, remove this */}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

  );
};

export default AllProduct;
