import React from "react";
import { useSelector } from "react-redux";

import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const PublicRoute = ({ children }) => {
	// const { status } = useCheckAuth();
	const { status } = useSelector((state) => state.auth);

	return status === "notLogged" ? children : <Navigate to="/preparacion/inicio"></Navigate>;
};
