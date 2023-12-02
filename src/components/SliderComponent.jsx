import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slice/ProductSlice";
import { addToCart } from "../slice/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";
import IndianCurrency from "./IndianCurrency";

const ProductCarousel = ({products}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  };
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, cartItems]);

  const CustomPrevArrow = (props) => (
    <div
      className="slick-prev custom-prev"
      {...props}
      style={{ left: "0px", borderRadius: "0px", zIndex: 1 }}
    >
      prev
    </div>
  );
  const CustomNextArrow = (props) => (
    <div className="slick-next custom-next" {...props} style={{ right: "0px" }}>
      next
    </div>
  );
  // Configuration for the carousel
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6, // Show 7 products on desktop
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4, // Show 2 products on mobile
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Show 2 products on mobile
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2, // Show 2 products on mobile
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  // Dummy product data (replace with your actual data)
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <div className="w-100vw flex justify-center relative">
      <div className="w-95vw" style={{ border: "1px solid black" }}>
      {products && products.length > 0 ? (
        <Slider {...settings}>
          {products?.map((product) => (
            <div key={product._id}>
              <div
                className="product-card w-100 flex justify-center"
                style={{ border: "1px solid black" }}
              >
                <div className="w-100 flex justify-center">
                  <div className="overflow-hidden" style={{ padding: "20px" }}>
                    <Link to={`/product/${product?._id}`} className="flex">
                      <div className="w-100">
                        {
                          <img
                            className="w-100 h-100"
                            src={product?.images[0]}
                            alt={product?.name}
                          />
                        }
                      </div>
                    </Link>
                    <button
                      style={{ height: "40px", borderRadius: "20px" }}
                      className="w-100 pointer mt-1 border-none add-btn"
                      onClick={() =>
                        isInCart(product._id)
                          ? navigate("/cart")
                          : handleAddToCart(product)
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
                    <h6
                      className="truncate-name mt-1 title rubik"
                      style={{ fontSize: ".9rem" }}
                    >
                      {product.name}
                    </h6>
                    <h3 className="rubik" style={{marginTop:".5rem"}}>
                    {" "}<IndianCurrency amount={product.price}/>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>):
        (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
