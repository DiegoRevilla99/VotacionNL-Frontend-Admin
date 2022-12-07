import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { AddBoletaComite } from "../pages/AddBoletaComite";
import { AddBoletaJornada } from "../pages/AddBoletaJornada";
import { AddPapeleta } from "../pages/AddPapeleta";
import { CrudComite } from "../pages/CrudComite";
import { CrudConsulta } from "../pages/CrudConsulta";
import { CrudJornada } from "../pages/CrudJornada";
import { HomePreparacion } from "../pages/HomePreparacion";
import { RegistroComite } from "../pages/RegistroComite";
import { RegistroConsultaCiudadana } from "../pages/RegistroConsultaCiudadana";

import { RegistroJornadaElectoral } from "../pages/RegistroJornadaElectoral";

export const PreparacionRoutes = () => {
	return (
		<PrivateRoute>
			<Routes>
				<Route path="inicio" element={<HomePreparacion></HomePreparacion>} />

				<Route path="registroJornada" element={<RegistroJornadaElectoral />} />
				<Route path="registroComite" element={<RegistroComite />} />
				<Route path="registroConsultaCiudadana" element={<RegistroConsultaCiudadana />} />

				<Route path="comite" element={<CrudComite />} />
				<Route path="comite/boleta" element={<AddBoletaComite></AddBoletaComite>} />
				<Route path="jornada" element={<CrudJornada />} />
				<Route path="jornada/boleta" element={<AddBoletaJornada />} />

				
				<Route path="consulta" element={<CrudConsulta />} />
				<Route path="consulta/papeleta" element={<AddPapeleta />} />

				<Route path="/*" element={<Navigate to="/preparacion/inicio" />} />
			</Routes>
		</PrivateRoute>
	);
};
