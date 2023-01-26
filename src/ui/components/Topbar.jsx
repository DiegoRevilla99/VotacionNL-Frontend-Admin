import { Box, IconButton, Typography } from "@mui/material";

export const Topbar = ({ selected }) => {
	return (
		<Box display="flex" justifyContent="center" p={2} sx={{ boxShadow: 3 }}>
			<Typography variant="h4" align="center" color="initial">
				MÓDULO DE {selected.toUpperCase()}
			</Typography>
		</Box>
	);
};
