import React from "react";
import {
  bottomNavigationClasses,
  Button,
  Divider,
  Grid,
  List,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  hr: {
    height: "1px",
    color: "rgb(210, 210, 210)",
  },
  boton: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 42,
    background: "#ffffff",
  },
});

const hijoResponsive = {
  mt: 5,
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  width: { sm: "97%", xs: "90%" },
  height: { xl: "80%", lg: "80%", md: "90%", xs: "95%" },
};

const styleButton = {
  borderRadius: 50,
};

const botones = {
  display: "flex",
  justifyContent: "end",
  alignContent: "space-around",
  width: "95%",
};

export const PlantillaCRUD = ({
  children,
  guardar = () => {},
  cancelar = () => {},
}) => {
  const classes = useStyles();
  return (
    <>
      <Stack
        spacing={2}
        direction="column"
        sx={{
          width: "97%",
          height: { xl: "90%", lg: "80%", sm: "70%", xs: "70%" },
          ml: 2,
        }}
      >
        <Box
          sx={{
            mt: 2,
            width: "100%",
          }}
        >
          <Typography variant="h6">REGISTRO</Typography>
          <hr className={classes.hr} />
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
      </Stack>
    </>
  );
};
