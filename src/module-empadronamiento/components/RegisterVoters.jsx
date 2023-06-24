import {
  Alert,
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import Collapse from "@mui/material/Collapse";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ReportIcon from "@mui/icons-material/Report";
import SendIcon from "@mui/icons-material/Send";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { GeneralTable } from "../../module-preparacion/components/GeneralTable";
import { ModalVotante } from "./ModalVotante";
import { ModalAGranel } from "./ModalAGranel";
import { AddVotante } from "./AddVotante";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BadgeIcon from "@mui/icons-material/Badge";
import { ModalEditVotante } from "./ModalEditVotante";

import { useDispatch, useSelector } from "react-redux";
import { ModalLink } from "./ModalLink";
import { ModalLinkPersonal } from "./ModalLinkPersonal";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useTheme } from "@mui/material/styles";
import { ModalInfo } from "./ModalInfo";

import { setVotanteSelected } from "../../store/module-empadronamiento/votantes/empVotantesSlice";
import {
  deleteVotante,
  getVotanteDireccion,
  getVotantesbyJornada,
} from "../../store/module-empadronamiento/votantes/thunksVotantes";
import {
  crearBoletasConsulta,
  crearBoletasNoFormal,
  crearBoletasTh,
} from "../../store/module-empadronamiento/formales/thunksFormales";
import { useParams } from "react-router-dom";
import { ModalCrearBoleta } from "./ModalCreateBoletas";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import {
  getFlagBoletasConsultasProvider,
  getFlagBoletasFormalesProvider,
  getFlagBoletasNoFormalesProvider,
} from "../../providers/Micro-VotoFormal/providerVotoSeguro";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { ModalDelete } from "./ModalDelete";

const opciones = {
  display: "flex",
  flexDirection: { md: "row", xs: "column" },
  width: { xl: "85%", md: "95%", xs: "100%" },
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
  pl: 2,
  pr: 2,
  mb: { xl: 4, xs: 1 },
};
const registros = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff",
  boxShadow: 2,
  borderRadius: "20px",
  mt: 0,
  width: "100%",
  pl: 1,
  pr: 1,
  height: "auto",
};

