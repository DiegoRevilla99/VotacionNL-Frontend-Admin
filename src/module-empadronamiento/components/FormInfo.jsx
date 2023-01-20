import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ErrorMessage, Form, Formik, useField, useFormikContext } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { ErrorField } from "../../module-preparacion/components/ErrorField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  DateTimePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import es from "date-fns/locale/es";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { DateField } from "./DateField";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";

let schema = yup.object().shape({
  curp: yup.string().required("CURP del votante es necesario"),
  nombreVotante: yup.string().required("Nombre del votante es necesario"),
  apellidoMVotante: yup
    .string()
    .required("Segundo apellido del votante es necesario"),
  apellidoPVotante: yup
    .string()
    .required("Primer apellido del votante es necesario"),
  fechaNacimiento: yup.string().required("Fecha de nacimiento es necesario"),
  genero: yup.string().required("Genero necesario"),
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

let validationCurp =
  /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;
const validando = (values, props) => {
  // console.log(values.curp);
  const errors = {};
  if (!validationCurp.test(values.curp.toUpperCase())) {
    errors.curp = "Esta curp no es valida";
  }
  return errors;
};

const getDateBirth = (curp = "") => {
  const fechaActual = new Date();
  if (validationCurp.test(curp.toUpperCase())) {
    let anio = parseInt(curp.substring(4, 6), 10);
    let mes = parseInt(curp.substring(6, 8), 10);
    let dia = parseInt(curp.substring(8, 10), 10);

    const anioActual = fechaActual.getFullYear() - 2005;
    console.log(anioActual);
    if (anio > anioActual) {
      anio = anio + 1900;
    } else {
      anio = anio + 2000;
    }
    const fechaN = new Date(anio, mes - 1, dia);
    return fechaN;
  }
  return false;
};

const getGender = (curp = "") => {
  if (validationCurp.test(curp.toUpperCase())) {
    let genero = curp.substring(10, 11);
    console.log(genero);
    return genero;
  }
  return false;
};

const FechaNacimientoField = ({ name }) => {
  const {
    values: {
      curp,
      nombreVotante,
      apellidoMVotante,
      apellidoPVotante,
      fechaNacimiento,
    },
    genero,
    touched,
    setFieldValue,
  } = useFormikContext();

  const [field, meta] = useField({ name });

  useEffect(() => {
    // set the value of textC, based on textA and textB
    if (curp) {
      const fecha = getDateBirth(curp);
      setFieldValue(name, fecha);
    }
  }, [curp, touched.curp, setFieldValue, name]);

  return (
    <>
      <Typography>FECHA NACIMIENTO</Typography>
      <DateField
        name="fechaNacimiento"
        value={fechaNacimiento}
        // onChange={handleChange}
        disabled={true}
      ></DateField>
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

const GeneroField = () => {
  const {
    values: {
      curp,
      nombreVotante,
      apellidoMVotante,
      apellidoPVotante,
      fechaNacimiento,
      genero,
    },
    touched,
    setFieldValue,
  } = useFormikContext();

  const [field, meta] = useField({ name: "genero" });

  useEffect(() => {
    // set the value of textC, based on textA and textB
    let genero = getGender(curp);
    if (genero) {
      if (genero.toUpperCase() === "M") genero = "MUJER";
      if (genero.toUpperCase() === "H") genero = "HOMBRE";
      setFieldValue("genero", genero);
    } else {
      setFieldValue("genero", "");
    }
  }, [curp, touched.curp, setFieldValue, "genero"]);

  return (
    <>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="genero"
          value={genero}
          disabled
          // onChange={handleChange}
          // onBlur={handleBlur}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <FormControlLabel value="HOMBRE" control={<Radio />} label="Hombre" />
          <FormControlLabel value="MUJER" control={<Radio />} label="Mujer" />
        </RadioGroup>
      </FormControl>
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

export const FormInfo = ({ data = {}, onNext = () => {} }) => {
  const fecha = new Date();
  const styles = useStyles();

  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <Formik
      initialValues={{
        curp: data.votanteModel?.curp ? data.votanteModel.curp : "",
        nombreVotante: data.votanteModel?.nombreVotante
          ? data.votanteModel.nombreVotante
          : "",
        apellidoMVotante: data.votanteModel?.apellidoMVotante
          ? data.votanteModel.apellidoMVotante
          : "",
        apellidoPVotante: data.votanteModel?.apellidoPVotante
          ? data.votanteModel.apellidoPVotante
          : "",
        fechaNacimiento: data.votanteModel?.fechaNacimiento
          ? new Date(data.votanteModel.fechaNacimiento).toISOString()
          : "",
        genero: data.votanteModel?.genero ? data.votanteModel.genero : "",
      }}
      validate={validando}
      validationSchema={schema}
      onSubmit={(valores) => {
        const info = { ...valores };
        info.fechaNacimiento = new Date(valores.fechaNacimiento).toISOString();
        info.nombreVotante = info.nombreVotante.trim();
        info.apellidoMVotante = info.apellidoMVotante.trim();
        info.apellidoPVotante = info.apellidoPVotante.trim();
        info.validacion = false;

        onNext({ votanteModel: info });
      }}
    >
      {({ touched, errors, handleBlur, handleChange, values }) => (
        <Form className={styles.fomi}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <br />
            <br />
            <div aling="left">
              <Typography textAlign="center" sx={{ fontWeight: "bold", mb: 3 }}>
                INFORMACIÓN DEL VOTANTE
              </Typography>
            </div>
            <Box
              width="100%"
              height="50px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box width="100%">
                <Typography>CURP</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="curp"
                  id="curp"
                  className={styles.textField}
                  value={values.curp}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                ></TextField>
              </Box>

              {/*  <Button sx={{ mt: 3 }} type="submit" variant="contained">
                Siguiente
              </Button> */}
            </Box>
            <br />
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
              component={() => <ErrorField>{errors.nombreVotante}</ErrorField>}
            />
            <br />
            <br />
            <Typography>PRIMER APELLIDO</Typography>
            <TextField
              required
              label=""
              variant="filled"
              name="apellidoPVotante"
              id="apellidoPVotante"
              className={styles.textField}
              value={values.apellidoPVotante}
              onChange={handleChange}
              onBlur={handleBlur}
            ></TextField>
            <ErrorMessage
              name="apellidoPVotante"
              component={() => (
                <ErrorField>{errors.apellidoPVotante}</ErrorField>
              )}
            />
            <br />
            <br />
            <Typography>SEGUNDO APELLIDO</Typography>
            <TextField
              required
              label=""
              variant="filled"
              name="apellidoMVotante"
              id="apellidoMVotante"
              className={styles.textField}
              value={values.apellidoMVotante}
              onChange={handleChange}
              onBlur={handleBlur}
            ></TextField>
            <ErrorMessage
              name="apellidoMVotante"
              component={() => (
                <ErrorField>{errors.apellidoMVotante}</ErrorField>
              )}
            />
            <br />
            <br />
            <Box
              width="50%"
              justifyContent="space-between"
              display="flex"
              sx={{
                flexDirection: { sm: "row", xs: "column" },
                width: { lg: "50%", sm: "80%" },
              }}
            >
              <Box>
                <FechaNacimientoField name="fechaNacimiento" />
                {/* <Typography>FECHA NACIMIENTO</Typography>
                <DateField
                  name="fechaNacimiento"
                  value={values.fechaNacimiento}
                  onChange={handleChange}
                  
                  disabled={true}
                ></DateField> */}
              </Box>

              <ErrorMessage
                name="fechaNacimiento"
                component={() => (
                  <ErrorField>{errors.fechaNacimiento}</ErrorField>
                )}
              />
              <br />

              <Box>
                <Typography sx={{ mb: 1 }}>GENERO</Typography>
                <GeneroField />
                <br />

                <ErrorMessage
                  name="genero"
                  component={() => <ErrorField>{errors.genero}</ErrorField>}
                />
              </Box>
            </Box>

            <br />

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
              }}
            >
              <Button
                endIcon={<NavigateNextSharpIcon />}
                type="submit"
                variant="contained"
              >
                Siguiente
              </Button>
            </Box>
            <br />
          </Box>
        </Form>
      )}
    </Formik>
  );
};
