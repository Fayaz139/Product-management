import React, { useEffect, useState } from "react";
import { api } from "../api/api";

const ProductList = ({ onEdit, refreshKey }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    api.get("/products/")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]);

  const handleDelete = (id) => {
    api.delete(`/products/${id}`)
      .then(() => setProducts(prev => prev.filter(p => p.productid !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <ul className="space-y-2">
        {products.map(p => (
          <li key={p.productid} className="flex justify-between border p-2 rounded hover:bg-gray-50">
            <div>
              <strong>{p.productname}</strong> - ₹{p.price} - Stock: {p.stock}
            </div>
            <div className="flex space-x-2 items-center">
              <div className="text-gray-500">{p.category?.categoryname}</div>
              <button onClick={() => onEdit(p)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(p.productid)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;