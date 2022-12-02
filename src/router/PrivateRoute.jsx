import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";

export const PrivateRoute = ({ children }) => {
  const logged = true;
  const { pathname, search } = useLocation();
  const lastpath = pathname + search;
  localStorage.setItem("lastpath", lastpath);
  return logged ? children : <Navigate to="/auth/login"></Navigate>;
};
