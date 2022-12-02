import React from "react";

import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const logged = true;
  const { pathname, search } = useLocation();

  return !logged ? children : <Navigate to="/preparacion/inicio"></Navigate>;
};
