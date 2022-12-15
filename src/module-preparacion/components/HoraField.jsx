import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const HoraField = ({ titulo = "Titulo" }) => {
  return (
    <>
      <fieldset
        style={{
          borderRadius: 5,
          borderWidth: "1px",
          borderColor: "#D7D6D6",
          mr: 2,
        }}
      >
        <legend>{titulo}</legend>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: { sm: "300px", xs: "210px" },
            flexDirection: "column",
            p: 1,
          }}
        >
          <Box sx={{ width: "100%", display: "flex" }}>
            <TextField
              id="outlined-number"
              label="Horas"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography sx={{ m: 1 }}>:</Typography>
            <TextField
              id="outlined-number"
              label="Minutos"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Box>
      </fieldset>
    </>
  );
};
