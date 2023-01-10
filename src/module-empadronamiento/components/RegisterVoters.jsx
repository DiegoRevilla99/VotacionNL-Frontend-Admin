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
const datos = [
  {
    id: "1",
    curp: "SALL991216MOCNPR00",
    informacion: "Laura Yessenia Sanchez Lopez",
  },
  {
    id: "2",
    curp: "SALL991216MOCNPR00",
    informacion: "Jose Antonio Diego Revilla",
  },
  {
    id: "3",
    curp: "SALL991216MOCNPR00",
    informacion: "Kevin Edilberto Chavez Sanchez",
  },
];
const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "curp", headerName: "CURP", flex: 3 },
  {
    field: "informacion",
    headerName: "Información",
    flex: 5,
  },
  {
    field: "Acciones",
    headerName: "Acciones",
    flex: 3,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <Stack spacing={2} direction="row">
          <Button variant="outlined">ver</Button>
          <Button variant="outlined">editar</Button>
        </Stack>
      );
    },
  },
];
const opciones = {
  display: "flex",
  flexDirection: { md: "row", xs: "column" },
  width: { xl: "95%", md: "100%", xs: "100%" },
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

export const RegisterVoters = () => {
  const [modalVotante, setModalVotante] = useState(false);
  const [modalGranel, setModalGranel] = useState(false);
  const [open, setOpen] = React.useState(false);

  const abrirCerrarModalAddVotante = () => {
    setModalVotante(!modalVotante);
  };
  const abrirCerrarModalGranel = () => {
    setModalGranel(!modalGranel);
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
          {/* <Button variant="contained" endIcon={<DeleteIcon />}>
            REGISTRAR VOTANTES
          </Button> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: { xl: "20%", md: "30%", xs: "100%" },
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
              display: "flex",
              justifyContent: "space-around",
              alignContent: "center",
              width: { xl: "30%", md: "35%", xs: "100%" },
              height: { xl: "50px", md: "35px", xs: "30px" },
            }}
          >
            <Button
              sx={{ color: "#fff" }}
              variant="contained"
              endIcon={<AttachEmailIcon />}
            >
              ENVIAR
            </Button>
            <Badge color="warning" badgeContent={99}>
              <Button
                color="error"
                variant="contained"
                endIcon={<CancelScheduleSendIcon />}
              >
                NO ENVIADO
              </Button>
            </Badge>
          </Box>
        </Box>

        <Box sx={registros}>
          <Typography sx={{ fontWeight: "bold", mt: 1, mb: { xl: 5, md: 2 } }}>
            VOTANTES REGISTRADOS
          </Typography>
          <GeneralTable data={datos} columns={columns} idName={"id"} />
        </Box>
      </Box>
      <AddVotante
        isOpen={modalVotante}
        abrirCerrarModal={abrirCerrarModalAddVotante}
      ></AddVotante>
      <ModalAGranel
        isOpen={modalGranel}
        abrirCerrarModal={abrirCerrarModalGranel}
      ></ModalAGranel>
    </>
  );
};
