import { Box, Button, Divider, Grid, IconButton, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ModalRegistroConsultaCiudadana } from "../components/ModalRegistroConsultaCiudadana";
import { GeneralTable } from "../components/GeneralTable";
import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";
import { Stack } from "@mui/system";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch } from "react-redux";
import {
	onDeleteConsultaCiudadana,
	onGetConfig,
	onGetConsultasCiudadanas,
} from "../../store/module-preparacion/consulta-ciudadana/thunks";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	onSetConfigSelectedNull,
	onSetConsultaSelected,
} from "../../store/module-preparacion/consulta-ciudadana/consultaCiudadanaSlice";
import { ModalRegistroJornadaNoFormal } from "../components/ModalRegistroJornadaNoFormal";
import { ModalRegistroJornadaFormal } from "../components/ModalRegistroJornadaFormal";

export const RegistroJornadaFormal = () => {
	const navigate = useNavigate();
	const [modalStatus, setModalStatus] = useState(false);

	// ToDo:AQUI OBTENGAN LAS VARIABLES STATUS Y DATA DE SUS ESTADOS GLOBALES
	const { consultasData, status } = useConsultaCiudadanaStore();

	const dispatch = useDispatch();
	const columns = [
		{ field: "nombreJornada", headerName: "Título de la jornada formal", flex: 10 },
		{
			field: "configuracion",
			headerName: "Configuración",
			flex: 5,
			sortable: false,
			disableColumnMenu: true,
			renderCell: (params) => {
				return (
					<Stack spacing={2} direction="row">
						<Button
							variant="outlined"
							startIcon={<BallotIcon />}
							onClick={() => handleEdit(params.id)}
						>
							Ver
						</Button>
						<Button
							variant="outlined"
							startIcon={<SettingsIcon />}
							onClick={() => handleConfig(params.id)}
						>
							Configuración
						</Button>
						<IconButton
							sx={{ color: "#511079" }}
							onClick={() => handleDelete(params.id)}
						>
							<DeleteIcon />
						</IconButton>
					</Stack>
				);
			},
		},
	];

	// USEEFFECT QUE PUEDES USAR PARA HACER UN GET DE LAS JORNADAS AL RENDERIZAR LA PAGINA
	// useEffect(() => {
	// 	if (consultasData.length === 0) dispatch(onGetConsultasCiudadanas());
	// }, []);

	// METODO PARA BORRAR UN REGISTRO
	const handleDelete = (id) => {
		// dispatch(onDeleteConsultaCiudadana(id));
	};

	// MÉTODO PARA EDITAR UN REGISTRO
	const handleEdit = (id) => {
		// dispatch(onSetConsultaSelected({ id, titulo, ballots: [] }));
		// navigate("/preparacion/consulta/" + id);
	};

	// MÉTODO PARA IR A LA PAGINA DE CONFIGURACIÓN DEL REGISTRO
	const handleConfig = (id) => {
		// navigate("/preparacion/consulta/config/" + id);
		// dispatch(onGetConfig(id));
	};

	const closeModal = () => {
		setModalStatus(false);
	};

	const openModal = () => {
		setModalStatus(true);
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
							REGISTRO DE UNA JORNADA FORMAL
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
						<Grid container>
							<Grid item lg={3} md={4} sm={12} xs={12}>
								<Button
									onClick={openModal}
									variant="contained"
									size="large"
									sx={{
										boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
										transition: "all 0.5s ease",
										backgroundColor: "#511079",
										width: "100%",
										borderRadius: "2rem 2rem 2rem 2rem",
										"&:hover": {
											backgroundColor: "#7E328B !important",
											transform: "translate(-5px, -5px)",
											boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
										},
									}}
								>
									Registrar Jornada Formal
								</Button>
							</Grid>
						</Grid>

						<Box
							sx={{
								boxShadow: 1,
								height: "100%",
								display: "flex",
								flexDirection: "column",
								backgroundColor: "white",
								mt: "2rem",
								borderRadius: "2rem",
								p: "2rem",
								pt: "1rem",
							}}
						>
							<Typography variant="h5" color="initial" mb="0.5rem">
								Jornadas Formales
							</Typography>
							<Divider />
							<Box
								mt={"1rem"}
								sx={{ height: "100%", display: "flex", flexDirection: "column" }}
							>
								{/* TABLA GENERAL, TIENEN QUE PASARLE LA DATA DE LOS REGISTROS Y EL ID DE 
                                CADA REGISTRO SE DEBE LLAMAR "idJornada" o si el id de cada registro 
                                tiene otro nombre, cambien el atributo idName al nombre que quieran */}
								<GeneralTable
									data={consultasData}
									columns={columns}
									idName={"idJornada"}
								/>
							</Box>
						</Box>
					</Box>
				</Grid>

				{/* MODAL DONDE SE REGISTRA LA JORNADA NO FORMAL */}
				<ModalRegistroJornadaFormal
					modalStatus={modalStatus}
					closeModal={closeModal}
					openModal={openModal}
				/>
			</Grid>
		);
};
