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

import { PartidoSelect } from "./PartidoSelect";

import { CandidatoCheck } from "./CandidatoCheck";
import { useParams } from "react-router-dom";
import { getCandidatosProviderNF } from "../../../providers/Micro-NoFormales/providerCandidatos";
import { getCandidatosNF } from "../../../store/module-preparacion/configuracion-boletaNF/thunksConfigBoletaNF";

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

  height: { xl: "95%", lg: "98%", sm: "97%", xs: "99%" },
  overflowY: "scroll",
  alignItems: "start",
};

let schema = yup.object().shape({
  nombreAsociacion: yup
    .string()
    .required("Nombre de la asociación es necesario"),
  emblema: yup.string().required("Emeblema de la asociación es necesario"),
});

export const ModalAsociacion = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  agregar = () => {
    alert("Presionaste enviar del modal");
  },
  actualizar = () => {
    alert("Presionaste enviar del modal");
  },
  idBoleta = null,
  asociacion = null,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [logo, setLogo] = useState(
    asociacion
      ? { name: asociacion.logo }
      : { name: "Sin Archivo seleccionado" }
  );
  const [candidatosS, setCandidatosS] = useState(
    asociacion ? asociacion.candidatos : []
  );
  const { candidatos = [], isLoadingCandidatos } = useSelector(
    (state) => state.configBoletaNFSlice
  );

  const onSelectCandidato = (candidato) => {
    console.log("cnadidato: " + candidato);
    let candi = null;
    candi = candidatosS.find((c) => c === candidato);
    if (candi) {
      setCandidatosS(candidatosS.filter((c) => c !== candidato));
    } else {
      setCandidatosS([...candidatosS, candidato]);
    }
  };

  const cerrarM = () => {
    abrirCerrarModal();
    setCandidatosS({});
    setLogo({ name: "Sin Archivo seleccionado" });
  };
  
  useEffect(() => {
    console.log("ME estoy renderizando en Modal Asociacion jornada");
    dispatch(getCandidatosNF(id));
  }, []);

  useEffect(() => {
    setLogo(
      asociacion
        ? { name: asociacion.logo }
        : { name: "Sin Archivo seleccionado" }
    );
    setCandidatosS(asociacion ? asociacion.candidatos : []);
  }, [isOpen]);

  const validando = (values, props) => {
    const errors = {};
    if (logo.name === "Sin Archivo seleccionado") {
      errors.logo = "Se necesita un emblema";
    }
    console.log(candidatosS);
    if (candidatosS.length === 0) {
      console.log("entre a error");

      errors.candidatos = "Seleccione un candidato";
    }

    return errors;
  };

  const body = (
    <Box sx={modalResponsive}>
      <Formik
        initialValues={{
          nombreAsociacion: asociacion ? asociacion.nombreAsociacion : "",
          emblema: asociacion ? asociacion.emblema : "",
          logo: asociacion ? asociacion.logo : "",
          candidatos: [],
        }}
        validate={validando}
        validationSchema={schema}
        onSubmit={(valores) => {
          console.log("creando asociacion");

          const data = {
            asociacionModel: {
              nombreAsociacion: valores.nombreAsociacion,
              emblema: valores.emblema,
              logo: logo.name,
            },
            candidatos: candidatosS,
          };
          console.log(data);
          if (asociacion) {
            actualizar(data, cerrarM);
          } else {
            agregar(data, cerrarM);
          }
          // enviar(data);
        }}
      >
        {({ touched, errors, handleBlur, handleChange, values }) => (
          <Form className={styles.fomi}>
            <Box sx={{ width: "100%" }}>
              <div aling="left">
                <Typography sx={{ fontWeight: "bold", mb: 3 }}>
                  ASOCIACIÓN
                </Typography>
              </div>
              <Typography>NOMBRE DE LA ASOCIACIÓN</Typography>
              <TextField
                required
                label=""
                variant="outlined"
                name="nombreAsociacion"
                id="nombreAsociacion"
                className={styles.textField}
                value={values.nombreAsociacion}
                onChange={handleChange}
                onBlur={handleBlur}
              ></TextField>
              <br />

              <ErrorMessage
                name="nombreAsociacion"
                component={() => (
                  <ErrorField>{errors.nombreAsociacion}</ErrorField>
                )}
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
                name="emblema"
                component={() => <ErrorField>{errors.emblema}</ErrorField>}
              />
              <br />
              <Typography>INSERTAR LOGO DE LA ASOCIACIÓN</Typography>
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
              {touched.logo && logo.name === "Sin Archivo seleccionado" && (
                <ErrorField>{errors.logo}</ErrorField>
              )}

              <Box
                id="candidato"
                name="candidato"
                onBlur={handleBlur}
                sx={{
                  boxShadow: 1,
                  width: "100%",
                  height: { xl: "400px", lg: "350px" },
                  mt: 5,
                  p: 3,
                  border: "1px solid rgba(0,0,0,0.4)",
                  borderRadius: "15px",
                  // background: "#F1F1F1",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  SELECCIONE LOS CANDIDATOS CORRESPONDIENTES A ESTA ASOCIACIÓN
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    overflowY: "scroll",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    p: 1,
                    mb: 1,
                  }}
                >
                  {candidatos.map((candidat) => (
                    <CandidatoCheck
                      key={candidat.claveElectoral}
                      claveElectoral={candidat.claveElectoral}
                      candidato={candidat.nombreCandidato}
                      onSelect={onSelectCandidato}
                      candidatosSeleted={candidatosS}
                    ></CandidatoCheck>
                  ))}
                </Box>
                {touched.candidatos && candidatosS.length === 0 && (
                  <ErrorField>{errors.candidatos}</ErrorField>
                )}
              </Box>
              <br />
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
