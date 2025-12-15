import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductThunk } from "../../redux/thunks/productThunk";
import { resetStatus } from "../../redux/slices/productSlice";

export default function AddProduct() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.product);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("category", form.category);
    fd.append("description", form.description);

    // ✅ append multiple images
    image.forEach((img) => fd.append("image", img));

    dispatch(addProductThunk(fd));
  };

  // ✅ Reset & Toast Handling
  useEffect(() => {
    if (success) {
      alert("✅ Product added successfully!");
      setForm({ name: "", price: "", category: "", description: "" });
      setImage([]);
      setPreview([]);
      dispatch(resetStatus());
    }

    if (error) {
      alert("❌ " + error);
      dispatch(resetStatus());
    }
  }, [success, error, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-24 px-4">
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 w-full max-w-2xl">

        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border rounded bg-white text-black"
            required
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full p-3 border rounded bg-white text-black"
            required
          />

          {/* Category */}
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-3 border rounded bg-white text-black"
            required
          >
            <option value="">Select Category</option>
            <option value="mobiles">Mobile</option>
            <option value="head-phones">Headphone</option>
            <option value="phone-covers">Phone Cover</option>
            <option value="sound-boxes">Sound Box</option>
          </select>

          {/* Description */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full p-3 border rounded h-28 bg-white text-black"
            required
          />

          {/* Images */}
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full p-3 border rounded bg-white text-black"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setImage(files);
              setPreview(files.map((f) => URL.createObjectURL(f)));
            }}
            required
          />
          {/* Preview */}
          <div className="flex gap-3 flex-wrap">
            {preview.map((img, i) => (
              <img key={i} src={img} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-white ${loading ? "bg-gray-400" : "bg-black"
              }`}
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
