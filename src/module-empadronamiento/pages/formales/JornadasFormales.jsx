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
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const datos = [
  {
    id: "JO-EL-GO-OR-20-OAX-2023",
    status: "terminado",
    inicio: "01/01/2023",
    fin: "06/01/2023",
    nombreJornada: "JORNADA ELECTORAL GOBERNADOR ORDINARIA 2023",
  },
  {
    id: "GO-OR-20-OAX-2023",
    status: "activo",
    inicio: "09/01/2023",
    fin: "20/01/2023",
    nombreJornada: "JORNADA ELECTORAL GOBERNADOR ORDINARIA 2023",
  },
  {
    id: "G-OR-20-OAX-2023",
    status: "noiniciada",
    inicio: "01/02/2023",
    fin: "10/02/2023",
    nombreJornada: "JORNADA ELECTORAL GOBERNADOR ORDINARIA 2023",
  },
];
export const JornadasFormales = () => {
  let location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  const columns = [
    // { field: "id", headerName: "ID", flex: 2, sortable: true },
    {
      field: "nombreJornada",
      headerName: "Jornada",
      flex: 4,
      sortable: true,
    },
    { field: "inicio", headerName: "Inicio", flex: 2 },
    { field: "fin", headerName: "Fin", flex: 2 },
    {
      field: "status",
      headerName: "Estado",
      flex: 2,
      renderCell: ({ row }) => {
        return (
          <Box sx={{}}>
            {row.status === "noiniciada" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  color: "#D37A09",
                }}
              >
                <HourglassTopIcon />
              </Box>
            )}
            {row.status === "terminado" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "#D30909",
                }}
              >
                <EventBusyIcon />
              </Box>
            )}
            {row.status === "activo" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "#099D18",
                }}
              >
                <EventAvailableIcon />
              </Box>
            )}
          </Box>
        );
      },
    },

    {
      field: "empadronamiento",
      headerName: "Empadronamiento",
      flex: 3,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        console.log(row);
        return (
          <Stack spacing={2} direction="row">
            <Button
              disabled={row.status === "noiniciada"}
              variant="outlined"
              onClick={goTo}
              startIcon={<BallotIcon />}
            >
              {(row.status === "activo") | (row.status === "noiniciada")
                ? "REALIZAR"
                : row.status === "terminado" && "VISUALIZAR "}
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
          mt: 2,
        }}
      >
        <BreadCrumbsCustom
          routes={[
            {
              name: "INICIO",
              url: "/empadronamiento/",
            },
          ]}
          currentRoute="JORNADAS ELECTORALES"
        />
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
            mt: 2,
            width: "95%",
            height: "calc(100% - 100px)",
          }}
        >
          <GeneralTable data={datos} columns={columns} idName={"id"} />
        </Box>
      </Box>
    </>
  );
};
