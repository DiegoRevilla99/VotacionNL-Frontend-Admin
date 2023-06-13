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
import { Formik } from "formik";
import React from "react";
import { ButtonsContainer } from "../components/ButtonsContainer";
import { DateFieldWithTitle } from "../components/DateFieldWithTitle";
import { TimeFieldWithTitle } from "../components/TimeFieldWithTitle";
import { object, string, date } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onSaveConfig } from "../../store/module-preparacion/consulta-ciudadana/thunks";
import dayjs from "dayjs";
import { BreadCrumbsCustom } from "../../module-empadronamiento/components/BreadCrumbsCustom";
import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";

const validationSchema = object({
  // inicioDisponibilidad: date().required("Este campo es requerido"),
  // finDisponibilidad: date().required("Este campo es requerido"),
  inicioEmpadronamiento: date().required("Este campo es requerido"),
  finEmpadronamiento: date().required("Este campo es requerido"),
  inicioRecepcionVotos: date().required("Este campo es requerido"),
  finRecepcionVotos: date().required("Este campo es requerido"),
  // inicioAsignacionContrasenia: date().required("Este campo es requerido"),
  // finAsignacionContrasenia: date().required("Este campo es requerido"),
  tiempoDuracionRespuesta: date().required("Este campo es requerido"),
  // tiempoExtra: date().required("Este campo es requerido"),
});

