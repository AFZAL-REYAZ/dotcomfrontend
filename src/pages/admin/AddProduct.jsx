import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductThunk } from "../../redux/thunks/productThunk";
import { resetStatus } from "../../redux/slices/productSlice";

export default function AddProduct() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.product);

  const [form, setForm] = useState({
    name: "",
    mrp: "",
    price: "",
    category: "",
    hsnCode: "",
    gst: "",
    description: "",
  });

  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      fd.append(key, value);
    });

    image.forEach((img) => fd.append("image", img));

    dispatch(addProductThunk(fd));
  };

  useEffect(() => {
    if (success) {
      alert("✅ Product added successfully!");
      setForm({
        name: "",
        mrp: "",
        price: "",
        category: "",
        hsnCode: "",
        gst: "",
        description: "",
      });
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
      <div className="bg-white shadow-xl border border-gray-300 rounded-2xl p-8 w-full max-w-2xl">

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-gray-600">

          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input text-gray-600"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="MRP"
              value={form.mrp}
              onChange={(e) => setForm({ ...form, mrp: e.target.value })}
              className="input text-gray-600"
              required
            />

            <input
              type="number"
              placeholder="Sale Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="input text-gray-600"
              required
            />
          </div>

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="input text-gray-600"
            required
          >
            <option value="" className="text-gray-600">Select Category</option>
            <option value="mobiles" className="text-gray-600">Mobile</option>
            <option value="head-phones" className="text-gray-600">Headphone</option>
            <option value="phone-covers" className="text-gray-600">Phone Cover</option>
            <option value="sound-boxes" className="text-gray-600">Sound Box</option>
          </select>

          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <input
              type="text"
              placeholder="HSN Code"
              value={form.hsnCode}
              onChange={(e) => setForm({ ...form, hsnCode: e.target.value })}
              className="input text-gray-600"
              required
            />

            <input
              type="number"
              placeholder="GST (%)"
              value={form.gst}
              onChange={(e) => setForm({ ...form, gst: e.target.value })}
              className="input text-gray-600"
              required
            />
          </div>

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="input text-gray-600"
            style={{ height: "110px" }}
            required
          />

          <input
            type="file"
            multiple
            accept="image/*"
            className="input text-gray-600"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setImage(files);
              setPreview(files.map((f) => URL.createObjectURL(f)));
            }}
            required
          />

          <div className="flex gap-3 flex-wrap text-gray-600">
            {preview.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="preview"
                className="w-20 h-20 object-cover text-gray-600 rounded border"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading ? "bg-gray-400" : "bg-black hover:bg-gray-900"
            }`}
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}
