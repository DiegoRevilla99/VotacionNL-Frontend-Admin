import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useSelector } from "react-redux";

let schema = yup.object().shape({
  max: yup
    .number()
    .max(100, "Excedio el limite")
    .min(1, "Se necesita un número más alto")
    .required("Cantidad maxima es necesario"),
  min: yup
    .number()
    .max(100, "Excedio el limite")
    .min(1, "Se necesita un número más alto")
    .required("Cantidad maxima es necesario"),
});

const useStyles = makeStyles({
  fomi: {
    display: "flex",
    width: "100%",
    flexDirection: "colum",
    justifyContent: "center",
    height: "auto",
    alignItems: "center",
  },
});

export const SeleccionesForm = ({
  minC,
  maxC,
  cnr,
  vn,
  onGuardar = () => {},
}) => {
  const styles = useStyles();
  const [cnrS, setCnrS] = useState(cnr);
  const [vnS, setVnS] = useState(vn);

  const { status } = useSelector((state) => state.configBoleta);

  const handleChangeCand = (event) => {
    setCnrS(event.target.checked);
  };

  const handleChangeVoto = (event) => {
    setVnS(event.target.checked);
  };

  const guardarSubmit = (valores) => {
    const data = {
      candidaturaNoRegistrada: cnrS,
      mostrarVotoNulo: vnS,
      ...valores,
    };

    onGuardar(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "auto",
        mb: 2,
      }}
    >
      <Formik
        initialValues={{
          max: maxC,
          min: minC,
        }}
        // validate={validando}
        validationSchema={schema}
        onSubmit={guardarSubmit}
      >
        {({ touched, errors, handleBlur, handleChange, values }) => (
          <Form className={styles.fomi}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Box
                className="animate__animated animate__zoomIn "
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  mb: 2,
                }}
              >
                <TextField
                  disabled={status === "checking"}
                  error={errors.max ? true : false}
                  sx={{ mr: 1 }}
                  helperText={errors?.max}
                  id="max"
                  name="max"
                  label="Max. de selecciones"
                  type="number"
                  value={values.max}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  disabled={status === "checking"}
                  error={errors.min ? true : false}
                  helperText={errors?.min}
                  id="min"
                  name="min"
                  label="Min. de selecciones"
                  value={values.min}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <FormGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        disabled={status === "checking"}
                        checked={cnrS}
                        onChange={handleChangeCand}
                      />
                    }
                    label="Opción o candidatura no registrada"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        disabled={status === "checking"}
                        checked={vnS}
                        onChange={handleChangeVoto}
                      />
                    }
                    label="Mostrar voto nulo"
                  />
                </FormGroup>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                  width: "100%",
                }}
              >
                <Button
                  disabled={status === "checking"}
                  type="submit"
                  variant="contained"
                >
                  Guardar
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
