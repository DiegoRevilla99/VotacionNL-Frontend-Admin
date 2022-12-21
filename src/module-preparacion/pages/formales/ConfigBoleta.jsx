import { Button, CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Agrupa } from "../../components/Agrupa";
import { PlantillaHeader } from "../../layout/PlantillaHeader";
import { makeStyles } from "@mui/styles";
import { AddCoalicion } from "../../components/AddCoalicion";
import { useParams } from "react-router-dom";
import { getCoaliciones } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import { useDispatch, useSelector } from "react-redux";

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
  const { id } = useParams();
  const dispatch = useDispatch();
  const [modalCoalicion, setModalCoalicion] = useState(false);
  const { coaliciones = [], isLoadingCoaliciones } = useSelector(
    (state) => state.configBoleta
  );
  const abrirCerrarModalCoalicion = () => {
    console.log("presionando ceerar o abrir modal");
    setModalCoalicion(!modalCoalicion);
  };

  useEffect(() => {
    dispatch(getCoaliciones());
  }, []);

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
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Button
              className={styles.boton}
              variant="contained"
              style={styleButton}
              sx={{
                width: { sm: `270px`, xs: "150px" },
                backgroundColor: "#511079",
                color: "#fff",
              }}
              onClick={abrirCerrarModalCoalicion}
            >
              Agregar coalición
            </Button>
          </Box>
          {isLoadingCoaliciones ? (
            <Stack
              justifyContent="center"
              sx={{ color: "grey.500" }}
              spacing={2}
              direction="row"
            >
              <CircularProgress color="primary" />
            </Stack>
          ) : (
            <Agrupa info={{ coaliciones: coaliciones }} tipo={1}></Agrupa>
          )}

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
      <AddCoalicion
        isOpen={modalCoalicion}
        abrirCerrarModal={abrirCerrarModalCoalicion}
        idBoleta={id}
      ></AddCoalicion>
    </>
  );
};
