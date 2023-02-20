import {
	Box,
	Button,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	LinearProgress,
	MenuItem,
	Paper,
	Select,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
import { PrivateRoute } from "../../router/PrivateRoute";
import { onGetBoletas } from "../../store/module-preparacion/jornada/ThunksJornada";
import { ReporteFinalConsultaHTML } from "../components/ReporteFinalConsultaHTML";
import { ReporteInicialConsultaHTML } from "../components/ReporteInicialConsultaHTML";
import { ReporteInicialHTML } from "../components/ReporteInicialHTML";
import { ReporteFinal } from "./ReporteFinal";
import { ReporteFinalConsulta } from "./ReporteFinalConsulta";
import { ReporteInicial } from "./ReporteInicial";
import { ReporteInicialConsulta } from "./ReporteInicialConsulta";
import { VerSesiones } from "./VerSesiones";

function LinkTab(props) {
	const navigate = useNavigate();
	return (
		<Tab
			component="a"
			onClick={(event) => {
				event.preventDefault();
				navigate(props.href);
			}}
			{...props}
		/>
	);
}

export const ConsultasTabs = () => {
	const [value, setValue] = React.useState(0);
	const params = useParams();
	const { status, jornadaVotosData } = useJornadaStore();

	const handleChange = (event, newValue) => {
		setValue(newValue);
		// navigate("/jornada/reportes/" + params.idJornada + "/reporteFinal/" + event.target.value);
	};

	// if (status === "checking")
	// 	return (
	// 		<Box sx={{ width: "100%" }}>
	// 			<LinearProgress />
	// 		</Box>
	// 	);
	// else
	return (
		<Box sx={{ overflow: "visible" }}>
			<Box
				sx={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					// mb: "2rem",
					// ml: "2rem",
					// mr: "2rem",
					// height: "100%",
					overflowY: "auto",
				}}
			>
				<Tabs
					sx={{ mt: 1 }}
					value={value}
					onChange={handleChange}
					aria-label="nav tabs example"
					textColor="primary"
					indicatorColor="primary"
					centered
				>
					<LinkTab
						sx={{ fontSize: "16px" }}
						label="Reporte inicial"
						href={`/jornada/reportesConsultasCiudadanas/reportes/${params.idConsulta}/reporteInicio/`}
					/>
					<LinkTab
						sx={{ fontSize: "16px" }}
						label="Reporte final"
						href={`/jornada/reportesConsultasCiudadanas/reportes/${params.idConsulta}/reporteFinal/`}
					/>
					<LinkTab
						sx={{ fontSize: "16px" }}
						label="Sesiones"
						href={`/jornada/reportesConsultasCiudadanas/reportes/${params.idConsulta}/sesiones`}
					/>
				</Tabs>

				<Box>
					<PrivateRoute>
						<Routes>
							<Route path="reporteInicio/*" element={<ReporteInicialConsulta />} />
							<Route
								path="reporteFinal/*"
								element={
									<ReporteFinalConsulta
										status={status}
										jornadaVotosData={jornadaVotosData}
									/>
								}
							/>
							<Route path="sesiones/*" element={<VerSesiones />} />
							{/* <Route path="sesiones" element={<JornadasNoFormales />} /> */}
						</Routes>
					</PrivateRoute>
				</Box>
			</Box>
			<Box sx={{ overflowY: "visible" }}>
				{jornadaVotosData.resultados.length !== 0 && status !== "checking" && (
					<>
						<ReporteFinalConsultaHTML jornadaVotosData={jornadaVotosData} />
						<ReporteInicialConsultaHTML jornadaVotosData={jornadaVotosData} />
					</>
				)}
			</Box>
		</Box>
	);
};
