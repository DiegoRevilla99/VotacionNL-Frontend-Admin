import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Agrupa } from "../../components/Agrupa";
import { PlantillaHeader } from "../../layout/PlantillaHeader";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  hr: {
    height: "1px",
    color: "rgb(210, 210, 210)",
  },
  boton: {
    boxShadow: 1,
    color: "white",
    height: 42,
  },
});
const styleButton = {
  borderRadius: 50,
};

const botones = {
  display: "flex",
  justifyContent: "end",
  alignContent: "space-around",
  width: "95%",
  height: "50px",
  pt: 2,
};

export const ConfigBoleta = () => {
  const styles = useStyles();
  return (
    <>
      <PlantillaHeader titulo="CONFIGURACIÓN BOLETA">
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "100%",
            background: "#ffffff",
            p: "2rem",
            borderRadius: "20px",
            boxShadow: 3,
          }}
        >
          <Box></Box>
          <Agrupa tipo={1}></Agrupa>
          <Box sx={botones}>
            <Box
              sx={{
                width: "500px",
                display: "flex",

                justifyContent: "space-around",
              }}
            >
              <Button
                type="submit"
                className={styles.boton}
                variant="contained"
                color="primary"
                style={styleButton}
                sx={{
                  width: { sm: `150px`, xs: "150px" },
                }}
              >
                Guardar
              </Button>

              <Button
                className={styles.boton}
                variant="contained"
                style={styleButton}
                sx={{
                  width: { sm: `150px`, xs: "150px" },
                  backgroundColor: "error.main",
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Stack>
      </PlantillaHeader>
    </>
  );
};
