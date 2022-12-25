import { PhotoCamera } from "@mui/icons-material";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Modal,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { ErrorField } from "../ErrorField";
import { BoxPartido } from "./BoxPartido";
import { getPartidos } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import { PartidoSelect } from "./PartidoSelect";

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
  nombre: yup.string().required("Nombre de la coalición es necesario"),
  emblema: yup.string().required("Emeblema de la coalición es necesario"),
});

export const ModalCoalicion = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  enviar = () => {
    alert("Presionaste enviar del modal");
  },
  idBoleta = null,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [logo, setLogo] = useState({ name: "Sin Archivo seleccionado" });
  const [candidato, setCandidato] = useState([]);
  const { partidos = [], isLoadingPartidos } = useSelector(
    (state) => state.configBoleta
  );

  const onSelectPartido = (claveElectoral) => {
    setCandidato(claveElectoral);
  };

  const cerrarM = () => {
    abrirCerrarModal();
    setLogo({ name: "Sin Archivo seleccionado" });
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
          logo: "",
        }}
        validate={validando}
        validationSchema={schema}
        onSubmit={(valores) => {
          console.log("on");

          const data = {
            nombre: valores.nombre,
            emblema: valores.emblema,
            logo: logo.name,
          };

          enviar(data);
        }}
      >
        {({ touched, errors, handleBlur, handleChange, values }) => (
          <Form className={styles.fomi}>
            <Box sx={{ width: "100%" }}>
              <div aling="left">
                <Typography sx={{ fontWeight: "bold", mb: 3 }}>
                  COALICIÓN
                </Typography>
              </div>
              <Typography>NOMBRE DE LA COALICIÓN</Typography>
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
              <Typography>EMBLEMA</Typography>
              <TextField
                required
                label=""
                variant="outlined"
                name="emblema"
                id="emblema"
                className={styles.textField}
                value={values.emblema}
                onChange={handleChange}
                onBlur={handleBlur}
              ></TextField>
              <br />

              <ErrorMessage
                name="nombre"
                component={() => <ErrorField>{errors.emblema}</ErrorField>}
              />
              <br />
              <Typography>INSERTAR LOGO DE LA COALICIÓN</Typography>
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
                  value={logo.name}
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
                    onChange={(e) => setLogo(e.target.files[0])}
                    onBlur={handleBlur}
                    accept="image/x-png,image/jpeg"
                    type="file"
                    name="logo"
                    id="logo"
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
                  SELECCIONE EL CANDIDATO CORRESPONDIENTES A ESTA COALICIÓN
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
                  {partidos.map((partido) => (
                    <PartidoSelect
                      key={partido.claveElectoral}
                      claveElectoral={partido.claveElectoral}
                      candidato={partido.nombreCandidato}
                      partido={partido.partidoModel.nombre}
                      onSelect={onSelectPartido}
                      valueRadio={candidato}
                    ></PartidoSelect>
                  ))}
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
                CREAR
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

  useEffect(() => {
    dispatch(getPartidos(idBoleta));
  }, []);
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
