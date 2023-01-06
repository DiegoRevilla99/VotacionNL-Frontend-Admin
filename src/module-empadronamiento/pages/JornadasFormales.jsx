import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GeneralTable } from "../../module-preparacion/components/GeneralTable";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { BreadCrumbsCustom } from "../components/BreadCrumbsCustom";

const datos = [
  {
    id: "JO-EL-GO-OR-20-OAX-2022",
    nombreJornada: "JORNADA ELECTORAL GOBERNADOR ORDINARIA 2022",
    modalidad: "REPRESENTANTE",
  },
  {
    id: "GO-OR-20-OAX-2023",
    nombreJornada: "JORNADA ELECTORAL GOBERNADOR ORDINARIA 2022",
    modalidad: "REPRESENTANTE",
  },
];
export const JornadasFormales = () => {
  let location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", flex: 2, sortable: true },
    { field: "modalidad", headerName: "Modalidad", flex: 2 },
    {
      field: "nombreJornada",
      headerName: "Jornada",
      flex: 5,
      sortable: true,
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
              onClick={goTo}
              startIcon={<BallotIcon />}
            >
              EMPADRONAMIENTO
            </Button>
          </Stack>
        );
      },
    },
  ];
  const goTo = () => {
    navigate("JO-EL-GO-OR-20-OAX-2022");
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <BreadCrumbsCustom currentRoute="JORNADAS ELECTORALES" />
        {/* <Typography sx={{ mt: 4 }} textAlign="center">
          LISTA JORNADAS
        </Typography> */}
        <Box sx={{ width: "100%", height: "100%" }}>
          <GeneralTable data={datos} columns={columns} idName={"id"} />
        </Box>
      </Box>
    </>
  );
};