export const RegisterVoters = ({
  status = "",
  tipo = "",
  isLoading,
  datos,
  isLoadingVotantes,
}) => {
  const theme = useTheme();
  const { id } = useParams();
  const matches = useMediaQuery(theme.breakpoints.only("xs"));
  const dispatch = useDispatch();
  const [modalVotante, setModalVotante] = useState(false);

  const [flagBoletas, setFlagBoletas] = useState(false);
  const [flagLoading, setFlagLoading] = useState(true);
  const [votanteSelectedLocal, setVotanteSelectedLocal] = useState(null);

  const [modalGranel, setModalGranel] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEnlace, setModalEnlace] = useState(false);
  const [modalEnlacePersonal, setModalEnlacePersonal] = useState(false);
  const [modalInfoV, setModalInfoV] = useState(false);
  const [modalCBoletas, setModalCBoletas] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [buscador, setBuscador] = useState("");
  const [dataSearch, setDataSearch] = useState();
  const [contraseniaData, setContraseniaData] = useState({ py: 0, pn: 0 });
  let { type } = useSelector((state) => state.empVotantesSlice);
  const { votanteSelected } = useSelector((state) => state.empVotantesSlice);

  const abrirCerrarModalAddVotante = () => {
    setModalVotante(!modalVotante);
  };
  const abrirCerrarModalGranel = () => {
    setModalGranel(!modalGranel);
  };
  const abrirCerrarModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const abrirCerrarModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const abrirCerrarModalEnlace = () => {
    setModalEnlace(!modalEnlace);
  };

  const abrirCerrarModalCBoletas = () => {
    setModalCBoletas(!modalCBoletas);
  };

  const abrirCerrarModalEnlacePersonal = () => {
    setModalEnlacePersonal(!modalEnlacePersonal);
  };
  const abrirCerrarModalInfoV = () => {
    setModalInfoV(!modalInfoV);
  };

  const selectedVoter = (votante = {}) => {
    dispatch(setVotanteSelected({ votanteSelected: votante }));
    abrirCerrarModalEdit();
  };

  const selectedVoterDelete = (votante = {}) => {
    console.log("Eliminado el votante: ", votante);
    setVotanteSelectedLocal(votante);
    dispatch(setVotanteSelected({ votanteSelected: votante }));
    abrirCerrarModalDelete();
  };

  const selectedVoterInfo = (votante = {}) => {
    dispatch(getVotanteDireccion(votante.curp));
    abrirCerrarModalInfoV();
  };

  const selectedVoterEnlace = (votante = {}) => {
    dispatch(setVotanteSelected({ votanteSelected: votante }));
    abrirCerrarModalEnlacePersonal();
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const openGranelbtn = () => {
    abrirCerrarModalGranel();
  };

  const openindividualbtn = () => {
    abrirCerrarModalAddVotante();
  };

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(datos, event.target.value);
  };

  const searching = (data, buscador) => {
    const newData = data.filter((votante) => {
      if (votante.curp.toUpperCase().includes(buscador.toUpperCase()))
        return votante;
      if (votante.nombreVotante.toUpperCase().includes(buscador.toUpperCase()))
        return votante;
      if (
        votante.apellidoMVotante?.toUpperCase().includes(buscador.toUpperCase())
      )
        return votante;
      if (
        votante.apellidoPVotante?.toUpperCase().includes(buscador.toUpperCase())
      )
        return votante;
    });
    setDataSearch(newData);
  };

  const getRowClassName = (params) => {
    const estado = params.row.status;
    if (!estado) {
      return "nocompletado";
    }

    return "";
  };

  const crearBoletas = async () => {
    const info = { idJornada: id };
    if (tipo === "formales") {
      console.log("Es formales");
      dispatch(
        crearBoletasTh(info, () => {
          getFlagBoletas();
          abrirCerrarModalCBoletas();
        })
      );
    } else if (tipo === "consultas") {
      console.log("consultas");
      dispatch(
        crearBoletasConsulta(info, () => {
          getFlagBoletas();
          abrirCerrarModalCBoletas();
        })
      );
    } else if (tipo === "noformales") {
      console.log("Es noformales");
      dispatch(
        crearBoletasNoFormal(info, () => {
          getFlagBoletas();
          abrirCerrarModalCBoletas();
        })
      );
    }
  };

  const eliminarVotante = () => {
    dispatch(deleteVotante(votanteSelected.curp, id, DeleteVotanteNext));
  };

  const DeleteVotanteNext = () => {
    console.log("actualizando info");
    dispatch(getVotantesbyJornada(id));
    setModalDelete(false);
  };

  const getFlagBoletas = async () => {
    let rep = null;

    if (tipo === "formales") {
      console.log("GF Es formales");
      rep = await getFlagBoletasFormalesProvider(id);
    } else if (tipo === "consultas") {
      console.log("GF consultas");
      rep = await getFlagBoletasConsultasProvider(id);
    } else if (tipo === "noformales") {
      console.log("GF Es noformales");
      rep = await getFlagBoletasNoFormalesProvider(id);
    }
    setFlagLoading(false);
    setFlagBoletas(rep.data.status);
    return rep;
  };

  const columns = [
    { field: "curp", headerName: "CURP", flex: 4 },
    { field: "nombreVotante", headerName: "NOMBRE", flex: 3 },
    { field: "apellidoPVotante", headerName: "PRIMER AP.", flex: 3 },
    { field: "apellidoMVotante", headerName: "SEGUNDO AP.", flex: 3 },
    {
      field: "status",
      headerName: "EDO. REGISTRO",
      flex: 3,

      disableColumnMenu: true,
      renderCell: ({ row }) =>
        // console.log(row.status);
        row.status ? (
          <Typography
            sx={{ fontSize: "12px", fontWeight: "bold", color: "#048F37" }}
          >
            COMPLETADO
          </Typography>
        ) : (
          <Typography
            sx={{ fontSize: "12px", fontWeight: "bold", color: "#B50909" }}
          >
            SIN COMPLETAR
          </Typography>
        ),
    },
    ,
    {
      field: "Acciones",
      headerName: "ACCIONES",
      width: 250,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Stack spacing={2} direction="row">
            {status !== "terminado" ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => selectedVoter(params.row)}
                  title="EDITAR"
                >
                  <EditIcon />
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => selectedVoterEnlace(params.row)}
                  title="ENVIAR ENLACE"
                >
                  <AttachEmailIcon />
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => selectedVoterDelete(params.row)}
                  title="ELIMINAR"
                >
                  <PersonRemoveIcon />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => selectedVoterInfo(params.row)}
                  endIcon={<BadgeIcon />}
                  title="VER"
                >
                  Ver
                </Button>
              </>
            )}
          </Stack>
        );
      },
    },
  ];

  const options = {
    maintainAspectRatio: false,
    responsive: true,

    plugins: {
      legend: {
        display: true,
        position: "left",
        fullWidth: true,
      },
    },
  };

  useEffect(() => {
    const newDatos = datos.filter((dato) => {
      if (dato) return dato;
    });
    setDataSearch(newDatos);

    let py = 0;
    let pn = 0;
    datos.map((dato) => {
      if (dato.status) {
        py += 1;
      } else {
        pn += 1;
      }
    });

    setContraseniaData({ py, pn });
  }, [datos]);

  useEffect(() => {
    getFlagBoletas();
    console.log("Voatntes:", datos);
  }, []);

  const data = {
    labels: [["Registros completados"], ["Registros sin completar"]],
    datasets: [
      {
        data: [contraseniaData.py, contraseniaData.pn],
        backgroundColor: ["#2EF98A", "#F92E2E"],
        hoverBackgroundColor: ["#2EF98A", "#F92E2E"],
      },
    ],
  };

  return (
    <>
      <Box sx={{ width: "100%", height: "auto", mb: "50px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            width: "100%",
            height: "100%",
            mb: 3,
          }}
        >
          {status !== "terminado" && (
            <Box display={"center"} width="80%" justifyContent="space-between">
              <Typography
                color={"primary"}
                sx={{ mt: 1, mb: 1, fontSize: "15px", fontWeight: "bold" }}
              >
                Paso 2: Subir lista de votantes
              </Typography>
              <Typography
                color={"primary"}
                sx={{ mt: 1, mb: 1, fontSize: "15px", fontWeight: "bold" }}
              >
                Paso 3: Enviar enlaces a los votantes
              </Typography>
            </Box>
          )}

          {status === "terminado" && !flagBoletas && (
            <Typography
              color={"primary"}
              sx={{ mt: 1, mb: 1, fontSize: "18px", fontWeight: "bold" }}
            >
              Paso 4: Crear las boletas
            </Typography>
          )}

          <Box sx={opciones}>
            <Box
              sx={{
                display: status == "terminado" ? "none" : "flex",
                justifyContent: "center",
                width: { xl: "30%", md: "30%", xs: "100%" },
              }}
            >
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton
                  sx={{
                    boxShadow: 0,
                    background: "#F7F6F6",
                    borderRadius: "1px",
                  }}
                  onClick={handleClick}
                >
                  <ListItemIcon>
                    <FileUploadIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="REGISTRAR VOTANTES"
                    title="REGISTRAR VOTANTES"
                  />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List
                    sx={{
                      boxShadow: 1,
                      background: "#F7F6F6",
                      borderRadius: "1px",
                    }}
                    component="div"
                    disablePadding
                  >
                    <ListItemButton
                      onClick={openGranelbtn}
                      sx={{ background: "#fff", pl: 4 }}
                    >
                      <ListItemIcon>
                        <CreateNewFolderIcon />
                      </ListItemIcon>
                      <ListItemText primary="A granel" />
                    </ListItemButton>

                    <ListItemButton
                      onClick={openindividualbtn}
                      sx={{ background: "#fff", pl: 4 }}
                    >
                      <ListItemIcon>
                        <PersonAddAltIcon />
                      </ListItemIcon>
                      <ListItemText primary="Individual" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Box>

            <Box
              sx={{
                display: status == "terminado" ? "none" : "flex",
                justifyContent: "space-around",
                alignContent: "center",
                width: { xl: "30%", md: "35%", xs: "100%" },
                height: { xl: "50px", md: "35px", xs: "30px" },
              }}
            >
              <Button
                disabled={datos?.length === 0}
                variant="contained"
                color="info"
                onClick={abrirCerrarModalEnlace}
                endIcon={<AttachEmailIcon />}
                title="ENVIAR ENLACES"
              >
                ENVIAR ENLACES
              </Button>
              {/* <Badge color="warning" badgeContent={99}>
              <Button
                color="error"
                variant="contained"
                endIcon={<CancelScheduleSendIcon />}
              >
                NO ENVIADO
              </Button>
            </Badge> */}
            </Box>

            {flagLoading ? (
              <Box display={"flex"} justifyContent={"center"} width={"100%"}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Box
                sx={{
                  display: status != "terminado" ? "none" : "flex",
                  justifyContent: "center",

                  alignContent: "center",
                  width: "100%",
                  mt: 3,
                  mb: 3,
                  height: { xl: "50px", md: "50px", xs: "50px" },
                }}
              >
                {flagBoletas ? (
                  <Alert severity="success">
                    Empadronamiento completado con exito
                  </Alert>
                ) : (
                  <Button
                    disabled={datos?.length === 0}
                    variant="contained"
                    color="info"
                    onClick={abrirCerrarModalCBoletas}
                    endIcon={<AdfScannerIcon />}
                    title="ENVIAR ENLACES"
                  >
                    CREAR BOLETAS
                  </Button>
                )}

                {/* <Badge color="warning" badgeContent={99}>
				<Button
				  color="error"
				  variant="contained"
				  endIcon={<CancelScheduleSendIcon />}
				>
				  NO ENVIADO
				</Button>
			  </Badge> */}
              </Box>
            )}
          </Box>

          <Box sx={registros}>
            <Box
              sx={{
                width: "90%",
                mt: 2,
                mb: 3,
                height: "100px",
                display: "flex",
                flexDirection: { md: "row", xs: "column" },
                alignItems: "center",
                alignContent: "center",
                justifyItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                color="primary"
                sx={{
                  display: "flex",

                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  width: "calc(100% - 250px)",
                  height: "100%",
                  fontSize: { lg: "22px", sm: "15px" },
                }}
              >
                VOTANTES REGISTRADOS
              </Typography>
              <TextField
                size="small"
                value={buscador}
                onChange={handleSearch}
                sx={{
                  width: "250px",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonSearchIcon />
                    </InputAdornment>
                  ),
                }}
                label="Buscador"
                variant="outlined"
                name="nombreVotante"
                id="nombreVotante"
              ></TextField>
            </Box>
            <Box sx={{ pb: 3 }} width={"100%"} height={"400px"}>
              <GeneralTable
                loading={isLoading}
                data={dataSearch}
                columns={columns}
                idName={"curp"}
                colorRow={getRowClassName}
              />
            </Box>
          </Box>

          <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            mb={5}
            sx={{
              background: "#fff",
              boxShadow: 2,
              borderRadius: "20px",
              mt: 5,
              mb: 5,
              p: 1,
              width: "100%",
              height: "auto",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: "25px", mt: 3, mb: 3 }}
              textAlign={"center"}
            >
              ESTADO DE LOS REGISTROS DE LOS VOTANTES EMPADRONADOS
            </Typography>
            <Typography
              textAlign={"center"}
              sx={{ fontSize: "18px", fontWeight: "bold" }}
              mt={1}
              mb={4}
            >
              {datos.length} VOTANTES EMPADRONADOS
            </Typography>

            <Box
              display={"flex"}
              flexDirection="column"
              alignItems={"center"}
              sx={{ width: "60%", height: "300px", mb: 3 }}
            >
              <Pie
                width={"100%"}
                height={"100%"}
                data={data}
                options={options}
              />
            </Box>

            {/*  <Typography textAlign={"center"} mt={2}>
              Votantes sin restablecer contraseña: {contraseniaData.pn}
            </Typography>
            <Typography mb={1}>
              Votantes con contraseña reestablecida: {contraseniaData.py}
            </Typography> */}
          </Box>
        </Box>
      </Box>

      <AddVotante
        isOpen={modalVotante}
        abrirCerrarModal={abrirCerrarModalAddVotante}
      ></AddVotante>
      <ModalEditVotante
        isOpen={modalEdit}
        abrirCerrarModal={abrirCerrarModalEdit}
      ></ModalEditVotante>
      <ModalAGranel
        isOpen={modalGranel}
        abrirCerrarModal={abrirCerrarModalGranel}
      ></ModalAGranel>
      <ModalLink
        votantesData={datos}
        isOpen={modalEnlace}
        abrirCerrarModal={abrirCerrarModalEnlace}
      />
      <ModalLinkPersonal
        isOpen={modalEnlacePersonal}
        abrirCerrarModal={abrirCerrarModalEnlacePersonal}
      />

      <ModalInfo isOpen={modalInfoV} abrirCerrarModal={abrirCerrarModalInfoV} />
      <ModalCrearBoleta
        isOpen={modalCBoletas}
        abrirCerrarModal={abrirCerrarModalCBoletas}
        enviar={crearBoletas}
      />
      <ModalDelete
        abrirCerrarModal={abrirCerrarModalDelete}
        isOpen={modalDelete}
        action={eliminarVotante}
        mensaje={
          "Se eliminara al votante: " +
          votanteSelectedLocal?.nombreVotante +
          " " +
          votanteSelectedLocal?.apellidoPVotante +
          " " +
          votanteSelectedLocal?.apellidoMVotante
        }
        titulo="Eliminar votante"
      />
    </>
  );
};
