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
import { RegistroJornadaElectoral } from "../pages/RegistroJornadaElectoral";
import { RegistroComite } from "../pages/RegistroComite";
import { RegistroConsultaCiudadana } from "../pages/RegistroConsultaCiudadana";
import { ConfiguracionJornada } from "../pages/ConfiguracionJornada";
import { ConfigBoleta } from "../pages/formales/ConfigBoleta";
import { ConfigBoletaMultiple } from "../pages/no-formales/ConfigBoletaMultiple";
import { CrudPapeletas } from "../pages/CrudPapeletas";
import { RegistroJornadaElectoralGenerica } from "../pages/RegistroJornadaElectoralGenerica";
import { CrudJornadaGenerica } from "../pages/CrudJornadaGenerica";
import { AddBoletaJornadaGenerica } from "../pages/AddBoletaJornadaGenerica";
import { ConfiguracionConsulta } from "../pages/ConfiguracionConsulta";
import { RegistroJornadaNoFormal } from "../pages/RegistroJornadaNoFormal";
import { RegistroJornadaFormal } from "../pages/RegistroJornadaFormal";

export const PreparacionRoutes = () => {
	return (
		<PrivateRoute>
			<Routes>
				<Route path="inicio" element={<HomePreparacion></HomePreparacion>} />

				<Route path="registroJornada" element={<RegistroJornadaElectoral />} />
				<Route path="jornada" element={<CrudJornada />} />
				{/* <Route path="jornada/boleta" element={<AddBoletaJornada></AddBoletaJornada>} /> */}
				<Route path="jornada/:id" element={<CrudJornada></CrudJornada>} />
				<Route
					path="jornada/noFormal/:id"
					element={<CrudJornadaGenerica></CrudJornadaGenerica>}
				/>
				<Route
					path="jornada/noFormal/:id/boletanf/:id"
					element={<AddBoletaJornadaGenerica></AddBoletaJornadaGenerica>}
				/>

				<Route path="registroJornada" element={<RegistroJornadaElectoral />} />
				<Route path="registroJornadaFormal" element={<RegistroJornadaFormal />} />

				<Route
					path="jornada/:id/boleta/:id"
					element={<AddBoletaJornada></AddBoletaJornada>}
				/>

				<Route path="comite" element={<CrudComite />} />
				<Route path="comite/boleta" element={<AddBoletaComite></AddBoletaComite>} />
				<Route path="comite/boleta/:nombre" element={<AddBoletaComite></AddBoletaComite>} />
				<Route path="registroComite" element={<RegistroComite />} />
				<Route path="registroJornadaNoFormal" element={<RegistroJornadaNoFormal />} />

				<Route path="consulta" element={<CrudConsulta />} />
				<Route path="registroConsultaCiudadana" element={<RegistroConsultaCiudadana />} />
				{/* <Route path="consulta/papeleta" element={<AddPapeleta />} /> */}
				<Route path="consulta/:id" element={<CrudPapeletas />} />
				{/* <Route path="registroConsultaCiudadana" element={<RegistroConsultaCiudadana />} /> */}
				<Route path="consulta/:id/papeleta/:idPapeleta" element={<AddPapeleta />} />

				{/* CONFIGURACION NO FORMAL */}
				<Route path="jornadaNoFormal/config/:id" element={<ConfiguracionJornada />} />
				<Route path="jornadaNoFormal/configboleta/:id" element={<ConfigBoletaMultiple />} />

				{/* <Route 	path="registroJornadaGenerica" element={<RegistroJornadaElectoralGenerica />}/>
				<Route path="JornadaGenerica" element={<CrudJornadaGenerica />} />
				<Route path="JornadaGenerica/boleta" element={<AddBoletaJornadaGenerica />} /> */}

				<Route path="jornada/configboleta" element={<ConfigBoletaMultiple />} />
				<Route path="consulta/config/:idConsulta" element={<ConfiguracionConsulta />} />
				{/* CONFIGURACION FORMAL */}
				<Route path="jornada/config/:id" element={<ConfiguracionJornada />} />
				<Route path="jornada/configboleta/:id" element={<ConfigBoleta />} />

				{/* CONFIGURACION NO FORMAL */}
				<Route path="jornadaNoFormal/config" element={<ConfiguracionJornada />} />
				<Route path="jornadaNoFormal/configboleta/:id" element={<ConfigBoletaMultiple />} />

				<Route path="jornada/configboleta" element={<ConfigBoletaMultiple />} />
				<Route path="consulta/config/:idConsulta" element={<ConfiguracionConsulta />} />

				<Route path="/*" element={<Navigate to="/preparacion/inicio" />} />
			</Routes>
		</PrivateRoute>
	);
};
