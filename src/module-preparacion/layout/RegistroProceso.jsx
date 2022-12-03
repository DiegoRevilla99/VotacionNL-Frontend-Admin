import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { DataGridTable } from "../../ui/components/DataGridTable";

export const RegistroProceso = ({ title }) => {
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
						REGISTRO DE JORNADA ELECTORAL
					</Typography>
				</Box>
				<Divider />
				<Box
					sx={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						m: "3rem",
						mt: "2rem",
						"& .css-1iyamrn-MuiButtonBase-root-MuiButton-root:hover": {
							backgroundColor: "#7E328B !important",
							transform: "translate(-5px, -5px)",
							boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
							// boxShadow: 3,
						},
					}}
				>
					<Grid container>
						<Grid item lg={3} md={4} sm={12} xs={12}>
							<Button
								variant="contained"
								size="large"
								sx={{
									// boxShadow: 9,
									boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
									transition: "all 0.5s ease",
									backgroundColor: "#511079",
									width: "100%",
									borderTopLeftRadius: "0",
									borderTopRightRadius: "1.6rem",
									borderBottomLeftRadius: "1.6rem",
									borderBottomRightRadius: "1.6rem",
								}}
							>
								Registrar jornada electoral
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
							// height: "100%",
							borderRadius: "2rem",
							p: "2rem",
							pt: "1rem",
						}}
					>
						<Typography variant="h5" color="initial" mb="0.5rem">
							Jornadas Electorales
						</Typography>
						<Divider />
						<Box
							mt={"1rem"}
							sx={{ height: "100%", display: "flex", flexDirection: "column" }}
						>
							<DataGridTable />
						</Box>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
