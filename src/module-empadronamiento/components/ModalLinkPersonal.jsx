import { PhotoCamera } from "@mui/icons-material";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Modal,
  RadioGroup,
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
import {
  envioLinkPersonal,
  getVotantesbyJornada,
  postVotante,
  putVotante,
} from "../../store/module-empadronamiento/formales/thunksFormales";
import { transformDate } from "../helpers/transformDate";
import { useParams } from "react-router-dom";

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
  width: { xl: "50%", sm: "70%", xs: "90%" },
  backgroundColor: "white",
  border: "1px solid rgba(0,0,0,0.0)",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-47%,-50%)",
  pl: "3rem",
  pr: "3rem",
  pt: "3rem",
  height: { xl: "50%", lg: "50%", sm: "97%", xs: "99%" },
  overflowY: "scroll",
  alignItems: "center",
};

const steps = ["INFORMACIÓN", "DIRECCIÓN", "CONTACTO"];

export const ModalLinkPersonal = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  enviar = () => {
    alert("Presionaste agregar votante");
  },
  tipo = "todos",
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({});

  const { votanteSelected, status } = useSelector((state) => state.empFormales);

  const finalizar = () => {
    dispatch(envioLinkPersonal(votanteSelected.curp, id, AddVotanteNext));
  };

  const cerrarM = () => {
    abrirCerrarModal();
  };

  const AddVotanteNext = () => {
    abrirCerrarModal();
  };

  useEffect(() => {}, []);

  useEffect(() => {}, [isOpen]);

  const body = (
    <Box sx={modalResponsive}>
      <Box className={styles.fomi}>
        <Typography
          textAlign="center"
          sx={{ fontSize: 20, fontWeight: "bold", mb: 3 }}
        >
          ENVIO DE LINK PERSONAL
        </Typography>
      </Box>

      <Box width="100%">
        <Typography textAlign="center" sx={{}}>
          Al "Aceptar" se estará enviando al correo electronico {"' "}
          {votanteSelected.correoVotante} {" ' "}el token para que inicie
          sesión.
        </Typography>
        <Typography textAlign="center" sx={{ fontWeight: "bold", mt: 2 }}>
          ¿Esta seguro de esta acción?
        </Typography>
      </Box>
      <br />
      <Box
        sx={{ mt: 3 }}
        width={"90%"}
        display="flex"
        justifyContent="space-between"
      >
        <Button
          disabled={status === "checking"}
          variant="contained"
          onClick={cerrarM}
          color="error"
        >
          Cancelar
        </Button>
        <Button
          disabled={status === "checking"}
          onClick={finalizar}
          variant="contained"
          color="success"
        >
          Aceptar
        </Button>
      </Box>
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
