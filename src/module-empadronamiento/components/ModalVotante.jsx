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

import { useDispatch, useSelector } from "react-redux";

import { ErrorField } from "../../module-preparacion/components/ErrorField";

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
    height: "100%",
  },
  contenedor: {
    borderRadius: "20px",
    backgroundColor: "black",
  },
});

const modalResponsive = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  width: { xl: "80%", sm: "90%", xs: "90%" },
  backgroundColor: "white",
  border: "1px solid rgba(0,0,0,0.0)",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-47%,-50%)",
  padding: "3rem",

  height: { xl: "95%", lg: "98%", sm: "97%", xs: "99%" },
  overflowY: "scroll",
  alignItems: "start",
};

let schema = yup.object().shape({
  nombre: yup.string().required("Nombre de la coalición es necesario"),
  emblema: yup.string().required("Emeblema de la coalición es necesario"),
});

const steps = ["INFORMACIÓN", "DIRECCION", "CONTACTO"];

export const ModalVotante = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  agregar = () => {
    alert("Presionaste agregar votante");
  },
  actualizar = () => {
    alert("Presionaste actualizar votante");
  },
  votante = null,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const cerrarM = () => {
    abrirCerrarModal();
    setCandidato({});
    setLogo({ name: "Sin Archivo seleccionado" });
  };
  useEffect(() => {}, []);

  useEffect(() => {}, [isOpen]);

  const validando = (values, props) => {
    const errors = {};
    /* if (logo.name === "Sin Archivo seleccionado") {
      errors.logo = "Se necesita un emblema";
    }

    if (candidato.candidato === "Sin candidato") {
      errors.candidato = "Seleccione un candidato";
    } */

    return errors;
  };

  const body = (
    <Box sx={modalResponsive}>
      <Formik
        initialValues={{
          curp: "",
          nombreVotante: "",
          apellidomvotante: "",
          apellidopvotante: "",
          correoVotante: "",
          entidad: "",
          fechaNacimiento: "",
          genero: "",
          telefonoVotante: "",
        }}
        validate={validando}
        validationSchema={schema}
        onSubmit={(valores) => {
          const data = {
            votante: {},
            direccion: {},
          };

          if (votante) {
            actualizar(data, cerrarM);
          } else {
            agregar(data, cerrarM);
          }
          //enviar(data);
        }}
      >
        {({ touched, errors, handleBlur, handleChange, values }) => (
          <Form className={styles.fomi}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 && (
              <Box sx={{ width: "100%" }}>
                <br />
                <div aling="left">
                  <Typography
                    textAlign="center"
                    sx={{ fontWeight: "bold", mb: 3 }}
                  >
                    INFORMACIÓN DEL VOTANTE
                  </Typography>
                </div>
                <Typography>CURP</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="curp"
                  id="curp"
                  className={styles.textField}
                  value={values.curp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />
                <Typography>NOMBRE DEL VOTANTE</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="nombreVotante"
                  id="nombre"
                  className={styles.textField}
                  value={values.nombreVotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />
                <Typography>PRIMER APELLIDO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="nombreVotante"
                  id="nombre"
                  className={styles.textField}
                  value={values.nombreVotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />
                <Typography>SEGUNDO APELLIDO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="nombreVotante"
                  id="nombre"
                  className={styles.textField}
                  value={values.nombreVotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />

                <Typography>FECHA NACIMIENTO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="nombreVotante"
                  id="nombre"
                  className={styles.textField}
                  value={values.nombreVotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />
                <Typography>GENERO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="nombreVotante"
                  id="nombre"
                  className={styles.textField}
                  value={values.nombreVotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />

                <ErrorMessage
                  name="nombre"
                  component={() => <ErrorField>{errors.nombre}</ErrorField>}
                />
                <br />
              </Box>
            )}

            {activeStep === 1 && (
              <Box sx={{ width: "100%" }}>
                <br />
                <div aling="left">
                  <Typography
                    textAlign="center"
                    sx={{ fontWeight: "bold", mb: 3 }}
                  >
                    DIRECCIÓN DEL VOTANTE
                  </Typography>
                </div>
                <Typography>ENTIDAD</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="nombreVotante"
                  id="nombre"
                  className={styles.textField}
                  value={values.nombreVotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />
                <Typography>CALLE</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="emblema"
                  id="emblema"
                  className={styles.textField}
                  value={values.emblema}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />

                <ErrorMessage
                  name="nombre"
                  component={() => <ErrorField>{errors.emblema}</ErrorField>}
                />
                <br />
                <Typography>COLONIA</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="emblema"
                  id="emblema"
                  className={styles.textField}
                  value={values.emblema}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />

                <ErrorMessage
                  name="nombre"
                  component={() => <ErrorField>{errors.emblema}</ErrorField>}
                />
                <br />
                <Typography>CP</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="emblema"
                  id="emblema"
                  className={styles.textField}
                  value={values.emblema}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />

                {/* <ErrorMessage
                name="nombre"
                component={() => <ErrorField>{errors.nombreVotante}</ErrorField>}
              /> */}
                <br />
                <Typography>MUNICIPIO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="emblema"
                  id="emblema"
                  className={styles.textField}
                  value={values.emblema}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ width: "100%" }}>
                <div aling="left">
                  <Typography
                    textAlign="center"
                    sx={{ fontWeight: "bold", mb: 3 }}
                  >
                    CONTACTO DEL VOTANTE
                  </Typography>
                </div>

                <Typography>NUMERO TELEFONICO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="nombreVotante"
                  id="nombre"
                  className={styles.textField}
                  value={values.nombreVotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />
                <br />
                <Typography>CORREO ELECTRONICO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="nombreVotante"
                  id="nombre"
                  className={styles.textField}
                  value={values.nombreVotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />
              </Box>
            )}
            {
              <>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="outlined"
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {/* <Button
                    variant="outlined"
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                  >
                    Next
                  </Button> */}
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Button
                        variant="outlined"
                        onClick={handleNext}
                        sx={{ mr: 1 }}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button variant="outlined" onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? "Finalizar proceso"
                          : "Completar paso"}
                      </Button>
                    ))}
                </Box>
              </>
            }
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
          </Form>
        )}
      </Formik>
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
