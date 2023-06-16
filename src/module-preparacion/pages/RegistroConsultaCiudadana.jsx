import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ModalRegistroConsultaCiudadana } from "../components/ModalRegistroConsultaCiudadana";
import { GeneralTable } from "../components/GeneralTable";
import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";
import { Stack } from "@mui/system";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch } from "react-redux";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  onDeleteConsultaCiudadana,
  onGetConfig,
  onGetConsultasCiudadanas,
} from "../../store/module-preparacion/consulta-ciudadana/thunks";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  onSetConfigSelectedNull,
  onSetConsultaSelected,
} from "../../store/module-preparacion/consulta-ciudadana/consultaCiudadanaSlice";
import { BreadCrumbsCustom } from "../../module-empadronamiento/components/BreadCrumbsCustom";

import AbcIcon from "@mui/icons-material/Abc";

const iconStatus = {
  nombreConsulta: true,
  boletas: true,
  configuracion: false,
};

export const RegistroConsultaCiudadana = () => {
  const navigate = useNavigate();
  const [modalStatus, setModalStatus] = useState(false);
  const { consultasData, status } = useConsultaCiudadanaStore();
  const dispatch = useDispatch();
  const columns = [
    { field: "nombreJornada", headerName: "Título de la consulta ciudadana", flex: 6 },
    {
      field: "status",
      headerName: "Estatus de la consulta ciudadana",
      flex: 5,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box width="100%" display="flex" justifyContent="space-evenly">
            <Tooltip
              title={
                iconStatus.nombreConsulta
                  ? "La consulta fue creada con exito"
                  : "La consulta no ha sido creada"
              }
            >
              <AbcIcon htmlColor={iconStatus.nombreConsulta ? "#2e7d32" : "#757575"} />
            </Tooltip>
            <Tooltip
              title={
                iconStatus.boletas
                  ? "La consulta ya cuenta con una o más papeletas creadas"
                  : "La consulta aun no cuenta con papeletas creadas"
              }
            >
              <BallotIcon htmlColor={iconStatus.boletas ? "#2e7d32" : "#757575"} />
            </Tooltip>
            <Tooltip
              title={
                iconStatus.configuracion
                  ? "La consulta ya ha sido configurada"
                  : "La consulta aun no ha sido configurada"
              }
            >
              <SettingsIcon htmlColor={iconStatus.configuracion ? "#2e7d32" : "#757575"} />
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "configuracion",
      headerName: "Configuración",
      flex: 5,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              startIcon={<BallotIcon />}
              onClick={() => handleEdit(params.id, params.row.nombreJornada)}
            >
              Ver
            </Button>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              onClick={() => handleConfig(params.id, params.row.nombreJornada)}
            >
              Configuración
            </Button>
            <IconButton sx={{ color: "#511079" }} onClick={() => handleDelete(params.id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  useEffect(() => {
    if (consultasData.length === 0) dispatch(onGetConsultasCiudadanas());
  }, []);

  const handleDelete = (id) => {
    console.log("ID:", id);
    dispatch(onDeleteConsultaCiudadana(id));
  };

  const handleEdit = (id, titulo) => {
    dispatch(onSetConsultaSelected({ id, title: titulo, ballots: [] }));
    navigate("/preparacion/consulta/" + id);
  };

  const handleConfig = (id, titulo) => {
    navigate("/preparacion/consulta/config/" + id);
    dispatch(onGetConfig(id, titulo));
  };

  const go = () => {
    navigate();
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  const openModal = () => {
    setModalStatus(true);
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
                name: "PREPARACIÓN",
                url: "/preparacion/inicio",
              },
            ]}
            currentRoute="CONSULTAS CIUDADANAS"
          />
          <Box
            sx={{ display: "flex", alignItems: "center", m: "0.5rem", ml: "2rem" }}
            justifyContent="space-between"
          >
            <Typography variant="h6" align="left" color="initial">
              PASO 1.- REGISTRO DE CONSULTA CIUDADANA
            </Typography>
            <Tooltip
              title="En este apartado puedes ver las consultas ciudadanas que existen, así como también consultar las configuraciones de cada consulta."
              // placement="right"
            >
              <IconButton color="primary">
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
            <Grid container>
              <Grid item lg={3} md={4} sm={12} xs={12}>
                <Button
                  onClick={openModal}
                  variant="contained"
                  size="large"
                  sx={{
                    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
                    transition: "all 0.5s ease",
                    backgroundColor: "#511079",
                    width: "100%",
                    borderRadius: "2rem 2rem 2rem 2rem",
                    "&:hover": {
                      backgroundColor: "#7E328B !important",
                      transform: "translate(-5px, -5px)",
                      boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  Registrar Consulta Ciudadana
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
                borderRadius: "2rem",
                p: "2rem",
                pt: "1rem",
              }}
            >
              <Typography variant="h5" color="initial" mb="0.5rem">
                Consultas Ciudadanas
              </Typography>
              <Divider />
              <Box mt={"1rem"} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* <DataGridTable /> */}
                {/* <TableRegistroProceso title={"Nombre de la consulta ciudadana"} /> */}
                {/* <Tabla data={datos} actions={actions} columns={columns}></Tabla> */}
                {/* <TableConsultasCiudadanas /> */}
                <GeneralTable data={consultasData} columns={columns} idName={"idJornada"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <ModalRegistroConsultaCiudadana
          modalStatus={modalStatus}
          closeModal={closeModal}
          openModal={openModal}
        />
        {/* <ModalRegistroProcesoElectoral
				title={title}
			/> */}
      </Grid>
    );
};
