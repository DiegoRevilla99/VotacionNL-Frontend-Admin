import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Switch,
  Typography,
} from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import React, { useEffect } from "react";
import { ButtonsContainer } from "../components/ButtonsContainer";
import { DateFieldWithTitle } from "../components/DateFieldWithTitle";
import { TimeFieldWithTitle } from "../components/TimeFieldWithTitle";
import { object, string, date } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onSaveConfig } from "../../store/module-preparacion/consulta-ciudadana/thunks";
import dayjs from "dayjs";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import {
  getConfigJornada,
  getConfigJornadaNF,
  getJornadatoConfig,
  getJornadatoConfigNF,
  postConfiguracion,
  postConfiguracionNF,
  putConfiguracion,
} from "../../store/module-preparacion/configuracion-jornada/thunksConfigJornada";
import { ErrorField } from "../components/ErrorField";

const validationSchema = object({
  //inicioDisponibilidad: date().required("Este campo es requerido"),
  //finDisponibilidad: date().required("Este campo es requerido"),
  inicioEmpadronamiento: date().required("Este campo es requerido"),
  finEmpadronamiento: date().required("Este campo es requerido"),
  inicioRecepVoto: date().required("Este campo es requerido"),
  finRecepVoto: date().required("Este campo es requerido"),
  // inicioAssignPass: date().required("Este campo es requerido"),
  // finAssignPass: date().required("Este campo es requerido"),
  tiempoDuracionRespuesta: date().required("Este campo es requerido"),
  tiempoExtra: date().required("Este campo es requerido"),
});

