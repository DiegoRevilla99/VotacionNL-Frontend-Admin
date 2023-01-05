import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { DataGridTableJornada } from "../../ui/components/DataGridTableJornada";

export const AddCandidatoMod = React.memo(({ handleOpenModal, status }) => {
	return (
		<>
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
					<DataGridTableJornada handleOpenModal={handleOpenModal} />
				</Box>
			</Grid>
		</>
	);
});
