import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../slice/CategorySlice";

const CategoryList = ({setCategory,category}) => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );
  console.log(categories)
  useEffect(() => {
      dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }
  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
  };
  return (
    <div style={{width:"250px",height:"30px",border:"1px solid black",borderRadius:"0px"}}>
      <select
      className="w-100 h-100 outline-none border-none"
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
      > 
        <option value={null}>Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryList;
