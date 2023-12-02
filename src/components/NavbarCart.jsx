import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import IndianCurrency from "./IndianCurrency";
import {
    removeFromCart,
  } from "../slice/CartSlice";

const NavbarCart = ({ showNavbarCart, setShowNavbarCart }) => {
  const navbarCart = useRef(null);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch=useDispatch();
  useEffect(() => {
    function handleClickOutside(event) {
      if (!navbarCart.current.contains(event.target)) {
        setShowNavbarCart(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarCart]);

  return (
    <div
      ref={navbarCart}
      className={`signin-container absolute ${
        showNavbarCart ? "show-sign-in" : ""
      }`}
      style={{ width: "300px", padding: "0px 10px" }}
    >
      <hr
        style={{
          backgroundColor: "rgb(254,212,110)",
          height: "2px",
        }}
        className="w-100 border-none"
      />
      {cartItems.length>0? <div className="signin flex direction rubik">
        <div style={{ padding: "15px" }}>
          <p className="mb-1">Your Cart {`${cartItems?.length}`}</p>
          <hr />
          <div className="navbar-cart">
            {cartItems.map((item) => (
                <>
              <div className="mt-1 flex justify-between">
                <img style={{ height: "60px" }} src={item.images[0]} alt="" />
                <div className="ml-1 w-100">
                  <p className="ellipsis" style={{ width: "120px" }}>
                    {item.name}
                  </p>
                  <p>
                    {item.quantity} X <IndianCurrency amount={item.price} />
                  </p>
                </div>
                <div className="flex align-center ml-1"
                onClick={()=>dispatch(removeFromCart(item._id))}>
                  <FaTrashAlt />
                </div>
              </div>
              <hr style={{marginTop:"1rem"}}/>
              </>
            ))}
          </div>
        </div>
      </div>:
      <div className="flex w-100 justify-center">
        <h5 className="mt-1 mb-1 rubik">You have no items in your shopping cart.</h5>
    </div>
      }
      {(cartItems.length>0)&&<Link to="/cart">
        <button
          className="checkout-btn border w-100 white"
          style={{ marginBottom: "10px" }}
        >

          <h3>Checkout</h3>
        </button>
      </Link>}
    </div>
  );
};

export default NavbarCart;
