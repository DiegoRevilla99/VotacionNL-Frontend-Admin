import {
  Button,
  CircularProgress,
  FormControlLabel,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { Box } from "@mui/system";
import { PlantillaHeader } from "../layout/PlantillaHeader";
import { HoraField } from "../components/HoraField";
import { useDispatch, useSelector } from "react-redux";
import { getConfigJornada } from "../../store/module-preparacion/configuracion-jornada/thunksConfigJornada";
import { useParams } from "react-router-dom";
import { object, string, date } from "yup";
import { DateFieldWithTitle } from "../components/DateFieldWithTitle";

const useStyles = makeStyles({
  formulario: {
    display: "flex",
    width: "95%",
    flexDirection: "column",
    height: "auto",
  },

  fomi: {
    display: "flex",
    width: "95%",
    flexDirection: "column",
  },

  planillas: {
    display: "flex",
    width: "95%",
    height: "200px",
    background: "#D9D9D9",
  },
  boton: {
    boxShadow: 1,
    color: "white",
    height: 42,
  },
  hr: {
    height: "3px",
    color: "rgb(210, 210, 210)",
    background: "rgb(210, 210, 210)",
    width: "100%",
    boxShadow: 3,
  },
});

const boxTime = {
  display: "flex",
  flexDirection: { sm: "row", xs: "column" },
  height: { sm: "50px", xs: "130px" },
  justifyContent: "space-between",
  width: { xl: "40%", lg: "60%", md: "80%", sm: "100%" },
  mt: 1,
  mb: 6,
};

const boxDuracion = {
  display: "flex",
  flexDirection: { md: "row", sm: "column", xs: "column" },

  justifyContent: "space-between",
  width: { xl: "50%", md: "70%", sm: "90%", xs: "100%" },
  mt: 1,
  mb: 6,
  height: "auto",
};

const boxOpciones = {
  display: "flex",
  flexDirection: { md: "row", sm: "column", xs: "column" },
  width: "100%",
  mt: 1,
  mb: 5,
};

const validationSchema = object({
  inicioDisponibilidad: date().required("Este campo es requerido"),
  finDisponibilidad: date().required("Este campo es requerido"),
  inicioEmpadronamiento: date().required("Este campo es requerido"),
  finEmpadronamiento: date().required("Este campo es requerido"),
  inicioRecepcionVotos: date().required("Este campo es requerido"),
  finRecepcionVotos: date().required("Este campo es requerido"),
  inicioAsignacionContrasenia: date().required("Este campo es requerido"),
  finAsignacionContrasenia: date().required("Este campo es requerido"),
  // tiempoDuracionVoto: date().required("Este campo es requerido"),
  // tiempoExtra: date().required("Este campo es requerido"),
});

export const ConfiguracionJornada = () => {
  const styles = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(new Date());
  const { configJornada, isLoadingConfigJornada, errorJornada } = useSelector(
    (state) => state.configJornada
  );

  useEffect(() => {
    dispatch(getConfigJornada(id));
  }, []);

  useEffect(() => {
    dispatch(getConfigJornada(id));
  }, []);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onSubmit = (values) => {
    const data = {
      inicioDisponibilidad: new Date(values.inicioDisponibilidad).toISOString(),
      finDisponibilidad: new Date(values.finDisponibilidad).toISOString(),
      inicioEmpadronamiento: new Date(
        values.inicioEmpadronamiento
      ).toISOString(),
      finEmpadronamiento: new Date(values.finEmpadronamiento).toISOString(),
      inicioRecepcionVotos: new Date(values.inicioRecepcionVotos).toISOString(),
      finRecepcionVotos: new Date(values.finRecepcionVotos).toISOString(),
      inicioAsignacionContrasenia: new Date(
        values.inicioAsignacionContrasenia
      ).toISOString(),
      finAsignacionContrasenia: new Date(
        values.finAsignacionContrasenia
      ).toISOString(),
      tiempoDuracionVoto: values.tiempoDuracionVoto,
      tiempoExtra: values.tiempoExtra,
      habilitarVerificacion: values.habilitarVerificacion,
    };
    console.log(data);

    // dispatch(
    // 	onSaveConfig(params.idConsulta, data, () => {
    // 		navigate("/preparacion/consulta/");
    // 	})
    // );
  };
  return (
    <PlantillaHeader titulo="CONFIGURACIÓN JORNADA">
      {isLoadingConfigJornada ? (
        <Stack
          justifyContent="center"
          sx={{ color: "grey.500" }}
          spacing={2}
          direction="row"
        >
          <CircularProgress color="primary" />
        </Stack>
      ) : (
        configJornada && (
          <Stack
            className="animate__animated animate__bounceInUp "
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              background: "#ffffff",
              p: "2rem",
              height: "auto",
              borderRadius: "20px",
              boxShadow: 3,
            }}
          >
            <Formik
              initialValues={{
                inicioDisponibilidad: dayjs(configJornada.inicioDisponibilidad),
                finDisponibilidad: dayjs(configJornada.finDisponibilidad),
                inicioEmpadronamiento: dayjs(
                  configJornada.inicioEmpadronamiento
                ),
                finEmpadronamiento: dayjs(configJornada.finEmpadronamiento),
                inicioRecepcionVotos: dayjs(configJornada.inicioRecepVoto),
                finRecepcionVotos: dayjs(configJornada.finRecepVoto),
                inicioAsignacionContrasenia: dayjs(
                  configJornada.inicioAssignPass
                ),
                finAsignacionContrasenia: dayjs(configJornada.finAssignPass),
                tiempoDuracionVoto: configJornada.configVote.tiempoDuracionVoto,
                tiempoExtra: configJornada.configVote.tiempoExtraVoto,
                habilitarVerificacion:
                  configJornada.configVote.dispVerificacion,
                isDisabled: false,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                // console.log(values);
                onSubmit(values);
              }}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                errors,
                touched,
                setFieldValue,
              }) => (
                <Form className={styles.fomi}>
                  <Box sx={{}}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      DISPONIBILIDAD DEL SISTEMA
                    </Typography>
                    <hr className={styles.hr} />
                  </Box>

                  <Box sx={boxTime}>
                    <DateFieldWithTitle
                      label={"INICIO"}
                      name={"inicioDisponibilidad"}
                      value={values.inicioDisponibilidad}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.inicioDisponibilidad}
                      touched={touched.inicioDisponibilidad}
                      isDisabled={values.isDisabled}
                    />
                    <DateFieldWithTitle
                      label={"FINALIZACIÓN"}
                      name={"finDisponibilidad"}
                      value={values.finDisponibilidad}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.finDisponibilidad}
                      touched={touched.finDisponibilidad}
                      minDate={values.inicioDisponibilidad}
                      isDisabled={values.isDisabled}
                    />
                  </Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    RECEPCIÓN DE EMPADRONAMIENTO
                  </Typography>
                  <hr className={styles.hr} />
                  <Box sx={boxTime}>
                    <DateFieldWithTitle
                      label={"INICIO"}
                      name={"inicioEmpadronamiento"}
                      value={values.inicioEmpadronamiento}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.inicioEmpadronamiento}
                      touched={touched.inicioEmpadronamiento}
                      isDisabled={values.isDisabled}
                    />

                    <DateFieldWithTitle
                      label={"FINZALIZACIÓN"}
                      name={"finEmpadronamiento"}
                      value={values.finEmpadronamiento}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.finEmpadronamiento}
                      touched={touched.finEmpadronamiento}
                      minDate={values.inicioEmpadronamiento}
                      isDisabled={values.isDisabled}
                    />
                  </Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    RECEPCIÓN DE VOTACIÓN
                  </Typography>
                  <hr className={styles.hr} />
                  <Box sx={boxTime}>
                    <DateFieldWithTitle
                      label={"INICIO DE RECEPCIÓN"}
                      name={"inicioRecepcionVotos"}
                      value={values.inicioRecepcionVotos}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.inicioRecepcionVotos}
                      touched={touched.inicioRecepcionVotos}
                      isDisabled={values.isDisabled}
                    />

                    <DateFieldWithTitle
                      label={"FINZALIZACIÓN"}
                      name={"finRecepcionVotos"}
                      value={values.finRecepcionVotos}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.finRecepcionVotos}
                      touched={touched.finRecepcionVotos}
                      minDate={values.inicioRecepcionVotos}
                      isDisabled={values.isDisabled}
                    />
                  </Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    ASIGNACIÓN DE CONTRASEÑAS
                  </Typography>
                  <hr className={styles.hr} />
                  <Box sx={boxTime}>
                    <DateFieldWithTitle
                      label={"INICIO"}
                      name={"inicioAsignacionContrasenia"}
                      value={values.inicioAsignacionContrasenia}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.inicioAsignacionContrasenia}
                      touched={touched.inicioAsignacionContrasenia}
                      isDisabled={values.isDisabled}
                    />

                    <DateFieldWithTitle
                      label={"FINZALIZACIÓN"}
                      name={"finAsignacionContrasenia"}
                      value={values.finAsignacionContrasenia}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.finAsignacionContrasenia}
                      touched={touched.finAsignacionContrasenia}
                      minDate={values.inicioAsignacionContrasenia}
                      isDisabled={values.isDisabled}
                    />
                  </Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    DURACIÓN VOTO
                  </Typography>
                  <hr className={styles.hr} />
                  <Box sx={boxDuracion}>
                    <HoraField
                      name="tiempoDuracionVoto"
                      tiempo={values.tiempoDuracionVoto}
                      handleChange={handleChange}
                      titulo="Duración normal"
                    ></HoraField>
                    <HoraField
                      name="tiempoExtra"
                      tiempo={values.tiempoExtra}
                      handleChange={handleChange}
                      titulo="Tiempo extra"
                    ></HoraField>
                  </Box>
                  <Typography sx={{ fontWeight: "bold" }}>EXTRA</Typography>
                  <hr className={styles.hr} />
                  <Box sx={boxOpciones}>
                    <FormControlLabel
                      control={
                        <Switch
                          name={"habilitarVerificacion"}
                          checked={values.habilitarVerificacion}
                          onChange={handleChange}
                        />
                      }
                      label="Verificación del sentido del sufragio por parte del votante"
                    />
                  </Box>

                  <Box
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
                      GUARDAR
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        width: { sm: `150px`, xs: "150px" },
                        backgroundColor: "error.main",
                        borderRadius: "15px",
                        ml: 1,
                      }}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Stack>
        )
      )}
    </PlantillaHeader>
  );
};
