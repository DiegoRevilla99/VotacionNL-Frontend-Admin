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
  telefonoVotante: yup
    .string()
    .matches(phoneRegExp, "No es un número de telefónico")
    .required("El telefono es necesario"),
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
  return (
    <Formik
      initialValues={{
        correoVotante: data.votanteModel?.correoVotante
          ? data.votanteModel.correoVotante
          : "",
        telefonoVotante: data.votanteModel?.telefonoVotante
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
        <Form className={styles.fomi}>
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
            ></TextField>
            <br />
            <ErrorMessage
              name="correoVotante"
              component={() => <ErrorField>{errors.correoVotante}</ErrorField>}
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
