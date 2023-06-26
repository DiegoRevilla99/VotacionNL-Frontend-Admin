import BallotIcon from "@mui/icons-material/Ballot";
import DeleteIcon from "@mui/icons-material/Delete";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
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
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch } from 'react-redux';
import { PeopleAlt, ThreeP } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { BreadCrumbsCustom } from "../../module-empadronamiento/components/BreadCrumbsCustom";
import {
  onGetBoletaData,
  onGetBoletas,
  onGetBoletasAll
} from "../../store/module-preparacion/jornada/ThunksJornada";
import { GeneralTable } from "../components/GeneralTable";
import { ModalEliminarBoletaFormal } from "../components/ModalEliminarBoletaFormal";
import { useJornadaStore } from "../hooks/useJornadaStore";
export const CrudJornada = () => {
  const navigate = useNavigate();
  
  const [modalDeleteStatus, setModalDeleteStatus] = useState(false);
  const [idBoleta, setIdBoleta] = useState(null);
  const [nombreEstructuraBoleta, setNombreBoleta] = useState(null);
  // ToDo:AQUI OBTENGAN LAS VARIABLES STATUS Y DATA DE SUS ESTADOS GLOBALES
  const { jornadaSelected, status } = useJornadaStore();
  const params = useParams();
  const dispatch = useDispatch();

  // USEEFFECT QUE PUEDES USAR PARA HACER UN GET DE LAS JORNADAS AL RENDERIZAR LA PAGINA
  useEffect(() => {
    dispatch(onGetBoletas(params.id));
    dispatch(onGetBoletasAll());
  }, []);

  const { boletaStatusAll } = useSelector(
    (state) => state.jornada
  );


      const filteredBoletas = boletaStatusAll.filter((boleta) => {
        return jornadaSelected.boletas.some(
          (selectedBoleta) => selectedBoleta.idEstructuraBoleta === boleta.idEstructuraBoleta
        );
      });

      // console.log("filteredBoletas", filteredBoletas);

    const columns = [
        {
      field: "nombreEstructuraBoleta",
      headerName: "TÍTULO DE LA BOLETA",
      flex: 4,
    },
    {
      field: "status",
      headerName: "Estatus de la boleta",
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({row}) => {
        // console.log("dentro deeee",row);
        return (
          <Box width="100%" display="flex" justifyContent="space-evenly">
            <Tooltip
              title={
                row.estatus.candidatos.estatus
                  ? "La boleta ya cuenta con una o más candidatos creadas"
                  : "La boleta aún no cuenta con candidatos creadas"
              }
            >
              <PeopleAlt
                htmlColor={row.estatus.candidatos.estatus ? "#2e7d32" : "#757575"}
              />
            </Tooltip>
            <Tooltip
              title={
                row.estatus.partidos.estatus
                  ? "La boleta ya cuenta con una o más partidos creadas"
                  : "La boleta aún no ha sido configurada"
              }
            >
              <ThreeP
                htmlColor={row.estatus.partidos.estatus? "#2e7d32" : "#757575"}
              />
            </Tooltip>
            <Tooltip
              title={
                row.estatus.coaliciones.estatus
                  ? "La boleta ya contiene coaliciones configuradas"
                  : "La boleta aún no contiene coaliciones configuradas"
              }
            >
              <HandshakeIcon
                htmlColor={row.estatus.coaliciones.estatus? "#2e7d32" : "#757575"}
              />
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "Configuración",
      headerName: "CONFIGURACIÓN",
      flex: 5,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        // console.log(params);
        return (
          <Stack spacing={2} direction="row">
            <Tooltip title="Visualizar los datos de la boleta">
              <Button
                variant="outlined"
                startIcon={<BallotIcon />}
                onClick={() => handleEdit(params.id)}
              >
                VISUALIZAR BOLETA
              </Button>
            </Tooltip>
            <Tooltip title="Crear coaliciones pertenecientes a la boleta">
              <Button
                variant="outlined"
                startIcon={<HandshakeIcon />}
                onClick={() => handleConfig(params.id)}
              >
                Coaliciones
              </Button>
            </Tooltip>
            <Tooltip title="Eliminar la boleta">
              <IconButton
                sx={{ color: "#511079" }}
                onClick={() => handleDelete(params.id, params.row.nombreEstructuraBoleta)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  

  // METODO PARA BORRAR UN REGISTRO
  const handleDelete = (id, title) => {
    setIdBoleta(id);
    setNombreBoleta(title);
    openModalDelete();
    // dispatch(onDeleteBoleta(id));
  };

  // MÉTODO PARA EDITAR UN REGISTRO
  const handleEdit = (id) => {
    console.log("id boleta", id);
    dispatch(
      onGetBoletaData(id, () => {
        navigate("/preparacion/jornada/" + params.id + "/boleta/" + id);
      })
    );
  };

  // MÉTODO PARA IR A LA PAGINA DE CONFIGURACIÓN DEL REGISTRO
  const handleConfig = (id) => {
    navigate("/preparacion/jornada/configboleta/" + params.id + "/" + id);
    // dispatch(onGetConfig(id));
  };

  const handleAdd = () => {
    // console.log("jornadaSelected", jornadaSelected.boletas);
    // navigate("/preparacion/jornada/boleta/");
    navigate("/preparacion/jornada/" + params.id + "/boleta/" + jornadaSelected.boletas.length);
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
              {
                name: "JORNADAS ELECTORALES",
                url: "/preparacion/registroJornadaFormal",
              },
            ]}
            currentRoute={jornadaSelected.title}
          ></BreadCrumbsCustom>

          <Box sx={{ display: "flex", alignItems: "center", m: "0.5rem", ml: "2rem" }}>
            <Typography variant="h6" align="left" color="initial" sx={{ flexGrow: 1 }}>
              {jornadaSelected.title}
            </Typography>
            <Tooltip
              title="En este apartado puedes ver las boletas que existen, así como también las coaliciones de cada boleta."
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
              mt: "2rem",
            }}
          >
            <Grid container>
              <Grid item lg={3} md={4} sm={12} xs={12}>
                <Tooltip title="Registrar una nueva boleta">
                  <Button
                    onClick={handleAdd}
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
                    PASO 2.- REGISTRAR BOLETA
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
                backgroundColor: "rgb(239,236,221, 0.8)",
                mt: "2rem",
                borderRadius: "2rem",
                p: "2rem",
                pt: "1rem",
              }}
            >
              <Typography variant="h5" color="initial" mb="0.5rem" align="center">
                BOLETAS
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
                  data={filteredBoletas} // DATA DE LOS REGISTROS
                  columns={columns}
                  idName={"idEstructuraBoleta"} // NOMBRE DEL ID DE CADA REGISTRO
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <ModalEliminarBoletaFormal
          modalDeleteStatus={modalDeleteStatus}
          closeModalDelete={closeModalDelete}
          idBoleta={idBoleta}
          nombreEstructuraBoleta={nombreEstructuraBoleta}
        />
      </Grid>
    );
};
