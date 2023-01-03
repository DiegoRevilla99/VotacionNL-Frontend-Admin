import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Collapse from "@mui/material/Collapse";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ReportIcon from "@mui/icons-material/Report";
import SendIcon from "@mui/icons-material/Send";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { GeneralTable } from "../../module-preparacion/components/GeneralTable";
const datos = [
  {
    id: "1",
    informacion: "Laura Yessenia Sanchez Lopez",
  },
  {
    id: "2",
    informacion: "Jose Antonio Diego Revilla",
  },
  {
    id: "3",
    informacion: "Kevin Edilberto Chavez Sanchez",
  },
];
const columns = [
  { field: "id", headerName: "ID", flex: 2 },
  {
    field: "informacion",
    headerName: "Información",
    flex: 5,
  },
  {
    field: "Acciones",
    headerName: "Acciones",
    flex: 5,
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
  width: "80%",
  justifyContent: "space-around",
  pl: 5,
  pr: 3,
};
const registros = {
  display: "flex",
  width: "100%",
  mt: 3,
  p: 3,
  height: "100%",
};

export const RegisterVoters = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={opciones}>
          {/* <Button variant="contained" endIcon={<DeleteIcon />}>
            REGISTRAR VOTANTES
          </Button> */}
          <Box sx={{ width: "40%" }}>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <FileUploadIcon />
                </ListItemIcon>
                <ListItemText primary="REGISTRAR VOTANTES" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <CreateNewFolderIcon />
                    </ListItemIcon>
                    <ListItemText primary="A granel" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
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
              width: "60%",
              height: "50px",
            }}
          >
            <Button color="warning" variant="contained" endIcon={<SendIcon />}>
              ENLACE
            </Button>
            <Button color="error" variant="contained" endIcon={<ReportIcon />}>
              NO ENVIADO
            </Button>
          </Box>
        </Box>
        <Box sx={registros}>
          <GeneralTable data={datos} columns={columns} idName={"id"} />
        </Box>
      </Box>
    </>
  );
};
