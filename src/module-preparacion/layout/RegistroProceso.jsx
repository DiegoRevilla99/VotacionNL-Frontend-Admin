import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";

export const RegistroProceso = ({ title }) => {
	return (
		<Grid
			container
			sx={{
				width: "100%",
				overflowY: "auto",
			}}
		>
			<Grid item xs={12}>
				<Box sx={{ m: "0.5rem", ml: "2rem" }}>
					<Typography variant="h6" align="left" color="initial">
						REGISTRO DE JORNADA ELECTORAL
					</Typography>
				</Box>
				<Divider />
				<Box
					sx={{
						m: "4rem",
						"& .css-hvnsit-MuiButtonBase-root-MuiButton-root:hover": {
							backgroundColor: "#C9A9CE !important",
							boxShadow: 3,
						},
					}}
				>
					<Button
						variant="contained"
						size="large"
						sx={{
							backgroundColor: "#511079",
							width: "12rem",
							borderTopLeftRadius: "0",
							borderTopRightRadius: "1.6rem",
							borderBottomLeftRadius: "1.6rem",
							borderBottomRightRadius: "1.6rem",
							// "& .css-hvnsit-MuiButtonBase-root-MuiButton-root:hover": {
							// 	backgroundColor: "#511079 !important",
							// },
							// "& .MuiButton-root:hover": {
							// 	backgroundColor: "#511079",
							// },
							// "& .MuiButton-contained:hover": {
							// 	backgroundColor: "#511079",
							// },
						}}
					>
						Registrar jornada electoral
					</Button>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box sx={{ m: "0.5rem", ml: "2rem" }}>
					<Typography variant="h6" align="left" color="initial">
						REGISTRO DE JORNADA ELECTORAL
					</Typography>
				</Box>
				<Divider />
				<Box
					sx={{
						m: "4rem",
						"& .css-hvnsit-MuiButtonBase-root-MuiButton-root:hover": {
							backgroundColor: "#C9A9CE !important",
							boxShadow: 3,
						},
					}}
				>
					<Button
						variant="contained"
						size="large"
						sx={{
							backgroundColor: "#511079",
							width: "12rem",
							borderTopLeftRadius: "0",
							borderTopRightRadius: "1.6rem",
							borderBottomLeftRadius: "1.6rem",
							borderBottomRightRadius: "1.6rem",
							// "& .css-hvnsit-MuiButtonBase-root-MuiButton-root:hover": {
							// 	backgroundColor: "#511079 !important",
							// },
							// "& .MuiButton-root:hover": {
							// 	backgroundColor: "#511079",
							// },
							// "& .MuiButton-contained:hover": {
							// 	backgroundColor: "#511079",
							// },
						}}
					>
						Registrar jornada electoral
					</Button>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box sx={{ m: "0.5rem", ml: "2rem" }}>
					<Typography variant="h6" align="left" color="initial">
						REGISTRO DE JORNADA ELECTORAL
					</Typography>
				</Box>
				<Divider />
				<Box
					sx={{
						m: "4rem",
						"& .css-hvnsit-MuiButtonBase-root-MuiButton-root:hover": {
							backgroundColor: "#C9A9CE !important",
							boxShadow: 3,
						},
					}}
				>
					<Button
						variant="contained"
						size="large"
						sx={{
							backgroundColor: "#511079",
							width: "12rem",
							borderTopLeftRadius: "0",
							borderTopRightRadius: "1.6rem",
							borderBottomLeftRadius: "1.6rem",
							borderBottomRightRadius: "1.6rem",
							// "& .css-hvnsit-MuiButtonBase-root-MuiButton-root:hover": {
							// 	backgroundColor: "#511079 !important",
							// },
							// "& .MuiButton-root:hover": {
							// 	backgroundColor: "#511079",
							// },
							// "& .MuiButton-contained:hover": {
							// 	backgroundColor: "#511079",
							// },
						}}
					>
						Registrar jornada electoral
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
};
