import React from "react";
import { bottomNavigationClasses, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { PlantillaRegistro } from "./PlantillaRegistro";
import { useNavigate } from "react-router-dom";
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

const hijoResponsive = {
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  width: "100%",
  pl: "2rem",
  pr: "2rem",
  height: "calc(100% - 140px)",
};

const styleButton = {
  borderRadius: 50,
};

const botones = {
  display: "flex",
  justifyContent: "end",
  alignContent: "space-around",
  width: "95%",
  height: "50px",
};

export const PlantillaCRUD = ({
  children,
  tipo = "boleta",
  go = "",
  guardar = () => {},
  cancelar = () => {},
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.comite);

  const agregarBoleta = () => {
    navigate(go);
  };
  return (
    <>
      <PlantillaRegistro>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            height: "60px",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography sx={{}} variant="h6">
            Registrar {tipo}s
          </Typography>
          <Button
            className={classes.boton}
            variant="contained"
            disabled={status === "checking"}
            style={styleButton}
            sx={{
              mt: 2,
              width: { sm: `270px`, xs: "150px" },
              backgroundColor: "#511079",
              color: "#fff",
            }}
            onClick={agregarBoleta}
          >
            Agregar {tipo}
          </Button>
        </Box>
        <Box sx={hijoResponsive}>{children}</Box>
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
              className={classes.boton}
              variant="contained"
              color="primary"
              style={styleButton}
              sx={{
                width: { sm: `150px`, xs: "150px" },
              }}
              onClick={guardar}
            >
              Guardar
            </Button>

            <Button
              className={classes.boton}
              variant="contained"
              disabled={status === "checking"}
              style={styleButton}
              sx={{
                width: { sm: `150px`, xs: "150px" },
                backgroundColor: "error.main",
              }}
              onClick={cancelar}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </PlantillaRegistro>
    </>
  );
};
