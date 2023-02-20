import {
  Box, Typography
} from "@mui/material";
import React from "react";

export const BoxCandidatoFormal = ({
  candidato = "Nombre candidato",
  img = "url",
}) => {
  // console.log(img);
  return (
    <Box
    sx={{
      boxShadow: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "250px",
      height: "85px",
      m: 1,
      border: "1px solid rgba(0,0,0,0.3)",
      borderRadius: "8px",
      // background: "#F1F1F1",
      marginTop: "10px",
      marginLeft: "10px",
      padding: "10px",
    }}
    >
      <a href={img}><img width="100%" height="70px" src={img} alt="Logo coalición"/></a>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
          {candidato}
        </Typography>
      </Box>
    </Box>
  );
};
