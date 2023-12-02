import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../slice/auth";
import { useMediaQuery } from "react-responsive";
import "./navbar.css";
import { IoLocationSharp } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { MdPersonOutline } from "react-icons/md";
import { BsHandbag } from "react-icons/bs";
import secureLocalStorage from "react-secure-storage";
import { fetchUserById } from "../slice/userSlice";
import { searchProducts } from "../slice/searchSlice";
import Container from "../pages/Container";
import { fetchCategories } from "../slice/CategorySlice";
import { FaSignOutAlt } from "react-icons/fa";
import styled from "styled-components";
import NavbarCart from "./NavbarCart";

const Navbar = () => {
  const ref = useRef();
  const menuRef = useRef();
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [showSignInContainer, setShowSignInContainer] = useState(false);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const [menu, setMenu] = useState(false);
  const [showNavbarCart, setShowNavbarCart] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const id = secureLocalStorage.getItem("userId");
    dispatch(fetchUserById(id));
    dispatch(fetchCategories());
  }, [dispatch]);
  const handleLogout = () => {
    dispatch(logout());
    secureLocalStorage.removeItem("userId");
    dispatch(fetchUserById(null));
    setMenu(!menu);
    navigate("/");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProducts(search));
    setSearch("");
    navigate(`/search/${search}`);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSignInContainer(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menu]);

  const handleClickMenu = () => {
    setMenu(!menu);
  };

  return (
    <header className="header relative">
      {isMobile && (
        <div className={`absolute ${menu ? "menu-container" : ""}`}>
          <div ref={menuRef} className={`menu-item ${menu ? "show-menu" : ""}`}>
            <div className="bg-dark-red">
              <div className="ml-1 w-70" style={{ padding: "15px 0px" }}>
                <Link to="/" onClick={() => setMenu(!menu)}>
                  <img
                    src="https://www.sweetkadai.com/img/sweetkadai-logo.svg"
                    alt=""
                    className="h-100 w-80"
                  />
                </Link>
              </div>
            </div>
            <div className="white rubik" style={{ backgroundColor: "#961212" }}>
              <div className="ml-1 w-90 flex align-center">
                <h5 className="flex mt-2 mb-2 align-center">
                  {isAuthenticated ? (
                    <p className="flex align-center">
                      {" "}
                      <Link
                        to="/my-account"
                        className="white"
                        onClick={() => setMenu(!menu)}
                      >
                        Hello! {user?.firstname}
                      </Link>
                      {" / "} <FaSignOutAlt />
                      <span onClick={handleLogout}>Sign Out</span>
                    </p>
                  ) : (
                    <div className="flex white rubik">
                      <Link
                        to="/login"
                        className="white"
                        onClick={() => setMenu(!menu)}
                      >
                        {" "}
                        Sign In
                      </Link>
                      <p>/</p>
                      <Link
                        to="/register"
                        className="white"
                        onClick={() => setMenu(!menu)}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </h5>
              </div>
              <div className="ml-1" style={{ paddingBottom: ".5rem" }}>
                <h5 className="flex align-center mb-1">MENU</h5>
              </div>
            </div>
            <div className="mt-1">
              <div className="w-10 black">
                <Link
                  to="/"
                  className="black mt-1"
                  onClick={() => setMenu(!menu)}
                >
                  <div className=" rubik" style={{ color: "black" }}>
                    <h5 className="ml-1" style={{marginBottom:"1rem"}}>HOME</h5>
                  </div>
                </Link>
                <Link
                  to="/products"
                  className="black mt-2"
                  onClick={() => setMenu(!menu)}
                >
                  <div className=" rubik" style={{ color: "black",borderTop:"1px solid black" }}>
                    <h5 className="ml-1" style={{marginTop:".5rem"}}>PRODUCTS</h5>
                  </div>
                </Link>

                {categories &&
                  categories?.map((category) => {
                    if (category.name.toLowerCase() !== "other") {
                      return (
                        <Link
                          to={`/category/${category?.name}`}
                          key={category?._id}
                          onClick={() => setMenu(!menu)}
                          style={{ marginLeft: "1rem" }}
                        >
                          <div
                            className="rubik flex align-center"
                            style={{
                              color: "black",
                              borderTop: "1px solid black",
                              height: "30px",
                            }}
                          >
                            <h5 className="ml-1">
                              {category.name.toUpperCase()}
                            </h5>
                          </div>
                        </Link>
                      );
                    }
                    return null; // Skip rendering if the category is 'other'
                  })}
                {isAuthenticated && user?.isAdmin ? (
                  <Link
                    to={`/dashboard`}
                    onClick={() => setMenu(!menu)}
                    style={{ marginLeft: "1rem" }}
                  >
                    <div
                      className="rubik flex align-center"
                      style={{
                        color: "black",
                        borderTop: "1px solid black",
                        height: "30px",
                      }}
                    >
                      <h5 className="ml-1">DASHBAORD</h5>
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-100 top-navbar flex justify-center bg-dark-red white rubik align-center">
        <div className="w-95 top-navbar-item flex align-center">
          <h5>Delivery to</h5>
          <button
            className="navbar-address-container border-none flex ml-1"
            onClick={handleClick}
          >
            <IoLocationSharp />
            <h5>India</h5>
          </button>
        </div>
      </div>
      {show ? <Container show={show} setShow={setShow} /> : null}
      {!isMobile && (
        <div className="mid-navbar flex justify-center flex align-center w-100">
          <div className="mid-navbar-container flex justify-between align-center">
            <div className="logo" style={{ flex: 1, height: "40px" }}>
              <Link to="/">
                <img
                  src="/images/sweetkadai-logo.svg"
                  alt=""
                  className="h-100"
                />
              </Link>
            </div>
            <div className="bottom-navbar" style={{ flex: 1.7 }}>
              <div>
                <form
                  className="flex justify-between align-center"
                  style={{ height: "40px", marginRight: "15%" }}
                  onSubmit={handleSearch}
                >
                  <input
                    type="text"
                    className="outline-none pl-1 h-100 border-none"
                    style={{
                      borderRadius: "3px 0px 0px 3px",
                      flex: "1",
                      backgroundColor: "rgb(254,252,236)",
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    minLength="2"
                    title="Please enter at least 1 characters"
                    required
                    placeholder="Search traditional crunchies"
                  />
                  <button
                    type="submit"
                    className="h-100 search-btn border-none"
                    style={{ backgroundColor: "rgb(255,199,68)" }}
                  >
                    <GoSearch style={{ fontSize: "1.3rem" }} />
                  </button>
                </form>
              </div>
            </div>
            <div
              className="bottom-navbar flex align-center"
              style={{ flex: 0.7, height: "40px" }}
            >
              <div
                className="h-100 flex align-center white rubik relative pointer"
                onClick={() => setShowSignInContainer(!showSignInContainer)}
              >
                <span
                  className="flex align-center h-100 white justify-center"
                  style={{
                    width: "40px",
                    borderRadius: "50%",
                    color: "rgb(255,171,21)",
                    backgroundColor: "rgb(138,19,0)",
                  }}
                >
                  <MdPersonOutline style={{ fontSize: "1.7rem" }} />
                </span>
                {console.log(user)}
                <span style={{ fontSize: ".9rem" }}>
                  {isAuthenticated ? (
                    <p className="ellipsis" style={{width:"130px"}}>Hello! {user?.firstname} {user?.lastname}</p>
                  ) : (
                    <p>Sign In</p>
                  )}
                </span>
                {isAuthenticated ? (
                  <div
                    ref={ref}
                    className={`signin-container absolute ${
                      showSignInContainer ? "show-sign-in" : ""
                    }`}
                  >
                    <hr
                      style={{
                        backgroundColor: "rgb(254,212,110)",
                        height: "2px",
                      }}
                      className="w-100 border-none"
                    />
                    <div className="signin flex direction align-center">
                      <Link to="/my-account">
                        <button className="sign-in-btn white">My Account</button>
                      </Link>
                      <Link>
                        <button
                          className="sign-in-btn mb-1 white"
                          onClick={handleLogout}
                        >
                          Sign Out
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={ref}
                    className={`signin-container absolute ${
                      showSignInContainer ? "show-sign-in" : ""
                    }`}
                  >
                    <hr
                      style={{
                        backgroundColor: "rgb(254,212,110)",
                        height: "2px",
                      }}
                      className="w-100 border-none"
                    />
                    <div className="signin flex direction align-center">
                      <p style={{ color: "black" }} className="mt-1">
                        Returing Customer?
                      </p>
                      <Link to="/login">
                        <button className="sign-in-btn white">Sign In</button>
                      </Link>
                      <p style={{ color: "black" }} className="mt-1">
                        New customer! Start here.
                      </p>
                      <Link to="/register">
                        <button
                          className="sign-in-btn mb-2 white"
                          onClick={handleLogout}
                        >
                          Register
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="h-100 flex align-center relative"
                style={{ marginLeft: "5%" }}
                onClick={() => setShowNavbarCart(!showNavbarCart)}
              >
                <NavbarCart
                  showNavbarCart={showNavbarCart}
                  setShowNavbarCart={setShowNavbarCart}
                />
                <div
                  style={{
                    backgroundColor: "rgb(255,219,0)",
                    width: "40px",
                    borderRadius: "50%",
                  }}
                  className="h-100 flex align-center pointer justify-center"
                >
                  <BsHandbag
                    style={{ fontSize: "1.4rem", fontWeight: "thin" }}
                  />
                </div>

                <div
                  className="absolute flex align-center pointer  justify-center white rubik bg-faint-red"
                  style={{
                    width: "20px",
                    height: "20px",
                    top: "3px",
                    borderRadius: "50%",
                    right: "-10px",
                  }}
                >
                  <p style={{ fontSize: ".8rem" }}>{cartItems.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div
          className="mobile-mid-navbar w-100 flex justify-center bg-dark-red align-center"
          style={{ height: "50px" }}
        >
          <div className="w-90 flex justify-between" style={{ height: "40px" }}>
            <div
              className="flex direction justify-center menu"
              onClick={handleClickMenu}
            >
              <div
                style={{
                  width: "20px",
                  height: "2px",
                  backgroundColor: "yellow",
                  margin: "2px 0px",
                }}
              ></div>
              <div
                style={{
                  width: "20px",
                  height: "2px",
                  backgroundColor: "yellow",
                  margin: "2px 0px",
                }}
              ></div>
              <div
                style={{
                  width: "20px",
                  height: "2px",
                  backgroundColor: "yellow",
                  margin: "2px 0px",
                }}
              ></div>
            </div>

            <div style={{ height: "40px" }}>
              <Link to="/">
                <img
                  src="/images/sweetkadai-logo.svg"
                  alt=""
                  className="h-100"
                  style={{width:"100%"}}
                />
              </Link>
            </div>
            <div
              className="h-100 flex align-center relative"
              onClick={() => setShowNavbarCart(!showNavbarCart)}
            >
              <NavbarCart
                showNavbarCart={showNavbarCart}
                setShowNavbarCart={setShowNavbarCart}
              />
              <div
                style={{
                  backgroundColor: "rgb(255,219,0)",
                  width: "40px",
                  borderRadius: "50%",
                }}
                className="h-100 flex align-center justify-center"
              >
                <BsHandbag style={{ fontSize: "1.4rem", fontWeight: "thin" }} />
              </div>

              <div
                className="absolute flex align-center justify-center white rubik bg-faint-red"
                style={{
                  width: "20px",
                  height: "20px",
                  top: "3px",
                  borderRadius: "50%",
                  right: "-10px",
                }}
              >
                <p style={{ fontSize: ".8rem" }}>{cartItems.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div
          className="w-100 flex justify-center"
          style={{ height: "50px", backgroundColor: "rgb(137,25,8)" }}
        >
          <div className="w-90 flex align-center">
            <form className="flex align-center w-100" onSubmit={handleSearch}>
              <input
                type="text"
                className="w-100 pl-1 outline-none border-none"
                style={{
                  backgroundColor: "rgb(254, 252, 236)",
                  height: "40px",
                }}
                onChange={(e) => setSearch(e.target.value)}
                minLength="2"
                title="Please enter at least 1 characters"
                required
                placeholder="Search traditional crunchies"
              />
              <button
                type="submit"
                className="border-none flex align-center justify-center"
                style={{
                  height: "40px",
                  width: "60px",
                  backgroundColor: "rgb(255,199,68)",
                }}
              >
                <GoSearch style={{ fontSize: "1.3rem" }} />
              </button>
            </form>
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="bottom-nav w-100 flex justify-center align-center rubik">
          <div className="w-95 flex white">
            <Link to="/" className="white mr-2">
              <h5>HOME</h5>
            </Link>
            <Link to="/products" className="white mr-2">
              <h5>PRODUCTS</h5>
            </Link>

            {categories.map((category) => {
              if (category.name.toLowerCase() !== "other") {
                return (
                  <Link
                    to={`/category/${category.name}`}
                    className="white mr-2"
                    key={category._id}
                  >
                    <h5>{category.name.toUpperCase()}</h5>
                  </Link>
                );
              }
              return null; // Skip rendering if the category is 'other'
            })}
            {user?.isAdmin? <Link to="/dashboard" className="white mr-2">
              <h5>DASHBOARD</h5>
            </Link>:null}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
