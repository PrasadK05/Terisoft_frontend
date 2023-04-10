import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { authLoginSucc } from "../redux/auth/auth.action";

export default function PrivateRoutes({ children }) {
  let token = Cookies.get("token");

  if (token) {
    authLoginSucc({ token });
    return children;
  }
  return <Navigate to={"/login"} />;
}
