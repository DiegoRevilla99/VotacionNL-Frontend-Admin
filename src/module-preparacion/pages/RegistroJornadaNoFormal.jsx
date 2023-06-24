import BallotIcon from "@mui/icons-material/Ballot";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";

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
import { Stack } from "@mui/system";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BreadCrumbsCustom } from "../../module-empadronamiento/components/BreadCrumbsCustom";
import { onSetjornadaNoFormalSelected } from "../../store/module-preparacion/jornada/SliceJornadaNoFormal";
import { onGetJornadasNoFormales } from "../../store/module-preparacion/jornada/ThunksJornadaNoFormal";
import { GeneralTable } from "../components/GeneralTable";
import { ModalDeleteJornadaNoFormal } from "../components/ModalDeleteJornadaNoFormal";
import { ModalRegistroJornadaNoFormal } from "../components/ModalRegistroJornadaNoFormal";
import { useJornadaNoFormalStore } from "../hooks/useJornadaNoFormalStore";

export const RegistroJornadaNoFormal = () => {
  const navigate = useNavigate();
  const [modalStatus, setModalStatus] = useState(false);
  const [modalDeleteStatus, setModalDeleteStatus] = useState(false);
  const [id, setId] = useState(null);
  const [nombreEleccion, setNombreEleccion] = useState(null);
  // TODO:AQUI OBTENGAN LAS VARIABLES STATUS Y DATA DE SUS ESTADOS GLOBALES
  // const { jornadasData, status } = useJornadaStore();
  const { jornadasNoFormalesData, status } = useJornadaNoFormalStore();

  console.log("RegistroJornadaNoFormal", jornadasNoFormalesData);
  const dispatch = useDispatch();
  const columns = [
    { field: "nombreEleccion", headerName: "Título de la elección popular", flex: 4 },
    {
      field: "status",
      headerName: "Estatus de la elección popular",
      flex: 3,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        console.log("params", params.row.estatus);
        return (
          <Box width="100%" display="flex" justifyContent="space-evenly">
            <Tooltip
              title={
                params.row.estatus.estructuraBoleta
                  ? "La elección popular ya cuenta con una o más boletas creadas"
                  : "La elección popular aún no cuenta con boletas creadas"
              }
            >
              <BallotIcon
                htmlColor={params.row.estatus.estructuraBoleta.estatus ? "#2e7d32" : "#757575"}
              />
            </Tooltip>
            <Tooltip
              title={
                params.row.estatus.configuracion.estatus
                  ? "La elección popular ya ha sido configurada"
                  : "La elección popular aún no ha sido configurada"
              }
            >
              <SettingsIcon
                htmlColor={params.row.estatus.configuracion.estatus ? "#2e7d32" : "#757575"}
              />
            </Tooltip>
            {/* <Tooltip
              title={
                params.row.estatus.candidatosAsociaciones.estatus
                  ? "La elección popular ya contiene candidatos o asociaciones registrados"
                  : "La elección popular aún no contiene candidatos o asociaciones registrados"
              }
            >
              <GroupsIcon
                htmlColor={
                  params.row.estatus.candidatosAsociaciones.estatus ? "#2e7d32" : "#757575"
                }
              />
            </Tooltip> */}
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
            <Tooltip title="Ver boletas pertenecientes a esta elección popular">
              <Button
                variant="outlined"
                startIcon={<BallotIcon />}
                onClick={() => handleEdit(params.id, params.row.nombreEleccion)}
              >
                Boletas
              </Button>
            </Tooltip>
            <Tooltip title="Realizar la configuración de la elección popular">
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={() => handleConfig(params.id)}
              >
                Configuración
              </Button>
            </Tooltip>
            <Tooltip title="Eliminar esta elección popular">
              <IconButton
                sx={{ color: "#511079" }}
                onClick={() => handleDelete(params.id, params.row.nombreEleccion)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  // USEEFFECT QUE PUEDES USAR PARA HACER UN GET DE LAS JORNADAS AL RENDERIZAR LA PAGINA
  useEffect(() => {
    //     if (jornadasData.length === 0) dispatch(onGetjornadas());
    // if (jornadasNoFormalesData.length === 0)
    dispatch(onGetJornadasNoFormales());
  }, []);

  // METODO PARA BORRAR UN REGISTRO
  const handleDelete = (id, title) => {
    setId(id);
    setNombreEleccion(title);
    openModalDelete();
  };

  // MÉTODO PARA EDITAR UN REGISTRO
  const handleEdit = (id, title) => {
    dispatch(onSetjornadaNoFormalSelected({ id, title, boletasNoFormales: [] }));
    navigate("/preparacion/jornada/noFormal/" + id);
  };

  // MÉTODO PARA IR A LA PAGINA DE CONFIGURACIÓN DEL REGISTRO
  const handleConfig = (id) => {
    navigate("/preparacion/jornadaNoFormal/config/" + id);
    // dispatch(onGetConfig(id));
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  const openModal = () => {
    setModalStatus(true);
  };
  const closeModalDelete = () => {
    setModalDeleteStatus(false);
  };

  const openModalDelete = () => {
    setModalDeleteStatus(true);
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
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }} mt={2}>
          <BreadCrumbsCustom
            routes={[
              {
                name: "PREPARACIÓN",
                url: "/preparacion/inicio",
              },
            ]}
            currentRoute="ELECCIONES POPULARES"
          />

          <Box sx={{ display: "flex", alignItems: "center", m: "0.5rem", ml: "2rem" }}>
            <Typography variant="h6" align="left" color="initial" sx={{ flexGrow: 1 }}>
              PASO 1.- REGISTRO DE UNA ELECCIÓN POPULAR
            </Typography>
            <Tooltip
              title="En este apartado puedes ver las elecciones populares que existen, así como también las configuraciones de cada elección popular."
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
            }}
          >
            <Grid container>
              <Grid item lg={3} md={4} sm={12} xs={12}>
                <Tooltip title="Registrar una nueva elección popular">
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
                    Registrar ELECCIÓN POPULAR
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>

            <Box
              sx={{
                boxShadow: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                mt: "1rem",
                borderRadius: "2rem",
                p: "2rem",
                pt: "1rem",
              }}
            >
              <Typography variant="h5" color="initial" mb="0.5rem" align="center">
                ELECCIONES POPULAR
              </Typography>
              <Divider />
              <Box mt={"1rem"} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* TABLA GENERAL, TIENEN QUE PASARLE LA DATA DE LOS REGISTROS Y EL ID DE 
                                CADA REGISTRO SE DEBE LLAMAR "idJornada" o si el id de cada registro 
                                tiene otro nombre, cambien el atributo idName al nombre que quieran */}
                <GeneralTable
                  data={jornadasNoFormalesData}
                  columns={columns}
                  idName={"idEleccion"}
                />
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* MODAL DONDE SE REGISTRA LA JORNADA NO FORMAL */}
        <ModalRegistroJornadaNoFormal
          modalStatus={modalStatus}
          closeModal={closeModal}
          openModal={openModal}
        />
        <ModalDeleteJornadaNoFormal
          modalDeleteStatus={modalDeleteStatus}
          closeModalDelete={closeModalDelete}
          id={id}
          nombreEleccion={nombreEleccion}
        />
      </Grid>
    );
};
