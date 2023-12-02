import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../slice/auth";
import { fetchUserById, loginUser } from "../slice/userSlice";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";
const Login = ({ go }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const dispatch = useDispatch();

  const loginUserData = async (email, password) => {
    try {
      setLoading(true);
      const response = await dispatch(loginUser({ email, password }));
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Login successful!");
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
      } else if (response.meta.requestStatus === "rejected") {
        toast.error("Invalid Credentials!");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    loginUserData(email, password);
  };

  if (loading) {
    return (
      <div className="w-100 flex justify-center login-main-container">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="w-100 flex justify-center login-main-container">
      <ToastContainer />
      <div className="w-95">
        <div className="relative flex direction justify-center login-border">
          <h4>Log in to your account</h4>
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
          <div style={{ width: isMobile ? "100%" : "65%" }}>
            <form
              className="flex mt-2"
              onSubmit={handleLogin}
              style={{ padding: isMobile ? "10px" : "" }}
            >
              <div style={{ flex: isMobile ? ".5" : "1" }}>
                <p className="flex align-center login-email">Email</p>
                <p className="mt-1 flex align-center login-password">
                  Password
                </p>
              </div>
              <div style={{ flex: isMobile ? "1" : "3" }}>
                <input
                  type="email"
                  className={`outline-none login-email-input ${
                    isMobile ? "w-100" : ""
                  }`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                  className={`outline-none mt-1 login-password-input ${
                    isMobile ? "w-100" : ""
                  }`}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="flex mt-2 direction"
                  style={{ width: isMobile ? "100%" : "65%" }}
                >
                  <Link to="/forget-password">
                    <p style={{ fontSize: isMobile ? ".8rem" : "" }}>
                      FORGET PASSWORD?
                    </p>
                  </Link>
                  <button
                    className={`${
                      isMobile ? "" : "mt-2"
                    } white pointer sign-in-btn`}
                    style={{ width: "40%" }}
                    disabled={loading}
                  >
                    SIGN IN
                  </button>
                  <Link
                    to="/register"
                    className={`${isMobile ? "" : "mt-2"} mb-2 register-link`}
                    style={{ fontSize: isMobile ? ".8rem" : "" }}
                  >
                    No account? Create one here
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
