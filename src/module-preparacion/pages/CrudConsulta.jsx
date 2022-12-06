import React, { useEffect, useState } from "react";
import { Tabla } from "../../ui/components/table/Tabla";
import { PlantillaCRUD } from "../layout/PlantillaCRUD";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { columns, data } from "../helpers/DataBoletas";

const useStyles = makeStyles({
  boton: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 42,
    background: "#ffffff",
  },
});
const styleButton = {
  borderRadius: 50,
};

export const CrudConsulta = () => {
  const classes = useStyles();
  const agregarPapeleta = () => {};

  const actions = [
    {
      icon: "edit",
      title: "Editar",
      sx: {},
      onClick: (event, rowData) =>
        alert("Se ha editado a " + rowData.candidato),
    },
    {
      icon: "delete",
      title: "Eliminar",
      sx: { ml: 1, mr: 1, backgroundColor: "error.main" },
      onClick: (event, rowData) =>
        alert("Se ha eliminado a " + rowData.candidato),
    },
  ];

  const guardar = () => {
    alert("Se ha presionado guardar de consulta");
  };

  const cancelar = () => {
    alert("Se ha presionado cancelar de consulta");
  };

  return (
    <>
      <PlantillaCRUD guardar={guardar} cancelar={cancelar}>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 4,
              display: "flex",
              height: "60px",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">Registrar papeletas</Typography>
            <Button
              className={classes.boton}
              variant="contained"
              color="primary"
              style={styleButton}
              sx={{
                mt: 2,
                width: { sm: `270px`, xs: "150px" },
              }}
              onClick={agregarPapeleta}
            >
              Agregar papeleta
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            height: "calc(100% - 90px)",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Tabla
            titulo={"BOLETAS"}
            data={data}
            actions={actions}
            columns={columns}
          ></Tabla>
        </Box>
      </PlantillaCRUD>
    </>
  );
};
