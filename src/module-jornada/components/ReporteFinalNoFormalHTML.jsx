import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

export const ReporteFinalNoFormalHTML = ({ jornadaVotosData = { resultados: [] } }) => {
	const { jornadaSelected } = useSelector((state) => state.jornada);
	// const [cifrasVotos, setCifrasVotos] = useState(0);
	const [dataVotos, setDataVotos] = useState(jornadaVotosData);
	const [arrayResultado, setArrayResultado] = useState(
		jornadaVotosData.resultados.map((resultado) => resultado.resultados)
	);
	const [fecha, setFecha] = useState(null);

	console.log("DATA VOTOS", dataVotos);

	const resultadosOrdenados = (array) => {
		let arrayForSort = [...array];
		console.log("LO que entra", arrayForSort);
		arrayForSort.sort((a, b) => {
			return a.resultados < b.resultados ? 1 : a.resultados > b.resultados ? -1 : 0;
		});

		let nuevo = [...arrayForSort];
		return [...nuevo];
	};

	useEffect(() => {
		if (dataVotos.resultados.length > 0) {
			let arrayForSort = [...dataVotos.resultados];
			console.log("LO que entra", arrayForSort);
			arrayForSort.sort((a, b) => {
				return a.resultados < b.resultados ? 1 : a.resultados > b.resultados ? -1 : 0;
			});

			let nuevo = [...arrayForSort];

			setDataVotos({ ...dataVotos, resultados: [...nuevo] });
		}
	}, [jornadaVotosData]);

	useEffect(() => {
		if (dataVotos.resultados.length > 0) {
			const fechax = new Date();

			setFecha(fechax.toLocaleString());

			setArrayResultado(dataVotos.resultados.map((resultado) => resultado.resultados) || []);
			// const arrayResultado = jornadaVotosData.resultados.map((resultado) => resultado.resultados);
		}
	}, [dataVotos]);

	if (jornadaVotosData.resultados.length === 0) return <>No disponible</>;
	else
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
								{/* {jornadaVotosData.papeleta.estructuraPapeleta.nombre} */}
							</Typography>
							<Typography
								variant="h6"
								color="initial"
								align="center"
								fontSize="0.9rem"
								fontFamily="times"
							>
								{/* {jornadaVotosData.jornadaModel.entidad} */}
							</Typography>
							<Typography
								variant="body1"
								color="initial"
								align="center"
								pt={2}
								fontFamily="times"
							>
								Reporte final de votación
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
									{fecha}
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
									{/* {jornadaVotosData.papeleta.pregunta.tipoRespuesta} */}
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
									Tipo de respuestas
								</Typography>
								<Typography
									variant="body2"
									color="initial"
									fontFamily="times"
									align="center"
								>
									{/* {jornadaVotosData.papeleta.pregunta.subtipo} */}
								</Typography>
							</Grid>
							<Grid item xs={6}></Grid>
						</Grid>
						<Grid container columns={12}>
							<Grid item xs={12}>
								<Box bgcolor="#7e328b" border="2px solid" borderRadius="2px">
									<Typography
										variant="body1"
										color="white"
										fontFamily="times"
										align="center"
										my={1}
									>
										Resultados de la jornada
									</Typography>
								</Box>
							</Grid>

							<Grid item xs={6}>
								<Box
									borderTop="2px solid"
									borderLeft="2px solid"
									// borderRight="2px solid"
									borderBottom="2px solid"
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
										Representante
									</Typography>
								</Box>
							</Grid>
							{/* <Grid item xs={cifrasVotos + 1}> */}
							<Grid item xs={3}>
								<Box
									borderTop="2px solid"
									borderLeft="2px solid"
									// borderRight="2px solid"
									borderBottom="2px solid"
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
							<Grid item xs={3}>
								<Box
									borderTop="2px solid"
									borderLeft="2px solid"
									borderRight="2px solid"
									borderBottom="2px solid"
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

							{dataVotos.resultados.map((resultado, index1) => (
								<React.Fragment key={resultado.id}>
									{/* <Grid item xs={2} border="2px solid"></Grid> */}
									<Grid
										item
										xs={6} // borderTop="0px"
										borderLeft="2px solid"
										// borderRight="2px solid"
										borderBottom="2px solid"
									>
										<Box
											py="0.2rem"
											display="flex"
											justifyContent="center"
											justifyItems="center"
											alignContent="center"
											alignItems="center"
											height="100%"
											// bgcolor={index1}
										>
											<Typography
												variant="body2"
												// fontSize="0.9rem"
												color="initial"
												fontFamily="times"
											>
												{resultado.candiato}
											</Typography>
										</Box>
									</Grid>
									{/* {(() => {
									let grids = [];
									for (let index2 = 0; index2 < cifrasVotos; index2++) {
										grids.push(
											<Grid
												key={index2}
												item
												xs={cifrasVotos / cifrasVotos + 1}
												// border="1px solid #c6c6c6"
												// borderTop="0px"
												borderLeft="2px solid"
												// borderRight="2px solid"
												borderBottom="2px solid"
												// borderBottom="2px solid"
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
								})()} */}
									<Grid
										// key={index1}
										item
										xs={3}
										border="1px solid #c6c6c6"
										borderBottom="2px solid"
										borderLeft="2px solid"
										// borderRight="2px solid"
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
												{arrayResultado[index1]}
											</Typography>
										</Box>
									</Grid>
									{/* <Grid item xs={cifrasVotos} columns={cifrasVotos} border="2px solid"></Grid> */}
									{/* {(() => {
									let grids = [];
									for (let index2 = 0; index2 < cifrasVotos; index2++) {
										grids.push( */}
									<Grid
										// key={index1 + 10}
										item
										xs={3}
										border="1px solid #c6c6c6"
										borderBottom="2px solid"
										borderLeft="2px solid"
										borderRight="2px solid"
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
												{Number.parseFloat(
													(resultado.resultados /
														arrayResultado.reduce(
															(acc, cur) => acc + cur
														)) *
														100
												).toFixed(2)}
												%
											</Typography>
										</Box>
									</Grid>
									{/* );
									}
									return grids;
								})()} */}
								</React.Fragment>
							))}
							<Grid item xs={6}>
								<Box
									// borderTop="0px"
									borderLeft="2px solid"
									// borderRight="2px solid"
									borderBottom="2px solid"
									// border="2px solid"
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
									>
										TOTAL
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={3}>
								<Box
									// borderTop="0px"
									borderLeft="2px solid"
									// borderRight="2px solid"
									borderBottom="2px solid"
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
										{arrayResultado.reduce((acc, cur) => acc + cur)}
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={3}>
								<Box
									// borderTop="0px"
									borderLeft="2px solid"
									borderRight="2px solid"
									borderBottom="2px solid"
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
										100.00%
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Box>
		);
};
