import { PhotoCamera } from "@mui/icons-material";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";

import { useDispatch } from "react-redux";
import { ErrorField } from "./ErrorField";
import { BoxPartido } from "./BoxPartido";

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

const modalResponsive = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  width: { xl: "80%", sm: "90%", xs: "90%" },
  backgroundColor: "white",
  border: "1px solid rgba(0,0,0,0.0)",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-47%,-50%)",
  padding: "2rem",

  height: { xl: "85%", lg: "95%", sm: "97%", xs: "99%" },
  overflowY: "scroll",
  alignItems: "start",
};

let schema = yup.object().shape({
  nombre: yup.string().required("Nombre de la asociacion es necesario"),
});

export const ModalAsociacion = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  titulo = "titulo",
  enviar = () => {
    alert("Presionaste encviar del modal");
  },
}) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const [emblema, setEmblema] = useState({ name: "Sin Archivo seleccionado" });

  const cerrarM = () => {
    abrirCerrarModal();
    setEmblema({ name: "Sin Archivo seleccionado" });
  };

  const validando = (values, props) => {
    const errors = {};
    if (emblema.name === "Sin Archivo seleccionado") {
      errors.emblema = "Se necesita un emblema";
    }

    return errors;
  };

  const body = (
    <Box sx={modalResponsive}>
      <Formik
        initialValues={{
          nombre: "",
          emblema: "",
        }}
        validate={validando}
        validationSchema={schema}
        onSubmit={(valores) => {
          enviar();
        }}
      >
        {({ touched, errors, handleBlur, handleChange, values }) => (
          <Form className={styles.fomi}>
            <Box sx={{ width: "100%" }}>
              <div aling="left">
                <Typography sx={{ fontWeight: "bold", mb: 3 }}>
                  {titulo}
                </Typography>
              </div>
              <Typography>NOMBRE DE LA ASOCIACIÓN</Typography>
              <TextField
                required
                label=""
                variant="outlined"
                name="nombre"
                id="nombre"
                className={styles.textField}
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              ></TextField>
              <br />

              <ErrorMessage
                name="nombre"
                component={() => <ErrorField>{errors.nombre}</ErrorField>}
              />
              <br />
              <Typography>INSERTAR EMBLEMA DE LA ASOCIACIÓN</Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{ width: "100%" }}
                flexDirection="row"
              >
                <TextField
                  label=""
                  disabled
                  variant="outlined"
                  size="small"
                  value={emblema.name}
                  className={styles.textField}
                ></TextField>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  size="large"
                >
                  <input
                    hidden
                    onChange={(e) => setEmblema(e.target.files[0])}
                    onBlur={handleBlur}
                    accept="image/x-png,image/jpeg"
                    type="file"
                    name="emblema"
                    id="emblema"
                  />
                  <PhotoCamera fontSize="" />
                </IconButton>
              </Box>
              {touched.emblema &&
                emblema.name === "Sin Archivo seleccionado" && (
                  <ErrorField>{errors.emblema}</ErrorField>
                )}

              <Box
                sx={{
                  boxShadow: 1,
                  width: "100%",
                  height: "300px",
                  mt: 5,
                  p: 2,
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "15px",
                  // background: "#F1F1F1",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  SELECCIONE LOS CANDIDATOS DE ESTA ASOCIACÍON
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "200px",
                    overflowY: "scroll",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    p: 1,
                  }}
                >
                  {/* <BoxPartido name="Laura Yessenia Sanchez Lopez"> irial el checkBox</BoxPartido> */}

                  <BoxPartido name="Kevin EdilbertoChavez Sanchez"></BoxPartido>
                  <BoxPartido name="Jose Antonio Diego Revilla"></BoxPartido>
                </Box>
              </Box>
              <br />
            </Box>

            <Box display="flex" sx={{ width: "100%" }} justifyContent="end">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: { sm: `150px`, xs: "150px" },
                  borderRadius: "15px",
                }}
              >
                CREAR COALICIÓN
              </Button>
              <Button
                variant="contained"
                onClick={cerrarM}
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
    </Box>
  );
  return (
    <>
      <div className={styles.contenedor}>
        <Modal open={isOpen} onClose={cerrarM}>
          {body}
        </Modal>
      </div>
    </>
  );
};
