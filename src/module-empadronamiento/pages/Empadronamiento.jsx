import { Box } from "@mui/system";
import React from "react";

import { useParams } from "react-router-dom";
import { BreadCrumbsCustom } from "../components/BreadCrumbsCustom";
import { RegisterVoters } from "../components/RegisterVoters";
const datos = [
  {
    id: "1",
    informacion: "Laura Yessenia Sanchez Lopez",
  },
  {
    id: "2",
    informacion: "Jose Antonio Diego Revilla",
    modalidad: "REPRESENTANTE",
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
    field: "modalida",
    headerName: "Modalidad",
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

export const Empadronamiento = () => {
  const { id } = useParams();
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
        <BreadCrumbsCustom
          routes={[
            {
              name: "JORANDAS FORMALES",
              url: "/empadronamiento/inicio/formal",
            },
          ]}
          currentRoute={"JORNADA ELECTORAL GOBERNADOR ORDINARIA 2022"}
        ></BreadCrumbsCustom>

        <Box
          sx={{ mt: { lg: 0, md: 0, xs: 0 }, width: "100%", height: "100%" }}
        >
          <RegisterVoters></RegisterVoters>
        </Box>
      </Box>
    </>
  );
};
