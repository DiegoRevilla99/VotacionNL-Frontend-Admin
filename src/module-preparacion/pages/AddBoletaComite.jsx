import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { PlantillaCRUD } from "../layout/PlantillaCRUD";
import { Stack } from "@mui/system";

const useStyles = makeStyles({
  formulario: {
    display: "flex",
    width: "70%",
    height: "60%",
    flexDirection: "column",
    overflowY: "scroll",
  },

  planillas: {
    width: "70%",
    height: "35%",
    overflowY: "scroll",
    background: "#D9D9D9",
  },
});

export const AddBoletaComite = () => {
  const styles = useStyles();
  return (
    <>
      <PlantillaCRUD>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <div className={styles.formulario}>
            <form action="">
              <Typography>Encabezado de la boleta</Typography>
              <TextField
                sx={{ width: "100%" }}
                id="filled-basic"
                label=""
                variant="filled"
              />
              <Typography>Nombre de la carrera</Typography>
              <TextField
                sx={{ width: "100%" }}
                id="filled-basic"
                label=""
                variant="filled"
              />
              <Typography>Nombre de la carrera</Typography>
              <TextField
                sx={{ width: "100%" }}
                id="filled-basic"
                label=""
                variant="filled"
              />
              <Typography>Nombre de la carrera</Typography>
              <TextField
                sx={{ width: "100%" }}
                id="filled-basic"
                label=""
                variant="filled"
              />
            </form>
            <Button variant="contained" color="primary">
              Agregar planilla
            </Button>
            <Button variant="contained" color="primary">
              Agregar representante independiente
            </Button>
          </div>
          <div className={styles.planillas}>
            <Typography>PLANILLAS O REPRESENTANTES REGISTRADOS</Typography>
          </div>
        </Stack>
      </PlantillaCRUD>
    </>
  );
};
