import {
  Alert,
  Button,
  Grid,
  Hidden,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { onLogin } from "../../store/auth/authSlice";
import { onLoginWithEmailAndPassword } from "../../store/auth/authThunks";

const validationSchema = object({
  // correo: string("Ingresa tu correo").email().required("Este campo es requerido"),
  curp: string("Ingresa tu correo").required("Este campo es requerido"),
  contrasenia: string("Ingresa tu contraseña").required(
    "Este campo es requerido"
  ),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(
      onLoginWithEmailAndPassword(values.curp, values.contrasenia, () => {
        navigate("/preparacion/inicio");
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
              flexDirection="column"
              justifyContent="center"
              alignItems={"stretch"}
              sx={{ padding: "2rem", width: "100%" }}
            >
              <Box display={"flex"} flexDirection="column" px={"2rem"}>
                <Typography
                  variant="h5"
                  color="initial"
                  textAlign={"center"}
                  mb={"2rem"}
                >
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
                  {({
                    handleChange,
                    values,
                    errors,
                    touched,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        name="curp"
                        fullWidth
                        size="small"
                        id="curp"
                        label="CURP"
                        variant="standard"
                        onChange={handleChange}
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
                        type="password"
                        onChange={handleChange}
                        value={values.contrasenia}
                        error={
                          touched.contrasenia && Boolean(errors.contrasenia)
                        }
                        helperText={touched.contrasenia && errors.contrasenia}
                        sx={{ marginBottom: "2rem" }}
                      />
                      <Box textAlign={"center"} mb={"2rem"}>
                        <Link to="/auth/recuperacion">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        // disabled={status === "checking"}
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
                      </Button>
                    </form>
                  )}
                </Formik>
                {!isOnline && (
                  <Alert sx={{ mt: 3, mb: 3 }} severity="error">
                    Error en la conexión a internet
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
