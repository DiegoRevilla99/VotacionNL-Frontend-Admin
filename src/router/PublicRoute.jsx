import React from "react";

import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const PublicRoute = ({ children }) => {
  const { status } = useCheckAuth();

  console.log("***************Publc LOGIN", status);
  const logged = false;
  const { pathname, search } = useLocation();

  return status === "notLogged" ? (
    children
  ) : (
    <Navigate to="/preparacion/inicio"></Navigate>
  );
};
