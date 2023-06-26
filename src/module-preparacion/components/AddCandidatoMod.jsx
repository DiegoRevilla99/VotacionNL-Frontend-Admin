import { Box, Button, Grid, Tooltip } from "@mui/material";
import React from "react";
import { DataGridTableJornada } from "../../ui/components/DataGridTableJornada";
import { useJornadaStore } from "../hooks/useJornadaStore";

export const AddCandidatoMod = React.memo(({ handleOpenModal,handleOpenDeleteCandidatoModal,  status }) => {
	const { candidatoandSuplentes } =
    useJornadaStore();
	return (
		<>
			<Grid item xs={12} md={6} lg={4}>
			<Tooltip title="Registrar una nuevo candidato/a junto con su suplente">
				<Button
					
					onClick={handleOpenModal}
					variant="contained"
					size="large"
					disabled={status === "checking" }
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
					PASO 3.5.- Registrar candidato y suplente
				</Button>
				</Tooltip>
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
					<DataGridTableJornada handleOpenModal={handleOpenModal} handleOpenDeleteCandidatoModal={handleOpenDeleteCandidatoModal}/>
				</Box>
			</Grid>
		</>
	);
});
