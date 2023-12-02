import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsByCategory } from "../slice/CategorySlice";
import { useParams } from "react-router-dom";
import CategoryCart from "../components/CategoryCart";
import { useMediaQuery } from "react-responsive";
const Category = () => {
  const dispatch = useDispatch();
  const productsByCategory = useSelector(
    (state) => state.productsByCategory.products
  );
  const {status} =useSelector((state)=>state.categories)
  const { id } = useParams();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    dispatch(fetchProductsByCategory(id));
  }, [dispatch, id]);

  if(status==="loading"){
    return <p>Loading...</p>
  }
  return (
    <div className="w-100 flex justify-center">
      <div className="w-95 mt-1" style={{ border: "1px solid black" }}>
        <h3
          className="rubik"
          style={{ borderBottom: "1px solid black", padding: "10px 10px" }}
        >
          {id.toUpperCase()}
        </h3>
        <div className="flex" style={{ flexWrap: "wrap" }}>
          {productsByCategory.map((product) => {
            return (
              <div
                style={{
                  width:`${isMobile?"50%":"25%"}`,
                  padding: "25px",
                  border: "1px solid black",
                }}
              >
                <CategoryCart product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
