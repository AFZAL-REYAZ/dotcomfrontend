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

  const inputClass =
    "w-full px-4 py-3 rounded border border-emerald-300 bg-emerald-50 " +
    "text-gray-700 placeholder-gray-600 " +
    "focus:outline-none focus:border-emerald-600 focus:bg-white";

  return (
    <div className="min-h-screen bg-emerald-50 flex justify-center py-20 px-4">
      <div className="w-full max-w-3xl">

        {/* HEADER */}
        <h2 className="text-2xl font-semibold text-emerald-800 mb-1">
          Product Listing Form
        </h2>
        <p className="text-sm text-emerald-700 mb-6">
          Listing your product by filling in the product listing form below.
        </p>

        <div className="border-t border-emerald-200 mb-8" />

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* SECTION TITLE */}
          <h3 className="text-sm font-semibold text-emerald-700 tracking-wide">
            PRODUCT INFORMATION
          </h3>

          {/* NAME + CATEGORY */}
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              required
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClass}
              required
            >
              <option value="">Category</option>
              <option value="mobiles">Mobile</option>
              <option value="head-phones">Headphone</option>
              <option value="phone-covers">Phone Cover</option>
              <option value="sound-boxes">Sound Box</option>
            </select>
          </div>

          {/* PRICE */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="MRP"
              value={form.mrp}
              onChange={(e) => setForm({ ...form, mrp: e.target.value })}
              className={inputClass}
              required
            />

            <input
              type="number"
              placeholder="Selling Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          {/* HSN + GST */}
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="HSN Code"
              value={form.hsnCode}
              onChange={(e) => setForm({ ...form, hsnCode: e.target.value })}
              className={inputClass}
              required
            />

            <input
              type="number"
              placeholder="GST (%)"
              value={form.gst}
              onChange={(e) => setForm({ ...form, gst: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            placeholder="Product Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className={`${inputClass} h-28 resize-none`}
            required
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            multiple
            accept="image/*"
            className={`${inputClass} bg-white`}
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setImage(files);
              setPreview(files.map((f) => URL.createObjectURL(f)));
            }}
            required
          />

          {/* IMAGE PREVIEW */}
          <div className="flex gap-3 flex-wrap">
            {preview.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="preview"
                className="w-20 h-20 object-cover rounded border border-emerald-300"
              />
            ))}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold text-white transition ${
              loading
                ? "bg-emerald-300"
                : "bg-emerald-700 hover:bg-emerald-800"
            }`}
          >
            {loading ? "Listing..." : "LIST PRODUCT"}
          </button>
        </form>
      </div>
    </div>
  );
}
