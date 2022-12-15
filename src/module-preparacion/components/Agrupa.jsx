import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { PlantillaHeader } from "../layout/PlantillaHeader";
import { Coalicion } from "../layout/Coalicion";
import { BoxPartido } from "./BoxPartido";
import { AddCoalicion } from "./addCoalicion";
const useStyles = makeStyles({
  hr: {
    height: "1px",
    color: "rgb(210, 210, 210)",
  },
  boton: {
    boxShadow: 1,
    color: "white",
    height: 42,
  },
});
const styleButton = {
  borderRadius: 50,
};

// 2=ASOCIACION    1=COALICION

export const Agrupa = ({ tipo = 1 }) => {
  const tipoAgrupacion = tipo == 1 ? "COALICIÓN" : "ASOCIACIÓN";
  const classes = useStyles();
  const [modalCoalicion, setModalCoalicion] = useState(false);
  const abrirCerrarModalCoalicion = () => {
    setModalCoalicion(!modalCoalicion);
  };

  const guardar = () => {
    navigate("/preparacion/comite");
  };

  const cancelar = () => {
    navigate("/preparacion/comite");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Button
          className={classes.boton}
          variant="contained"
          style={styleButton}
          sx={{
            width: { sm: `270px`, xs: "150px" },
            backgroundColor: "#511079",
            color: "#fff",
          }}
          onClick={abrirCerrarModalCoalicion}
        >
          Agregar {tipoAgrupacion}
        </Button>
      </Box>
      <Box sx={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: "15px" }}>
        <Box
          sx={{
            // boxShadow: 1,
            width: "100%",
            mt: 1,
            p: 1,
            // border: "1px solid rgba(0,0,0,0.3)",
            borderRadius: "15px",
            // background: "#F1F1F1",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              p: 1,
            }}
          >
            <Coalicion name="Alianza">
              <BoxPartido name="Kevin Chavez Sanchez"></BoxPartido>
              <BoxPartido name="Jose Antonio Diego Revilla"></BoxPartido>
            </Coalicion>
            <Coalicion name="Cambiemos" colorb="#F8F6E8">
              <BoxPartido name="Laura Yessenia Sanchez Lopez"></BoxPartido>
              <BoxPartido></BoxPartido>
              <BoxPartido></BoxPartido>
              <BoxPartido></BoxPartido>
            </Coalicion>
            <Coalicion name="Coalición Cívica" colorb="#E8F8E8">
              <BoxPartido></BoxPartido>
              <BoxPartido></BoxPartido>
              <BoxPartido></BoxPartido>
            </Coalicion>
          </Box>
        </Box>
      </Box>

      <AddCoalicion
        isOpen={modalCoalicion}
        abrirCerrarModal={abrirCerrarModalCoalicion}
      ></AddCoalicion>
    </>
  );
};
