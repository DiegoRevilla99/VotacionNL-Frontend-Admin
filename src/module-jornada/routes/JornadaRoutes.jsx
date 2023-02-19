import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { ConsultasTabs } from "../pages/ConsultasTabs";
import { InicioJornadaPage } from "../pages/InicioJornadaPage";
import { ReportesFormalesTabs } from "../pages/ReportesFormalesTabs";
import { VerConsultasCiudadanas } from "../pages/VerConsultasCiudadanas";
import { VerJornadasFormales } from "../pages/VerJornadasFormales";
import { VerJornadasNoFormales } from "../pages/VerJornadasNoFormales";

export const JornadaRoutes = () => {
	return (
		<PrivateRoute>
			<Routes>
				<Route path="inicio" element={<InicioJornadaPage />} />

				<Route path="/*" element={<Navigate to="/jornada/inicio" />} />
				<Route path="reportesJornadasFormales" element={<VerJornadasFormales />} />
				<Route path="reportes/:idJornada/*" element={<ReportesFormalesTabs />} />

				<Route path="reportesJornadasNoFormales" element={<VerJornadasNoFormales />} />

				<Route path="reportesConsultasCiudadanas" element={<VerConsultasCiudadanas />} />
				<Route
					path="reportesConsultasCiudadanas/reportes/:idConsulta/*"
					element={<ConsultasTabs />}
				/>
			</Routes>
		</PrivateRoute>
	);
};
