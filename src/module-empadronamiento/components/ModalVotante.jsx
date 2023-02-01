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
  getVotantesbyJornada,
  postVotante,
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
  height: { xl: "95%", lg: "90%", sm: "97%", xs: "99%" },
  overflowY: "scroll",
  alignItems: "start",
};

const steps = ["INFORMACIÓN", "DIRECCIÓN", "CONTACTO"];

export const ModalVotante = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  actualizar = () => {
    alert("Presionaste actualizar votante");
  },
  votante = null,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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
    console.log("Finalizando");
    console.log(valores);
    const contac = valores.contacto;
    setData({ ...data, votanteModel: { ...data.votanteModel, ...contac } });
    const datos = {
      ...data,
      votanteModel: { ...data.votanteModel, ...contac },
    };
    dispatch(postVotante(datos, AddVotanteNext));
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
    dispatch(getVotantesbyJornada());
    abrirCerrarModal();
    setActiveStep(0);
    setData({});
  };

  useEffect(() => {}, []);

  useEffect(() => {}, [isOpen]);

  const body = (
    <Box sx={modalResponsive}>
      <Box className={styles.fomi}>
        <Stepper
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { sm: "row", xs: "column" },
            alignItems: { sm: "center", xs: "start" },
            justifyContent: "center",
          }}
          activeStep={activeStep}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

      <Box
        width="100%"
        height="100%"
        sx={{ display: activeStep == 0 ? "flex" : "none" }}
      >
        <FormInfo data={data} onNext={completarPaso}></FormInfo>
      </Box>

      <Box width="100%" sx={{ display: activeStep == 1 ? "flex" : "none" }}>
        <FormDireccion
          data={data}
          onBack={handleBack}
          onNext={completarPaso}
        ></FormDireccion>
      </Box>

      <Box width="100%" sx={{ display: activeStep == 2 ? "flex" : "none" }}>
        <FormContacto
          data={data}
          onBack={handleBack}
          onNext={finalizar}
        ></FormContacto>
      </Box>

      {/* {activeStep === 3 && <Box>se finalizo el proceso</Box>} */}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 5, mb: 1 }}>Se finalizó el proceso</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Cerrar</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {/* <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button> */}
            <Box sx={{ flex: "1 1 auto" }} />

            {/* <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button> */}
          </Box>
        </React.Fragment>
      )}

      {/* <Box
              display="flex"
              sx={{ mt: 1, p: 2, width: "100%" }}
              justifyContent="end"
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: { sm: `150px`, xs: "150px" },
                  borderRadius: "15px",
                }}
              >
                CREAR
              </Button>
              <Button
                variant="contained"
                onClick={cerrarM}
                sx={{
                  width: { sm: `150px`, xs: "150px" },
                  backgroundColor: "error.main",
                  borderRadius: "15px",
                  ml: 1,
                }}
              >
                Cancelar
              </Button>
            </Box> */}
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
