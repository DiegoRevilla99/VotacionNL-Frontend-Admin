import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useConsultaCiudadanaStore } from "../../module-preparacion/hooks/useConsultaCiudadanaStore";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
import { PrivateRoute } from "../../router/PrivateRoute";
import {
  onGetBoletas,
  onGetJornadaNoFormalVotos,
  onGetJornadaRespuestasConsultas,
  onGetJornadaVotos,
} from "../../store/module-preparacion/jornada/ThunksJornada";
import { ConsultaChart } from "../components/ConsultaChart";
import { JornadaNoFormalChart } from "../components/JornadaNoFormalChart";
import { JornadaFormalChart } from "./JornadaFormalChart";
// import { VisualizadorDePDF } from "./VisualizadorDePDF";

export const ReporteFinalJornadaNoFormal = ({ status, jornadaVotosData }) => {
  const { jornadaSelected } = useJornadaStore();
  const [boleta, setBoleta] = React.useState(null);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("BOLETAAAAAAAAA", boleta);

  const handleChangeSelect = (event) => {
    setBoleta(event.target.value);
    navigate(
      "/jornada/reportesJornadasNoFormales/reportes/" +
        params.idJornada +
        "/reporteFinal/" +
        event.target.value
    );
  };

  useEffect(() => {
    if (boleta !== null) {
      dispatch(onGetJornadaNoFormalVotos(boleta, jornadaSelected.id));
      console.log("BUSCO LA boleta");
    }
  }, [boleta]);

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
      <Typography variant="h6" color="initial" align="center" pb={3}>
        {jornadaSelected.title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-select-small">Boleta</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={boleta === null ? "null" : boleta}
              label="Boleta"
              onChange={handleChangeSelect}
            >
              {jornadaSelected.boletas.map((boleta) => {
                return (
                  <MenuItem value={boleta.idEstructuraBoleta} key={boleta.idEstructuraBoleta}>
                    {boleta.encabezadoBoleta}
                  </MenuItem>
                );
              })}
              <MenuItem value={"null"} disabled>
                Selecciona una boleta
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box display="flex" flexDirection="column" height="100%" mt={3}>
        <PrivateRoute>
          <Routes>
            <Route
              path={":idBoleta"}
              element={
                status === "checking" ? (
                  <Box display="flex" justifyContent="center" alignContent="center" py={5}>
                    <CircularProgress size={80} />
                  </Box>
                ) : jornadaVotosData.resultados.length === 0 ||
                  !jornadaVotosData.resultados ||
                  jornadaVotosData.boleta === null ||
                  jornadaVotosData.boleta === undefined ||
                  jornadaVotosData.configDates === null ||
                  jornadaVotosData.configDates === undefined ? (
                  <>Reporte no disponible</>
                ) : // ) : jornadaVotosData.length !== 0 ? (
                jornadaVotosData.resultados.length !== 0 ? (
                  <JornadaNoFormalChart
                    chartData={jornadaVotosData || null}
                    tipoReporte="reporteFinalHTML"
                  />
                ) : (
                  // <></>
                  // <></>
                  <></>
                )
              }
            />
            {/* <Route path={":idBoleta/*"} element={<VisualizadorDePDF />} /> */}
            {/* <Route
							path={"/*"}
							element={
								<Routes>
									<Route path={"/:idBoleta"} element={<JornadaNoFormalChart />} />
								</Routes>
							}
						/> */}
          </Routes>
        </PrivateRoute>
      </Box>
      {/* <Box width="100%" hei></Box> */}
    </Box>
  );
};
