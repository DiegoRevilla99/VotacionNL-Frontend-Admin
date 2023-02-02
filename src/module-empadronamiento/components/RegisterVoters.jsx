import {
  Badge,
  Box,
  Button,
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

import { useDispatch } from "react-redux";
import { ModalLink } from "./ModalLink";
import { ModalLinkPersonal } from "./ModalLinkPersonal";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useTheme } from "@mui/material/styles";
import { ModalInfo } from "./ModalInfo";

import { setVotanteSelected } from "../../store/module-empadronamiento/votantes/empVotantesSlice";
import { getVotanteDireccion } from "../../store/module-empadronamiento/votantes/thunksVotantes";

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
  height: "calc(100% - 110px)",
};

export const RegisterVoters = ({ status = "", isLoading, datos }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.only("xs"));
  const dispatch = useDispatch();
  const [modalVotante, setModalVotante] = useState(false);
  const [modalGranel, setModalGranel] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalEnlace, setModalEnlace] = useState(false);
  const [modalEnlacePersonal, setModalEnlacePersonal] = useState(false);
  const [modalInfoV, setModalInfoV] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [buscador, setBuscador] = useState("");
  const [dataSearch, setDataSearch] = useState(datos);

  const abrirCerrarModalAddVotante = () => {
    setModalVotante(!modalVotante);
  };
  const abrirCerrarModalGranel = () => {
    setModalGranel(!modalGranel);
  };
  const abrirCerrarModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const abrirCerrarModalEnlace = () => {
    setModalEnlace(!modalEnlace);
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

  const columns = [
    { field: "curp", headerName: "CURP", flex: 4 },
    { field: "nombreVotante", headerName: "NOMBRE", flex: 3 },
    { field: "apellidoPVotante", headerName: "PRIMER AP.", flex: 3 },
    { field: "apellidoMVotante", headerName: "SEGUNDO AP.", flex: 3 },
    // {
    //   field: "nombreCompleto",
    //   headerName: "Nombre completo",
    //   flex: 4,
    //   sortable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params) => {
    //     // return <Typography>Sin enviar</Typography>;
    //     // return <Typography>Envio exitoso</Typography>;
    //     return (
    //       <Typography sx={{ fontSize: { xl: "15px", xs: "12px" } }}>
    //         {params.row.nombreVotante +
    //           " " +
    //           params.row.apellidoPVotante +
    //           " " +
    //           params.row.apellidoMVotante}
    //       </Typography>
    //     );
    //   },
    // },

    {
      field: "status",
      headerName: "ESTADO CORREO",
      flex: 3,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        // return <Typography>Sin enviar</Typography>;
        // return <Typography>Envio exitoso</Typography>;
        return <Typography>Envio fallido</Typography>;
      },
    },
    {
      field: "Acciones",
      headerName: "ACCIONES",
      flex: 5,
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
                  endIcon={<EditIcon />}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => selectedVoterEnlace(params.row)}
                  endIcon={<AttachEmailIcon />}
                >
                  Enviar
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => selectedVoterInfo(params.row)}
                  endIcon={<BadgeIcon />}
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

  useEffect(() => {
    setDataSearch(datos);
  }, [datos]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          width: "100%",
          height: "100%",
        }}
      >
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
                <ListItemText primary="REGISTRAR VOTANTES" />
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
        </Box>

        <Box sx={registros}>
          <Box
            sx={{
              width: "90%",
              mt: 2,
              mb: 3,
              height: "70px",
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

          <GeneralTable
            loading={isLoading}
            data={dataSearch}
            columns={columns}
            idName={"curp"}
          />
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
        isOpen={modalEnlace}
        abrirCerrarModal={abrirCerrarModalEnlace}
      />
      <ModalLinkPersonal
        isOpen={modalEnlacePersonal}
        abrirCerrarModal={abrirCerrarModalEnlacePersonal}
      />

      <ModalInfo isOpen={modalInfoV} abrirCerrarModal={abrirCerrarModalInfoV} />
    </>
  );
};
