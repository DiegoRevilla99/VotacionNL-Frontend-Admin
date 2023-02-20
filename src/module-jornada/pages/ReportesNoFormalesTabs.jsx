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
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
import { PrivateRoute } from "../../router/PrivateRoute";
import { onGetBoletas } from "../../store/module-preparacion/jornada/ThunksJornada";
import { ReporteFinalNoFormalHTML } from "../components/ReporteFinalNoFormalHTML";
import { ReporteInicialHTML } from "../components/ReporteInicialHTML";
import { ReporteFinal } from "./ReporteFinal";
import { ReporteFinalJornadaNoFormal } from "./ReporteFinalJornadaNoFormal";
import { ReporteInicial } from "./ReporteInicial";
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

export const ReportesNoFormalesTabs = () => {
	const { status, jornadaVotosData } = useJornadaStore();
	const [value, setValue] = React.useState(0);
	const params = useParams();

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
						href={`/jornada/reportesJornadasNoFormales/reportes/${params.idJornada}/reporteInicio/`}
					/>
					<LinkTab
						sx={{ fontSize: "16px" }}
						label="Reporte final"
						href={`/jornada/reportesJornadasNoFormales/reportes/${params.idJornada}/reporteFinal/`}
					/>
					<LinkTab
						sx={{ fontSize: "16px" }}
						label="Sesiones"
						href={`/jornada/reportesJornadasNoFormales/reportes/${params.idJornada}/sesiones`}
					/>
				</Tabs>

				<Box
				// ml={"2rem"}
				// mr={"2rem"}
				// mb={"2rem"}
				// sx={{
				// 	boxShadow: 1,
				// 	height: "auto",
				// 	display: "flex",
				// 	flexDirection: "column",
				// 	backgroundColor: "white",
				// 	borderRadius: "2rem",
				// 	p: "2rem",
				// }}
				>
					<PrivateRoute>
						<Routes>
							<Route path="reporteInicio/*" element={<>Reporte inicial</>} />
							<Route
								path="reporteFinal/*"
								element={
									<ReporteFinalJornadaNoFormal
										status={status}
										jornadaVotosData={jornadaVotosData}
									/>
								}
							/>
							{/* <Route path="reporteFinal/*" element={<ReporteFinal />} /> */}
							{/* <Route path="reporteFinal/*" element={<>Reporte Final</>} /> */}
							<Route path="sesiones/*" element={<VerSesiones />} />
							{/* <Route path="sesiones" element={<JornadasNoFormales />} /> */}
						</Routes>
					</PrivateRoute>
				</Box>
			</Box>
			<Box sx={{ overflowY: "visible" }}>
				{jornadaVotosData.length !== 0 && status !== "checking" && (
					<ReporteFinalNoFormalHTML jornadaVotosData={jornadaVotosData} />
					// <></>
				)}
			</Box>
		</Box>
	);
};
