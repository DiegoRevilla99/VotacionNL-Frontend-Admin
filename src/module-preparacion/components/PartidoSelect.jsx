import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";

export const PartidoSelect = ({
  candidato = "Nombre candidato",
  partido = "Nombre Partido",
  claveElectoral = "",
  img = "url",
  onSelect = () => {},
  onNotSelect = () => {},
}) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      onSelect(claveElectoral);
    } else {
      onNotSelect(claveElectoral);
    }
  };

  return (
    <Box
      sx={{
        boxShadow: checked ? 3 : 0,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "300px",
        height: "80px",
        m: 1,
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "8px",
        background: checked ? "#E7C0F9" : "#FFF",
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
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
};
