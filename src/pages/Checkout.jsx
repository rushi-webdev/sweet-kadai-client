import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import {
  fetchUserAddresses,
  postUserAddress,
} from "../slice/userAddressSlice";
import { logout } from "../slice/auth";
import { fetchUserById } from "../slice/userSlice";
import { fetchRazorpayId } from "../slice/PaymentSlice";
import { postOrder } from "../slice/OrderSlice";
import { clearCart } from "../slice/CartSlice";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import validationSchema from "../validations/addressSchema";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleCheckout, verifyCheckout } from "../slice/CheckoutSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndianCurrency from "../components/IndianCurrency";
import { RxCross2 } from "react-icons/rx";
import { useMediaQuery } from "react-responsive";

const Checkout = () => {
  const [orderDataset, setOrderData] = useState([]);
  const { id } = useSelector((state) => state.razorpayId);
  const [registrationError] = useState(null);
  const [newAddress, setNewAddress] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const addresses = useSelector((state) => state.address.addresses);
  const [sectionVisible, setSectionVisible] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [isRegistering, setIsRegistering] = useState("register");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [firstStep, setFirstStep] = useState(false);
  const [secondStep, setSecondStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {loading}=useSelector((state)=>state.orders)
  const user = useSelector((state) => state.user.user);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const formik = useFormik({
    initialValues: {
      landmark: "",
      village: "",
      district: "",
      state: "",
      pincode: "",
      houseNo: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userId = secureLocalStorage.getItem("userId");
        await dispatch(postUserAddress({ ...values, user: userId }));
        dispatch(fetchUserAddresses(userId));
        setNewAddress(true);
      } catch (error) {
        toast.error("Error submitting address:");
      }
    },
  });

  useEffect(() => {
    const userId = secureLocalStorage.getItem("userId");
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]?._id);
    }
    dispatch(fetchUserById(userId));
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const userId = secureLocalStorage.getItem("userId");
      dispatch(fetchUserAddresses(userId));
      setSelectedAddress(addresses[0]?._id);
    } else {
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const userId = secureLocalStorage.getItem("userId");
    dispatch(fetchUserById(userId));
    dispatch(fetchUserAddresses(userId));
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]?._id);
    }
  }, [addresses]);

  useEffect(() => {
    dispatch(fetchRazorpayId());
    const cart = cartItems.map((ca) => ({
      product: ca?._id,
      quantity: ca?.quantity,
      price: ca?.price,
    }));
    setOrderData(cart);
  }, [dispatch]);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const initPay = (data) => {
    setIsLoading(true);
    const options = {
      key: id,
      amount: data.amount,
      currency: data.currency,
      name: "Sweet Kadai",
      description: "Test Transaction",
      image: "https://www.redwolf.in/image/cache/catalog/stickers/the-dark-knight-logo-sticker-india-600x800.jpg",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyData = await dispatch(verifyCheckout(response));

          if (verifyData.payload && verifyData.payload.status === 200) {
            const orderData = {
              user: user?._id,
              items: orderDataset,
              totalAmount: getTotalPrice(),
              shippingAddress: selectedAddress,
            };
            await dispatch(postOrder(orderData));
            await toast.success("Order successfully placed");
            navigate("/orders");
            dispatch(clearCart());
          } else {
            toast.error("Order Not Places");
          }
        } catch (error) {
          toast.error(error);
        }
      },
      theme: {
        color: "#000000",
      },
    };
    // setIsLoading(true);
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    // setIsLoading(false);
  };
  const handleCheckoutForm = async () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setIsLoading(true);
      try {
        const response = await dispatch(handleCheckout(getTotalPrice()));
        initPay(response.payload.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const handleSection = (section) => {
    setSectionVisible(section);
    if (section === 1) {
      setFirstStep(false);
      setSecondStep(false);
    } else if (section === 2) {
      setFirstStep(true);
      setSecondStep(false);
    } else if (section === 3) {
      setFirstStep(true);
      setSecondStep(true);
    }
  };

  if(loading=="pending"){
    return <p>Loading...</p>
  }
  return (
    <div className="w-100 flex justify-center mb-2">
      {
        cartItems.length<1
        ?
        <div className="mt-3">
          <p className="rubik">Please add product in your cart</p>
        </div>
        :
      <div className={`w-95 ${isMobile?"direction":null} flex mt-1`}>
        <div style={{ flex: "2" }} className="checkout-left">
          <div
            className="w-100"
            style={{
              border: "1px 1px 0px 1px solid black",
              borderBottom: "none",
            }}
          >
            <button
              className="w-100 flex pointer align-center pl-1 white border-none"
              onClick={() => handleSection(1)}
              style={{ backgroundColor: "rgb(192,26,2)", height: "30px" }}
            >
              <span className="mr-2">1</span> PERSONAL INFORMATION
            </button>
            {registrationError && <div>{registrationError}</div>}
          </div>

          {sectionVisible === 1 && (
            <div style={{ border: "1px solid black" }}>
              {isAuthenticated ? (
                <div>
                  <p className="ml-1 mt-1">
                    Connected as {user?.firstname} {user?.lastname}.
                  </p>
                  <p className="ml-1">
                    Not you?{" "}
                    <span
                      className="pointer"
                      onClick={() => dispatch(logout())}
                      style={{ textDecoration: "underline" }}
                    >
                      Logout
                    </span>{" "}
                  </p>
                  <div className="w-100 flex flex justify-end">
                    <button
                      className="border-none white pointer mr-2 mb-1"
                      style={{
                        backgroundColor: "rgb(255,70,0)",
                        padding: "10px 25px",
                      }}
                      onClick={() => handleSection(2)}
                    >
                      <p>Continue</p>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={`${isMobile?"justify-center":"ml-2"}  mt-1 mb-1 flex`}>
                    <button
                      onClick={() => setIsRegistering("register")}
                      style={{ backgroundColor: "transparent" }}
                      className="border-none pointer"
                    >
                      <h3 style={{fontSize:isMobile?".7rem":""}}>Create an account</h3>
                    </button>
                    <span className="ml-2">|</span>
                    <button
                      onClick={() => setIsRegistering("login")}
                      style={{ backgroundColor: "transparent" }}
                      className="border-none ml-2 pointer"
                    >
                      <h3 style={{fontSize:isMobile?".7rem":""}}>Already have an account</h3>
                    </button>
                  </div>
                  {isRegistering == "register" ? (
                    <SignUp go={true} />
                  ) : (
                    <Login go={true} />
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-1" style={{ border: "1px solid black" }}>
            <button
              className="w-100 pointer flex white align-center pl-1 border-none"
              onClick={() => handleSection(2)}
              disabled={!(isAuthenticated && firstStep)}
              style={{
                height: "30px",
                backgroundColor:
                  isAuthenticated && firstStep
                    ? "rgb(192,26,2)"
                    : "rgb(237,233,210)",
                color:
                  isAuthenticated && firstStep ? "white" : "rgb(148,107,88)",
                cursor:
                  isAuthenticated && firstStep ? "pointer" : "not-allowed",
              }}
            >
              <span className="mr-2">2</span> ADDRESSES
            </button>

            {sectionVisible === 2 ? (
              newAddress ? (
                <div>
                  <form>
                    {Array.isArray(addresses) &&
                      addresses.map((address) => (
                        <div key={address._id} className="flex address-radio">
                          <div className="border ml-2 mt-1 flex ">
                            <input
                              className="pointer ml-1"
                              type="radio"
                              id={address._id}
                              name="address"
                              value={address._id}
                              checked={selectedAddress === address._id}
                              onChange={() => setSelectedAddress(address._id)}
                            />
                            <label htmlFor={address._id}>
                              <div className="ml-2 mr-1 mt-1 mb-1 pointer">
                                <p>{address.houseNo}</p>
                                <p>{address.landmark}</p>
                                <p>{address.village}</p>
                                <p>{address.district}</p>
                                <p>{address.state}</p>
                                <p>{address.pincode}</p>
                              </div>
                            </label>
                          </div>
                        </div>
                      ))}
                  </form>
                  <button
                    onClick={() => setNewAddress(false)}
                    className="border-none ml-2 mt-2 white pointer mr-2 mb-1"
                    style={{
                      backgroundColor: "rgb(255,70,0)",
                      padding: "10px 25px",
                    }}
                  >
                    Add new address
                  </button>
                  <br />
                  {
                    addresses.length>0
                    ?
                    <div className="flex justify-end">
                    <button
                      className="border-none white pointer mr-2 mb-1"
                      style={{
                        backgroundColor: "rgb(255,70,0)",
                        padding: "10px 25px",
                      }}
                      onClick={() => handleSection(3)}
                    >
                      Continue
                    </button>
                  </div>:
                  null
                  }
                  
                </div>
              ) : (
                <div className="flex justify-center">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="mt-1 ml-1 mb-1 mr-1"
                    style={{
                      width: isMobile?"100%":"45%",
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    <h4>Add new address</h4>
                    <div className="mt-1 flex justify-between align-center">
                      <label htmlFor="landmark">Landmark:</label>
                      <div>
                        <input
                          style={{ height: "30px", width: "200px" }}
                          className="pl-1"
                          type="text"
                          id="landmark"
                          name="landmark"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.landmark}
                        />
                        {formik.touched.landmark && formik.errors.landmark ? (
                          <div>{formik.errors.landmark}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-1 flex justify-between align-center">
                      <label htmlFor="village">Village:</label>
                      <div>
                        <input
                          style={{ height: "30px", width: "200px" }}
                          className="pl-1"
                          type="text"
                          id="village"
                          name="village"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.village}
                        />
                        {formik.touched.village && formik.errors.village ? (
                          <div>{formik.errors.village}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-1 flex justify-between align-center">
                      <label htmlFor="district">District:</label>
                      <div>
                        <div>
                          <input
                            style={{ height: "30px", width: "200px" }}
                            className="pl-1"
                            type="text"
                            id="district"
                            name="district"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.district}
                          />
                          {formik.touched.district && formik.errors.district ? (
                            <div>{formik.errors.district}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="mt-1 flex justify-between align-center">
                      <label htmlFor="state">State:</label>
                      <div>
                        <input
                          style={{ height: "30px", width: "200px" }}
                          className="pl-1"
                          type="text"
                          id="state"
                          name="state"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.state}
                        />
                        {formik.touched.state && formik.errors.state ? (
                          <div>{formik.errors.state}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-1 flex justify-between align-center">
                      <label htmlFor="pincode">Pincode:</label>
                      <div>
                        <input
                          style={{ height: "30px", width: "200px" }}
                          className="pl-1"
                          type="text"
                          id="pincode"
                          name="pincode"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.pincode}
                        />
                        {formik.touched.pincode && formik.errors.pincode ? (
                          <div>{formik.errors.pincode}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-1 flex justify-between align-center">
                      <label htmlFor="houseNo">House No:</label>
                      <div>
                        <input
                          style={{ height: "30px", width: "200px" }}
                          className="pl-1"
                          type="text"
                          id="houseNo"
                          name="houseNo"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.houseNo}
                        />
                        {formik.touched.houseNo && formik.errors.houseNo ? (
                          <div>{formik.errors.houseNo}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-1 flex justify-center align-center">
                      <p onClick={() => setNewAddress(true)} className="mr-1">
                        clear
                      </p>
                      <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        style={{ padding: "5px 30px" }}
                        className="pointer"
                      >
                        {formik.isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              )
            ) : (
              ""
            )}
          </div>
          <div className="mt-1" style={{ border: "1px solid black" }}>
            <button
              className="w-100 flex white align-center pl-1 border-none"
              onClick={() => handleSection(3)}
              disabled={
                !(isAuthenticated && addresses.length > 0 && secondStep)
              }
              style={{
                height: "30px",
                backgroundColor:
                  isAuthenticated && addresses.length > 0 && secondStep
                    ? "rgb(192,26,2)"
                    : "rgb(237,233,210)",
                cursor:
                  isAuthenticated && addresses.length > 0 && secondStep
                    ? "pointer"
                    : "not-allowed",
                color:
                  isAuthenticated && addresses.length > 0 && secondStep
                    ? "white"
                    : "rgb(148,107,88)",
              }}
            >
              <span className="mr-2">3</span> PAYMENT
            </button>
            {sectionVisible === 3 ? (
              <div className="flex justify-center">
                <button
                  className="border-none mt-1 white pointer mr-2 mb-1"
                  style={{
                    backgroundColor: "rgb(255,70,0)",
                    padding: "10px 25px",
                  }}
                  onClick={handleCheckoutForm}
                >
                  {isLoading ? "Please wait" : "Make Payment"}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div style={{ flex: "1",marginTop:isMobile?"2rem":"" }} className="checkout-right">
          <div className="w-100 flex justify-center">
            <ul
              style={{
                width: isMobile?"100%":"90%",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: ".8rem",
              }}
            >
              <p className="rubik mt-1">{cartItems?.length} items</p>
              {cartItems?.map((cart) => (
                <div
                  className="flex justify-between mt-1"
                  key={cart?._id}
                  style={{ border: "1px solid black" }}
                >
                  <div style={{ width: "80px", flex: "1.2" }}>
                    <img className="w-100 h-100" src={cart.images[0]} alt="" />
                  </div>
                  <div
                    className="flex h-100 rubik mt-1 align-center"
                    style={{
                      flex: "2.5",
                      fontSize: ".9rem",
                      marginLeft: ".5rem",
                    }}
                  >
                    <p className="w-100 flex align-center">{cart.name}</p>
                    <div className="flex rubik">
                      <p>
                        <RxCross2 style={{ fontSize: "1rem" }} />
                      </p>
                      <p>{cart.quantity}</p>
                    </div>
                  </div>
                  <div
                    className="rubik flex justify-center"
                    style={{ flex: ".8", marginTop: "1rem" }}
                  >
                    <IndianCurrency amount={cart.price} />
                  </div>
                </div>
              ))}
              <div className="w-100 mt-1 ">
                <div className="flex justify-between rubik">
                  <h4>Total (tax incl.)</h4>
                  <h4><IndianCurrency amount={getTotalPrice()}/></h4>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default Checkout;
