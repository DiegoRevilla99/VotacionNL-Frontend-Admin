import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { width } from "@mui/system";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { ErrorField } from "../../module-preparacion/components/ErrorField";
import { estadosList } from "../helpers/getEstados";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";

let schema = yup.object().shape({
  estado: yup.string().required("estado es necesario"),
  calle: yup.string().required("Calle es necesario"),
  colonia: yup.string().required("Colonia es necesario"),
  numero: yup
    .number()
    .typeError("Debe ser un número")
    .required("El número es necesario"),
  cp: yup.string().matches(/^[0-9]+$/, "Solo numeros")
.min(5, 'Deben ser 5 digitos')
.max(5, 'Deben ser 5 digitos')
.required("El código postas es necesario"),

  municipio: yup.string().required("Municipio es necesario"),
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

const estados = estadosList;

export const FormDireccion = ({
  data = {},
  onBack = () => {},
  onNext = () => {},
}) => {
  const styles = useStyles();
  const handleChangeD = (e) => {
    e.preventDefault();
  };
  return (
    <Formik
      initialValues={{
        estado: "Nuevo León",
        calle: data.direccionModel?.calle ? data.direccionModel.calle : "",
        colonia: data.direccionModel?.colonia
          ? data.direccionModel.colonia
          : "",
        numero: data.direccionModel?.numero ? data.direccionModel.numero : "",
        cp: data.direccionModel?.cp ? data.direccionModel.cp : "",
        municipio: data.direccionModel?.municipio
          ? data.direccionModel.municipio
          : "",
      }}
      validate={validando}
      validationSchema={schema}
      onSubmit={(valores) => {
        let newData = { ...valores };
        newData.estado = "NL";
        onNext({ direccionModel: newData });
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
                DIRECCIÓN DEL VOTANTE
              </Typography>
            </div>
            <Typography>ESTADO</Typography>
            <TextField
              disabled
              required
              label=""
              variant="filled"
              name="estado"
              id="estado"
              className={styles.textField}
              value={values.estado}
            ></TextField>
            <br />
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
              onPaste={handleChangeD}
            ></TextField>
            <ErrorMessage
              name="municipio"
              component={() => <ErrorField>{errors.municipio}</ErrorField>}
            />

            {/* <TextField
              required
              label=""
              variant="filled"
              name="estado"
              id="estado"
              className={styles.textField}
              value={values.estado}
              onChange={handleChange}
              onBlur={handleBlur}
            ></TextField> */}
            <ErrorMessage
              name="estado"
              component={() => <ErrorField>{errors.estado}</ErrorField>}
            />
            <br />
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
              onPaste={handleChangeD}
            ></TextField>
            <br />

            <ErrorMessage
              name="colonia"
              component={() => <ErrorField>{errors.colonia}</ErrorField>}
            />
            <br />

            <Typography>CÓDIGO POSTAL</Typography>
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
              onPaste={handleChangeD}
            ></TextField>
            <br />

            <ErrorMessage
              name="cp"
              component={() => <ErrorField>{errors.cp}</ErrorField>}
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
              onPaste={handleChangeD}
            ></TextField>

            <br />
            <br />
            <Typography>NÚMERO</Typography>
            <TextField
              required
              label=""
              variant="filled"
              name="numero"
              id="numero"
              className={styles.textField}
              value={values.numero}
              onChange={handleChange}
              onBlur={handleBlur}
              onPaste={handleChangeD}
            ></TextField>

            <br />

            <ErrorMessage
              name="numero"
              component={() => <ErrorField>{errors.numero}</ErrorField>}
            />

            <br />
            <br />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button variant="outlined" onClick={onBack} color="inherit">
                Atras
              </Button>
              <Button
                endIcon={<NavigateNextSharpIcon />}
                variant="contained"
                type="submit"
              >
                Siguiente
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
