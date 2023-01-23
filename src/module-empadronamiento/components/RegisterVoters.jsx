import {
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
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
import { setVotanteSelected } from "../../store/module-empadronamiento/formales/EmpFormalesSlice";
import { useDispatch } from "react-redux";
import { ModalLink } from "./ModalLink";
import { ModalLinkPersonal } from "./ModalLinkPersonal";

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
  boxShadow: 1,
  borderRadius: "20px",
  mt: 0,
  width: "100%",
  p: 2,
  height: "calc(100% - 110px)",
};

export const RegisterVoters = ({ status = "", isLoading, datos }) => {
  const dispatch = useDispatch();
  const [modalVotante, setModalVotante] = useState(false);
  const [modalGranel, setModalGranel] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalEnlace, setModalEnlace] = useState(false);
  const [modalEnlacePersonal, setModalEnlacePersonal] = useState(false);
  const [open, setOpen] = React.useState(false);

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

  const selectedVoter = (votante = {}) => {
    dispatch(setVotanteSelected({ votanteSelected: votante }));
    abrirCerrarModalEdit();
  };

  const selectedVoterEnlace = (votante = {}) => {
    dispatch(setVotanteSelected({ votanteSelected: votante }));
    abrirCerrarModalEnlacePersonal();
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const openGranelbtn = () => {
    console.log("preisonando a granel");
    abrirCerrarModalGranel();
  };

  const openindividualbtn = () => {
    console.log("preisonando a individual");
    abrirCerrarModalAddVotante();
  };

  const columns = [
    { field: "curp", headerName: "CURP", flex: 3 },
    {
      field: "nombreVotante",
      headerName: "Nombre",
      flex: 4,
    },
    {
      field: "Acciones",
      headerName: "Acciones",
      flex: 4,
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
                  Enlace
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => selectedVoter(params.row)}
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
          <Typography sx={{ fontWeight: "bold", mt: 1, mb: { xl: 5, md: 2 } }}>
            VOTANTES REGISTRADOS
          </Typography>
          <GeneralTable
            loading={isLoading}
            data={datos}
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
    </>
  );
};
