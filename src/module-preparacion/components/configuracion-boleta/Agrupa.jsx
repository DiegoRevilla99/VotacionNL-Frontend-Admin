import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { PlantillaHeader } from "../../layout/PlantillaHeader";
import { Coalicion } from "./Coalicion";
import { BoxPartido } from "./BoxPartido";
import { AddCoalicion } from "./AddCoalicion";

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

export const Agrupa = ({ tipo = 1, info = {} }) => {
  const { coaliciones = [], asociaciones } = info;
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
            sx={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: "15px" }}
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
                {coaliciones.map((coalicion) => (
                  <Coalicion
                    key={coalicion.claveCoalicion}
                    info={coalicion}
                  ></Coalicion>
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>No hay coaliciones</Box>
        )
      ) : asociaciones ? (
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
              {partidos.map((coalicion) => (
                <Coalicion
                  name={coalicion.name}
                  key={coalicion.name}
                  partidos={coalicion.partidos}
                ></Coalicion>
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
