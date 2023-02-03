import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { DataGridTableAsociacion } from "../../ui/components/DataGridTableAsociacion";

export const AddAsociacionMod = React.memo(({ handleOpenModal,handleOpenDeleteAsociacionModal,  status }) => {
	return (
		<>
			<Grid item xs={12} md={6} lg={4}>
				<Button
					
					onClick={handleOpenModal}
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
					Registrar asociación
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
					<DataGridTableAsociacion handleOpenModal={handleOpenModal} handleOpenDeleteAsociacionModal={handleOpenDeleteAsociacionModal}/>
				</Box>
			</Grid>
		</>
	);
});
