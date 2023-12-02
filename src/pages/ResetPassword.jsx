// ResetPassword.js

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../slice/passwordResetSlice";
import { useMediaQuery } from "react-responsive";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.forgotPassword.resetMessage);
  const loading = useSelector((state) => state.forgotPassword.loading);
  const isMobile=useMediaQuery({maxWidth:768});
  const [newPassword, setNewPassword] = useState("");
  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, newPassword }));
  };

  return (
    <div className="w-100 flex justify-center">
      <div className="w-95">
        <div className="relative flex direction justify-center login-border">
          <h4>Reset your Password?</h4>
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
            <p>Please your new password.</p>
            <form
              className={`flex mt-2   ${isMobile?"direction":"align-center"}`}
              style={{ height: "35px" }}
              onSubmit={handleResetPassword}
            >
              <p style={{ flex: "1" }}>Reset password</p>
              <input
                className="h-100 outline-none pl-1"
                style={{
                  flex: "2",
                  borderRadius: "0px",
                  border: "1px solid black",
                  padding:isMobile?"10px 0px 10px 10px":"",
                  margin:isMobile?"10px 0px":""
                }}
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                className="h-100 pointer outline-none border-none"
                style={{
                  flex: "1",
                  borderRadius: "1px",
                  backgroundColor: "rgb(251,100,27)",
                  padding:isMobile?"10px":"",
                }}
                disabled={loading === "pending"}
              >
                {loading === "pending" ? "Loading..." : "Change Password"}
              </button>
            </form>
            <p className="w-100 flex justify-center mt-1">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
