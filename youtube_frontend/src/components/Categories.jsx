import { useState } from "react";
import { categories } from "../utils/data";

const Categories = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategory = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="flex gap-3 items-center overflow-x-auto ">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => handleCategory(item)}
          className={`px-4 py-2 rounded-2xl cursor-pointer whitespace-nowrap transition ${
            activeCategory === item
              ? "bg-black text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Categories;
