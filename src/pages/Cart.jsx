// components/Cart.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
} from "../slice/CartSlice";
import { fetchUserById } from "../slice/userSlice";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";
import { postOrder } from "../slice/OrderSlice";
import axios from "axios";
import { fetchRazorpayId } from "../slice/PaymentSlice";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { get } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import IndianCurrency from "../components/IndianCurrency";
function Cart() {
  const { id, loading, error } = useSelector((state) => state.razorpayId);
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderDataset, setOrderData] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    const id = secureLocalStorage.getItem("userId");
    dispatch(fetchUserById(id));
    dispatch(fetchRazorpayId());
    const cart = cartItems.map((ca) => ({
      product: ca?._id,
      quantity: ca?.quantity,
      price: ca?.price,
    }));
    setOrderData(cart);
  }, [dispatch]);

  return (
    <div className="w-100 flex justify-center">
      <div className={`w-95 mt-2 flex ${isMobile ? "direction" : null}`}>
        {!isMobile && (
          <div className="mr-1 cart-left" style={{ flex: "2" }}>
            <div className="flex direction align-center">
              <h2>Shopping Cart</h2>
              <hr style={{ width: "95%" }} />
              {!(cartItems.length > 0) ? (
                <div className="flex w-95 mt-1">
                  <h3 className="rubik">No product is your cart!</h3>
                </div>
              ) : (
                cartItems.map((cart) => (
                  <div
                    key={cart._id}
                    className="w-95 flex align-center mt-1 justify-between"
                  >
                    <div
                      style={{ flex: "1" }}
                      onClick={() => dispatch(removeFromCart(cart._id))}
                    >
                      <RxCross2 className="pointer" />
                    </div>
                    <div style={{ flex: "1" }}>
                      <img
                        className="flex "
                        style={{ width: "100px" }}
                        src={cart?.images[0]}
                        alt=""
                      />
                    </div>
                    <div className="flex align-center" style={{ flex: "2" }}>
                      <p>{cart?.name}</p>
                    </div>
                    <div className="flex align-center" style={{ flex: "1" }}>
                      <p
                        className="flex align-center justify-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          border: "1px solid black",
                        }}
                      >
                        {cart.quantity}
                      </p>
                      <div className="flex direction">
                        <button
                          className="pointer"
                          style={{
                            height: "20px",
                            width: "20px",
                            borderRadius: "0px",
                            border: "1px solid black",
                          }}
                          onClick={() => dispatch(increaseQuantity(cart._id))}
                        >
                          <MdOutlineKeyboardArrowUp />
                        </button>
                        <button
                          className="pointer"
                          style={{
                            height: "20px",
                            width: "20px",
                            borderRadius: "0px",
                            border: "1px solid black",
                          }}
                          onClick={() => dispatch(decreaseQuantity(cart._id))}
                        >
                          <MdOutlineKeyboardArrowDown />
                        </button>
                      </div>
                    </div>
                    <div style={{ flex: "1" }}>
                      ₹{cart.quantity * cart.price}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {isMobile && (
          <div className="w-100 flex justify-center">
            <div className="w-95 rubik">
              <div className="flex direction align-center">
                <h3>Shopping Cart</h3>
                <hr className="w-100" />
              </div>
              <div className="w-100">
                {cartItems.length > 0 &&
                  cartItems.map((cart) => (
                    <div className="flex" style={{height:"100px"}}>
                      <div style={{ flex: "1" }} className="flex align-center">
                        <img
                          style={{ width: "80px", height: "auto" }}
                          src="https://www.sweetkadai.com/578-cart_default/festival-delight-gift-box.jpg"
                          alt=""
                        />
                      </div>
                      <div
                        className="flex direction"
                        style={{ flex: "2", width: "100px",marginTop:".7rem" }}
                      >
                        <h4 className="ellipsis" style={{fontSize:".9rem"}}>{cart.name}</h4>
                        <h4 style={{fontSize:".9rem"}}>
                          <IndianCurrency amount={cart.price} />
                        </h4>
                      </div>
                      <div className="flex align-center">
                        <div
                          className="flex align-center"
                          style={{ flex: "1" }}
                        >
                          <p
                            className="flex align-center justify-center"
                            style={{
                              width: "40px",
                              height: "40px",
                              border: "1px solid black",
                            }}
                          >
                            {cart.quantity}
                          </p>
                          <div className="flex direction">
                            <button
                              className="pointer"
                              style={{
                                height: "20px",
                                width: "20px",
                                borderRadius: "0px",
                                border: "1px solid black",
                              }}
                              onClick={() =>
                                dispatch(increaseQuantity(cart._id))
                              }
                            >
                              <MdOutlineKeyboardArrowUp />
                            </button>
                            <button
                              className="pointer"
                              style={{
                                height: "20px",
                                width: "20px",
                                borderRadius: "0px",
                                border: "1px solid black",
                              }}
                              onClick={() =>
                                dispatch(decreaseQuantity(cart._id))
                              }
                            >
                              <MdOutlineKeyboardArrowDown />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div onClick={() => dispatch(removeFromCart(cart._id))}>
                        <RxCross2 className="pointer" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        <div className="ml-1 cart-right" style={{ flex: "1" }}>
          <div className="ml-1 flex direction align-center cart-right">
            <div className="mt-1 w-95">
              <div className="flex justify-between">
                <p>{cartItems.length} items</p>
                <p>₹{getTotalPrice()}</p>
              </div>
              <hr />
            </div>
            <div className="w-95 flex justify-between">
              <h3>Total (Tax.inc)</h3>
              <h3>₹{getTotalPrice()}</h3>
            </div>
            <div>
              <Link to="/checkout">
                <button
                  className="border-none mt-2 white pointer mr-2 mb-1"
                  style={{
                    backgroundColor: "rgb(255,70,0)",
                    padding: "10px 25px",
                  }}
                >
                  PROCEED TO CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
