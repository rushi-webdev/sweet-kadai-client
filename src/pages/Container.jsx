import React, { useState, useRef, useEffect } from "react";
import "./container.css";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { fetchUserAddresses } from "../slice/userAddressSlice";

const Container = ({show,setShow}) => {
  const innerDivRef = useRef(null);
  const handleClick = () => {
    setShow(!show);
  };
  useEffect(() => {
    const bodyElement = document.querySelector("body");
    if (show) {
      bodyElement.style.overflow = "hidden";
    } else {
      bodyElement.style.overflow = "auto";
    }

    return () => {
      // Cleanup: reset the body overflow when the component unmounts
      bodyElement.style.overflow = "auto";
    };
  }, [show]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const addresses = useSelector((state) => state.address.addresses);
  const dispatch = useDispatch();
  const handleOutsideClick = (event) => {
    if (innerDivRef.current && !innerDivRef.current.contains(event.target)) {
      setShow(false);
    }
  };
  useEffect(() => {
    const userId = secureLocalStorage.getItem("userId");
    dispatch(fetchUserAddresses(userId));
  }, [dispatch]);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div style={{zIndex:"1000"}}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          top: "0px",
          left: "0px",
          display: show ? "block" : "none",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex:"1000"
        }}
        className={`absolute l-0`}
      >
        <div
          ref={innerDivRef}
          style={{
            width: "30vw",
            height: "auto",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            minWidth:"300px"
          }}
          className="relative inner-container bg-white address-container"
        >
          <div className="w-100 flex direction align-center">
            {!isAuthenticated ? (
              <div className="w-90 flex direction mt-1 mb-1">
                <div className="flex align-center justify-between mt-1">
                  <h1 style={{ fontSize: "1rem" }}>Choose your country</h1>
                  <RxCross1 onClick={handleClick} className="pointer" />
                </div>
                <div className="flex align-center justify-between">
                  <p style={{ marginTop: "1rem" }}>
                    Currency will be changed & Product availability differs
                    according to delivery country.
                  </p>
                </div>
                <div className="flex mt-1 align-center justify-between w-100">
                  <Link to="/login" className="w-100" onClick={handleClick}>
                    <button className="w-100 bg-faint-red border-none white pointer" style={{height:"30px"}}>
                      Sign in to see the addresses
                    </button>
                  </Link>
                </div>
                <div className="flex justify-between align-center mt-1">
                  <span
                    className="w-100"
                    style={{ height: ".5px", backgroundColor: "red" }}
                  ></span>
                  <span className="mr-1 ml-1">OR</span>
                  <span
                    className="w-100"
                    style={{ height: ".5px", backgroundColor: "red" }}
                  ></span>
                </div>
                <div>
                <button className="mt-1 w-100 bg-faint-red border-none white pointer" style={{height:"30px"}} onClick={handleClick}>INDIA</button>
                </div>
                <div>
                <button className="mt-2 mb-1 w-100 bg-faint-red border-none white pointer" style={{height:"30px"}} onClick={handleClick}>APPLY NOW</button>
                </div>
              </div>
            ) : (
              <div className="w-90 flex direction">
                <div className="flex align-center justify-between">
                  <h1 style={{ fontSize: "1rem" }} className="mt-1">Choose your country</h1>
                  <RxCross1 onClick={handleClick} className="pointer" />
                </div>
                <div className="flex align-center justify-between">
                  <p className="mt-1">Saved Addresses:</p>
                </div>
                <div style={{overflow:"scroll",height:"150px"}}>
                {Array.isArray(addresses) &&
                  addresses.map((address) => (
                    <div key={address._id} className="address-radio mt-1 mb-1"
                    style={{borderBottom:"1px solid black"}}
                    >
                      <div
                        className="flex"
                        style={{ flexWrap: "wrap" }}

                      >
                        <span>{address.houseNo},</span>
                        <span>{address.landmark},</span>
                        <span>{address.village},</span>
                        <span>{address.district},</span>
                        <span>{address.state},</span>
                        <span>{address.pincode}</span>
                      </div>
                    </div>
                  ))}
                  </div>
                <div className="flex justify-between align-center mt-1">
                  <span
                    className="w-100"
                    style={{ height: ".5px", backgroundColor: "red" }}
                  ></span>
                  <span className="mr-1 ml-1">OR</span>
                  <span
                    className="w-100"
                    style={{ height: ".5px", backgroundColor: "red" }}
                  ></span>
                </div>
                <div>
                  <Link to='/address' className="w-100 mt-1">
                  <button className="w-100 mt-1 mb-1 bg-faint-red border-none white pointer" style={{height:"30px"}}onClick={handleClick}>ADD NEW ADDRESS</button></Link>
                </div>
                <div>
                <button className="w-100 mb-1 bg-faint-red border-none white pointer" style={{height:"30px"}}onClick={handleClick}>APPLY NOW</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
