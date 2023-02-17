import { Box, Button, Divider, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import BallotIcon from "@mui/icons-material/Ballot";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GeneralTable } from "../../module-preparacion/components/GeneralTable";
import { useConsultaCiudadanaStore } from "../../module-preparacion/hooks/useConsultaCiudadanaStore";
import { onSetConsultaSelected } from "../../store/module-preparacion/consulta-ciudadana/consultaCiudadanaSlice";
import {
	onGetConsultasCiudadanas,
	onGetPapeletasParaJornada,
} from "../../store/module-preparacion/consulta-ciudadana/thunks";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
import { onGetjornadas } from "../../store/module-preparacion/jornada/ThunksJornada";

export const VerConsultasCiudadanas = () => {
	const navigate = useNavigate();
	const { consultasData, status } = useConsultaCiudadanaStore();
	const dispatch = useDispatch();
	const columns = [
		{ field: "nombreJornada", headerName: "Título de la consulta ciudadana", flex: 10 },
		{
			field: "acciones",
			headerName: "Acciones",
			flex: 5,
			sortable: false,
			disableColumnMenu: true,
			renderCell: (params) => {
				return (
					<Stack spacing={2} direction="row">
						<Button
							variant="outlined"
							startIcon={<BallotIcon />}
							onClick={() => handleWatch(params.id, params.row.nombreJornada)}
						>
							Ver reportes
						</Button>
					</Stack>
				);
			},
		},
	];

	useEffect(() => {
		if (consultasData.length === 0) dispatch(onGetConsultasCiudadanas());
	}, []);

	const handleWatch = (id, titulo) => {
		// dispatch(onSetConsultaSelected({ id, titulo, ballots: [] }));
		// navigate("/preparacion/consulta/" + id);

		dispatch(
			onGetPapeletasParaJornada(id, titulo, () =>
				navigate("/jornada/reportesConsultasCiudadanas/reportes/" + id + "/reporteInicio/")
			)
		);
	};

	if (status === "checking")
		return (
			<Box sx={{ width: "100%" }}>
				<LinearProgress />
			</Box>
		);
	else
		return (
			<Grid
				container
				sx={{
					height: "100%",
					width: "100%",
					overflowY: "auto",
				}}
			>
				<Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
					<Box sx={{ m: "0.5rem", ml: "2rem" }}>
						<Typography variant="h6" align="left" color="initial">
							CONSULTAS CIUDADANAS REGISTRADAS
						</Typography>
					</Box>
					<Divider />
					<Box
						sx={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
							m: "2rem",
							mt: "2rem",
						}}
					>
						<Box
							sx={{
								boxShadow: 1,
								height: "100%",
								display: "flex",
								flexDirection: "column",
								backgroundColor: "white",
								// mt: "2rem",
								borderRadius: "2rem",
								p: "2rem",
								pt: "1rem",
							}}
						>
							<Typography variant="h5" color="initial" mb="0.5rem">
								Consultas ciudadanas
							</Typography>
							<Divider />
							<Box
								mt={"1rem"}
								sx={{ height: "100%", display: "flex", flexDirection: "column" }}
							>
								{/* <DataGridTable /> */}
								{/* <TableRegistroProceso title={"Nombre de la consulta ciudadana"} /> */}
								{/* <Tabla data={datos} actions={actions} columns={columns}></Tabla> */}
								{/* <TableConsultasCiudadanas /> */}
								<GeneralTable
									data={consultasData}
									columns={columns}
									idName={"idJornada"}
								/>
							</Box>
						</Box>
					</Box>
				</Grid>
			</Grid>
		);
};
