import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { fetchUserById, updateUser } from "../slice/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const update = useSelector((state) => state.user.update);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    oldPassword: "",
    newPassword: "",
  });
  const formik = useFormik({
    initialValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().min(2, "Too Short!").required("Required"),
      lastname: Yup.string().min(2, "Too Short!").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      phone: Yup.string().min(10, "Too Short!").required("Required"),
      oldPassword: Yup.string().min(6, "Too Short!"),
      newPassword: Yup.string().min(6, "Too Short!"),
    }),
    enableReinitialize: true, // Allow form reinitialization when initial values change
    onSubmit: (values) => {
      const userId = secureLocalStorage.getItem("userId");
      const combinedData = { ...values, userId: userId };
      dispatch(updateUser(combinedData));
      if (update.success) {
        toast.success(update.message, {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (!update.status) {
        toast.error(update.message);
      }
      dispatch(fetchUserById(userId));
    },
  });

  useEffect(() => {
    formik.setValues(formData);
  }, [formData]);
  useEffect(() => {
    const id = secureLocalStorage.getItem("userId");
    dispatch(fetchUserById(id));
  }, [dispatch]);

  useEffect(() => {
    const fetchUserData = () => {
      setFormData({
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        phone: user?.phone,
        oldPassword: "",
        newPassword: "",
      });
    };
    fetchUserData();
  }, [dispatch]);

  if (loading === "pending" || loading === "idle" || !user) {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-100 flex justify-center">
      <div className="w-95">
        <div className="relative flex direction justify-center login-border">
          <h4 className="flex rubik">Your personal information</h4>
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

        <form className="mt-1" onSubmit={formik.handleSubmit}>
          <div className="flex ml-2">
            <div
              style={{ flex: isMobile?"1":"1" }}
              className="flex direction justify-center"
            >
              <p
                className="mt-1 rubik flex align-center"
                style={{ height: "30px", marginRight: isMobile?"":"10rem" }}
              >
                First Name
              </p>
              <p
                className="mt-1 rubik flex align-center"
                style={{ height: "30px", marginRight: isMobile?"":"10rem" }}
              >
                Last Name
              </p>
              <p
                className="mt-1 rubik flex align-center"
                style={{ height: "30px", marginRight: isMobile?"":"10rem" }}
              >
                Email
              </p>
              <p
                className="mt-1 rubik flex align-center"
                style={{ height: "30px", marginRight: isMobile?"":"10rem" }}
              >
                Phone
              </p>
              <p
                className="mt-1 rubik flex align-center"
                style={{ height: "30px", marginRight: isMobile?"":"10rem" }}
              >
                Old Password
              </p>
              <p
                className="mt-1 rubik flex align-center"
                style={{ height: "30px", marginRight: isMobile?"":"10rem" }}
              >
                New Password
              </p>
            </div>

            <div
              style={{ flex: "3" }}
              className="flex direction justify-center"
            >
              <div className="relative">
                <input
                  className="mt-1 rubik pl-1"
                  type="text"
                  name="firstname"
                  minLength={2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                  style={{
                    borderRadius: "1px",
                    border: "1px solid black",
                    width: isMobile?"100%":"50%",
                    height: "30px",
                  }}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div
                    className="absolute"
                    style={{ fontSize: ".8rem", top: "0px", left: "0px" }}
                  >
                    {formik.errors.firstname}
                  </div>
                ) : null}
              </div>
              <div className="relative">
                <input
                  className="mt-1 rubik pl-1"
                  type="text"
                  name="lastname"
                  minLength={2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  style={{
                    borderRadius: "1px",
                    border: "1px solid black",
                    width: isMobile?"100%":"50%",
                    height: "30px",
                  }}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div
                    className="absolute"
                    style={{ fontSize: ".8rem", top: "0px", left: "0px" }}
                  >
                    {formik.errors.lastname}
                  </div>
                ) : null}
              </div>
              <div className="relative">
                <input
                  disabled={true}
                  className="mt-1 rubik pl-1"
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={user?.email}
                  style={{
                    borderRadius: "1px",
                    border: "1px solid black",
                    width: isMobile?"100%":"50%",
                    height: "30px",
                  }}
                />
              </div>
              <div className="relative">
                <input
                  className="mt-1 rubik pl-1"
                  type="text"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  style={{
                    borderRadius: "1px",
                    border: "1px solid black",
                    width: isMobile?"100%":"50%",
                    height: "30px",
                  }}
                  minLength={10}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div
                    className="absolute"
                    style={{ fontSize: ".8rem", top: "0px", left: "0px" }}
                  >
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>
              <div className="relative">
                <input
                  className="mt-1 rubik pl-1"
                  type="password"
                  name="oldPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.oldPassword}
                  style={{
                    borderRadius: "1px",
                    border: "1px solid black",
                    width: isMobile?"100%":"50%",
                    height: "30px",
                  }}
                  minLength={6}
                />
              </div>
              <div className="relative">
                <input
                  className="mt-1 rubik pl-1"
                  type="password"
                  name="newPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  style={{
                    borderRadius: "1px",
                    border: "1px solid black",
                    width: isMobile?"100%":"50%",
                    height: "30px",
                  }}
                  minLength={6}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div
                    className="absolute"
                    style={{ fontSize: ".8rem", top: "0px", left: "0px" }}
                  >
                    {formik.errors.newPassword}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex align-center justify-center mb-1 mt-1">
            <button
              className="mt-1 border-none bg-faint-red white pointer flex align-center"
              style={{ height: "30px", padding: "10px 20px" }}
              type="submit"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