export const ConfiguracionJornadaNF = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    status,
    configJornada,
    jornada,
    errorJornada,
    isLoadingConfigJornada,
  } = useSelector((state) => state.configJornada);

  const onCancel = () => {
    navigate("/preparacion/registroJornadaNoFormal");
  };

  useEffect(() => {
    dispatch(getConfigJornadaNF(id));
    dispatch(getJornadatoConfigNF(id));
  }, []);

  useEffect(() => {}, [jornada]);

  const onSubmit = (values) => {
    const data = {
      configuracionModel: {
        inicioDisponibilidad: new Date(values.inicioDisponibilidad),
        finDisponibilidad: new Date(values.finDisponibilidad),
        inicioEmpadronamiento: new Date(values.inicioEmpadronamiento),
        finEmpadronamiento: new Date(values.finEmpadronamiento),
        inicioRecepVoto: new Date(values.inicioRecepVoto),
        finRecepVoto: new Date(values.finRecepVoto),
        inicioAssignPass: new Date(values.inicioAssignPass),
        finAssignPass: new Date(values.finAssignPass),
      },
      configuracionVotoModel: {
        tiempoDuracionVoto: new Date(values.tiempoDuracionRespuesta)
          .toTimeString()
          .substring(0, 8),
        tiempoExtraVoto: new Date(values.tiempoExtra)
          .toTimeString()
          .substring(0, 8),
        dispVerificacion: values.habilitarVerificacion,
      },
    };

    console.log(data);

    dispatch(
      postConfiguracionNF(id, data, () => {
        navigate("/preparacion/registroJornadaNoFormal");
      })
    );
  };

  const validando = (values, props) => {
    console.log(values.inicioDisponibilidad);
    const errors = {};
    /* if (values.inicioDisponibilidad >= values.finDisponibilidad) {
      errors.finDisponibilidad =
        "La fecha de inicial no puede ser menor o igual que la final";
    } */

    //Por corroborar uso
    /* if (values.finDisponibilidad >= values.inicioEmpadronamiento) {
      errors.inicioEmpadronamiento =
        "El empadornamiento debe ser posterior a la fin de disponibilidad del sistema";
    }    */
    /* if (values.finEmpadronamiento >= values.inicioAssignPass) {
      errors.inicioAssignPass =
        "La asignación de contraseñas debe ser posterior al empadronamiento";
    } */
    /*  if (values.finAssignPass >= values.inicioRecepVoto) {
      errors.inicioRecepVoto =
        "La recepción de votos debe ser posterior a la asignacion de contraseñas";
    } */

    if (values.inicioEmpadronamiento >= values.finEmpadronamiento) {
      errors.finEmpadronamiento =
        "La fecha de inicial no puede ser menor o igual que la final";
    }

    if (values.finEmpadronamiento >= values.inicioRecepVoto) {
      errors.inicioRecepVoto =
        "La recepción de votos debe ser posterior al empadronamiento";
    }

    if (values.inicioRecepVoto >= values.finRecepVoto) {
      errors.finRecepVoto =
        "La fecha de inicial no puede ser menor o igual que la final";
    }

    /* if (values.inicioAssignPass >= values.finAssignPass) {
      errors.finAssignPass =
        "La fecha de inicial no puede ser menor o igual que la final";
    } */

    return errors;
  };

  if (isLoadingConfigJornada)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  else
    return (
      <Box sx={{ height: "auto", overflowY: "auto" }}>
        <Box sx={{ display: "flex", ml: "2rem", mt: "1.5rem" }}>
          <Typography variant="h6" sx={{ mr: 2 }} align="left" color="initial">
            CONFIGURACIONES
          </Typography>

          <SettingsSuggestIcon fontSize="large" />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            m={"2rem"}
            sx={{
              width: { md: "75%", xs: "100%" },
              boxShadow: 1,
              backgroundColor: "white",
              height: "auto",
              mt: "2rem",
              borderRadius: "2rem",
              p: "4rem",
              pt: "1rem",
            }}
          >
            <Typography
              sx={{ mt: "1rem", mb: "1rem" }}
              variant="h6"
              textAlign="center"
              color="initial"
            >
              {jornada.nombreEleccion}
            </Typography>

            <Formik
              initialValues={
                !configJornada?.configuracionVotoModel
                  ? {
                      inicioDisponibilidad: new Date(),
                      finDisponibilidad: new Date(),
                      inicioEmpadronamiento: dayjs(null),
                      finEmpadronamiento: dayjs(null),
                      inicioRecepVoto: dayjs(null),
                      finRecepVoto: dayjs(null),
                      inicioAssignPass: new Date(),
                      finAssignPass: new Date(),
                      tiempoDuracionRespuesta: "",
                      tiempoExtra: "",
                      habilitarVerificacion: false,
                      isDisabled: false,
                    }
                  : {
                      inicioDisponibilidad: dayjs(
                        configJornada.configuracionModel?.inicioDisponibilidad
                      ),
                      finDisponibilidad: dayjs(configJornada.finDisponibilidad),
                      inicioEmpadronamiento: dayjs(
                        configJornada.configuracionModel?.inicioEmpadronamiento
                      ),
                      finEmpadronamiento: dayjs(
                        configJornada.configuracionModel?.finEmpadronamiento
                      ),
                      inicioRecepVoto: dayjs(
                        configJornada.configuracionModel?.inicioRecepVoto
                      ),
                      finRecepVoto: dayjs(
                        configJornada.configuracionModel?.finRecepVoto
                      ),
                      inicioAssignPass: dayjs(
                        configJornada.configuracionModel?.inicioAssignPass
                      ),
                      finAssignPass: dayjs(
                        configJornada.configuracionModel?.finAssignPass
                      ),
                      tiempoDuracionRespuesta: dayjs(
                        new Date(
                          0,
                          0,
                          0,
                          0,
                          configJornada.configuracionVotoModel?.tiempoDuracionVoto?.substring(
                            3,
                            5
                          ),
                          configJornada.configuracionVotoModel?.tiempoDuracionVoto?.substring(
                            6,
                            8
                          )
                        )
                      ),
                      tiempoExtra: new Date(
                        0,
                        0,
                        0,
                        0,
                        configJornada.configuracionVotoModel?.tiempoExtraVoto?.substring(
                          3,
                          5
                        ),
                        configJornada.configuracionVotoModel?.tiempoExtraVoto?.substring(
                          6,
                          8
                        )
                      ),
                      habilitarVerificacion:
                        configJornada.configuracionVotoModel?.dispVerificacion,
                      isDisabled: true,
                    }
              }
              validationSchema={validationSchema}
              validate={validando}
              onSubmit={(values) => {
                console.log("valores antes de enviar: ", values);
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
                <form onSubmit={handleSubmit}>
                  {values.isDisabled && (
                    <Alert severity="warning">
                      <AlertTitle>JORNADA CONFIGURADA</AlertTitle>
                      No se permiten modificaciones una vez la jornada haya sido
                      configurada.
                    </Alert>
                  )}

                  <Grid
                    container
                    rowSpacing={0}
                    columnSpacing={{ md: 6 }}
                    pt="1rem"
                    mb="2rem"
                  >
                    {/* <Grid item xs={12} md={6} mt="0.5rem">
                      <DateFieldWithTitle
                        label={"INICIO DE LA DISPONIBILIDAD DEL SISTEMA"}
                        name={"inicioDisponibilidad"}
                        value={values.inicioDisponibilidad}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        error={errors.inicioDisponibilidad}
                        touched={touched.inicioDisponibilidad}
                        isDisabled={values.isDisabled}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} mt="0.5rem">
                      <DateFieldWithTitle
                        label={"FINALIZACIÓN DE LA DISPONIBILIDAD DEL SISTEMA"}
                        name={"finDisponibilidad"}
                        value={values.finDisponibilidad}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        error={errors.finDisponibilidad}
                        touched={touched.finDisponibilidad}
                        minDate={values.inicioDisponibilidad}
                        isDisabled={values.isDisabled }
                      />
                    </Grid>
                    <br /> */}
                    <Grid item xs={12}>
                      <Typography
                        sx={{}}
                        variant="subtitle2"
                        textAlign="left"
                        color="initial"
                      >
                        1. EMPADRONAMIENTO
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} mt="0.5rem" mb="2rem">
                      <DateFieldWithTitle
                        label={"INICIO DE RECEPCIÓN DE EMPADRONAMIENTO"}
                        name={"inicioEmpadronamiento"}
                        value={values.inicioEmpadronamiento}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        error={errors.inicioEmpadronamiento}
                        touched={touched.inicioEmpadronamiento}
                        isDisabled={values.isDisabled}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} mt="0.5rem" mb="2rem">
                      <DateFieldWithTitle
                        label={"FINALIZACIÓN DE RECEPCIÓN DE EMPADRONAMIENTO"}
                        name={"finEmpadronamiento"}
                        value={values.finEmpadronamiento}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        error={errors.finEmpadronamiento}
                        touched={touched.finEmpadronamiento}
                        minDate={values.inicioEmpadronamiento.minute(
                          values.inicioEmpadronamiento.minute() + 1
                        )}
                        isDisabled={values.isDisabled}
                      />
                    </Grid>

                    {/* <Grid item xs={12} md={6} mt="0.5rem">
                      <DateFieldWithTitle
                        label={"INICIO DE ASIGNACIÓN DE CONTRASEÑAS"}
                        name={"inicioAssignPass"}
                        value={values.inicioAssignPass}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        error={errors.inicioAssignPass}
                        touched={touched.inicioAssignPass}
                        isDisabled={values.isDisabled}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} mt="0.5rem">
                      <DateFieldWithTitle
                        label={"FINALIZACIÓN DE ASIGNACIÓN DE CONTRASEÑAS"}
                        name={"finAssignPass"}
                        value={values.finAssignPass}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        error={errors.finAssignPass}
                        touched={touched.finAssignPass}
                        minDate={values.inicioAssignPass}
                        isDisabled={values.isDisabled}
                      />
                    </Grid> */}
                    <Grid item xs={12}>
                      <Typography
                        sx={{}}
                        variant="subtitle2"
                        textAlign="left"
                        color="initial"
                      >
                        2. RECEPCIÓN DE VOTACIÓN
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} mt="0.5rem" mb="2rem">
                      <DateFieldWithTitle
                        label={"INICIO DE RECEPCIÓN DE VOTACIÓN"}
                        name={"inicioRecepVoto"}
                        value={values.inicioRecepVoto}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        error={errors.inicioRecepVoto}
                        touched={touched.inicioRecepVoto}
                        isDisabled={
                          values.isDisabled ||
                          values.finEmpadronamiento.$d == "Invalid Date"
                        }
                        minDate={values.finEmpadronamiento.minute(
                          values.finEmpadronamiento.minute() + 1
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} mt="0.5rem" mb="2rem">
                      <DateFieldWithTitle
                        label={"FINALIZACIÓN DE RECEPCIÓN DE VOTACIÓN"}
                        name={"finRecepVoto"}
                        value={values.finRecepVoto}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        error={errors.finRecepVoto}
                        touched={touched.finRecepVoto}
                        minDate={values.inicioRecepVoto.minute(
                          values.inicioRecepVoto.minute() + 1
                        )}
                        isDisabled={
                          values.isDisabled ||
                          values.finEmpadronamiento.$d == "Invalid Date"
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        sx={{}}
                        variant="subtitle2"
                        textAlign="left"
                        color="initial"
                      >
                        3. DURACIÓN DEL VOTO
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} mt="0.5rem">
                      <TimeFieldWithTitle
                        label={"DURACIÓN DEL VOTO"}
                        name={"tiempoDuracionRespuesta"}
                        value={values.tiempoDuracionRespuesta}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        error={errors.tiempoDuracionRespuesta}
                        touched={touched.tiempoDuracionRespuesta}
                        isDisabled={
                          values.isDisabled ||
                          values.finRecepVoto.$d == "Invalid Date"
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={3} mt="0.5rem">
                      <TimeFieldWithTitle
                        label={"TIEMPO EXTRA"}
                        name={"tiempoExtra"}
                        value={values.tiempoExtra}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        error={errors.tiempoExtra}
                        touched={touched.tiempoExtra}
                        isDisabled={
                          values.isDisabled ||
                          values.finRecepVoto.$d == "Invalid Date"
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6} mt="0.5rem" textAlign="center">
                      <Typography variant="subtitle2" color="initial">
                        VERIFICACIÓN DEL SENTIDO DEL SUFRAGIO POR PARTE DEL
                        VOTANTE
                      </Typography>
                      <Switch
                        name="habilitarVerificacion"
                        onChange={(event) =>
                          setFieldValue(
                            "habilitarVerificacion",
                            event.target.checked,
                            true
                          )
                        }
                        checked={values.habilitarVerificacion}
                        value={values.habilitarVerificacion}
                        disabled={
                          values.isDisabled ||
                          values.finRecepVoto.$d == "Invalid Date"
                        }
                      />
                    </Grid>
                  </Grid>
                  <ButtonsContainer
                    onCancel={onCancel}
                    isDisabled={
                      values.isDisabled ||
                      values.finRecepVoto.$d == "Invalid Date"
                    }
                  />
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    );
};
