import React, { useEffect, useState } from "react";
import { api } from "../api/api";

const CategoryList = ({ onEdit, refreshKey }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    api.get("/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCategories();
  }, [refreshKey]);

  const handleDelete = (id) => {
    api.delete(`/categories/${id}`)
      .then(() => setCategories(prev => prev.filter(c => c.categoryid !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat.categoryid} className="flex justify-between border p-2 rounded hover:bg-gray-100">
            {cat.categoryname} ({cat.products?.length || 0} products)
            <div className="flex space-x-2">
              <button onClick={() => onEdit(cat)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(cat.categoryid)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;