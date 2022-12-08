import { Box, Divider, Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useUiStore } from "../../hooks/useUiStore";
// import { saveConsultaPrueba } from "../../store/module-preparacion/consulta-ciudadana/thunks";
import { DataGridTable } from "../../ui/components/DataGridTable";
import { ModalBoletaPartido } from "../components/ModalBoletaPartido";
import { ModalBoletaCandidato } from "../components/ModalBoletaCandidato";
import { ModalEliminarPC } from "../components/ModalEliminarPC";
// import { ModalPapeleta } from "../components/ModalPapeleta";
// import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";

export const AddBoletaJornada = () => {
	const [statusMatchModal, setStatusMatchModal] = useState(false);
	// const { toastOffOperation } = useUiStore();
	// const { status } = useConsultaCiudadanaStore();
	// const dispatch = useDispatch();

    const [statusCandidateModal, setStatusCandidateModal] = useState(false);
	const [statusDeleteModal, setStatusDeleteModal] = useState(false);

	const handleCloseMatchModal = () => setStatusMatchModal(false);

    const handleCloseCandidateModal = () => setStatusCandidateModal(false);

	const handleCloseDeleteModal = () => setStatusDeleteModal(false);

	 const handleOpenMatchModal = () => {
	 	// toastOffOperation();
	 	setStatusMatchModal(true);
	 };

     const handleOpenCandidateModal = () => {
        // toastOffOperation();
        setStatusCandidateModal(true);
    };

	const handleOpenDeleteModal = () => {
        // toastOffOperation();
        setStatusDeleteModal(true);
    };

	const onSubmit = () => {
		// dispatch(saveConsultaPrueba());
	};

	return (
		<Box
			sx={{
				height: "100%",
				width: "100%",
				overflowY: "auto",
			}}
		>
			<Box sx={{ m: "0.5rem", ml: "2rem" }}>
				<Typography variant="h6" align="left" color="initial">
					REGISTRO DE BOLETA
				</Typography>
			</Box>
			<Divider />
			<Box
				m={"2rem"}
				sx={{
					boxShadow: 1,
					backgroundColor: "white",
					mt: "2rem",
					borderRadius: "2rem",
					p: "2rem",
					pt: "1rem",
				}}
			>
				<Grid
					container
					sx={{
						height: "100%",
						display: "flex",
					}}
					spacing={3}
				>
					<Grid item xs={12} mt="0.5rem">
						<Typography variant="h6" color="initial">
							DATOS GENERALES
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="ENCABEZADO DE LA BOLETA"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="NOMBRE DE LA CANDIDATURA"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6" color="initial">
							DATOS GEOELECTORALES
						</Typography>
					</Grid>
                    <Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="ENTIDAD FEDERATIVA"
							variant="filled"
						/>
					</Grid>
                    <Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="MUNICIPIO O DELEGACIÓN"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12} md={12} lg={5}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="DISTRITO ELECTORAL LOCAL"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12} md={12} lg={3}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="DISTRITO ELECTORAL"
							variant="filled"
						/>
					</Grid>
                    <Grid item xs={12} md={12} lg={4}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="TIPO DE CASILLA"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6" color="initial">
							FIRMANTES
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="NOMBRE DEL PRIMER FIRMANTE"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="CARGO DEL PRIMER FIRMANTE"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="NOMBRE DEL SEGUNDO FIRMANTE"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="CARGO DEL SEGUNDO FIRMANTE"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Button
							onClick={handleOpenMatchModal}
							variant="contained"
							size="large"
							disabled={status === "checking"}
							sx={{
								boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
								transition: "all 0.5s ease",
								backgroundColor: "#511079",
								width: "100%",
								borderRadius: "25px 25px 25px 25px",
								"&:hover": {
									backgroundColor: "#7E328B !important",
									transform: "translate(-5px, -5px)",
									boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
								},
							}}
						>
							Agregar partido
						</Button>
					</Grid>
                    <Grid item xs={12} md={6} lg={4}>
						<Button
							onClick={handleOpenCandidateModal}
							variant="contained"
                            size="large"
                             
							disabled={status === "checking"}
							sx={{
                                width: { xl: "140%", lg: "140%", sm: "100%", xs: "100%" },
								boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
								transition: "all 0.5s ease",
								backgroundColor: "#511079",
								fontSize: { xl: "15px", lg: "15px", sm: "15px", xs: "15px" },
								borderRadius: "25px 25px 25px 25px",
								"&:hover": {
									backgroundColor: "#7E328B !important",
									transform: "translate(-5px, -5px)",
									boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
								},
							}}
						>
							Agregar candidato independiente
						</Button>
					</Grid>
					<Grid item xs={12} md={3} lg={3}>
						<Button
						onClick={handleOpenDeleteModal}
							variant="contained"
							size="small"
							disabled={status === "checking"}
							sx={{
								boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
								transition: "all 0.5s ease",
								backgroundColor: "#791010",
								width: "100%",
                                borderRadius: "25px 25px 25px 25px",
								"&:hover": {
									backgroundColor: "#8B3232 !important",
									transform: "translate(-5px, -5px)",
									boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
								},
							}}
						>
							eliminar
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Box
							sx={{
								height: "25rem",
								backgroundColor: "#f0f0f0",
								borderRadius: "2rem",
								p: "2rem",
								pt: "1rem",
								pb: "1rem",
							}}
						>
							<DataGridTable />
						</Box>
					</Grid>

				</Grid>
				<Grid mt={"1rem"} container direction="row" justifyContent="flex-end" spacing={2}>
					<Grid item xs={12} md={6} lg={3}>
						<Button
							onClick={onSubmit}
							variant="contained"
							size="large"
							disabled={status === "checking"}
							sx={{
								boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
								transition: "all 0.5s ease",
								backgroundColor: "#511079",
								width: "100%",
                                borderRadius: "25px 25px 25px 25px",
								"&:hover": {
									backgroundColor: "#7E328B !important",
									transform: "translate(-5px, -5px)",
									boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
								},
							}}
						>
							Guardar
						</Button>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<Button
							variant="contained"
							size="large"
							disabled={status === "checking"}
							sx={{
								boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
								transition: "all 0.5s ease",
								backgroundColor: "#791010",
								width: "100%",
                                borderRadius: "25px 25px 25px 25px",
								"&:hover": {
									backgroundColor: "#8B3232 !important",
									transform: "translate(-5px, -5px)",
									boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
								},
							}}
						>
							Cancelar
						</Button>
					</Grid>
					
				</Grid>
			</Box>
			<ModalBoletaPartido statusMatchModal={statusMatchModal} handleToggleModal={handleCloseMatchModal} />
            <ModalBoletaCandidato statusCandidateModal={statusCandidateModal} handleToggleModal={handleCloseCandidateModal} />
			<ModalEliminarPC statusDeleteModal={statusDeleteModal} handleToggleModal={handleCloseDeleteModal} />
		</Box>
	);
};
