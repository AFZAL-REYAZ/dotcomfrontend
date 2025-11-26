import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("category", form.category);
    fd.append("description", form.description);
    fd.append("image", image);

    try {
      const res = await axios.post(
        "https://dotcombackend.onrender.com/api/products/add",
        fd
      );

      alert("Product added successfully!");
      console.log(res.data);

      // reset
      setForm({ name: "", price: "", category: "", description: "" });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.log(err);
      alert("Product add failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-24 px-4">
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 w-full max-w-2xl">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Add New Product
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Fill the details below to add a new product to your shop.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full text-black border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className="w-full text-black border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
              placeholder="Enter price"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="w-full text-black border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
              placeholder="E.g. Mobile, Gadgets, Accessories"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              className="w-full text-black border border-gray-300 rounded-lg p-3 h-28 focus:ring-2 focus:ring-black outline-none"
              placeholder="Write product description"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
              className="w-full text-black border border-gray-300 rounded-lg p-3 cursor-pointer bg-gray-50"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-3 rounded-xl shadow-md h-40 w-40 object-cover border mx-auto"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
