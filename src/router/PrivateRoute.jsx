import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  //   const { status } = useCheckAuth();
  const { status } = useSelector((state) => state.auth);
  const logged = true;
  const { pathname, search } = useLocation();
  const lastpath = pathname + search;
  localStorage.setItem("lastpath", lastpath);
  const location = useLocation();
  console.log(location);
  sessionStorage.setItem("Location", location.pathname);

  return status !== "notLogged" ? (
    children
  ) : (
    <Navigate to="/auth/login"></Navigate>
  );
};
