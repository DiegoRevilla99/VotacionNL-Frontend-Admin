import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { memo, useEffect } from "react";
import coalicionPhoto from "../../img/coalicion.png";

export const BoxPartido = memo(
  ({ partido = "Nombre Partido", img = "url" }) => {
    return (
      <Box
        sx={{
          boxShadow: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: {md:"200px",xs:"100px"},
          height: "auto",
          m: 1,
          border: "1px solid rgba(0,0,0,0.3)",
          borderRadius: "8px",
          background: "#323232",
          color:"#fff"
        }}
      >
        {/* <img
          style={{ width: "100px", height: "100%", boxShadow: 1 }}
          alt="Logo"
          src={coalicionPhoto}
        /> */}
        <Box sx={{ p: 2 }}>
          <Typography textAlign={"center"} sx={{ fontSize: {md:"15px",xs:"10px"}, fontWeight: "bold" }}>
            {partido}
          </Typography>
        </Box>
      </Box>
    );
  }
);
