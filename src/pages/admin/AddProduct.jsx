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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (err) {
      console.log(err);
      alert("Product add failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input type="number" placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />

      <input type="text" placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} />

      <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button type="submit" className="bg-black text-white p-2">Add Product</button>
    </form>
  );
}
