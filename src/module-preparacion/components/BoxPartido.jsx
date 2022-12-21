import { Box, Typography } from "@mui/material";
import React from "react";

export const BoxPartido = ({
  candidato = "Nombre candidato",
  partido = "Nombre Partido",
  img = "url",
}) => {
  return (
    <Box
      sx={{
        boxShadow: 1,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "300px",
        height: "80px",
        m: 1,
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "8px",
        // background: "#F1F1F1",
      }}
    >
      <Box
        sx={{
          borderRadius: "15px",
          width: "50px",
          height: "50px",
          background: "#000",
          ml: 1,
        }}
      ></Box>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
          {candidato}
        </Typography>
        <Typography sx={{ fontSize: "12px", fontStyle: "oblique" }}>
          {partido}
        </Typography>
      </Box>
    </Box>
  );
};