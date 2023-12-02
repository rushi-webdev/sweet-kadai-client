import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postCategory } from "../slice/AdminCategory";
import { useMediaQuery } from "react-responsive";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const category = useSelector((state) => state.postCategory.category);
  const loading = useSelector((state) => state.postCategory.loading);
  // console.log(category);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      toast.error("Please enter a category name");
      return;
    }
    try {
      const response = await dispatch(postCategory(categoryName));
      if (loading == "fulfilled") {
        toast.success(category);
      } else {
        toast.error(response.payload);
      }
    } catch (error) {
      toast.error("Error communicating with the server");
    }
  };

  return (
    <div>
      <h3 className="mt-2 flex justify-center rubik">Add Category</h3>
      <div className="flex justify-center mb-2 mt-1">
        <form onSubmit={handleCreateCategory} className={`${isMobile?"w-90 flex":""}`}>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter Category Name"
            style={{
              height: "30px",
              width: "300px",
              borderRadius: "none",
              border: "1px solid black",
            }}
            className="pl-1 outline-none"
          />
          <input
            type="submit"
            style={{ height: "30px", padding: "0px 30px" }}
            className="border-none white bg-faint-red pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
