import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleProduct } from "../slice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { addToCart } from "../slice/CartSlice";
import IndianCurrency from "../components/IndianCurrency";
import SVGComponent from "../components/SVGComponent";
import { useMediaQuery } from "react-responsive";
const Details = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [index, setIndex] = useState(0);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector((state) => state.products.product);
  const loading = useSelector((state) => state.products.loading);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const handleImg = (ind) => {
    setIndex(ind);
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  };

  const handleAddToCart = async (product) => {
    try {
      setLoadingAddToCart(true);
      await dispatch(addToCart(product));
      setLoadingAddToCart(false);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setLoadingAddToCart(false);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  if (loading === "pending" || loading === "idle") {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="w-100 flex justify-center">
        <div className="w-95 mt-1" style={{ border: "1px solid black" }}>
          <div className={`flex ${isMobile?"direction":null}`}>
            <div className="details-left" style={{ flex: "1",marginRight:"5rem" }}>
              <div className="w-100">
                <img
                  src={product?.images[index]}
                  alt=""
                  className="w-100"
                  style={{ padding: "15px" }}
                />
              </div>

              <div
                className="w-100 flex justify-center"
                style={{ padding: "15px", }}
              >
                <div
                  style={{ maxWidth: `${isMobile?"240px":"80%"} `,minWidth:`${isMobile?"100px":"250px"} `,height:`${isMobile?"80px":"100px"}`, border: "1px solid black" }}
                  className="pointer"
                >
                  <Slider {...settings}>
                    {product?.images?.map((img, index) => {
                      return (
                        <div
                          style={{
                            // width: `${isMobile?"50px":"120px"}`,
                            marginRight: ".3rem",
                            height:`${isMobile?"50px":"120px"}`,
                            marginLeft: ".3rem",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          className="w-100"
                          key={index}
                        >
                          <img
                            src={img}
                            alt={product?.name}
                            onClick={() => handleImg(index)}
                            style={{ height: `${isMobile?"80px":"100px"}`}}
                          />
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
            <div
              className=" details-right rubik"
              style={{ flex: "2", padding: "10px" }}
            >
              <h2>{product?.name}</h2>
              <p className="mt-1" style={{ fontSize: ".9rem" }}>
                {product?.description}
              </p>
              <div className="mt-1">
                <IndianCurrency amount={product?.price} className="mt-2" />
              </div>
              <button
                onClick={() =>
                  isInCart(product?._id)
                    ? navigate("/cart")
                    : handleAddToCart(product)
                }
                disabled={loadingAddToCart}
                style={{ padding: "15px 40px", borderRadius: "0px",fontSize:".9rem" }}
                className="mt-1 border-none bg-faint-red white pointer"
              >
                {loadingAddToCart
                  ? "Adding to Cart..."
                  : isInCart(product?._id)
                  ? "Go to Cart"
                  : "Add to Cart"}
              </button>

              <div className="mt-2">
                <p>Why Shop from Sweetkadai.com?</p>
                <div className="ml-2">
                  <p className="flex align-center mt-1">
                    <SVGComponent />{" "}
                    <span className="ml-1">
                      {" "}
                      Products made in small batches
                    </span>
                  </p>
                </div>
                <div className="ml-2">
                  <p
                    className="flex align-center"
                    style={{ marginTop: ".5rem" }}
                  >
                    <SVGComponent/>{" "}
                    <span className="ml-1">
                      Product procured every 48 hours from its authentic region.
                    </span>
                  </p>
                </div>
                <div className="ml-2">
                  <p
                    className="flex align-center"
                    style={{ marginTop: ".5rem" }}
                  >
                    <SVGComponent />{" "}
                    <span className="ml-1">
                      Product Freshness maintained with our limited quantity
                      procurement process
                    </span>
                  </p>
                </div>
                <div className={`flex ${isMobile?"direction":""} mt-1`}>
                  <div className="sk-left flex align-center">
                    <h4>Sk Factor</h4>
                  </div>

                  <div
                    className={`sk-right flex w-90 align-center  justify-between ${isMobile?"direction":""}`}
                    style={{ flexWrap: "wrap" }}
                  >
                    <div style={{ flex: "1" }} className="ml-1">
                      <p>Hand Made with Love</p>
                    </div>
                    <div style={{ flex: "1" }} className="ml-1">
                      <p>Non-Factory Made</p>
                    </div>
                    <div style={{ flex: "1" }} className="ml-1">
                      <p>100% Authentic Taste</p>
                    </div>
                    <div style={{ flex: "1" }} className="ml-1">
                      <p>Fresh Preparation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;

// {product._id}
//           {product.name}
//           <div className="border">
//             <img src={product.images[index]} alt="" style={{width:"350px"}}/>
//           </div>
//           <div style={{ width: "300px" }}>
//             <Slider {...settings}>
//               {product.images.map((img, index) => {
//                 return (
//                   <div style={{ width: "100px", height: "100px" }} key={index}>
//                     <img
//                       className="w-100"
//                       style={{ width:"100px",height: "100px" }}
//                       src={img}
//                       alt=""
//                       onClick={() => handleImg(index)}
//                     />
//                   </div>
//                 );
//               })}
//             </Slider>
//           </div>
//           <div>
//             <button
//               onClick={() =>
//                 isInCart(product._id)
//                   ? navigate("/cart")
//                   : handleAddToCart(product)
//               }
//               disabled={loadingAddToCart}
//             >
//               {loadingAddToCart ? "Adding to Cart..." : isInCart(product._id) ? "Go to Cart" : "Add to Cart"}
//             </button>
//           </div>
//         </div>
//       ) : null}
