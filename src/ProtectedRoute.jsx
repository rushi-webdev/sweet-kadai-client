import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProtectedData, login, logout } from "./slice/auth";
import { fetchUserById } from "./slice/userSlice";
import secureLocalStorage from "react-secure-storage";
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = secureLocalStorage.getItem("token");
      try {
        await dispatch(fetchProtectedData());
        if (isAuthenticated) {
          dispatch(login(token));
          const getUser = secureLocalStorage.getItem("userId");
          dispatch(fetchUserById(getUser));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    };

    if (isAuthenticated) {
      checkAuthentication();
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
