import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
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
import { Searcher } from "../../components/Searcher";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

export const Consultas = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const [buscador, setBuscador] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const { consultas, isLoadingConsultas } = useSelector(
    (state) => state.consultasSlice
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getConsultasConfig());
    setDataSearch(consultas);
  }, []);

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(consultas, event.target.value);
  };

  const searching = (data, buscador) => {
    const newData = data.filter((jornada) => {
      if (jornada.nombreJornada.toUpperCase().includes(buscador.toUpperCase()))
        return jornada;
    });

    setDataSearch(newData);
  };

  useEffect(() => {
    setDataSearch(consultas);
  }, [consultas]);

  const columns = [
    {
      field: "nombreJornada",
      headerName: "Jornada",
      flex: 4,
      sortable: true,
    },
    { field: "inicioEmpadronamiento", headerName: "Inicio", flex: 1 },
    { field: "finEmpadronamiento", headerName: "Fin", flex: 1 },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
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
                <HourglassTopIcon titleAccess="EMPADRONAMIENTO NO INICIADO" />
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
                <EventBusyIcon titleAccess="EMPADRONAMIENTO TERMINADO" />
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
                <EventAvailableIcon titleAccess="EMPADRONAMIENTO ACTIVO" />
              </Box>
            )}
          </Box>
        );
      },
    },

    {
      field: "empadronamiento",
      headerName: "Empadronamiento",
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return (
          <Stack spacing={2} direction="row">
            <Button
              disabled={row.status === "noiniciada"}
              color={row.status === "activo" ? "success" : "primary"}
              variant="outlined"
              sx={{ width: "120px" }}
              onClick={(e) => goTo(row.idJornada)}
              startIcon={
                row.status === "activo" ? (
                  <AppRegistrationIcon />
                ) : (
                  <BallotIcon />
                )
              }
              title={
                (row.status === "activo") | (row.status === "noiniciada")
                  ? "REALIZAR EMPADRONAMIENTO"
                  : row.status === "terminado" && "VISUALIZAR EMPADRONAMIENTO"
              }
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
        <Typography
          color={"primary"}
          sx={{ mt: 1, mb: 1, fontSize: "20px", fontWeight: "bold" }}
        >
          Paso 1: Elige la jornada a empadronar
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            boxShadow: 1,
            pl: 3,
            borderRadius: "20px",
            mt: 0,

            width: "95%",
            height: "calc(100% - 80px)",
          }}
        >
          <Searcher
            name="CONSULTAS REGISTRADAS"
            buscador={buscador}
            handleSearch={handleSearch}
          />

          <GeneralTable
            loading={isLoadingConsultas}
            data={dataSearch}
            columns={columns}
            idName={"idJornada"}
          />
        </Box>
      </Box>
    </>
  );
};
