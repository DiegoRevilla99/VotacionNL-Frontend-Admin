import { Grid, TextField } from "@mui/material";
import React from "react";

export const FielTextCustom = React.memo(
  ({ name, label, value, handleChange, touched, error, type, min = 0 }) => {
    console.log("ME RENDERIZO HIJO");
    return (
      // <Grid item xs={12}>
      <TextField
        type={type}
        name={name}
        fullWidth
        size="small"
        id={name}
        label={label}
        variant="filled"
        onChange={handleChange}
        value={value}
        error={touched && Boolean(error)}
        helperText={touched && error}
        inputProps={{ min: min }}
      />
      // </Grid>
    );
  }
);