export const ConfiguracionConsulta = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { consultaSelected } = useConsultaCiudadanaStore();
  const { status, configSelected } = useSelector((state) => state.consultaCiudadana);

  console.log("selected", consultaSelected);

  const onCancel = () => {
    navigate("/preparacion/registroConsultaCiudadana");
  };

  const onSubmit = (values) => {
    const data = {
      // inicioDisponibilidad: new Date(values.inicioDisponibilidad).toISOString(),
      // finDisponibilidad: new Date(values.finDisponibilidad).toISOString(),
      inicioEmpadronamiento: new Date(values.inicioEmpadronamiento).toISOString(),
      finEmpadronamiento: new Date(values.finEmpadronamiento).toISOString(),
      inicioRecepcionVotos: new Date(values.inicioRecepcionVotos).toISOString(),
      finRecepcionVotos: new Date(values.finRecepcionVotos).toISOString(),
      // inicioAsignacionContrasenia: new Date(values.inicioAsignacionContrasenia).toISOString(),
      // finAsignacionContrasenia: new Date(values.finAsignacionContrasenia).toISOString(),
      tiempoDuracionRespuesta: new Date(values.tiempoDuracionRespuesta)
        .toTimeString()
        .substring(0, 8),
      // tiempoExtra: new Date(values.tiempoExtra).toTimeString().substring(0, 8),
      tiempoExtra: "00:10:00",
      habilitarVerificacion: values.habilitarVerificacion,
    };
    console.log("datafinal", data);

    dispatch(
      onSaveConfig(params.idConsulta, data, () => {
        navigate("/preparacion/registroConsultaCiudadana");
      })
    );
  };

  if (status === "checking")
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  else
    return (
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        <BreadCrumbsCustom
          routes={[
            {
              name: "PREPARACIÓN",
              url: "/preparacion/inicio",
            },
            {
              name: "CONSULTAS CIUDADANAS",
              url: "/preparacion/registroConsultaCiudadana",
            },
          ]}
          currentRoute={consultaSelected.title}
        ></BreadCrumbsCustom>
        <Box sx={{ m: "0.5rem", ml: "2rem" }}>
          <Typography variant="h6" align="left" color="initial">
            CONFIGURACIÓN DE CONSULTA CIUDADANA
          </Typography>
        </Box>
        <Divider />
        <Box
          m={"2rem"}
          sx={{
            boxShadow: 1,
            backgroundColor: "white",
            mt: "2rem",
            borderRadius: "2rem",
            p: "2rem",
            pt: "1rem",
          }}
        >
          <Formik
            initialValues={
              Object.values(configSelected).length === 0
                ? {
                    inicioDisponibilidad: dayjs(null),
                    finDisponibilidad: dayjs(null),
                    // inicioEmpadronamiento: "",
                    inicioEmpadronamiento: dayjs(null),
                    finEmpadronamiento: dayjs(null),
                    inicioRecepcionVotos: dayjs(null),
                    finRecepcionVotos: dayjs(null),
                    inicioAsignacionContrasenia: dayjs(null),
                    finAsignacionContrasenia: dayjs(null),
                    tiempoDuracionRespuesta: "",
                    tiempoExtra: "",
                    habilitarVerificacion: false,
                    isDisabled: false,
                  }
                : {
                    inicioDisponibilidad: dayjs(configSelected.inicioDisponibilidad),
                    finDisponibilidad: dayjs(configSelected.finDisponibilidad),
                    inicioEmpadronamiento: dayjs(configSelected.inicioEmpadronamiento),
                    finEmpadronamiento: dayjs(configSelected.finEmpadronamiento),
                    inicioRecepcionVotos: dayjs(configSelected.inicioRecepVoto),
                    finRecepcionVotos: dayjs(configSelected.finRecepVoto),
                    inicioAsignacionContrasenia: dayjs(configSelected.inicioAssignPass),
                    finAsignacionContrasenia: dayjs(configSelected.finAssignPass),
                    tiempoDuracionRespuesta: dayjs(
                      new Date(
                        0,
                        0,
                        0,
                        0,
                        configSelected?.tiempoDuracionVoto?.substring(3, 5),
                        configSelected?.tiempoDuracionVoto?.substring(6, 8)
                      )
                    ),
                    tiempoExtra: new Date(
                      0,
                      0,
                      0,
                      0,
                      configSelected?.tiempoExtraVoto?.substring(3, 5),
                      configSelected?.tiempoExtraVoto?.substring(6, 8)
                    ),
                    habilitarVerificacion: configSelected.dispVerificacion,
                    isDisabled: true,
                  }
            }
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // console.log(values);
              onSubmit(values);
            }}
          >
            {({ values, handleSubmit, handleChange, errors, touched, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                {/* {values.isDisabled && (
                  <Typography variant="h6" color="red" justifyContent={"center"} textAlign="center">
                    ESTA CONFIGURACIÓN YA NO SE PUEDE MODIFICAR
                  </Typography>
                )} */}
                {values.isDisabled && (
                  <Alert severity="info">
                    <AlertTitle>JORNADA CONFIGURADA</AlertTitle>
                    No se permiten modificaciones una vez que la jornada haya sido configurada.
                  </Alert>
                )}
                {/* {console.log("values", values)} */}
                <Grid container spacing={6} pt="1rem">
                  {/* <Grid item xs={12} md={6} mt="0.5rem">
										<DateFieldWithTitle
											label={
												"FECHA Y HORA DE INICIO DE LA DISPONIBILIDAD DEL SISTEMA"
											}
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
											label={
												"FECHA Y HORA DE FINALIZACIÓN DE LA DISPONIBILIDAD DEL SISTEMA"
											}
											name={"finDisponibilidad"}
											value={values.finDisponibilidad}
											setFieldValue={setFieldValue}
											handleChange={handleChange}
											error={errors.finDisponibilidad}
											touched={touched.finDisponibilidad}
											minDate={values.inicioDisponibilidad}
											isDisabled={values.isDisabled}
										/>
									</Grid> */}
                  <Grid item xs={12}>
                    <Typography
                      sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
                      variant="subtitle2"
                      textAlign="left"
                      color="primary"
                    >
                      PASO 1.- CONFIGURA LAS FECHAS DE EMPADRONAMIENTO
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DateFieldWithTitle
                      label={"FECHA Y HORA DE INICIO DE RECEPCIÓN DE EMPADRONAMIENTO"}
                      name={"inicioEmpadronamiento"}
                      value={values.inicioEmpadronamiento}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.inicioEmpadronamiento}
                      touched={touched.inicioEmpadronamiento}
                      isDisabled={values.isDisabled}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DateFieldWithTitle
                      label={"FECHA Y HORA DE FINALIZACIÓN DE RECEPCIÓN DE EMPADRONAMIENTO"}
                      name={"finEmpadronamiento"}
                      value={values.finEmpadronamiento}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.finEmpadronamiento}
                      touched={touched.finEmpadronamiento}
                      minDate={values.inicioEmpadronamiento.minute(
                        values.inicioEmpadronamiento.minute() + 1
                      )}
                      isDisabled={values.isDisabled || isNaN(values.inicioEmpadronamiento.$D)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
                      variant="subtitle2"
                      textAlign="left"
                      color="primary"
                    >
                      PASO 2.- CONFIGURA LAS FECHAS DE RECEPCIÓN DE VOTOS
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DateFieldWithTitle
                      label={"FECHA Y HORA DE INICIO DE RECEPCIÓN DE VOTACIÓN"}
                      name={"inicioRecepcionVotos"}
                      value={values.inicioRecepcionVotos}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.inicioRecepcionVotos}
                      touched={touched.inicioRecepcionVotos}
                      isDisabled={values.isDisabled || isNaN(values.finEmpadronamiento.$D)}
                      minDate={values.finEmpadronamiento.minute(
                        values.finEmpadronamiento.minute() + 1
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DateFieldWithTitle
                      label={"FECHA Y HORA DE FINALIZACIÓN DE RECEPCIÓN DE VOTACIÓN"}
                      name={"finRecepcionVotos"}
                      value={values.finRecepcionVotos}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.finRecepcionVotos}
                      touched={touched.finRecepcionVotos}
                      minDate={values.inicioRecepcionVotos.minute(1)}
                      isDisabled={values.isDisabled || isNaN(values.inicioRecepcionVotos.$D)}
                    />
                  </Grid>
                  {/* <Grid item xs={12} md={6} mt="0.5rem">
										<DateFieldWithTitle
											label={
												"FECHA Y HORA DE INICIO DE ASIGNACIÓN DE CONTRASEÑAS"
											}
											name={"inicioAsignacionContrasenia"}
											value={values.inicioAsignacionContrasenia}
											setFieldValue={setFieldValue}
											handleChange={handleChange}
											error={errors.inicioAsignacionContrasenia}
											touched={touched.inicioAsignacionContrasenia}
											isDisabled={values.isDisabled}
										/>
									</Grid>
									<Grid item xs={12} md={6} mt="0.5rem">
										<DateFieldWithTitle
											label={
												"FECHA Y HORA DE FINALIZACIÓN DE ASIGNACIÓN DE CONTRASEÑAS"
											}
											name={"finAsignacionContrasenia"}
											value={values.finAsignacionContrasenia}
											setFieldValue={setFieldValue}
											handleChange={handleChange}
											error={errors.finAsignacionContrasenia}
											touched={touched.finAsignacionContrasenia}
											minDate={values.inicioAsignacionContrasenia}
											isDisabled={values.isDisabled}
										/>
									</Grid> */}
                  <Grid item xs={12}>
                    <Typography
                      sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
                      variant="subtitle2"
                      textAlign="left"
                      color="primary"
                    >
                      PASO 3.- CONFIGURA LA DURACIÓN DEL VOTO Y LA VERIFICACION DEL SENTIDO DEL
                      SUFRAGIO
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} mt="0.5rem">
                    <TimeFieldWithTitle
                      label={"TIEMPO DE DURACIÓN DEL VOTO (mm:ss)"}
                      name={"tiempoDuracionRespuesta"}
                      value={values.tiempoDuracionRespuesta}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.tiempoDuracionRespuesta}
                      touched={touched.tiempoDuracionRespuesta}
                      isDisabled={values.isDisabled}
                    />
                  </Grid>
                  {/* <Grid item xs={6} md={3} mt="0.5rem">
                    <TimeFieldWithTitle
                      label={"TIEMPO EXTRA PARA EL VOTANTE (mm:ss)"}
                      name={"tiempoExtra"}
                      value={values.tiempoExtra}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      error={errors.tiempoExtra}
                      touched={touched.tiempoExtra}
                      isDisabled={values.isDisabled}
                    />
                  </Grid> */}
                  <Grid item xs={12} md={6} mt="0.5rem" textAlign="center">
                    <Typography variant="subtitle2" color="initial">
                      HABILITAR VERIFICACIÓN DEL SENTIDO DEL SUFRAGIO POR PARTE DEL VOTANTE
                    </Typography>
                    <Switch
                      name="habilitarVerificacion"
                      onChange={(event) =>
                        setFieldValue("habilitarVerificacion", event.target.checked, true)
                      }
                      checked={values.habilitarVerificacion}
                      value={values.habilitarVerificacion}
                      disabled={values.isDisabled}
                    />
                  </Grid>
                </Grid>
                <ButtonsContainer onCancel={onCancel} isDisabled={values.isDisabled} />
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    );
};
