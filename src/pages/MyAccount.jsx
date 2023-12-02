import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import { RiUserLocationLine } from "react-icons/ri";
import { RiCalendarTodoLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
const MyAccount = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <div className="w-100 flex justify-center">
      <div className="w-95">
        <div className="relative flex direction justify-center login-border">
          <h4 className="flex justify-center rubik">Your Account</h4>
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

        <div
          className={`w-100 flex justify-between mt-2 ${
            isMobile ? "direction align-center" : ""
          }`}
        >
          <div
            style={{
              width: isMobile ? "70%" : "30%",
              flexWrap: "wrap",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            className={`${isMobile ? "mb-1" : ""}`}
          >
            <Link to="/profile">
              <div className="w-100 flex justify-center mt-1">
                <IoPersonCircle
                  style={{ fontSize: "40px", color: "rgb(119,103,66)" }}
                />
              </div>
              <div className="w-100 flex justify-center mt-1 mb-1">
                <h4 className="rubik black">INFORMATION</h4>
              </div>
            </Link>
          </div>

          <div
            style={{
              width: isMobile ? "70%" : "30%",
              flexWrap: "wrap",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            className={`${isMobile ? "mb-1" : ""}`}
          >
            <Link to="/address">
              <div className="w-100 flex justify-center mt-1">
                <RiUserLocationLine
                  style={{ fontSize: "40px", color: "rgb(119,103,66)" }}
                />
              </div>
              <div className="w-100 flex justify-center mt-1 mb-1">
                <h4 className="rubik black">ADDRESSES</h4>
              </div>
            </Link>
          </div>
          <div
            style={{
              width: isMobile ? "70%" : "30%",
              flexWrap: "wrap",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            className={`${isMobile ? "mb-1" : ""}`}
          >
            <Link to="/orders">
              <div className="w-100 flex justify-center mt-1">
                <RiCalendarTodoLine
                  style={{ fontSize: "40px", color: "rgb(119,103,66)" }}
                />
              </div>
              <div className="w-100 flex justify-center mt-1 mb-1">
                <h4 className="rubik black">ORDERS</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
