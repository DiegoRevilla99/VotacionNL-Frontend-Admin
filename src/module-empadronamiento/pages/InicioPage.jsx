import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const InicioPage = () => {
  const navigate = useNavigate();

  const goFormales = () => {
    navigate("formal");
  };

  const goNoFormales = () => {
    navigate("noformal");
  };

  const goConsultas = () => {
    navigate("consultas");
  };

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        m={"2rem"}
        height="100%"
        sx={{
          boxShadow: 1,
          backgroundColor: "white",
          borderRadius: "2rem",
          p: "3rem",
          // border: "1px solid",
        }}
      >
        <Typography variant="h5" color="initial" gutterBottom align="center">
          Selecciona el tipo de jornada que quieres empadronar
        </Typography>
        <Grid
          container
          spacing={{ xs: 5, lg: 9 }}
          justifyContent="center"
          height="100%"
          py={"2rem"}
        >
          {/* <Grid item xs={12} lg={4}>
            <Button
              onClick={goFormales}
              variant="contained"
              size="large"
              sx={{
                boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
                height: "100%",
                transition: "all 0.5s ease",
                backgroundColor: "#511079",
                width: "100%",
                borderRadius: "0px 25px 25px 25px",
                fontSize: {
                  xl: "2rem",
                  lg: "1.5rem",
                  sm: "1rem",
                  xs: "0.8rem",
                },
                fontWeight: "bold",
                letterSpacing: "0.01rem",
                lineHeight: {
                  xl: "2rem",
                  lg: "1.5rem",
                  sm: "1.5rem",
                  xs: "1.5rem",
                },
                "&:hover": {
                  backgroundColor: "#7E328B !important",
                  transform: "translate(-5px, -5px)",
                  boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
                },
              }}
              title="JORNADAS FORMALES"
            >
              Jornadas formales
            </Button>
          </Grid> */}
          <Grid item xs={12} lg={4}>
            <Button
              onClick={goNoFormales}
              variant="contained"
              size="large"
              sx={{
                boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
                height: "100%",
                transition: "all 0.5s ease",
                backgroundColor: "#511079",
                width: "100%",
                borderRadius: "0px 25px 25px 25px",
                fontSize: {
                  xl: "2rem",
                  lg: "1.5rem",
                  sm: "1rem",
                  xs: "0.8rem",
                },
                fontWeight: "bold",
                letterSpacing: "0.01rem",
                lineHeight: {
                  xl: "2rem",
                  lg: "1.5rem",
                  sm: "1.5rem",
                  xs: "1.5rem",
                },
                "&:hover": {
                  backgroundColor: "#7E328B !important",
                  transform: "translate(-5px, -5px)",
                  boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
                },
              }}
              title="ELECCIONES POPULARES"
            >
              ELECCIONES POPULARES
            </Button>
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <Button
              onClick={goConsultas}
              variant="contained"
              size="large"
              sx={{
                boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
                height: "100%",
                transition: "all 0.5s ease",
                backgroundColor: "#511079",
                width: "100%",
                borderRadius: "0px 25px 25px 25px",
                fontSize: {
                  xl: "2rem",
                  lg: "1.5rem",
                  sm: "1rem",
                  xs: "0.8rem",
                },
                fontWeight: "bold",
                letterSpacing: "0.01rem",
                lineHeight: {
                  xl: "2rem",
                  lg: "1.5rem",
                  sm: "1.5rem",
                  xs: "1.5rem",
                },
                "&:hover": {
                  backgroundColor: "#7E328B !important",
                  transform: "translate(-5px, -5px)",
                  boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
                },
              }}
              title="CONSULTAS CIUDADANAS"
            >
              Consultas ciudadanas
            </Button>
          </Grid> */}
        </Grid>
      </Box>
      {/* <ModalEliminarPregunta statusDeleteModal={statusDeleteModal} handleToggleModal={handleCloseDeleteModal} /> */}
    </Box>
  );
};
