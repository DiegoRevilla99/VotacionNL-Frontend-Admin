import {
	Box,
	Button,
	CircularProgress,
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
import {
	onGetBoletas,
	onGetJornadaVotos,
} from "../../store/module-preparacion/jornada/ThunksJornada";
import { JornadaFormalChart } from "./JornadaFormalChart";

export const ReporteFinal = () => {
	const { jornadaSelected, status, jornadaVotosData } = useJornadaStore();
	const [boleta, setBoleta] = React.useState(null);
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	console.log("BOLETA", boleta);

	const handleChangeSelect = (event) => {
		setBoleta(event.target.value);
		navigate("/jornada/reportes/" + params.idJornada + "/reporteFinal/" + event.target.value);
	};

	useEffect(() => {
		if (boleta !== null) {
			dispatch(onGetJornadaVotos(boleta));
			console.log("BUSCO LA BOLETAAAAA");
		}
	}, [boleta]);

	return (
		<Box
			ml={"2rem"}
			mr={"2rem"}
			mb={"2rem"}
			sx={{
				boxShadow: 1,
				height: "auto",
				display: "flex",
				flexDirection: "column",
				backgroundColor: "white",
				borderRadius: "2rem",
				p: "2rem",
			}}
			minWidth="auto"
			// minWidth="100wh"
		>
			<Typography variant="h6" color="initial" align="center" pb={3}>
				{jornadaSelected.title}
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<FormControl size="small" fullWidth>
						<InputLabel id="demo-select-small">Boleta</InputLabel>
						<Select
							labelId="demo-select-small"
							id="demo-select-small"
							value={boleta === null ? "null" : boleta}
							label="Boleta"
							onChange={handleChangeSelect}
						>
							{/* <MenuItem value="">
									<em>Selecciona una boleta</em>
								</MenuItem> */}
							{jornadaSelected.boletas.map((boleta) => {
								return (
									<MenuItem
										value={boleta.idEstructuraBoleta}
										key={boleta.idEstructuraBoleta}
									>
										{boleta.nombreEleccion}
									</MenuItem>
								);
							})}
							<MenuItem value={"null"} disabled>
								Selecciona una boleta
							</MenuItem>
							{/* <MenuItem value={30}>Elecciones de diputado</MenuItem> */}
						</Select>
					</FormControl>
				</Grid>

				{/* <Grid item xs={3}></Grid>
				<Grid item container xs={6}>
					<Grid
						item
						xs={4}
						display="flex"
						justifyContent="center"
						alignContent="center"
						alignItems="center"
					>
						<Typography
							variant="h6"
							color="initial"
							align="center"
							sx={{ wordBreak: "break-word" }}
						>
							Nuevo León
						</Typography>
					</Grid>
					<Grid
						item
						xs={3}
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignContent="center"
						alignItems="center"
					>
						<Box borderRight="1px solid" pr={4} display="flex" flexDirection="column">
							<Typography
								variant="body1"
								color="initial"
								align="center"
								fontWeight="bold"
							>
								Presidente
							</Typography>
							<Typography variant="body2" color="initial" align="center">
								Mayoría relativa
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						xs={5}
						display="flex"
						justifyContent="center"
						alignContent="center"
						alignItems="center"
					>
						<Typography
							variant="body2"
							color="initial"
							// fontWeight="bold"
							align="center"
						>
							Voto por partido político y Candidatura independiente
						</Typography>
					</Grid>
				</Grid>
				<Grid item xs={3}></Grid> */}
			</Grid>

			<Box display="flex" flexDirection="column" height="100%" mt={3}>
				<PrivateRoute>
					<Routes>
						<Route
							path={":idBoleta"}
							element={
								status === "checking" ? (
									<Box
										display="flex"
										justifyContent="center"
										alignContent="center"
										py={5}
									>
										<CircularProgress size={80} />
									</Box>
								) : boleta === null ? (
									<></>
								) : (
									<JornadaFormalChart chartData={jornadaVotosData} />
								)
							}
						/>
						{/* <Route
							path={"/*"}
							element={
								<Routes>
									<Route path={"/:idBoleta"} element={<JornadaNoFormalChart />} />
								</Routes>
							}
						/> */}
					</Routes>
				</PrivateRoute>
			</Box>
		</Box>
	);
};
