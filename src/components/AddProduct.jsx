import React, { useState } from "react";
import CreateCategory from "./CreateCategory";
import CategoryList from "./CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, selectLoading, selectError } from "../slice/ProductSlice"; // Update the path
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const AddProduct = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [categoryset, setCategory] = useState("other");
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    images: [],
    slug: "",
    type:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    setProduct({
      ...product,
      images: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("slug", product.slug);
      formData.append("price", product.price);
      formData.append("category", categoryset);
      formData.append("type", product.type);

      // Append each image to FormData
      for (let i = 0; i < product.images.length; i++) {
        formData.append("images", product.images[i]);
      }
      dispatch(addProduct(formData));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <CreateCategory />
      <div className="w-100 flex justify-center">
        <div className="w-95 flex justify-center mb-3">
          <form
            onSubmit={handleSubmit}
            className="flex direction mt-1 align-center border"
            style={{
              width: isMobile ? "95%" : "40%",
              height: isMobile ? "100%" : "",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <div
              className={`flex justify-between  mt-1 w-90 rubik ${
                isMobile ? "direction" : "align-center"
              }`}
              style={{ height: "30px " }}
            >
              <label>Product Name:</label>
              <input
                className="h-100 outline-none pl-1"
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                style={{
                  width: "250px",
                  border: "1px solid black",
                  padding: isMobile ? "10px" : "",
                }}
              />
            </div>
            <div
              className={`flex justify-between w-90 rubik ${
                isMobile ? "direction mt-2" : "align-center mt-1"
              }`}
              style={{ height: isMobile?"90px":"60px " }}
            >
              <label>Product Description:</label>
              <textarea
                className="h-100 outline-none pl-1"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                style={{
                  width: "250px",
                  border: "1px solid black",
                }}
              />
            </div>
            <div
              className={`flex justify-between  mt-1 w-90 rubik ${
                isMobile ? "direction" : "align-center"
              }`}
              style={{ height: "30px " }}
            >
              <label>Product Slug:</label>
              <input
                type="text"
                className="h-100 outline-none pl-1"
                name="slug"
                value={product.slug}
                onChange={handleInputChange}
                style={{
                  width: "250px",
                  border: "1px solid black",
                  padding: isMobile ? "10px" : "",
                }}
              />
            </div>
            <div
              className={`flex justify-between w-90 rubik ${
                isMobile ? "direction mt-2" : "align-center mt-1"
              }`}
              style={{ height: "30px " }}
            >
              <label>Product Price:</label>
              <input
                type="text"
                className="h-100 outline-none pl-1"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                style={{
                  width: "250px",
                  border: "1px solid black",
                  padding: isMobile ? "10px" : "",
                }}
              />
            </div>
            <div
              className={`flex justify-between w-90 rubik ${
                isMobile ? "direction mt-2" : "align-center mt-1"
              }`}
              style={{ height: isMobile?"50px":"30px" }}
            >
              <label>Product Category:</label>
              <CategoryList category={categoryset} setCategory={setCategory} />
            </div>
            <div
              className={`flex justify-between w-90 rubik ${
                isMobile ? "direction mt-1" : "align-center mt-1"
              }`}
              style={{ height: isMobile?"50px":"30px " }}
            >
              <label>Product Images:</label>
                <input
                  type="file"
                  name="images"
                  className="h-100 outline-none flex select-images"
                  multiple
                  onChange={handleImageChange}
                />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: "250px", height: "30px" }}
              className="bg-faint-red border-none white mt-1 mb-1"
            >
              {loading ? "Adding Product..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
