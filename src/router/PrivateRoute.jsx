import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const PrivateRoute = ({ children }) => {
	const { status } = useCheckAuth();
	const logged = true;
	const { pathname, search } = useLocation();
	const lastpath = pathname + search;
	localStorage.setItem("lastpath", lastpath);
	return status !== "notLogged" ? children : <Navigate to="/auth/login"></Navigate>;
};
