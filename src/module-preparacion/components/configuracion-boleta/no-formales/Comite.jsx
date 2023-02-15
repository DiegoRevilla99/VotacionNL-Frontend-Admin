import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { SeleccionesForm } from "../SeleccionesForm";



const useStyles = makeStyles({
  hr: {
    height: "3px",
    color: "rgb(210, 210, 210)",
    background: "rgb(210, 210, 210)",
    width: "100%",
    boxShadow: 3,
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

const boxOpciones = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "auto",
  alignItems: "center",
  mt: 1,
  mb: 5,
};

export const Comite = ({ boletaInfo }) => {
  const styles = useStyles();
  
  const { id } = useParams();
  const [cnr, setCnr] = useState(false);
  const [vn, setVn] = useState(false);

  const abrirCerrarModalCoalicion = () => {
    setModalCoalicion(!modalCoalicion);
  };

 

  return (
    <>
      <Stack
        className="animate__animated animate__zoomIn "
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
        <Typography sx={{ mb: 3, fontSize: "22px", fontWeight: "bold" }}>
          OPCIONES DE {boletaInfo.modalidad}
        </Typography>

        <Box sx={boxOpciones}>
          <SeleccionesForm
            minC={boletaInfo.minOpciones}
            maxC={boletaInfo.maxOpciones}
            cnr={boletaInfo.mostrarCandidaturasNoReg}
            vn={boletaInfo.mostrarVotoNulo}
          ></SeleccionesForm>
        </Box>
        <Box sx={botones}>
          <Box
            sx={{
              width: "100%",
              display: "flex",

              justifyContent: "start",
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
              <ReplyAllIcon />
              Regresar
            </Button>
          </Box>
        </Box>
      </Stack>
    </>
  );
};
{
  /* <Stack
    justifyContent="center"
    sx={{ color: "grey.500" }}
    spacing={2}
    direction="row"
    >
    <CircularProgress color="primary" />
    </Stack> */
}
