import { PhotoCamera } from "@mui/icons-material";
import * as yup from "yup";
import {
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { ErrorField } from "../components/ErrorField";
import { useDispatch } from "react-redux";
import { savePlanilla } from "../../store/module-preparacion/comite/thunksComite";
import { useAddBoletasComite } from "../hooks/useAddBoletasComite";

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
  width: { xl: "50%", sm: "60%", xs: "85%" },
  backgroundColor: "white",
  border: "1px solid rgba(0,0,0,0.0)",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-45%,-50%)",
  padding: "2rem",

  height: { xl: "85%", lg: "95%", sm: "97%", xs: "99%" },
  overflowY: "scroll",
  alignItems: "start",
};

let schema = yup.object().shape({
  nombre: yup.string().required("Nombre es necesario"),
  planilla: yup.string().required("Planilla es necesario"),
  seudonimo: yup.string().required("Seudonimo es necesario"),
  cargo: yup.string().required("Cargo es necesario"),
});

export const AddModal = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  titulo = "titulo",
  enviar = () => {
    alert("Presionaste encviar del modal");
  },
}) => {
  const styles = useStyles();
  const { status } = useAddBoletasComite();
  const dispatch = useDispatch();

  const [emblema, setEmblema] = useState({ name: "Sin Archivo seleccionado" });
  const [fotografia, setFotografia] = useState({
    name: "Sin Archivo seleccionado",
  });

  const cerrarM = () => {
    abrirCerrarModal();
    setEmblema({ name: "Sin Archivo seleccionado" });
    setFotografia({ name: "Sin Archivo seleccionado" });
  };

  const validando = (values, props) => {
    const errors = {};
    if (emblema.name === "Sin Archivo seleccionado") {
      errors.emblema = "Se necesita un emblema";
    }
    if (fotografia.name === "Sin Archivo seleccionado") {
      errors.fotografia = "Se necesita una fotografia";
    }
    return errors;
  };

  const body = (
    <Box sx={modalResponsive}>
      <Formik
        initialValues={{
          planilla: "",
          nombre: "",
          seudonimo: "",
          cargo: "",
          emblema: "",
          fotografia: "",
        }}
        validate={validando}
        validationSchema={schema}
        onSubmit={(valores) => {
          dispatch(savePlanilla(valores, cerrarM));
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
              <Typography>NOMBRE DE LA PLANILLA</Typography>
              <TextField
                required
                disabled={status === "checking"}
                label=""
                variant="outlined"
                name="planilla"
                id="planilla"
                className={styles.textField}
                value={values.planilla}
                onChange={handleChange}
                onBlur={handleBlur}
              ></TextField>
              <br />

              <ErrorMessage
                name="planilla"
                component={() => <ErrorField>{errors.planilla}</ErrorField>}
              />
              <br />
              <Typography>INSERTAR EMBLEMA DE LA PLANILLA</Typography>
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
                  disabled={status === "checking"}
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

              <Typography>INSERTAR FOTOGRAFIA DEL REPRESENTANTE</Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{ width: "100%" }}
                flexDirection="row"
              >
                <TextField
                  label=""
                  disabled
                  value={fotografia.name}
                  variant="outlined"
                  size="small"
                  className={styles.textField}
                ></TextField>
                <IconButton
                  disabled={status === "checking"}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  size="large"
                >
                  <input
                    hidden
                    onChange={(e) => setFotografia(e.target.files[0])}
                    accept="image/png,image/jpg"
                    type="file"
                  />
                  <PhotoCamera fontSize="" />
                </IconButton>
              </Box>
              {touched.fotografia &&
                fotografia.name === "Sin Archivo seleccionado" && (
                  <ErrorField>{errors.fotografia}</ErrorField>
                )}
              <br />
              <TextField
                required
                disabled={status === "checking"}
                variant="outlined"
                label="NOMBRE"
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
              <TextField
                required
                disabled={status === "checking"}
                variant="outlined"
                label="SEUDÓNIMO"
                name="seudonimo"
                id="seudonimo"
                className={styles.textField}
                value={values.seudonimo}
                onChange={handleChange}
                onBlur={handleBlur}
              ></TextField>
              <br />
              <ErrorMessage
                name="seudonimo"
                component={() => <ErrorField>{errors.seudonimo}</ErrorField>}
              />
              <br />
              <TextField
                required
                disabled={status === "checking"}
                variant="outlined"
                label="CARGO"
                name="cargo"
                id="cargo"
                className={styles.textField}
                value={values.cargo}
                onChange={handleChange}
                onBlur={handleBlur}
              ></TextField>
              <br />
              <ErrorMessage
                name="cargo"
                component={() => <ErrorField>{errors.cargo}</ErrorField>}
              />
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
                Enviar
              </Button>
              <Button
                disabled={status === "checking"}
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
