import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle add or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (categoryName.trim() === "") {
      alert("Category name cannot be empty!");
      return;
    }

    try {
      if (editingId !== null) {
        // 🔹 UPDATE existing category
        await axios.put(`http://localhost:9090/api/categories/${editingId}`, {
          categoryname: categoryName,
        });
        alert("✅ Category updated successfully!");
      } else {
        // 🔹 ADD new category
        await axios.post("http://localhost:9090/api/categories/add", {
          categoryname: categoryName,
        });
        alert("✅ Category added successfully!");
      }

      // Reset form
      setCategoryName("");
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      alert("⚠️ Something went wrong!");
    }
  };

  // Edit button click
  const handleEdit = (cat) => {
    setEditingId(cat.categoryid);
    setCategoryName(cat.categoryname);
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:9090/api/categories/${id}`);
      alert("🗑️ Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Category Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex space-x-4">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            editingId !== null
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {editingId !== null ? "Update" : "Add"}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setCategoryName("");
            }}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Category List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center">No categories available</p>
        ) : (
          <ul>
            {categories.map((cat) => (
              <li
                key={cat.categoryid}
                className="flex justify-between items-center border-b py-2"
              >
                <span className="text-lg">{cat.categoryname}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.categoryid)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Categories;