import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { ErrorField } from "../../module-preparacion/components/ErrorField";

const phoneRegExp = /^[9|6|7][0-9]{9}$/;

let schema = yup.object().shape({
  correoVotante: yup
    .string()
    .email("Deber ser un correo")
    .required("Correo es necesario"),
    correoVotante2: yup
    .string()
    .email("Deber ser un correo")
    .required("Confirmación es necesaria"),
  telefonoVotante: yup
    .string()
    .matches(phoneRegExp, "No es un número de telefónico")
    .required("El telefono es necesario"),
    telefonoVotante2: yup
    .string()
    .matches(phoneRegExp, "No es un número de telefónico")
    .required("Confirmación es necesaria"),
});

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

const validando = (values, props) => {
  const errors = {};
 if (values.correoVotante !== values.correoVotante2) {
    errors.correoVotante2 = "Los correos son diferentes";
  } 

  if (values.telefonoVotante !== values.telefonoVotante2) {
    errors.telefonoVotante2 = "Los números son diferentes";
  } 
  /* if (logo.name === "Sin Archivo seleccionado") {
      errors.logo = "Se necesita un emblema";
    }

    if (candidato.candidato === "Sin candidato") {
      errors.candidato = "Seleccione un candidato";
    } */

  return errors;
};



export const FormContacto = ({
  data = {},
  onBack = () => {},
  onNext = () => {},
  backbtn = true,
}) => {
  const styles = useStyles();
  const handleChangeD = (e) => {
    e.preventDefault();
  };
  return (
    <Formik
      initialValues={{
        correoVotante: data.votanteModel?.correoVotante
          ? data.votanteModel.correoVotante
          : "",
          correoVotante2: data.votanteModel?.correoVotante
          ? data.votanteModel.correoVotante
          : "",
        telefonoVotante: data.votanteModel?.telefonoVotante
          ? data.votanteModel.telefonoVotante
          : "",
          telefonoVotante2: data.votanteModel?.telefonoVotante
          ? data.votanteModel.telefonoVotante
          : "",
      }}
      validate={validando}
      validationSchema={schema}
      onSubmit={(valores) => {
        onNext({ contacto: valores });
        const data = {
          votante: {},
        };
      }}
    >
      {({ touched, errors, handleBlur, handleChange, values }) => (
        <Form autoComplete="off" className={styles.fomi}>
          <Box sx={{ width: "100%" }}>
            <br />
            <div aling="left">
              <Typography textAlign="center" sx={{ fontWeight: "bold", mb: 3 }}>
                CONTACTO DEL VOTANTE
              </Typography>
            </div>

            <Typography>NÚMERO TELÉFONICO</Typography>
            <TextField
              required
              label=""
              variant="filled"
              name="telefonoVotante"
              id="telefonoVotante"
              className={styles.textField}
              value={values.telefonoVotante}
      //         onCut={handleChangeD}
      // onCopy={handleChangeD}
      onPaste={handleChangeD}
              onChange={(e) => {
                e.target.value = e.target.value.trim();
                handleChange(e);
              }}
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
            <Typography>CONFIRMACIÓN NÚMERO TELÉFONICO</Typography>
            <TextField
              required
              label=""
              variant="filled"
              name="telefonoVotante2"
              id="telefonoVotante2"
              className={styles.textField}
              value={values.telefonoVotante2}
              onChange={(e) => {
                e.target.value = e.target.value.trim();
                handleChange(e);
              }}
              onPaste={handleChangeD}
              onBlur={handleBlur}
            ></TextField>
            <br />
            <ErrorMessage
              name="telefonoVotante2"
              component={() => (
                <ErrorField>{errors.telefonoVotante2}</ErrorField>
              )}
            />
            <br />
            <br />
            <Typography>CORREO ELECTRÓNICO</Typography>
            <TextField
              required
              label=""
              variant="filled"
              name="correoVotante"
              id="correoVotante"
              className={styles.textField}
              value={values.correoVotante}
              onChange={(e) => {
                e.target.value = e.target.value.trim();
                handleChange(e);
              }}
              onBlur={handleBlur}
              onPaste={handleChangeD}
            ></TextField>
            <br />
            <ErrorMessage
              name="correoVotante"
              component={() => <ErrorField>{errors.correoVotante}</ErrorField>}
            />
            <br />
            <Typography>CONFIRMACIÓN CORREO ELECTRÓNICO</Typography>
            <TextField
              required
              label=""
              variant="filled"
              name="correoVotante2"
              id="correoVotante2"
              className={styles.textField}
              value={values.correoVotante2}
              onChange={(e) => {
                e.target.value = e.target.value.trim();
                handleChange(e);
              }}
              onBlur={handleBlur}
              onPaste={handleChangeD}
            ></TextField>
            <br />
            <ErrorMessage
              name="correoVotante2"
              component={() => <ErrorField>{errors.correoVotante2}</ErrorField>}
            />
          </Box>

          <br />
          <br />
          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              sx={{ display: backbtn ? "flex" : "none" }}
              variant="outlined"
              onClick={onBack}
              color="inherit"
            >
              Atras
            </Button>
            <Button type="submit" variant="contained">
              Finalizar proceso
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
