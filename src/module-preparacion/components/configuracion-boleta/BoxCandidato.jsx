import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import coalicionPhoto from "../../img/coalicion.png";

export const BoxCandidato = ({
  candidato = "Nombre candidato",
  img = "url",
}) => {
  return (
    <Box
      sx={{
        boxShadow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "250px",
        height: "80px",
        m: 1,
        border: "1px solid rgba(0,0,0,0.3)",
        borderRadius: "8px",
        // background: "#F1F1F1",
      }}
    >
      <img
        style={{ width: "100px", height: "100%", boxShadow: 1 }}
        alt="Logo"
        src={coalicionPhoto}
      />
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
          {candidato}
        </Typography>
      </Box>
    </Box>
  );
};
