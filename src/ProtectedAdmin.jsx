import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById } from "./slice/userSlice";
import secureLocalStorage from "react-secure-storage";

const ProtectedAdmin = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userId = secureLocalStorage.getItem("userId");
      if (userId) {
        await dispatch(fetchUserById(userId));
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, [dispatch]);

  if (isLoading) {
    <div>
      <p>Loading...</p>   
    </div>
    return null;
  }

  if (user && user?.isAdmin) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedAdmin;
