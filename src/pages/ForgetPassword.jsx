// ForgotPassword.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendResetPasswordEmail } from "../slice/passwordResetSlice";
import { useMediaQuery } from "react-responsive";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.forgotPassword.loading);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const handleForgotPassword = async (e) => {
      e.preventDefault();
    await dispatch(sendResetPasswordEmail(email))
      .unwrap()
      .then((result) => {
        setMessage(result.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <div className="w-100 flex justify-center">
      <div className="w-95">
        <div className="relative flex direction justify-center login-border">
          <h4>Forget your Password?</h4>
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
          <div style={{ width: "65%" }}>
            <p>
              Please enter the email address you used to register. You will
              receive a temporary link to reset your password.
            </p>
            <form
              className={`flex mt-2  ${
                isMobile ? "direction" : "align-center"
              }`}
              onSubmit={handleForgotPassword}
              style={{ height: isMobile ? "auto" : "35px" }}
            >
              <p style={{ flex: "1", marginBottom: isMobile ? "5px" : "" }}>
                Email address
              </p>
              <input
                className="h-100 outline-none pl-1"
                style={{
                  flex: "2",
                  borderRadius: "0px",
                  border: "1px solid black",
                  padding: isMobile ? "10px 0px 10px 10px" : "0px 0px 0px 1rem",
                }}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="h-100 pointer outline-none border-none"
                style={{
                  flex: "1",
                  borderRadius: "1px",
                  backgroundColor: "rgb(251,100,27)",
                  marginTop: isMobile ? "1rem" : "",
                  padding: isMobile ? "10px 0px" : "",
                }}
                onClick={handleForgotPassword}
                disabled={loading === "pending"}
              >
                {loading === "pending" ? "Sending..." : "Send Email"}
              </button>
            </form>
            <p className="w-100 flex justify-center mt-1">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
