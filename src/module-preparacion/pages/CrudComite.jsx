import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Tabla } from "../../ui/components/table/Tabla";
import { PlantillaCRUD } from "../layout/PlantillaCRUD";
import { useNavigate } from "react-router-dom";

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

export const CrudComite = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [datos, setDatos] = useState(data);
  const agregarBoleta = () => {
    navigate("/preparacion/comite/boleta");
  };

  const guardar = () => {
    alert("Se ha presionado guardar de comite");
  };

  const cancelar = () => {
    alert("Se ha presionado cancelar de comite");
  };

  const onEliminar = (event, rowData) => {
    const { candidato } = rowData;
    console.log("has presionado " + candidato);
    const newData = datos.filter((obj) => {
      if (obj.candidato !== candidato) return obj;
    });
    setDatos(newData);
  };

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
      onClick: (event, rowData) => onEliminar(event, rowData),
    },
  ];

  useEffect(() => {
    setDatos(data);
  }, []);

  return (
    <>
      <PlantillaCRUD guardar={guardar} cancelar={cancelar}>
        <Box
          sx={{
            mb: 5,
            display: "flex",
            height: "100px",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{
              ml: 5,
            }}
            variant="h6"
          >
            Registrar Boletas
          </Typography>
          <Button
            className={classes.boton}
            variant="contained"
            color="primary"
            style={styleButton}
            sx={{
              ml: 5,
              mt: 2,
              width: { sm: `270px`, xs: "150px" },
            }}
            onClick={agregarBoleta}
          >
            Agregar boleta
          </Button>
        </Box>
        <Tabla data={datos} actions={actions} columns={columns}></Tabla>
      </PlantillaCRUD>
    </>
  );
};
