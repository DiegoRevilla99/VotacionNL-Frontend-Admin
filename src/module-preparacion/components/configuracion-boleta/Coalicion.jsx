import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import React from "react";
import { BoxPartido } from "./BoxPartido";

import "../../../styles/generalContainer.css";

export const Coalicion = ({
  color = "#511079",
  colorb = "#F0DBF9",
  info = {},
}) => {
  const { claveCoalicion, nombre, partidos } = info;

  const editar = () => {
    alert("estas editando la coalicion con clave: " + claveCoalicion);
  };

  const eliminar = () => {
    alert("estas eliminando la coalicion con clave: " + claveCoalicion);
  };

  const styles = {
    marco: {
      "&:hover": {
        background: "#EB240C",
        borderColor: "#EB240C",
      },
    },
  };

  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <fieldset
        className="agrupacion"
        style={{
          display: "flex",
          boxShadow: 2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: colorb,
          width: "100%",

          mb: 5,
          borderRadius: "8px",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <legend style={{ textAlign: "right" }}>
          <IconButton aria-label="edit" onClick={editar}>
            <EditIcon fontSize="large" color="primary" />
          </IconButton>
          <IconButton aria-label="delete" onClick={eliminar}>
            <HighlightOffSharpIcon fontSize="large" color="primary" />
          </IconButton>
        </legend>
        <Typography sx={{ fontWeight: "bold" }}>{nombre}</Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {partidos.map(({ candidato, partido }) => (
            <BoxPartido
              key={candidato}
              candidato={candidato}
              partido={partido}
            ></BoxPartido>
          ))}
        </Box>
      </fieldset>
    </Box>
  );
};
