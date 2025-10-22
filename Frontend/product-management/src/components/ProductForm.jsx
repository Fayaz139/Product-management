import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductForm = ({ editingProduct, onSaveSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    productname: "",
    productimg: "",
    price: "",
    stock: "",
    categoryId: ""
  });
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setStatus({ type: "error", text: "Failed to fetch categories." });
      }
    };
    fetchCategories();
  }, []);

  // Populate form when editingProduct changes (ROBUST DATA HANDLING FOR BLANK PAGE FIX)
  useEffect(() => {
    if (editingProduct) {
      setForm({
        productname: editingProduct.productname || "",
        productimg: editingProduct.productimg || "",
        // Use Nullish Coalescing (??) and toString() for defensive handling of number fields
        price: (editingProduct.price ?? "").toString(),
        stock: (editingProduct.stock ?? "").toString(),
        // Use Optional Chaining (?.) for safe access to nested category ID
        categoryId: String(editingProduct.category?.categoryid || "")
      });
      setStatus(null);
    } else {
      setForm({
        productname: "",
        productimg: "",
        price: "",
        stock: "",
        categoryId: ""
      });
      setStatus(null);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearStatusAfterDelay = (ms = 3000) => {
    setTimeout(() => setStatus(null), ms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoryId || isNaN(Number(form.categoryId))) {
      setStatus({ type: "error", text: "Please select a valid category." });
      clearStatusAfterDelay();
      return;
    }

    setSaving(true);
    setStatus(null);

    const basePayload = {
      productname: form.productname.trim(),
      productimg: form.productimg.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    };
    
    let payload;
    let url;
    let method;
    const categoryIdNum = Number(form.categoryId);

    // ✅ CONDITIONAL PAYLOAD LOGIC: Determines structure based on operation
    if (editingProduct && editingProduct.productid != null) {
      // 1. UPDATE: Expects the full nested category object (for the entity)
      payload = {
        ...basePayload,
        category: { categoryid: categoryIdNum }
      };
      url = `http://localhost:9090/api/products/${editingProduct.productid}`;
      method = axios.put;
      
    } else {
      // 2. ADD: Expects the flat categoryId field (for the DTO)
      payload = {
        ...basePayload,
        categoryId: categoryIdNum
      };
      url = "http://localhost:9090/api/products/add";
      method = axios.post;
    }

    try {
      await method(url, payload);

      setStatus({ 
          type: "success", 
          text: editingProduct ? "Product updated successfully." : "Product added successfully."
      });

      // Clear the form only if adding a new product
      if (!editingProduct) { 
        setForm({
          productname: "",
          productimg: "",
          price: "",
          stock: "",
          categoryId: ""
        });
      }

      if (onSaveSuccess) onSaveSuccess();
    } catch (error) {
      console.error("Error saving product:", error);
      setStatus({
        type: "error",
        text:
          error?.response?.data ||
          "Failed to save product. Check console for details."
      });
    } finally {
      setSaving(false);
      clearStatusAfterDelay();
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="productname"
            // ✅ CRITICAL FIX: Ensure value is always a string
            value={String(form.productname || '')} 
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="productimg"
            // ✅ CRITICAL FIX: Ensure value is always a string
            value={String(form.productimg || '')} 
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              // ✅ CRITICAL FIX: Ensure value is always a string
              value={String(form.price || '')} 
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              // ✅ CRITICAL FIX: Ensure value is always a string
              value={String(form.stock || '')} 
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
              min="0"
              step="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="categoryId"
            // ✅ CRITICAL FIX: Ensure value is always a string
            value={String(form.categoryId || '')} 
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.categoryid} value={String(cat.categoryid)}>
                {cat.categoryname}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full text-white py-2 px-4 rounded-lg ${
            saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving
            ? editingProduct
              ? "Updating..."
              : "Adding..."
            : editingProduct
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>

      {status && (
        <div
          className={`mt-3 text-sm ${
            status.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.text}
        </div>
      )}
    </div>
  );
};

export default ProductForm;