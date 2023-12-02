import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import IndianCurrency from "../components/IndianCurrency";
import { MdOutlineArrowOutward } from "react-icons/md";
import { addToCart } from "../slice/CartSlice";
import { useMediaQuery } from "react-responsive";
import { fontSize } from "@mui/system";
const CategoryCart = ({ product }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile=useMediaQuery({maxWidth:768});
  const isInCart = (productId) => {
    return cartItems?.some((item) => item._id === productId);
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <>
      <Link to={`/product/${product?._id}`}>
        <div className="w-100">
          <img
            src={product?.images[1] ? product?.images[1] : product?.images[0]}
            alt={product?.name}
            className="w-100 h-100"
          />
        </div>
      </Link>
      <p className="rubik w-100 ellipsis" style={{fontSize:`${isMobile?".9rem":""}`}}>{product?.name}</p>
      <h4 className="rubik">
        <IndianCurrency amount={product?.price} />
      </h4>
      <button
        style={{ height: "40px", borderRadius: "20px" }}
        className="w-100 pointer mt-1 border-none add-btn"
        onClick={() =>
          isInCart(product?._id) ? navigate("/cart") : handleAddToCart(product)
        }
      >
        {isInCart(product?._id) ? (
          <>
            {" "}
            Go to Cart <MdOutlineArrowOutward />{" "}
          </>
        ) : (
          "+ Add to Cart"
        )}
      </button>
    </>
  );
};

export default CategoryCart;
