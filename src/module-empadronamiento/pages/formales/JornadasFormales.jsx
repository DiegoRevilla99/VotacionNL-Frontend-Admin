import BallotIcon from "@mui/icons-material/Ballot";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GeneralTable } from "../../../module-preparacion/components/GeneralTable";
import { getJornadasFormales } from "../../../store/module-empadronamiento/formales/thunksFormales";
import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";
import { Searcher } from "../../components/Searcher";

export const JornadasFormales = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [buscador, setBuscador] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const { jornadasFormales, isLoadingFormales } = useSelector(
    (state) => state.empFormales
  );

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(jornadasFormales, event.target.value);
  };

  useEffect(() => {
    dispatch(getJornadasFormales());
    setDataSearch(jornadasFormales);
  }, []);

  useEffect(() => {
    if (jornadasFormales) {
      console.log("hay datos:", jornadasFormales);
      setDataSearch(jornadasFormales);
    } else {
      setDataSearch([]);
    }
  }, [jornadasFormales]);

  const searching = (data, buscador) => {
    const newData = data.filter((jornada) => {
      if (jornada.nombreJornada.toUpperCase().includes(buscador.toUpperCase()))
        return jornada;
    });

    setDataSearch(newData);
  };

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
              onClick={(e) => goTo(row.idJornada)}
              startIcon={<BallotIcon />}
              title={
                (row.status === "activo") | (row.status === "noiniciada")
                  ? "REALIZAR EMPADRONAMIENTO"
                  : row.status === "terminado" && "VISUALIZAR EMPADRONAMIENTO"
              }
            >
              {(row.status === "activo") | (row.status === "noiniciada")
                ? "REALIZAR"
                : row.status === "terminado" && "VISUALIZAR"}
            </Button>
          </Stack>
        );
      },
    },
  ];

  const goTo = (id) => {
    navigate(id);
  };

  const getRowClassName = (params) => {
    console.log(params);
    const estado = params.row.status;
    if (estado === "activo") {
      return "completado";
    }

    return "";
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
          mb: 1,
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
            mt: 2,
            p: 1,
            pl: 3,
            width: "95%",
            height: "calc(100% - 100px)",
          }}
        >
          <Searcher
            name="JORNADAS REGISTRADAS"
            buscador={buscador}
            handleSearch={handleSearch}
          />

          <GeneralTable
            loading={isLoadingFormales}
            data={dataSearch}
            columns={columns}
            idName={"idJornada"}
          />
        </Box>
      </Box>
    </>
  );
};
