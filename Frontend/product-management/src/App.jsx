import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Categories from "./pages/Categories";
import Products from "./pages/Products";

const App = () => {
  return (
    <Router>
      <div className="p-4 bg-gray-100 flex space-x-4">
        <Link to="/categories" className="text-blue-500 font-semibold">Categories</Link>
        <Link to="/products" className="text-blue-500 font-semibold">Products</Link>
      </div>

      <Routes>
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Categories />} /> {/* default to categories */}
      </Routes>
    </Router>
  );
};

export default App;