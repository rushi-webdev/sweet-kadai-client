import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { fetchUserById, loginUser, registerUser } from "../slice/userSlice";
import { login } from "../slice/auth";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

const SignUp = ({ go }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phone: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Please enter valid mobile number")
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(registerUser(values));
        console.log(response);
        if (registerUser.fulfilled.match(response)) {
          await loginUserData(values.email, values.password);
        } else {
          toast.error("User already exist");
        }
      } catch (error) {
        toast.error("An error occurred during registration:", error);
      }
    },
  });

  const loginUserData = async (email, password) => {
    try {
      const response = await dispatch(loginUser({ email, password }));
      if (response.meta.requestStatus === "fulfilled") {
        const payload = response.payload;
        const token = payload.token;
        const userId = payload.userId;
        secureLocalStorage.setItem("userId", userId);
        dispatch(login(token));
        dispatch(fetchUserById(userId));
        if (go) {
          // Do something if go is truthy
        } else {
          navigate("/");
        }
        toast.success("Login Successful");
      } else if (response.meta.requestStatus === "rejected") {
        toast.error("Invalid Credentials!");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };
  return (
    <div className="w-100 flex justify-center login-main-container">
      <ToastContainer />
      <div className="w-95">
        <div className="relative flex direction justify-center login-border">
          <h4 className="rubik">Register your account</h4>
          <span
            className="absolute"
            style={{
              width: "50px",
              height: "1px",
              border: "1px solid green",
              left: "0px",
              bottom: "-0.5px",
            }}
          ></span>
        </div>

        <div className="mt-2 flex justify-center login-inner-container ">
          <div style={{ width:isMobile?"100%":"65%",padding:isMobile?"10px":"" }}>
            <div className="flex mt-2">
              <div style={{ flex: isMobile?".5":"1" }} className="">
                <p className="rubik flex mt-1 align-center login-email">
                  First Name
                </p>
                <p className="rubik flex mt-1 align-center login-email">
                  Last Name
                </p>
                <p className="rubik mt-1 flex align-center login-password">
                  Phone
                </p>
                <p className="rubik flex mt-1 align-center login-email">
                  Email
                </p>
                <p className="rubik mt-1 flex align-center login-password">
                  Password
                </p>
              </div>
              <form style={{ flex: isMobile?"1":"2" }} onSubmit={formik.handleSubmit}>
                <div className="relative ">
                  <input
                    type="text"
                    className={`mt-1 outline-none login-email-input ${isMobile?"w-90":""}`}
                    name="firstname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                  />
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div
                      className="absolute error-message red rubik"
                      style={{ fontSize: ".8rem", top: "0px" }}
                    >
                      {"*" + formik.errors.firstname}
                    </div>
                  ) : null}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    className={`mt-1 outline-none login-email-input ${isMobile?"w-90":""}`}
                    name="lastname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                  />
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div
                      className="absolute error-message red rubik"
                      style={{ fontSize: ".8rem", top: "0px" }}
                    >
                      {"*" + formik.errors.lastname}
                    </div>
                  ) : null}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    className={`mt-1 outline-none login-email-input ${isMobile?"w-90":""}`}
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div
                      className="absolute error-message red rubik"
                      style={{ fontSize: ".8rem", top: "0px" }}
                    >
                      {"*" + formik.errors.phone}
                    </div>
                  ) : null}
                </div>

                <div className="relative">
                  <input
                    type="email"
                    className={`mt-1 outline-none login-email-input ${isMobile?"w-90":""}`}
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div
                      className="absolute error-message red rubik"
                      style={{ fontSize: ".8rem", top: "0px" }}
                    >
                      {"*" + formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="relative">
                  <input
                    className={`outline-none mt-1 login-password-input ${isMobile?"w-90":""}`}
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div
                      className="absolute error-message red rubik"
                      style={{ fontSize: ".8rem", top: "0px" }}
                    >
                      {"*" + formik.errors.password}
                    </div>
                  ) : null}
                </div>

                <div
                  className={`flex  mt-2 direction `}
                  style={{ width:isMobile?"100%":"65%" }}
                >
                  <Link to="/forget-password" className=" w-100">
                    <p className="rubik w-100">FORGET PASSWORD?</p>
                  </Link>
                  <button
                    className="mt-2 white pointer sign-in-btn rubik"
                    style={{ width: "40%" }}
                    type="submit"
                  >
                    REGISTER
                  </button>
                  <Link to="/login" className="mt-2 mb-2 register-link rubik">
                    I have an account, Login!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
