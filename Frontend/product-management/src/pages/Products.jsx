// Products.jsx (Corrected)

import React, { useState } from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

const Products = () => {
  const [updateKey, setUpdateKey] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);

  // This function increments the key, triggering ProductList to re-mount/re-fetch
  const refresh = () => {
      setUpdateKey(prev => prev + 1);
      // Optional: clear the form after success
      setEditingProduct(null); 
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <ProductForm
        editingProduct={editingProduct}
        // ✅ CORRECTED PROP NAME: MUST be 'onSaveSuccess' to match ProductForm.jsx
        onSaveSuccess={refresh} 
        onCancelEdit={() => setEditingProduct(null)}
      />
      {/* Note: You only need 'key' or 'refreshKey', not both. 
        Setting 'key' is the standard way to force remounting.
      */}
      <ProductList
        key={updateKey} 
        onEdit={prod => setEditingProduct(prod)}
      />
    </div>
  );
};

export default Products;