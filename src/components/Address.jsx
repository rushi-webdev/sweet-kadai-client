import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAddresses, postUserAddress } from "../slice/userAddressSlice";
import secureLocalStorage from "react-secure-storage";
import validationSchema from "../validations/addressSchema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
const Address = () => {
  const addresses = useSelector((state) => state.address.addresses);
  const status = useSelector((state) => state.address.status);
  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState(true);
  const isMobile=useMediaQuery({maxWidth:768});
  useEffect(() => {
    const userId = secureLocalStorage.getItem("userId");
    dispatch(fetchUserAddresses(userId));
  }, [dispatch]);

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
        if (status == "succeeded") {
          toast.success("Address Added");
        }
      } catch (error) {
        console.error("Error submitting address:", error);
      }
    },
  });

  return newAddress ? (
    <div className="w-100 flex justify-center">
      <div className="w-95">
        <div className="">
          {Array.isArray(addresses) &&
            addresses.map((address) => (
              <div key={address._id} className="flex">
                <div className="ml-2 mt-1 flex" style={{border:"1px solid black"}}>
                  <div className="ml-2 mr-1 mt-1 mb-1 pointer">
                    <p>{address.houseNo}</p>
                    <p>{address.landmark}</p>
                    <p>{address.village}</p>
                    <p>{address.district}</p>
                    <p>{address.state}</p>
                    <p>{address.pincode}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button
          onClick={() => setNewAddress(false)}
          className="border-none mt-2 white pointer mr-2 mb-1"
          style={{
            backgroundColor: "rgb(255,70,0)",
            padding: "10px 25px",
          }}
        >
          Add new address
        </button>
        <br />
      </div>
    </div>
  ) : (
    <div className="flex justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="mt-1 ml-1 mb-1 mr-1"
        style={{ width: isMobile?"100%":"45%", border: "1px solid black", padding: "10px" }}
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
              <div className="red">*{formik.errors.landmark}</div>
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
              <div className="red">*{formik.errors.village}</div>
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
                <div className="red">*{formik.errors.district}</div>
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
              <div className="red">*{formik.errors.state}</div>
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
              <div className="red">*{formik.errors.pincode}</div>
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
              <div className="red">*{formik.errors.houseNo}</div>
            ) : null}
          </div>
        </div>
        <div className="mt-1 flex justify-center align-center">
          <p onClick={() => setNewAddress(true)} className="mr-1 pointer">
            Cancle
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
  );
};

export default Address;
