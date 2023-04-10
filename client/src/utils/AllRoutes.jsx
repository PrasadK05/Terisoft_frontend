import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import History from "../pages/History";
import Profile from "../pages/Profile";

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/history"
        element={
          <PrivateRoutes>
            <History />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        }
      ></Route>
      <Route path="/register" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}
