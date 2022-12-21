import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { PlantillaHeader } from "../layout/PlantillaHeader";
import { Coalicion } from "../components/Coalicion";
import { BoxPartido } from "../components/BoxPartido";
import { AddCoalicion } from "../components/addCoalicion";
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

export const ConfiguracionBoleta = ({ tipo = "COALICIÓN" }) => {
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
      <PlantillaHeader titulo="CONFIGURACIÓN BOLETA">
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "100%",
            background: "#ffffff",
            p: "2rem",
            borderRadius: "20px",
            boxShadow: 3,
          }}
        >
          <Box></Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
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
              Agregar coalición
            </Button>
          </Box>

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
                p: 1,
              }}
            >
              <Coalicion name="Alianza">
                <BoxPartido name="Laura Yessenia Sanchez Lopez"></BoxPartido>
                <BoxPartido name="Kevin Chavez Sanchez"></BoxPartido>
                <BoxPartido name="Jose Antonio Diego Revilla"></BoxPartido>
                <BoxPartido></BoxPartido>
              </Coalicion>
              <Coalicion name="Cambiemos" colorb="#F8F6E8">
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
        </Stack>
      </PlantillaHeader>

      <AddCoalicion
        isOpen={modalCoalicion}
        abrirCerrarModal={abrirCerrarModalCoalicion}
      ></AddCoalicion>
    </>
  );
};
