import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";

export const VerSesiones = () => {
	const { jornadaSelected } = useJornadaStore();

	return (
		<Box
			ml={"2rem"}
			mr={"2rem"}
			mb={"2rem"}
			sx={{
				boxShadow: 1,
				height: "auto",
				display: "flex",
				flexDirection: "column",
				backgroundColor: "white",
				borderRadius: "2rem",
				p: "2rem",
			}}
		>
			<Typography variant="h6" color="initial" align="center">
				{jornadaSelected.title}
			</Typography>
			<Box bgcolor="#f2f2f2" border="1px solid" width="100%" p={1} mt={3}>
				<Typography variant="h5" color="#543884">
					Resumen de las sesiones activas en el módulo de votación
				</Typography>
				<Grid container pt={5} pb={5}>
					<Grid
						item
						xs={6}
						// display="flex"
						// flexDirection="column"
						// justifyContent="center"
						// alignContent="center"
						// justifyItems="center"
						// alignItems="center"
					>
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="center"
							alignContent="center"
							justifyItems="center"
							alignItems="center"
						>
							<Typography variant="h6" color="initial" align="center">
								Personas votando ahora mismo
							</Typography>
							<Typography variant="h5" color="initial" pt={3} fontWeight="bold">
								1594
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						xs={6}
						// display="flex"
						// flexDirection="column"
						// justifyContent="center"
						// alignContent="center"
						// justifyItems="center"
						// alignItems="center"
					>
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="center"
							alignContent="center"
							justifyItems="center"
							alignItems="center"
							width="50%"
						>
							<Typography variant="h6" color="initial" align="center">
								Personas totales que han entrado al módulo de votación
							</Typography>
							<Typography variant="h5" color="initial" pt={3} fontWeight="bold">
								1594
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};
