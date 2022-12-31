import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GeneralTable } from "../../module-preparacion/components/GeneralTable";

const columns = [
  // { field: "id", headerName: "ID", flex: 3 },
  {
    field: "nombreJornada",
    headerName: "Jornada",
    flex: 10,
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
          <Button variant="outlined" startIcon={<BallotIcon />}>
            Ver
          </Button>
          <Button variant="outlined" startIcon={<SettingsIcon />}>
            Configuración
          </Button>
          <IconButton sx={{ color: "#511079" }}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      );
    },
  },
];

const datos = [];
export const JornadasFormales = () => {
  let location = useLocation();
  console.log(location.pathname);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      JORNADAS ELECTORALES FORMALES
    </Link>,
    <Typography key="3" color="text.primary">
      Jornada GOB-2023 Formal
    </Typography>,
  ];
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack sx={{ width: "100%", mt: 1 }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          {/* <hr /> */}
        </Stack>

        <Typography sx={{ mt: 4 }} textAlign="center">
          LISTA JORNADAS
        </Typography>
        <Box sx={{ mt: 1, width: "100%", height: "100%" }}>
          <GeneralTable data={datos} columns={columns} idName={"idJornada"} />
        </Box>
      </Box>
    </>
  );
};
