import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import BallotIcon from "@mui/icons-material/Ballot";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GeneralTable } from "../../module-preparacion/components/GeneralTable";
import { useConsultaCiudadanaStore } from "../../module-preparacion/hooks/useConsultaCiudadanaStore";
import { onSetConsultaSelected } from "../../store/module-preparacion/consulta-ciudadana/consultaCiudadanaSlice";
import { onGetConsultasCiudadanas } from "../../store/module-preparacion/consulta-ciudadana/thunks";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
import {
  onGetBoletasParaJornada,
  onGetBoletasParaJornadaNoFormal,
  onGetjornadas,
  onGetjornadasNoFormales,
} from "../../store/module-preparacion/jornada/ThunksJornada";
import { getJornadasNoFormalesProvider } from "../../providers/Micro-NoFormales/providerNoFormales";
import { BreadCrumbsCustom } from "../../module-empadronamiento/components/BreadCrumbsCustom";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export const VerJornadasNoFormales = () => {
  const navigate = useNavigate();
  const { jornadasData, status } = useJornadaStore();
  const dispatch = useDispatch();
  const columns = [
    { field: "nombreEleccion", headerName: "Título de la jornada formal", flex: 10 },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 5,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              startIcon={<BallotIcon />}
              onClick={() => handleWatch(params.id, params.row.nombreEleccion)}
            >
              Ver reportes
            </Button>
          </Stack>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(onGetjornadasNoFormales());
  }, []);

  const handleWatch = (id, titulo) => {
    dispatch(
      onGetBoletasParaJornadaNoFormal(id, titulo, () =>
        navigate("/jornada/reportesJornadasNoFormales/reportes/" + id + "/reporteInicio/")
      )
    );
  };

  if (status === "checking")
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  else
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
          <BreadCrumbsCustom
            routes={[
              {
                name: "JORNADA",
                url: "/jornada/inicio",
              },
            ]}
            currentRoute="JORNADAS POPULARES REGISTRADAS"
          />
          <Box
            sx={{ m: "0.5rem", ml: "2rem" }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" align="left" color="initial">
              JORNADAS POPULARES REGISTRADAS
            </Typography>
            <Tooltip
              title="En este apartado se encuentran las jornadas que existen y puedes ver sus reportes iniciales o finales si es que ya se encuentran disponibles"
              // placement="right"
            >
              <IconButton sx={{ color: "#543884" }}>
                <HelpOutlineIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              m: "2rem",
              mt: "2rem",
            }}
          >
            <Box
              sx={{
                boxShadow: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                // mt: "2rem",
                borderRadius: "2rem",
                p: "2rem",
                pt: "1rem",
              }}
            >
              <Typography variant="h5" color="initial" mb="0.5rem">
                Jornadas populares
              </Typography>
              <Divider />
              <Box mt={"1rem"} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* <DataGridTable /> */}
                {/* <TableRegistroProceso title={"Nombre de la consulta ciudadana"} /> */}
                {/* <Tabla data={datos} actions={actions} columns={columns}></Tabla> */}
                {/* <TableConsultasCiudadanas /> */}
                <GeneralTable data={jornadasData} columns={columns} idName={"idEleccion"} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
};
