import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authLoginSucc } from "../redux/auth/auth.action";

export default function PrivateRoutes({ children }) {
  let token = Cookies.get("token");
  let name = Cookies.get("name");
  const dispatch = useDispatch();

  if (token) {    
    dispatch(authLoginSucc({ token, name }));
    return children;
  }
  return <Navigate to={"/login"} />;
}
