import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useLayoutEffect, useEffect, useState } from "react";

const imagenes = [
	"https://www.chartjs.org/img/chartjs-logo.svg",
	"https://upload.wikimedia.org/wikipedia/commons/5/5c/PAN_logo_%28Mexico%29.svg",
	"https://upload.wikimedia.org/wikipedia/commons/b/b5/PRI_logo_%28Mexico%29.svg",
	"https://upload.wikimedia.org/wikipedia/commons/8/8f/PRD_logo_%28Mexico%29.svg",
	"https://upload.wikimedia.org/wikipedia/commons/e/e7/Worker%27s_Party_logo_%28Mexico%29.svg",
	"https://upload.wikimedia.org/wikipedia/commons/a/ae/Logo-partido-verde-2020.png",
	"https://upload.wikimedia.org/wikipedia/commons/3/34/Logo_Partido_Movimiento_Ciudadano_%28M%C3%A9xico%29.svg",
	"https://upload.wikimedia.org/wikipedia/commons/e/ea/Morena_logo_%28Mexico%29.svg",
	"https://upload.wikimedia.org/wikipedia/commons/7/7f/Logo_Encuentro_Solidario.svg",
	"https://upload.wikimedia.org/wikipedia/commons/d/d8/Partido_Nueva_Alianza_%28M%C3%A9xico%29.svg",
	"https://upload.wikimedia.org/wikipedia/commons/f/fb/PRS_logo_%28Mexico%29.svg",
	"https://upload.wikimedia.org/wikipedia/commons/e/e8/RSP_logo_%28Mexico%29.svg",
	"https://upload.wikimedia.org/wikipedia/commons/5/52/Partido_Socialdem%C3%B3crata_%28Mexico%29_Logo.png",
];

