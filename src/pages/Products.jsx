import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../slice/ProductSlice";
import { addToCart } from '../slice/CartSlice';
import { useMediaQuery } from "react-responsive";
import CategoryCart from "../components/CategoryCart";
function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const isMobile=useMediaQuery({maxWidth:768});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-100 flex justify-center">
      <div className="w-95 mt-1" style={{ border: "1px solid black" }}>
      <h3
          className="rubik"
          style={{ borderBottom: "1px solid black", padding: "10px 10px" }}
        >
          Total Products:{` (${products.length})`}
        </h3>
        <div className="flex" style={{ flexWrap: "wrap" }}>
          {products.map((product) => {
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
}

export default Products;
