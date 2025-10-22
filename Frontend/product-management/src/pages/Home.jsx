import React, { useState } from "react";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

const Home = () => {
  const [updateKey, setUpdateKey] = useState(0);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const refresh = () => setUpdateKey(prev => prev + 1);

  return (
    <div className="p-8 grid grid-cols-2 gap-8 bg-gray-50 min-h-screen">
      <div>
        <CategoryForm
          editingCategory={editingCategory}
          onRefresh={refresh}
          onCancelEdit={() => setEditingCategory(null)}
        />
        <CategoryList
          key={updateKey}
          refreshKey={updateKey}
          onEdit={cat => setEditingCategory(cat)}
        />
      </div>
      <div>
        <ProductForm
          editingProduct={editingProduct}
          onRefresh={refresh}
          onCancelEdit={() => setEditingProduct(null)}
        />
        <ProductList
          key={updateKey}
          refreshKey={updateKey}
          onEdit={prod => setEditingProduct(prod)}
        />
      </div>
    </div>
  );
};

export default Home;