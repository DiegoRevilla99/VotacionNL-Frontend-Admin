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

import { transformDate } from "../helpers/transformDate";
import {
  getVotantesbyJornada,
  putVotante,
} from "../../store/module-empadronamiento/votantes/thunksVotantes";
import { useParams } from "react-router-dom";
import { FormContacto2 } from "./FormContacto2";

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
  width: { xl: "80%", sm: "85%", xs: "90%" },
  backgroundColor: "white",
  border: "1px solid rgba(0,0,0,0.0)",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-47%,-50%)",
  pl: "3rem",
  pr: "3rem",
  pt: "3rem",
  height: { xl: "70%", lg: "90%", sm: "97%", xs: "99%" },
  overflowY: "scroll",
  alignItems: "start",
};

const steps = ["INFORMACIÓN", "DIRECCIÓN", "CONTACTO"];

export const ModalEditVotante = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  agregar = () => {
    alert("Presionaste agregar votante");
  },
  actualizar = () => {
    alert("Presionaste actualizar votante");
  },
}) => {
  const styles = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const { votanteSelected, status } = useSelector(
    (state) => state.empVotantesSlice
  );

  const isStepOptional = (step) => {
    return step === 5;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const completarPaso = (valores) => {
    console.log(valores);
    if (valores.votanteModel) {
      setData({ ...data, votanteModel: valores.votanteModel });
    }
    if (valores.direccionModel) {
      setData({ ...data, direccionModel: valores.direccionModel });
    }
    if (valores.contacto) {
      const contac = valores.contacto;
      setData({ ...data, votanteModel: { ...data.votanteModel, ...contac } });
    }
    handleNext();
  };

  const finalizar = (valores) => {
    console.log("Ediatndo Votante");

    const contac = valores.contacto;
    let newData = { ...votanteSelected };
    newData.correoVotante = contac.correoVotante;
    newData.telefonoVotante = contac.telefonoVotante;
    console.log(newData);

    dispatch(putVotante(newData.curp, newData, AddVotanteNext));
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    console.log("en atras");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const cerrarM = () => {
    abrirCerrarModal();
  };

  const AddVotanteNext = () => {
    console.log("actualizando info");
    dispatch(getVotantesbyJornada(id));
    abrirCerrarModal();

    setData({});
  };

  useEffect(() => {}, []);

  useEffect(() => {}, [isOpen]);

  const body = (
    <Box sx={modalResponsive}>
      <Box className={styles.fomi}>
        <Typography textAlign="center" sx={{ fontWeight: "bold", mb: 3 }}>
          INFORMACIÓN DEL VOTANTE
        </Typography>
        {votanteSelected && (
          <Box
            sx={{
              width: "100%",
              p: 4,
              border: "1px solid rgba(0,0,0,0.4)",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>CURP:</Typography>
              <Typography>{votanteSelected.curp}</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                Nombre:{" "}
              </Typography>
              <Typography>
                {votanteSelected.nombreVotante +
                  " " +
                  votanteSelected.apellidoPVotante +
                  " " +
                  votanteSelected.apellidoMVotante}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                Fecha nacimiento:
              </Typography>
              <Typography>
                {transformDate(votanteSelected.fechaNacimiento)}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                Genero:
              </Typography>
              <Typography>{votanteSelected.genero}</Typography>
            </Box>
          </Box>
        )}
      </Box>

      <Box width="100%">
        {votanteSelected && (
          <FormContacto2
            backbtn={false}
            data={{ votanteModel: votanteSelected }}
            onBack={handleBack}
            onNext={finalizar}
          ></FormContacto2>
        )}
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
