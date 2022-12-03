import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { InicioPage } from "../pages/InicioPage";
import { RegistroJornadaElectoral } from "../pages/RegistroJornadaElectoral";

export const PreparacionRoutes = () => {
	return (
		<PrivateRoute>
			<Routes>
				<Route path="inicio" element={<InicioPage></InicioPage>} />
				<Route path="registroJornada" element={<RegistroJornadaElectoral />} />

				<Route path="/*" element={<Navigate to="/preparacion/inicio" />} />
			</Routes>
		</PrivateRoute>
	);
};
