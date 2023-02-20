import { Box, Button, Stack, Typography } from "@mui/material";
import React, { memo, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { PlantillaHeader } from "../../layout/PlantillaHeader";
import { Coalicion } from "./Coalicion";
import { BoxPartido } from "./BoxPartido";
import { AddCoalicion } from "./AddCoalicion";
import { Asociacion } from "./Asociacion";

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

export const Agrupa = ({ tipo = 1, info = {}, actualizar }) => {
  const { coaliciones = [], asociaciones = [] } = info;
  const tipoAgrupacion = tipo == 1 ? "COALICIÓN" : "ASOCIACIÓN";

  const guardar = () => {
    navigate("/preparacion/comite");
  };

  const cancelar = () => {
    navigate("/preparacion/comite");
  };

  return (
    <>
      {tipo == 1 ? (
        coaliciones.length > 0 ? (
          <Box
            sx={{
              width: "100%",
              boxShadow: 1,
              display: "flex",
              border: "2px solid rgba(0,0,0,0.5)",
              borderRadius: "10px",
              background: "#F8F8F8",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "95%",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                mb: 5,
              }}
            >
              {coaliciones.map((coalicion, i) => (
                <Coalicion
                  actualizar={actualizar}
                  key={i}
                  info={coalicion}
                ></Coalicion>
              ))}
            </Box>
          </Box>
        ) : (
          <Typography mt={5} textAlign={"center"}>
            Sin coaliciones
          </Typography>
        )
      ) : asociaciones ? (
        <Box
          sx={{
            width: "100%",
            boxShadow: 1,
            border: "2px solid rgba(0,0,0,0.5)",
            borderRadius: "10px",
            background: "#F8F8F8",
          }}
        >
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
              {asociaciones.map((asociacion) => (
                <Asociacion
                  key={asociacion.idAsociacion}
                  info={asociacion}
                ></Asociacion>
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>No hay asociaciones</Box>
      )}
    </>
  );
};
