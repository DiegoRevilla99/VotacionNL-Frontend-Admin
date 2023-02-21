import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ReporteInicialNoFormalHTML = ({
	jornadaVotosData = { resultados: [], jornadaModel: {}, boleta: null },
}) => {
	const { jornadaSelected } = useSelector((state) => state.jornada);
	// const [cifrasVotos, setCifrasVotos] = useState(0);
	const [dataVotos, setDataVotos] = useState(jornadaVotosData);
	const [arrayResultado, setArrayResultado] = useState(
		jornadaVotosData.resultados.map((resultado) => resultado.resultados)
	);
	const [fecha, setFecha] = useState(null);
	const [planillasState, setPlanillas] = useState({
		candidatosPlanillas: [],
		planillas: [],
	});

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

	if (jornadaVotosData.resultados.length === 0) return <></>;
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
								{
									jornadaVotosData.boleta.boletaCandidatos.boletaModel
										.encabezadoBoleta
								}
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
									{jornadaVotosData.boleta.boletaCandidatos.modalidad
										.mostrarCandidaturasNoReg
										? "Si"
										: "No"}
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
									Modalidad
								</Typography>
								<Typography
									variant="body2"
									color="initial"
									fontFamily="times"
									align="center"
								>
									{jornadaVotosData.boleta.boletaCandidatos.modalidad.modalidad}
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
										container
										xs={6} // borderTop="0px"
										borderLeft="2px solid"
										// borderRight="2px solid"
										borderBottom="2px solid"
									>
										{jornadaVotosData.boleta.boletaCandidatos.modalidad
											.modalidad === "PLANILLA" ? (
											<>
												<Grid item xs={7} borderRight="2px solid">
													<Box
														py="0.2rem"
														display="flex"
														justifyContent="center"
														justifyItems="center"
														alignContent="center"
														alignItems="center"
														height="100%"
														flexDirection="column"
														// bgcolor={index1}
													>
														{resultado?.candiato?.map((candidato) => (
															<Typography
																variant="body2"
																// fontSize="0.9rem"
																color="initial"
																fontFamily="times"
															>
																{candidato}
															</Typography>
														))}
													</Box>
												</Grid>
												<Grid item xs={5}>
													{resultado?.planillas?.map(
														(planilla, index, array) => (
															<Box
																py="0.2rem"
																display="flex"
																justifyContent="center"
																justifyItems="center"
																alignContent="center"
																alignItems="center"
																height={100 / array.length + "%"}
																flexDirection="column"
																// borderBottom="2px solid"
																borderBottom={
																	index !== array.length - 1
																		? "2px solid"
																		: "0px"
																}
															>
																<Typography
																	variant="body2"
																	// fontSize="0.9rem"
																	color="initial"
																	fontFamily="times"

																	// align="center"
																>
																	{planilla}
																</Typography>
															</Box>
														)
													)}
												</Grid>
											</>
										) : (
											<Grid item xs={12}>
												<Box
													py="0.2rem"
													display="flex"
													justifyContent="center"
													justifyItems="center"
													alignContent="center"
													alignItems="center"
													height="100%"
													flexDirection="column"
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
										)}
										{/* <Grid item xs={12}>
											<Box
												py="0.2rem"
												display="flex"
												justifyContent="center"
												justifyItems="center"
												alignContent="center"
												alignItems="center"
												height="100%"
												flexDirection="column"
												// bgcolor={index1}
											>
												{jornadaVotosData.boleta.boletaCandidatos.modalidad
													.modalidad === "PLANILLA" ? (
													resultado?.candiato?.map((candiato, index) => {
														return (
															<Typography
																variant="body2"
																// fontSize="0.9rem"
																color="initial"
																fontFamily="times"
															>
																{candiato}
															</Typography>
														);
													})
												) : (
													<Typography
														variant="body2"
														// fontSize="0.9rem"
														color="initial"
														fontFamily="times"
													>
														{resultado.candiato}
													</Typography>
												)}
											</Box>
										</Grid> */}
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
												{isNaN(
													Number.parseFloat(
														(resultado.resultados /
															arrayResultado.reduce(
																(acc, cur) => acc + cur
															)) *
															100
													).toFixed(2)
												)
													? "0.00"
													: Number.parseFloat(
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
