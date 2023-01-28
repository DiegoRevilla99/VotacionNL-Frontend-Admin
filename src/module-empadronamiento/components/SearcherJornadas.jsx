import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

export const SearcherJornadas = ({
  name = "",
  buscador = "",
  handleSearch = () => {},
}) => {
  return (
    <Box
      sx={{
        width: "90%",
        mt: 2,
        mb: 3,
        height: "70px",
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        alignItems: "center",
        alignContent: "center",
        justifyItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        color="primary"
        sx={{
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          width: "calc(100% - 250px)",
          height: "100%",
          fontSize: { lg: "22px", sm: "15px" },
        }}
      >
        {name}
      </Typography>
      <TextField
        size="small"
        value={buscador}
        onChange={handleSearch}
        sx={{
          width: "250px",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <PersonSearchIcon />
            </InputAdornment>
          ),
        }}
        label="Buscador"
        variant="outlined"
        name="nombreVotante"
        id="nombreVotante"
      ></TextField>
    </Box>
  );
};
