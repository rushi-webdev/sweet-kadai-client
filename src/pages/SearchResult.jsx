// client/src/components/SearchResults.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchProducts } from "../slice/searchSlice";
import CategoryCart from "../components/CategoryCart";
import { useMediaQuery } from "react-responsive";
const SearchResult = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.results);
  const loading = useSelector((state) => state.search.loading);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    dispatch(searchProducts(query));
  }, [dispatch, query]);

  if (loading === "pending") {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-100 flex justify-center">
      <div className="w-95 mt-1" style={{ border: "1px solid black" }}>
        <h3
          className="rubik"
          style={{ borderBottom: "1px solid black", padding: "10px 10px" }}
        >
          {results.length} Search result found
        </h3>
        {results.length > 0 ? (
          <div className="flex" style={{ flexWrap: "wrap" }}>
            {results.map((product) => {
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
        ) : (
          <div className="w-95 mt-1 ml-1 mb-1">
            <p>No result found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
