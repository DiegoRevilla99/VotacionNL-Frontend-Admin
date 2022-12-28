import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

export const CandidatoCheck = ({
  candidato = "Nombre candidato",
  claveElectoral = "",
  img = "url",
  onSelect = () => {},
  candidatosSeleted = [],
}) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onSelect(claveElectoral);
  };

  useEffect(() => {
    let cs = null;
    cs = candidatosSeleted.find(
      (candidato) => candidato.claveElectoral === claveElectoral
    );
    console.log(claveElectoral);
    console.log(cs);
    if (cs) {
      setChecked(true);
    }
  }, []);

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
      </Box>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
};
