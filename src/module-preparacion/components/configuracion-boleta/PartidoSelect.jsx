import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import candidatoPhoto from "../../img/candidato.png";
import React, { memo, useEffect } from "react";

export const PartidoSelect = memo(
  ({
    candidato = "Nombre candidato",
    candidatoid = "",
    partidos = [],
    claveElectoral = "",
    img = "url",
    onSelect = () => {},
    valueRadio = "",
  }) => {
    const handleChange = (event) => {
      onSelect({ claveElectoral, partidos,id:candidatoid });
    };

    const value = valueRadio === claveElectoral;

    return (
      <Box
        sx={{
          boxShadow: value ? "2px 2px 0px 1px rgba(0, 0, 0, 0.3)" : 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          width: "300px",
          height: "auto",
          m: 1,
          border: "2px solid rgba(0,0,0,0.1)",
          borderRadius: "8px",
          background: value ? "#E7C0F9" : "#F6F1FE",
          transition: "boxShadow,background 0.4s ease-in-out",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "60px",
            background: "#F8F6FC",
            boxShadow: 2,
            borderRadius: "5px",
          }}
        >
          <img
            style={{ width: "60px", height: "100%" }}
            alt="Logo"
            src={candidatoPhoto}
          />
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            CANDIDATO
          </Typography>
          <Radio
            checked={valueRadio === claveElectoral}
            onChange={handleChange}
            value={claveElectoral}
            name="radio-buttons"
            inputProps={{ "aria-label": "A" }}
          />
        </Box>
        <Box
          sx={{
            mt: 1,
            p: 1,
            display: "flex",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Typography
            textAlign="center"
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "Segoe UI",
            }}
          >
            {candidato}
          </Typography>
          <Typography sx={{ mt: 2, fontSize: "14px" }}>PARTIDOS:</Typography>
          <ul>
            {partidos.map((partido) => (
              <li key={partido.nombre}>
                <Typography sx={{ fontSize: "12px", fontStyle: "oblique" }}>
                  {partido.nombre}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    );
  }
);
