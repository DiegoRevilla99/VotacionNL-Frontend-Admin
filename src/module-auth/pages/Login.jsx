import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { onLoginWithEmailAndPassword } from "../../store/auth/authThunks";

const validationSchema = object({
  // correo: string("Ingresa tu correo").email().required("Este campo es requerido"),
  curp: string("Ingresa tu correo").required("Este campo es requerido"),
  contrasenia: string("Ingresa tu contraseña").required("Este campo es requerido"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);

  console.log("status", status);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (values) => {
    dispatch(
      onLoginWithEmailAndPassword(values.curp, values.contrasenia, () => {
        navigate("/preparacion/inicioPage");
      })
    );
  };
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  const isScreenCompatible = useMediaQuery("(min-width: 800px)");

  if (!isScreenCompatible) {
    console.log("NO ES COMPATIBLE");
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Box display="flex" flexDirection="column" alignItems="center" maxWidth="300px">
          <Typography variant="body1" color="error" textAlign="center" mb={2}>
            NO PUEDE USAR EL SISTEMA EN ESTE TIPO DE PANTALLAS. POR FAVOR, INTÉNTELO EN OTRO
            DISPOSITIVO.
          </Typography>
          <Box width="100%" display="flex" justifyContent="center">
            <img
              src="https://media.discordapp.net/attachments/1071287057491693608/1121590202675249222/asdasd.png?width=878&height=480"
              alt="Imagen de advertencia"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f8f7f3",
        display: "flex !important",
        height: "100% !important",
        flexDirection: "column !important",
        justifyContent: "center !important",
      }}
    >
      <Box
        sx={{
          display: "flex !important",
          backgroundColor: "#f8f7f3",
          flexDirection: "row !important",
          justifyContent: "center !important",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f8f7f3",
            overflow: "auto",
            display: "flex !important",
            flexDirection: "row !important",
            justifyContent: "center !important",
            paddingTop: "8rem",
            paddingBottom: "8rem",
          }}
        >
          <Grid
            container
            sx={{
              height: "30rem",
              width: "60rem",
              bgcolor: "background.paper",
              borderRadius: "1rem",
              boxShadow: 1,
            }}
            justifyContent="center !important"
          >
            <Grid
              item
              sm={6}
              sx={{
                display: { xs: "none", sm: "flex" },
                backgroundColor: "#7E328B",
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
                padding: "2rem",
                color: "white",
              }}
              display="flex"
              justifyContent={"center"}
              // alignContent={"center"}
              alignItems="center"
            >
              {/* <Box display="flex" flexDirection={"column"}> */}
              <img
                src="https://www.ceenl.mx/VE2022/media/CEELOGO2.png"
                // height={"150px"}
                sx={{ height: { xs: "100px", sm: "80px" } }}
              />
              {/* </Box> */}
            </Grid>
            <Grid
              item
              sm={6}
              display="flex"
              height="100%"
              flexDirection="column"
              justifyContent="center"
              alignItems={"stretch"}
              sx={{ padding: "2rem", width: "100%" }}
            >
              <Box display={"flex"} flexDirection="column" px={"2rem"}>
                <Typography variant="h5" color="initial" textAlign={"center"} mb={"2rem"}>
                  BIENVENIDO AL PROTOTIPO DE SISTEMA DE VOTACIONES
                </Typography>

                <Formik
                  initialValues={{ correo: "", contrasenia: "", curp: "" }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log("FORMULARIO ENVIADO", values);
                    onSubmit(values);
                  }}
                >
                  {({ handleChange, values, errors, touched, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        name="curp"
                        fullWidth
                        size="small"
                        id="curp"
                        label="CURP"
                        variant="standard"
                        onChange={(event) =>
                          setFieldValue("curp", `${event.target.value.toUpperCase()}`)
                        }
                        value={values.curp}
                        error={touched.curp && Boolean(errors.curp)}
                        helperText={touched.curp && errors.curp}
                        sx={{ marginBottom: "2rem" }}
                      />
                      <TextField
                        name="contrasenia"
                        fullWidth
                        size="small"
                        id="contrasenia"
                        label="Contraseña"
                        variant="standard"
                        type={visible ? "text" : "password"}
                        onChange={handleChange}
                        value={values.contrasenia}
                        error={touched.contrasenia && Boolean(errors.contrasenia)}
                        helperText={touched.contrasenia && errors.contrasenia}
                        sx={{ marginBottom: "2rem" }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <IconButton onClick={() => setVisible(!visible)} edge="end">
                                  {visible ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {/* 
                      <Box textAlign={"center"} mb={"2rem"}>
                        <Link to="/auth/recuperacion">¿Olvidaste tu contraseña?</Link>
                      </Box> */}

                      <LoadingButton
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={status === "checking"}
                        sx={{
                          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
                          transition: "all 0.5s ease",
                          backgroundColor: "#511079",
                          width: "100%",
                          borderRadius: "2rem 2rem 2rem 2rem",
                          "&:hover": {
                            backgroundColor: "#7E328B !important",
                            transform: "translate(-5px, -5px)",
                            boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
                          },
                        }}
                      >
                        Acceder
                      </LoadingButton>
                    </form>
                  )}
                </Formik>
                {!isOnline && (
                  <Alert sx={{ mt: 3, mb: 3 }} severity="error">
                    Error en la conexión a internet
                  </Alert>
                )}
                {errorMessage && (
                  <Alert sx={{ mt: 3, mb: 3 }} severity="error">
                    {errorMessage}
                  </Alert>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
