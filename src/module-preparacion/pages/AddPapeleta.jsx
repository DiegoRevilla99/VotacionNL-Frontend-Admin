import { Box, Divider, Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { useState } from "react";
import { DataGridTable } from "../../ui/components/DataGridTable";
import { ModalPapeleta } from "../components/ModalPapeleta";

export const AddPapeleta = () => {
	const [statusModal, setStatusModal] = useState(false);
	const handleToggleModal = () => setStatusModal(!statusModal);
	console.log(statusModal);

	return (
		<Box
			sx={{
				height: "100%",
				width: "100%",
				overflowY: "auto",
				// flexGrow: 1,
			}}
		>
			<Box sx={{ m: "0.5rem", ml: "2rem" }}>
				<Typography variant="h6" align="left" color="initial">
					REGISTRO DE PAPELETA
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
							label="ENCABEZADO DE LA CONSULTA"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="ASUNTO"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6" color="initial">
							DATOS GEOELECTORALES
						</Typography>
					</Grid>
					<Grid item xs={12} md={12} lg={8}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="ENTIDAD FEDERATIVA"
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12} md={12} lg={4}>
						<TextField
							fullWidth
							size="small"
							id="filled-basic"
							label="DISTRITO ELECTORAL"
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
							onClick={handleToggleModal}
							variant="contained"
							size="large"
							sx={{
								boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
								transition: "all 0.5s ease",
								backgroundColor: "#511079",
								width: "100%",
								borderTopLeftRadius: "0",
								borderTopRightRadius: "1.6rem",
								borderBottomLeftRadius: "1.6rem",
								borderBottomRightRadius: "1.6rem",
								"&:hover": {
									backgroundColor: "#7E328B !important",
									transform: "translate(-5px, -5px)",
									boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
								},
							}}
						>
							Agregar preguntas
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Box
							sx={{
								height: "25rem",
								// boxShadow: 1,
								// height: "100%",
								// display: "flex",
								// flexDirection: "column",
								backgroundColor: "#f0f0f0",
								// mt: "1rem",
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
							// onClick={handleToggleModal}
							variant="contained"
							size="large"
							sx={{
								// marginLeft: "5rem",
								// marginRight: "5rem",
								boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
								transition: "all 0.5s ease",
								backgroundColor: "#511079",
								width: "100%",
								borderTopLeftRadius: "0",
								borderTopRightRadius: "1.6rem",
								borderBottomLeftRadius: "1.6rem",
								borderBottomRightRadius: "1.6rem",
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
							// onClick={handleToggleModal}
							variant="contained"
							size="large"
							sx={{
								boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
								transition: "all 0.5s ease",
								backgroundColor: "#791010",
								width: "100%",
								borderTopLeftRadius: "0",

								borderTopRightRadius: "1.6rem",
								borderBottomLeftRadius: "1.6rem",
								borderBottomRightRadius: "1.6rem",
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
			<ModalPapeleta statusModal={statusModal} handleToggleModal={handleToggleModal} />
		</Box>
	);
};
