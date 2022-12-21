import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import React from "react";
import { BoxPartido } from "./BoxPartido";
import { BoxAsociacion } from "./BoxAsociacion";

export const Asociacion = ({
  name = "Nombre asociacion",
  color = "#511079",
  colorb = "#F3E8F8",
  asociaciones = [],
  children,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <fieldset
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 1,
          // borderColor: color,
          background: colorb,
          width: "100%",
          p: 1,
          mb: 5,
          borderRadius: "8px",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <legend style={{ textAlign: "right" }}>
          <IconButton aria-label="delete">
            <EditIcon fontSize="large" color="primary" />
          </IconButton>
          <IconButton aria-label="delete">
            <HighlightOffSharpIcon fontSize="large" color="primary" />
          </IconButton>
        </legend>
        <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {asociaciones.map((partido) => (
            <BoxAsociacion></BoxAsociacion>
          ))}
        </Box>
      </fieldset>
    </Box>
  );
};
