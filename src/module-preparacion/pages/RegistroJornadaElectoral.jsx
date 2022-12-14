import { RegistroProceso } from "../layout/RegistroProceso";
// CONECTAR EL MODAL DE ELIMINAR BOLETA
// import {Grid, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { ModalEliminarBoleta } from "../components/ModalEliminarBoleta";

export const RegistroJornadaElectoral = () => {
	// CONECTAR EL MODAL DE ELIMINAR BOLETA

	// const navigate = useNavigate();
	// const [statusDeleteModal, setStatusDeleteModal] = useState(false);
	// const handleCloseDeleteModal = () => setStatusDeleteModal(false);
	// const handleOpenDeleteModal = () => {
	// 	// toastOffOperation();
	// 	setStatusDeleteModal(true);
	// };
	
	return (
		<>
		<RegistroProceso
			title={"REGISTRO DE JORNADA ELECTORAL"}
			butonTitle={"Registrar Jornada Electoral"}
			
			tableTitle={"Jornadas Electorales"}
			to={"/preparacion/jornada"}
		></RegistroProceso>
		{/* <Grid item xs={4} md={2} lg={2}>
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
		<ModalEliminarBoleta statusDeleteModal={statusDeleteModal} handleToggleModal={handleCloseDeleteModal} /> */}
		</>
	);
};
