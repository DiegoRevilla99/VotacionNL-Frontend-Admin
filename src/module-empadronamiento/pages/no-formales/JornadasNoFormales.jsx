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
import { GeneralTable } from "../../../module-preparacion/components/GeneralTable";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";

const datos = [
  {
    id: "GO-OR-20-OAX-2025",
    nombreJornada: "JORNADA PARA 2025",
  },
  {
    id: "GO-OR-20-OAX-2027",
    nombreJornada: "JORNADA PARA 2027",
  },
];
export const JornadasNoFormales = () => {
  let location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    {
      field: "nombreJornada",
      headerName: "Jornada",
      flex: 5,
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
    navigate("GO-OR-20-OAX-2025");
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
          mt: 2,
        }}
      >
        <BreadCrumbsCustom currentRoute="JORNADAS NO FORMALES" />
        {/* <Typography sx={{ mt: 4 }} textAlign="center">
          LISTA JORNADAS
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            boxShadow: 1,
            borderRadius: "20px",
            mt: 0,

            width: "95%",
            height: "calc(100% - 80px)",
          }}
        >
          <GeneralTable data={datos} columns={columns} idName={"id"} />
        </Box>
      </Box>
    </>
  );
};
