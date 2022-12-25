import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import React from "react";

export const PartidoSelect = ({
  candidato = "Nombre candidato",
  partido = "Nombre Partido",
  claveElectoral = "",
  img = "url",
  onSelect = () => {},
  valueRadio = "",
}) => {
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  const value = valueRadio === claveElectoral;

  return (
    <Box
      sx={{
        boxShadow: value ? 3 : 0,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "300px",
        height: "80px",
        m: 1,
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "8px",
        background: value ? "#E7C0F9" : "#FFF",
        transition: "boxShadow,background 0.4s ease-in-out",
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
      <Radio
        checked={valueRadio === claveElectoral}
        onChange={handleChange}
        value={claveElectoral}
        name="radio-buttons"
        inputProps={{ "aria-label": "A" }}
      />
    </Box>
  );
};
