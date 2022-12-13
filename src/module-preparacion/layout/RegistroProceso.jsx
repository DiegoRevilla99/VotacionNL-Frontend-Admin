import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGridTable } from "../../ui/components/DataGridTable";
import { ModalRegistroProcesoElectoral } from "../components/ModalRegistroProcesoElectoral";
import { TableRegistroProceso } from "../components/TableRegistroProceso";

export const RegistroProceso = ({ title, butonTitle, tableTitle, to }) => {
	const navigate = useNavigate();
	const [modalStatus, setModalStatus] = useState(false);

	const go = () => {
		navigate();
	};

	const closeModal = () => {
		setModalStatus(false);
	};

	const openModal = () => {
		setModalStatus(true);
	};

	const add = () => {
		openModal();
		// navigate(to);
	};

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
						{title}
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
								onClick={add}
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
								{butonTitle}
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
							{tableTitle}
						</Typography>
						<Divider />
						<Box
							mt={"1rem"}
							sx={{ height: "100%", display: "flex", flexDirection: "column" }}
						>
							{/* <DataGridTable /> */}
							<TableRegistroProceso title={"Nombre de la consulta ciudadana"} />
							{/* <Tabla data={datos} actions={actions} columns={columns}></Tabla> */}
						</Box>
					</Box>
				</Box>
			</Grid>
			<ModalRegistroProcesoElectoral
				title={title}
				modalStatus={modalStatus}
				closeModal={closeModal}
				openModal={openModal}
			/>
		</Grid>
	);
};
