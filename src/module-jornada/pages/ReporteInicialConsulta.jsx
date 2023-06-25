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
  onGetJornadaRespuestasConsultas,
  onGetJornadaRespuestasConsultasInicio,
  onGetJornadaVotos,
} from "../../store/module-preparacion/jornada/ThunksJornada";
import { ConsultaChart } from "../components/ConsultaChart";
import { JornadaFormalChart } from "./JornadaFormalChart";
// import { VisualizadorDePDF } from "./VisualizadorDePDF";

export const ReporteInicialConsulta = () => {
  const { jornadaSelected, status, jornadaVotosData } = useJornadaStore();
  const { consultaSelected } = useConsultaCiudadanaStore();
  const [papeleta, setPapeleta] = React.useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeSelect = (event) => {
    setPapeleta(event.target.value);
    navigate(
      "/jornada/reportesConsultasCiudadanas/reportes/" +
        params.idConsulta +
        "/reporteInicio/" +
        event.target.value
    );
  };

  useEffect(() => {
    if (papeleta !== null) {
      dispatch(onGetJornadaRespuestasConsultasInicio(papeleta, consultaSelected.id));
      console.log("BUSCO LA BOLETAAAAA");
    }
  }, [papeleta]);

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
        {consultaSelected.title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-select-small">Boleta</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={papeleta === null ? "null" : papeleta}
              label="Boleta"
              onChange={handleChangeSelect}
            >
              {/* <MenuItem value="">
									<em>Selecciona una boleta</em>
								</MenuItem> */}
              {consultaSelected.ballots.map((papeleta) => {
                return (
                  <MenuItem value={papeleta.idPapeleta} key={papeleta.idPapeleta}>
                    {papeleta.nombre}
                  </MenuItem>
                );
              })}
              <MenuItem value={"null"} disabled>
                Selecciona una papeleta
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
                ) : papeleta === null ? (
                  <></>
                ) : (
                  <ConsultaChart chartData={jornadaVotosData} tipoReporte="reporteInicialHTML" />
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
