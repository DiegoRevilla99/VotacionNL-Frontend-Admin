import BallotIcon from "@mui/icons-material/Ballot";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupsIcon from "@mui/icons-material/Groups";
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
import { onSetJornadaSelected } from "../../store/module-preparacion/jornada/SliceJornada";
import { onGetjornadas } from "../../store/module-preparacion/jornada/ThunksJornada";
import { GeneralTable } from "../components/GeneralTable";
import { ModalDeleteJornada } from "../components/ModalDeleteJornada";
import { ModalRegistroJornadaFormal } from "../components/ModalRegistroJornadaFormal";
import { useJornadaStore } from "../hooks/useJornadaStore";

export const RegistroJornadaFormal = () => {
  const navigate = useNavigate();
  const [modalStatus, setModalStatus] = useState(false);
  const [modalDeleteStatus, setModalDeleteStatus] = useState(false);
  const [id, setId] = useState(null);
  const [nombreEleccion, setNombreEleccion] = useState(null);
  // ToDo:AQUI OBTENGAN LAS VARIABLES STATUS Y DATA DE SUS ESTADOS GLOBALES
  // const { jornadasData, status } = useJornadaStore();
  const { jornadasData, status } = useJornadaStore();

  const dispatch = useDispatch();
  const columns = [
    {
      field: "nombreJornada",
      headerName: "Título de la jornada electoral",
      flex: 4,
    },
    {
      field: "status",
      headerName: "Estatus de la jornada electoral",
      flex: 3,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        console.log("params", params.row.estatus);
        return (
          <Box width="100%" display="flex" justifyContent="space-evenly">
            <Tooltip
              title={
                params.row.estatus.estructuraBoleta.estatus
                  ? "La jornada ya cuenta con una o más boletas creadas"
                  : "La jornada aún no cuenta con boletas creadas"
              }
            >
              <BallotIcon
                htmlColor={params.row.estatus.estructuraBoleta.estatus ? "#2e7d32" : "#757575"}
              />
            </Tooltip>
            <Tooltip
              title={
                params.row.estatus.configuracion.estatus
                  ? "La jornada ya ha sido configurada"
                  : "La jornada aún no ha sido configurada"
              }
            >
              <SettingsIcon
                htmlColor={params.row.estatus.configuracion.estatus ? "#2e7d32" : "#757575"}
              />
            </Tooltip>
            <Tooltip
              title={
                params.row.estatus.candidatosPartidos.estatus
                  ? "La jornada ya contiene partidos o candidatos registrados"
                  : "La jornada aún no contiene partidos o candidatos registrados"
              }
            >
              <GroupsIcon
                htmlColor={params.row.estatus.candidatosPartidos.estatus ? "#2e7d32" : "#757575"}
              />
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
        console.log("params", params.row.estatus);
        return (
          <Stack spacing={2} direction="row">
            <Tooltip title="Ver boletas pertenecientes a esta jornada">
              <Button
                variant="outlined"
                startIcon={<BallotIcon />}
                onClick={() => handleEdit(params.id, params.row.nombreJornada)}
              >
                Boletas
              </Button>
            </Tooltip>
            <Tooltip title="Realizar la configuración de la jornada">
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={() => handleConfig(params.id)}
              >
                Configuración
              </Button>
            </Tooltip>
            <Tooltip title="Eliminar esta jornada">
              <IconButton
                sx={{ color: "#511079" }}
                onClick={() => handleDelete(params.id, params.row.nombreJornada)}
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
    // if (jornadasData.length === 0) dispatch(onGetjornadas());
    if (jornadasData.length === 0) dispatch(onGetjornadas());
  }, []);

  // METODO PARA BORRAR UN REGISTRO
  const handleDelete = (id, title) => {
    setId(id);
    setNombreEleccion(title);
    openModalDelete();
    // dispatch(onDeleteJornada(id));
  };

  // MÉTODO PARA EDITAR UN REGISTRO
  const handleEdit = (id, title) => {
    dispatch(onSetJornadaSelected({ id, title, boletas: [] }));
    navigate("/preparacion/jornada/" + id);
  };

  // MÉTODO PARA IR A LA PAGINA DE CONFIGURACIÓN DEL REGISTRO
  const handleConfig = (id) => {
    navigate("/preparacion/jornada/config/" + id);
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

  console.log("Jorndas", jornadasData);

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
            currentRoute="JORNADAS ELECTORALES"
          />

          <Box sx={{ display: "flex", alignItems: "center", m: "0.5rem", ml: "2rem" }}>
            <Typography variant="h6" align="left" color="initial" sx={{ flexGrow: 1 }}>
              PASO 1.- REGISTRO DE UNA JORNADA ELECTORAL
            </Typography>
            <Tooltip
              title="En este apartado puedes ver las jornadas que existen, así como también las configuraciones de cada jornada."
              // placement="right"
            >
              <IconButton sx={{ color: "#8A2BE2" }}>
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
              // mt: "2rem",
            }}
          >
            <Grid container>
              <Grid item lg={3} md={4} sm={12} xs={12}>
                <Tooltip title="Registrar una nueva jornada electoral">
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
                    Registrar Jornada Electoral
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
                mt: "2rem",
                borderRadius: "2rem",
                p: "2rem",
                pt: "1rem",
              }}
            >
              <Typography variant="h5" color="initial" mb="0.5rem" align="center">
                JORNADAS ELECTORALES
              </Typography>
              <Divider />
              <Box
                mt={"1rem"}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* TABLA GENERAL, TIENEN QUE PASARLE LA DATA DE LOS REGISTROS Y EL ID DE 
                                CADA REGISTRO SE DEBE LLAMAR "idJornada" o si el id de cada registro 
                                tiene otro nombre, cambien el atributo idName al nombre que quieran */}
                <GeneralTable
                  // data = {jornadasData}
                  data={jornadasData}
                  columns={columns}
                  idName={"idJornada"}
                />
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* MODAL DONDE SE REGISTRA LA JORNADA NO FORMAL */}
        <ModalRegistroJornadaFormal
          modalStatus={modalStatus}
          closeModal={closeModal}
          openModal={openModal}
        />
        {/* MODAL DONDE SE REGISTRA LA JORNADA NO FORMAL */}
        <ModalDeleteJornada
          modalDeleteStatus={modalDeleteStatus}
          closeModalDelete={closeModalDelete}
          id={id}
          nombreEleccion={nombreEleccion}
        />
      </Grid>
    );
};
