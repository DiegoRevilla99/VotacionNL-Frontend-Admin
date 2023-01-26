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
  curp: yup.string().required("CURP del votante es necesario"),
  nombreVotante: yup.string().required("Nombre del votante es necesario"),
  apellidomvotante: yup
    .string()
    .required("Segundo apellido del votante es necesario"),
  apellidopvotante: yup
    .string()
    .required("Primer apellido del votante es necesario"),
  fechaNacimiento: yup.string().required("Fecha de nacimiento es necesario"),
  genero: yup.string().required("Genero necesario"),
  entidad: yup.string().required("Entidad es necesario"),
  calle: yup.string().required("Calle es necesario"),
  colonia: yup.string().required("Colonia es necesario"),
  cp: yup.string().required("Codigo postal es necesario"),
  municipio: yup.string().required("Municipio es necesario"),
  correoVotante: yup.string().required("Correo es necesario"),
  telefonoVotante: yup.number().required("Telefono es necesario"),
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
  const [errorStep, setErrorStep] = useState({});

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

  const handleComplete = (errors) => {
    if (
      ((errors.curp == undefined) &
        (errors.nombreVotante == undefined) &
        (errors.apellidomvotante == undefined) &
        (errors.apellidopvotante == undefined) &
        (errors.fechaNacimiento == undefined) &
        (errors.genero == undefined)) |
      (errors === {})
    ) {
      console.log("Se avanza");
      const newCompleted = completed;

      newCompleted[activeStep] = true;

      setCompleted(newCompleted);
      handleNext();
    } else {
      console.log("Hubo un error");
    }

    if (completedSteps() === totalSteps()) {
      console.log("Se ha terminado el proceso");
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const cerrarM = () => {
    abrirCerrarModal();
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
          fechaNacimiento: "",
          genero: "",
          entidad: "",
          calle: "",
          colonia: "",
          cp: "",
          municipio: "",
          correoVotante: "",
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
                <ErrorMessage
                  name="curp"
                  component={() => <ErrorField>{errors.curp}</ErrorField>}
                />
                <br />
                <Typography>NOMBRE DEL VOTANTE</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="nombreVotante"
                  id="nombreVotante"
                  className={styles.textField}
                  value={values.nombreVotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <ErrorMessage
                  name="nombreVotante"
                  component={() => (
                    <ErrorField>{errors.nombreVotante}</ErrorField>
                  )}
                />
                <br />
                <Typography>PRIMER APELLIDO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="apellidopvotante"
                  id="apellidopvotante"
                  className={styles.textField}
                  value={values.apellidopvotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <ErrorMessage
                  name="apellidopvotante"
                  component={() => (
                    <ErrorField>{errors.apellidopvotante}</ErrorField>
                  )}
                />
                <br />
                <Typography>SEGUNDO APELLIDO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="apellidomvotante"
                  id="apellidomvotante"
                  className={styles.textField}
                  value={values.apellidomvotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <ErrorMessage
                  name="apellidomvotante"
                  component={() => (
                    <ErrorField>{errors.apellidomvotante}</ErrorField>
                  )}
                />
                <br />

                <Typography>FECHA NACIMIENTO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="fechaNacimiento"
                  id="fechaNacimiento"
                  className={styles.textField}
                  value={values.fechaNacimiento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <ErrorMessage
                  name="fechaNacimiento"
                  component={() => (
                    <ErrorField>{errors.fechaNacimiento}</ErrorField>
                  )}
                />
                <br />
                <Typography>GENERO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="genero"
                  id="genero"
                  className={styles.textField}
                  value={values.genero}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>

                <br />

                <ErrorMessage
                  name="genero"
                  component={() => <ErrorField>{errors.genero}</ErrorField>}
                />
                <br />
                <br />
                <ErrorMessage
                  name="Error"
                  component={() => (
                    <ErrorField>
                      {errorStep.informacion &&
                        "El foemulario no ha sido rellenado correctamente"}
                    </ErrorField>
                  )}
                />
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
                  name="entidad"
                  id="entidad"
                  className={styles.textField}
                  value={values.entidad}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <ErrorMessage
                  name="entidad"
                  component={() => <ErrorField>{errors.entidad}</ErrorField>}
                />
                <br />
                <Typography>CALLE</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="calle"
                  id="calle"
                  className={styles.textField}
                  value={values.calle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>

                <br />

                <ErrorMessage
                  name="calle"
                  component={() => <ErrorField>{errors.calle}</ErrorField>}
                />
                <br />
                <Typography>COLONIA</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="colonia"
                  id="colonia"
                  className={styles.textField}
                  value={values.colonia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />

                <ErrorMessage
                  name="colonia"
                  component={() => <ErrorField>{errors.colonia}</ErrorField>}
                />
                <br />
                <Typography>CP</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="cp"
                  id="cp"
                  className={styles.textField}
                  value={values.cp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />

                <ErrorMessage
                  name="cp"
                  component={() => <ErrorField>{errors.cp}</ErrorField>}
                />
                <br />
                <Typography>MUNICIPIO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="municipio"
                  id="municipio"
                  className={styles.textField}
                  value={values.municipio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <ErrorMessage
                  name="municipio"
                  component={() => <ErrorField>{errors.municipio}</ErrorField>}
                />
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
                  name="telefonoVotante"
                  id="telefonoVotante"
                  className={styles.textField}
                  value={values.telefonoVotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />
                <ErrorMessage
                  name="telefonoVotante"
                  component={() => (
                    <ErrorField>{errors.telefonoVotante}</ErrorField>
                  )}
                />
                <br />
                <Typography>CORREO ELECTRONICO</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="correoVotante"
                  id="correoVotante"
                  className={styles.textField}
                  value={values.correoVotante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                <br />
                <ErrorMessage
                  name="correoVotante"
                  component={() => (
                    <ErrorField>{errors.correoVotante}</ErrorField>
                  )}
                />
              </Box>
            )}

            {activeStep === 3 && <Box>se finalizo el proceso</Box>}

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
                        Siguiente
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => handleComplete(errors)}
                      >
                        {completedSteps() === totalSteps() - 1
                          ? "Finalizar proceso"
                          : "Siguiente"}
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
