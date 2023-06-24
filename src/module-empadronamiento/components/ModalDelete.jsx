import { PhotoCamera } from "@mui/icons-material";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  IconButton,
  Modal,
  RadioGroup,
  Stack,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import StepLabel from "@mui/material/StepLabel";
import { useDispatch, useSelector } from "react-redux";

import { ErrorField } from "../../module-preparacion/components/ErrorField";
import { FormInfo } from "./FormInfo";
import { FormDireccion } from "./FormDireccion";
import { FormContacto } from "./FormContacto";

import { transformDate } from "../helpers/transformDate";
import { useParams } from "react-router-dom";
import {
  envioLink,
  envioLinkConsultas,
  envioLinkNoFormal,
} from "../../store/module-empadronamiento/votantes/thunksVotantes";

const useStyles = makeStyles({
  textField: {
    width: "100%",
    p: 2,
  },
  fomi: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contenedor: {
    borderRadius: "20px",
    backgroundColor: "black",
  },
});

const modalResponsive = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  position: "fixed",
  width: { xl: "30%", sm: "30%", xs: "90%" },
  backgroundColor: "white",
  border: "1px solid rgba(0,0,0,0.0)",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-47%,-50%)",
  pl: "3rem",
  pr: "3rem",
  pt: "3rem",
  height: { lg: "300px", xs: "350px" },
  overflowY: "scroll",
  alignItems: "center",
};

const steps = ["INFORMACIÓN", "DIRECCIÓN", "CONTACTO"];

export const ModalDelete = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  enviar = () => {
    alert("Presionaste agregar votante");
  },
  action = () => {},
  mensaje = "",
  titulo = "",
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.empVotantesSlice);

  const cerrarM = () => {
    abrirCerrarModal();
  };

  useEffect(() => {
    console.log("Mensaje: ", mensaje);
  }, []);

  useEffect(() => {}, [isOpen]);

  const body = (
    <Box sx={modalResponsive}>
      <Box className={styles.fomi}>
        <Typography
          textAlign="center"
          sx={{ fontSize: 20, fontWeight: "bold", mb: 3 }}
        >
          {titulo}
        </Typography>
      </Box>

      <Box width="100%">
        <Typography textAlign="center" sx={{}}>
          {mensaje}
        </Typography>
        <Typography textAlign="center" sx={{ mt: 2 }}>
          ¿Esta seguro de esta acción?
        </Typography>
      </Box>
      <br />
      {status === "checking" && (
        <Stack
          justifyContent="center"
          sx={{ color: "grey.500" }}
          spacing={2}
          direction="row"
        >
          <CircularProgress color="primary" />
        </Stack>
      )}
      <Box
        sx={{ mt: 3 }}
        width={"90%"}
        display="flex"
        justifyContent="space-between"
      >
        <Button
          disabled={status === "checking"}
          onClick={cerrarM}
          variant="contained"
          color="error"
        >
          Cancelar
        </Button>
        <Button
          disabled={status === "checking"}
          variant="contained"
          onClick={action}
        >
          Aceptar
        </Button>
      </Box>
      <br />
    </Box>
  );

  return (
    <>
      <div className={styles.contenedor}>
        <Modal open={isOpen} onClose={cerrarM}>
          {body}
        </Modal>
      </div>
    </>
  );
};
