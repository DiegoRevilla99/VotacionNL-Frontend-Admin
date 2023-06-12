import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { Login } from "../pages/Login";
import { Recuperacion } from "../pages/Recuperacion";
import { Registro } from "../pages/Registro";

export const AuthRoutes = () => {
	console.log("ME EJECUTO AUTH");
	return (
		<PrivateRoute>
			<Routes>
				<Route path="login" element={<Login />} />
				<Route path="registro" element={<Registro />} />
				<Route path="recuperacion" element={<Recuperacion />} />

				<Route path="/*" element={<Navigate to="/auth/login" />} />
			</Routes>
		</PrivateRoute>
	);
};
