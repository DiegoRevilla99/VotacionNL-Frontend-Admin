import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  //   const { status } = useCheckAuth();

  const { status } = useSelector((state) => state.auth);
  console.log("Status de Privet " + status);
  //const status = "logged";

  const logged = true;
  const { pathname, search } = useLocation();
  const lastpath = pathname + search;
  console.log("lastPath::" + lastpath);
  localStorage.setItem("lastpath", lastpath);
  const location = useLocation();
  // console.log(location);
  sessionStorage.setItem("Location", location.pathname);

  return status !== "notLogged" && status !== "checking" ? (
    children
  ) : (
    <Navigate to="/auth/login"></Navigate>
  );
};
