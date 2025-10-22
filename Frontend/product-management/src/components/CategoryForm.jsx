import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * CategoryForm
 *
 * Props:
 *  - selectedCategory: the category object being edited (or null for add)
 *  - onSave: callback() called after successful save (parent should refresh)
 *  - onCancel: callback() called if the user cancels an edit
 *
 * Note: This component does not use alert() popups. It shows a subtle inline message.
 */
const CategoryForm = ({ selectedCategory, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text: string }

  // When selectedCategory changes, populate the input (or clear)
  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.categoryname || "");
      setStatus(null);
    } else {
      setName("");
      setStatus(null);
    }
  }, [selectedCategory]);

  const clearStatusAfterDelay = (ms = 2500) => {
    setTimeout(() => setStatus(null), ms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus({ type: "error", text: "Category name cannot be empty." });
      clearStatusAfterDelay();
      return;
    }

    setSaving(true);
    setStatus(null);

    try {
      if (selectedCategory && selectedCategory.categoryid != null) {
        // UPDATE existing category
        await axios.put(
          `http://localhost:9090/api/categories/${selectedCategory.categoryid}`,
          { categoryname: name }
        );
        setStatus({ type: "success", text: "Category updated." });
      } else {
        // ADD new category
        await axios.post("http://localhost:9090/api/categories/add", {
          categoryname: name,
        });
        setStatus({ type: "success", text: "Category added." });
      }

      // let parent refresh list
      if (typeof onSave === "function") onSave();

      // reset local form state
      setName("");
      if (typeof onCancel === "function") onCancel(); // close edit mode if any
    } catch (err) {
      console.error("Category save error:", err);
      setStatus({
        type: "error",
        text:
          err?.response?.data ||
          "Failed to save category. See console for details.",
      });
    } finally {
      setSaving(false);
      clearStatusAfterDelay();
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          disabled={saving}
        />

        <button
          type="submit"
          disabled={saving}
          className={`px-4 py-2 rounded text-white ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : selectedCategory
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {saving ? "Saving..." : selectedCategory ? "Update" : "Add"}
        </button>

        {selectedCategory && (
          <button
            type="button"
            onClick={() => {
              // cancel edit mode locally and notify parent
              setName("");
              setStatus(null);
              if (typeof onCancel === "function") onCancel();
            }}
            disabled={saving}
            className="px-3 py-2 bg-gray-300 hover:bg-gray-350 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {status && (
        <div
          role="status"
          className={`mt-2 text-sm ${
            status.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.text}
        </div>
      )}
    </div>
  );
};

export default CategoryForm;