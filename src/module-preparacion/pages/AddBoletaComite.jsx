import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { PlantillaCRUD } from "../layout/PlantillaCRUD";
import { Stack } from "@mui/system";
import { AddPlanillaComite } from "../components/AddPlanillaComite";

const useStyles = makeStyles({
  formulario: {
    display: "flex",
    width: "95%",
    flexDirection: "column",
    height: "auto",
  },

  planillas: {
    display: "flex",
    width: "95%",
    height: "200px",
    background: "#D9D9D9",
  },
});

export const AddBoletaComite = () => {
  const styles = useStyles();

  const [modal, setModal] = useState(false);

  const abrirCerrarModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <PlantillaCRUD>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "100%",
            background: "#ffffff",
            pb: "2rem",
            pt: "2rem",
            overflowY: "scroll",
            borderRadius: "20px",
            boxShadow: 3,
          }}
        >
          <div className={styles.formulario}>
            <Typography
              align="center"
              variant="h5"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              BOLETA
            </Typography>
            <form action="">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="ENCABEZADO DE LA BOLETA"
                sx={{ width: "100%" }}
              />

              <TextField
                id="outlined-basic"
                variant="outlined"
                label="NOMBRE DE LA CARRERA"
                sx={{ width: "100%", mt: 2 }}
              />

              <Typography sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
                DATOS GEOELECTORALES
              </Typography>

              <TextField
                id="outlined-basic"
                label="ENTIDAD FEDERATIVA"
                variant="outlined"
                sx={{ width: "100%", mt: 2 }}
              />

              <TextField
                id="outlined-basic"
                variant="outlined"
                label="MUNICIPIO O DELEGACIÓN"
                sx={{ width: "100%", mt: 2 }}
              />
            </form>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "55%",
                mt: 2,
              }}
            >
              <Button
                style={{ borderRadius: 15 }}
                variant="contained"
                color="primary"
                onClick={abrirCerrarModal}
              >
                Agregar planilla
              </Button>
              <Button
                style={{ borderRadius: 15 }}
                variant="contained"
                color="primary"
              >
                Agregar representante independiente
              </Button>
            </Box>
          </div>

          <Box
            sx={{
              width: "95%",
              height: "300px",
              mt: 5,
              p: 2,
              border: "1px solid rgba(0,0,0,0.2)",
              borderRadius: "15px",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              PLANILLAS O REPRESENTANTES REGISTRADOS
            </Typography>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "200px",
                overflowY: "scroll",
                flexDirection: "column",
                p: 1,
              }}
            >
              <Typography>asdasdasdasd</Typography>
              <Typography>asdasdasdas</Typography>
              <Typography>asdas</Typography>
              <Typography>asdasdasdasd</Typography>
              <Typography>asdasdasdas</Typography>
              <Typography>asdas</Typography>
              <Typography>MUNICasdasdaN</Typography>
              <Typography>MUNICIPIO O DELEGACIÓN</Typography>
              <Typography>MUNICIPIO O DELEGACIÓN</Typography>
              <Typography>MUNICIPIO O DELEGACIÓN</Typography>
              <Typography>MUNICIPIO O DELEGACIÓN</Typography>
              <Typography>MUNICIPIO O DELEGACIÓN</Typography>
            </Box>
          </Box>
        </Stack>
        <AddPlanillaComite
          isOpen={modal}
          abrirCerrarModal={abrirCerrarModal}
        ></AddPlanillaComite>
      </PlantillaCRUD>
    </>
  );
};
