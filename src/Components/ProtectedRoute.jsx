import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../App";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = UserAuth();
  if (!isLogin) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
