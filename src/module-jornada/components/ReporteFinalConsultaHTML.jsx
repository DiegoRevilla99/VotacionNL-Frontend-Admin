import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useLayoutEffect, useEffect, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

export const ReporteFinalConsultaHTML = ({ jornadaVotosData = { resultados: [] } }) => {
  console.log("JORNADA VOTOS DATA QUE LLEGA", jornadaVotosData);
  const [cifrasVotos, setCifrasVotos] = useState(0);
  const [arrayResultado, setArrayResultado] = useState(
    jornadaVotosData.resultados.map((resultado) => resultado.resultados)
  );
  const [fecha, setFecha] = useState(null);

  console.log("ARRAY DE RESULTADOS", arrayResultado);

  useEffect(() => {
    const fechax = new Date();

    setFecha(fechax.toLocaleString());

    setArrayResultado(jornadaVotosData.resultados.map((resultado) => resultado.resultados) || []);
    // const arrayResultado = jornadaVotosData.resultados.map((resultado) => resultado.resultados);

    console.log("ARRAY", arrayResultado);

    let max = 0;
    max = arrayResultado.reduce((acc, cur) => {
      console.log(acc, cur);
      if (cur.toString().length >= acc.toString().length) return cur;
      else return acc;
    }, 0);

    setCifrasVotos(max.toString().length);
  }, [jornadaVotosData]);

  const cifra = (index1, index2) => {
    const numeroArray = arrayResultado[index1];
    const cifras = numeroArray.toString().length;

    if (cifrasVotos - index2 <= cifras) {
      const invertido = numeroArray.toString().split("").reverse().join("");
      return invertido.toString().charAt(cifrasVotos - index2 - 1);
    } else {
      return "";
    }
  };

  const porcentaje = (index1, index2) => {};

  if (jornadaVotosData.resultados.length === 0) return <>Reporte no disponible</>;
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
                {jornadaVotosData.papeleta.estructuraPapeleta.nombre}
              </Typography>
              <Typography
                variant="h6"
                color="initial"
                align="center"
                fontSize="0.9rem"
                fontFamily="times"
              >
                {jornadaVotosData.jornadaModel.entidad}
              </Typography>
              <Typography variant="body1" color="initial" align="center" pt={2} fontFamily="times">
                Reporte inicial de consulta ciudadana
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
                  Fecha de inicio de la votación
                </Typography>
                <Typography variant="body2" color="initial" fontFamily="times" align="center">
                  {dayjs(jornadaVotosData.configDates.inicioRecepVoto).format(
                    "DD[/]MM[/]YYYY HH:mm"
                  )}
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
                <Typography variant="body2" color="initial" fontFamily="times" align="center">
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
                  Tipo de pregunta
                </Typography>
                <Typography variant="body2" color="initial" fontFamily="times" align="center">
                  {jornadaVotosData.papeleta.pregunta.tipoRespuesta}
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
                <Typography variant="body2" color="initial" fontFamily="times" align="center">
                  {jornadaVotosData.papeleta.pregunta.subtipo}
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
                    Resultados de la consulta ciudadana
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
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
                    {jornadaVotosData.papeleta.pregunta.descPregunta}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box
                  // borderTop="0px"
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
                    Respuesta
                  </Typography>
                </Box>
              </Grid>
              {/* <Grid item xs={cifrasVotos + 1}> */}
              <Grid item xs={3}>
                <Box
                  // borderTop="0px"
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
                  // borderTop="0px"
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

              {jornadaVotosData.resultados.map((resultado, index1) => (
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
                    >
                      <Typography
                        variant="body2"
                        // fontSize="0.9rem"
                        color="initial"
                        fontFamily="times"
                      >
                        {resultado.respuesta}
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
                          (resultado?.resultados / arrayResultado?.reduce((acc, cur) => acc + cur),
                          0) * 100
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
                    0.00%
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    );
};
