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
import { getJornadasNoFormales } from "../../../store/module-empadronamiento/no-formales/thunksNoFormales";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Searcher } from "../../components/Searcher";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

export const JornadasNoFormales = () => {
  let location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [buscador, setBuscador] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const { jornadasNoFormales, isLoadingJornadasNoFormales } = useSelector(
    (state) => state.noFormalesSlice
  );

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(jornadasNoFormales, event.target.value);
  };

  useEffect(() => {
    dispatch(getJornadasNoFormales());
    setDataSearch(jornadasNoFormales);
  }, []);

  useEffect(() => {
    setDataSearch(jornadasNoFormales);
  }, [jornadasNoFormales]);

  const searching = (data, buscador) => {
    const newData = data.filter((jornada) => {
      if (jornada.nombreEleccion.toUpperCase().includes(buscador.toUpperCase()))
        return jornada;
    });

    setDataSearch(newData);
  };
  const columns = [
    {
      field: "nombreEleccion",
      headerName: "Elección",
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
      flex: 3,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return (
          <Stack spacing={2} direction="row">
            <Button
              disabled={row.status === "noiniciada"}
              variant="outlined"
              sx={{ width: "120px" }}
              onClick={(e) => goTo(row.idEleccion)}
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
          currentRoute="ELECCIONES POPULARES"
        />

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
            borderRadius: "20px",
            mt: 0,
            pl: 3,
            width: "95%",
            height: "calc(100% - 80px)",
          }}
        >
          <Searcher
            name="JORNADAS REGISTRADAS"
            buscador={buscador}
            handleSearch={handleSearch}
          />

          <GeneralTable
            loading={isLoadingJornadasNoFormales}
            data={dataSearch}
            columns={columns}
            idName={"idEleccion"}
          />
        </Box>
      </Box>
    </>
  );
};
