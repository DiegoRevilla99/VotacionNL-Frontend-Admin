import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GeneralTable } from "../../../module-preparacion/components/GeneralTable";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";
import { useDispatch, useSelector } from "react-redux";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { getJornadasFormales } from "../../../store/module-empadronamiento/formales/thunksFormales";
import { getConsultasConfig } from "../../../store/module-empadronamiento/consultas/thunksConsultas";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
const datos = [
  {
    id: "CONSULTA-OAX-2025",
    nombreConsulta: "CONSULTA PARA 2025",
  },
  {
    id: "CONSULTA-OAX-2027",
    nombreConsulta: "CONSULTA PARA 2027",
  },
];
export const Consultas = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { consultas, isLoadingConsultas } = useSelector(
    (state) => state.consultasSlice
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getConsultasConfig());
  }, []);

  const columns = [
    {
      field: "nombreJornada",
      headerName: "Jornada",
      flex: 4,
      sortable: true,
    },
    { field: "inicioEmpadronamiento", headerName: "Inicio", flex: 2 },
    { field: "finEmpadronamiento", headerName: "Fin", flex: 2 },
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
        return (
          <Stack spacing={2} direction="row">
            <Button
              disabled={row.status === "noiniciada"}
              variant="outlined"
              onClick={(e) => goTo(row.idJornada)}
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

  const goTo = (id) => {
    navigate(id);
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
          currentRoute="CONSULTAS CIUDADANAS"
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
            mt: 0,

            width: "95%",
            height: "calc(100% - 80px)",
          }}
        >
          <GeneralTable
            loading={isLoadingConsultas}
            data={consultas}
            columns={columns}
            idName={"idJornada"}
          />
        </Box>
      </Box>
    </>
  );
};