const cantVotos = [
	2273849, 1728394, 374865, 37483, 4857, 485, 47, 1, 4345, 345654, 345434, 4543, 1232,
];
export const ReporteInicialHTML = ({
	jornadaVotosData = { resultados: [], jornadaModel: {}, boleta: null },
}) => {
	const [cifrasVotos, setCifrasVotos] = useState(0);
	useEffect(() => {
		let max = 0;
		max = cantVotos.reduce((acc, cur) => {
			console.log(acc, cur);
			if (cur.toString().length >= acc.toString().length) return cur;
			else return acc;
		}, 0);

		setCifrasVotos(max.toString().length);
	}, []);

	const cifra = (index1, index2) => {
		const numeroArray = cantVotos[index1];
		const cifras = numeroArray.toString().length;

		if (cifrasVotos - index2 <= cifras) {
			const invertido = numeroArray.toString().split("").reverse().join("");
			return invertido.toString().charAt(cifrasVotos - index2 - 1);
		} else {
			return "";
		}
	};

	return (
		<Box id="reporteInicialHTML">
			<Box width="8.5in" height="11in" bgcolor="white" border="2px solid">
				<Box height="10rem" px="1in" pt="0.2in">
					<img
						alt="logo"
						src="/../../CEE600x321.png"
						crossOrigin="anonymous"
						style={{
							width: "2in",
							// height: "73.99px",
						}}
					/>
					<Divider />
				</Box>
				<Box px="1in">
					<Box>
						<Typography
							variant="body1"
							align="center"
							fontSize="1rem"
							fontWeight="bold"
							fontFamily="times"
						>
							ELECCIÓN DE GUBERNATURA
						</Typography>
						<Typography
							variant="h6"
							color="initial"
							align="center"
							fontSize="0.9rem"
							fontFamily="times"
						>
							NUEVO LEÓN
						</Typography>
						<Typography
							variant="body1"
							color="initial"
							align="center"
							pt={2}
							fontFamily="times"
						>
							Reporte inicial de votación
						</Typography>
					</Box>
				</Box>
				<Box px="1in">
					<Grid container spacing={2} pt={1}>
						<Grid item xs={6}>
							<Typography
								variant="body2"
								color="initial"
								align="center"
								fontFamily="times"
								fontWeight="bold"
							>
								Fecha y hora de inicio de votación
							</Typography>
							<Typography
								variant="body2"
								color="initial"
								fontFamily="times"
								align="center"
							>
								28/01/23 12:00 AM
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography
								variant="body2"
								color="initial"
								align="center"
								fontFamily="times"
								fontWeight="bold"
							>
								Fecha y hora de impresión
							</Typography>
							<Typography
								variant="body2"
								color="initial"
								fontFamily="times"
								align="center"
							>
								13/02/23 13:45 PM
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography
								variant="body2"
								color="initial"
								align="center"
								fontFamily="times"
								fontWeight="bold"
							>
								Candidaturas no registradas
							</Typography>
							<Typography
								variant="body2"
								color="initial"
								fontFamily="times"
								align="center"
							>
								Si
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography
								variant="body2"
								color="initial"
								align="center"
								fontFamily="times"
								fontWeight="bold"
							>
								Tipo de votación
							</Typography>
							<Typography
								variant="body2"
								color="initial"
								fontFamily="times"
								align="center"
							>
								Representante
							</Typography>
						</Grid>
						<Grid item xs={6}></Grid>
					</Grid>
					<Grid container columns={12 + cifrasVotos}>
						<Grid item xs={12 + cifrasVotos}>
							<Box bgcolor="#7e328b" border="2px solid" borderRadius="2px">
								<Typography
									variant="body1"
									color="white"
									fontFamily="times"
									align="center"
									my={1}
								>
									Resultados de la votación
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={8}>
							<Box
								border="2px solid"
								mt="0.2rem"
								sx={{ borderTopLeftRadius: "5px" }}
								height="100%"
								display="flex"
								flexDirection="column"
								justifyContent="center"
								justifyItems="center"
								alignContent="center"
								alignItems="center"
							>
								<Typography
									variant="body1"
									// color="white"
									fontFamily="times"
									align="center"
									my={1}
								>
									Partido político o coalición
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={cifrasVotos}>
							<Box
								border="2px solid"
								mt="0.2rem"
								height="100%"
								display="flex"
								flexDirection="column"
								justifyContent="center"
								justifyItems="center"
								alignContent="center"
								alignItems="center"
							>
								<Typography
									variant="body1"
									// color="white"
									fontFamily="times"
									align="center"
									my={1}
								>
									Cantidad de votos
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={4}>
							<Box
								border="2px solid"
								mt="0.2rem"
								sx={{ borderTopRightRadius: "5px" }}
								height="100%"
								display="flex"
								flexDirection="column"
								justifyContent="center"
								justifyItems="center"
								alignContent="center"
								alignItems="center"
							>
								<Typography
									variant="body1"
									// color="white"
									fontFamily="times"
									align="center"
									my={1}
								>
									Porcentaje de votos
								</Typography>
							</Box>
						</Grid>

						{imagenes.map((imagen, index1) => (
							<React.Fragment key={imagen}>
								<Grid item xs={2} border="2px solid">
									<Box
										py="0.2rem"
										display="flex"
										flexDirection="column"
										justifyContent="center"
										justifyItems="center"
										alignContent="center"
										alignItems="center"
										id="imagen1"
									>
										<img
											alt={`logo${index1}`}
											src={imagen}
											crossOrigin="anonymous"
											style={{
												width: "25px",
											}}
										/>
									</Box>
								</Grid>
								<Grid item xs={6} border="2px solid">
									<Box
										py="0.2rem"
										display="flex"
										justifyContent="center"
										justifyItems="center"
										alignContent="center"
										alignItems="center"
										height="100%"
									>
										<Typography
											variant="caption"
											fontSize="0.6rem"
											color="initial"
											fontFamily="times"
										>
											PARTIDO VERDE
										</Typography>
									</Box>
								</Grid>
								{(() => {
									let grids = [];
									for (let index2 = 0; index2 < cifrasVotos; index2++) {
										grids.push(
											<Grid
												key={index2}
												item
												xs={cifrasVotos / cifrasVotos}
												border="1px solid #c6c6c6"
												borderBottom="2px solid"
											>
												<Box
													display="flex"
													justifyContent="center"
													justifyItems="center"
													alignContent="center"
													alignItems="center"
													height="100%"
												>
													<Typography
														variant="body1"
														// fontSize="0.6rem"
														color="initial"
														fontFamily="times"
													>
														{cifra(index1, index2)}
													</Typography>
												</Box>
											</Grid>
										);
									}
									return grids;
								})()}
								{/* <Grid item xs={cifrasVotos} columns={cifrasVotos} border="2px solid"></Grid> */}
								<Grid item xs={4} border="2px solid">
									<Box
										display="flex"
										justifyContent="center"
										justifyItems="center"
										alignContent="center"
										alignItems="center"
										height="100%"
									>
										<Typography
											variant="body1"
											// fontSize="0.6rem"
											color="initial"
											fontFamily="times"
										>
											18.38%
										</Typography>
									</Box>
								</Grid>
							</React.Fragment>
						))}
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};
