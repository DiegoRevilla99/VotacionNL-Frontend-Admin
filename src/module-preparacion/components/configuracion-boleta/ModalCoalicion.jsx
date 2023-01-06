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
import React, { memo, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { ErrorField } from "../ErrorField";
import { BoxPartido } from "./BoxPartido";

import { PartidoSelect } from "./PartidoSelect";
import {
  getCandidatos,
  getCoaliciones,
} from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import { useParams } from "react-router-dom";

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
  nombre: yup.string().required("Nombre de la coalición es necesario"),
  emblema: yup.string().required("Emeblema de la coalición es necesario"),
});

export const ModalCoalicion = memo(
  ({
    isOpen = false,
    abrirCerrarModal = () => {},
    agregar = () => {
      alert("Presionaste agregar del modal");
    },
    actualizar = () => {
      alert("Presionaste actualizar del modal");
    },
    idBoleta = null,
    coalicion = null,
  }) => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [logo, setLogo] = useState(
      coalicion
        ? {
            name: coalicion.coalicionModel
              ? coalicion.coalicionModel.logo
              : "Sin Archivo seleccionado",
          }
        : { name: "Sin Archivo seleccionado" }
    );
    const [candidato, setCandidato] = useState(
      coalicion
        ? coalicion.candidatoModel
          ? coalicion.candidatoModel
          : { candidato: "Sin candidato" }
        : { candidato: "Sin candidato" }
    );
    const {
      candidatos = [],
      isLoadingCandidatos,
      coalicionSelected,
    } = useSelector((state) => state.configBoleta);

    const onSelectPartido = (info) => {
      setCandidato(info);
    };

    const cerrarM = () => {
      abrirCerrarModal();
      setCandidato({});
      setLogo({ name: "Sin Archivo seleccionado" });
    };
    useEffect(() => {
      dispatch(getCandidatos(id));
    }, []);

    useEffect(() => {
      setLogo(
        coalicion
          ? {
              name: coalicion.coalicionModel
                ? coalicion.coalicionModel.logo
                : "Sin Archivo seleccionado",
            }
          : { name: "Sin Archivo seleccionado" }
      );
      setCandidato(
        coalicion
          ? coalicion.candidatoModel
            ? { ...coalicion.candidatoModel, partidos: coalicion.partidoModels }
            : { candidato: "Sin candidato" }
          : { candidato: "Sin candidato" }
      );
    }, [isOpen]);

    const validando = (values, props) => {
      const errors = {};
      if (logo.name === "Sin Archivo seleccionado") {
        errors.logo = "Se necesita un emblema";
      }

      if (candidato.candidato === "Sin candidato") {
        errors.candidato = "Seleccione un candidato";
      }

      return errors;
    };

    const afterUpdate = () => {
      console.log("Actualizando...");
      dispatch(getCoaliciones(id));
      cerrarM();
    };

    const body = (
      <Box sx={modalResponsive}>
        <Formik
          initialValues={{
            nombre: coalicion ? coalicion.coalicionModel.nombre : "",
            emblema: coalicion ? coalicion.coalicionModel.emblema : "",
            logo: coalicion ? coalicion.coalicionModel.logo : "",
            candidato: "",
          }}
          validate={validando}
          validationSchema={schema}
          onSubmit={(valores) => {
            const data = {
              coalicionModel: {
                nombre: valores.nombre,
                emblema: valores.emblema,
                logo: logo.name,
              },
              partidos: candidato.partidos,
            };

            if (coalicion) {
              actualizar(
                coalicion.coalicionModel.claveCoalicion,
                data,
                afterUpdate
              );
            } else {
              agregar(data, cerrarM);
            }
            //enviar(data);
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
                    SELECCIONE EL CANDIDATO CORRESPONDIENTE A ESTA COALICIÓN
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
                    {candidatos.map(({ candidatoModel, partidoModels }) => (
                      <PartidoSelect
                        key={candidatoModel.claveElectoral}
                        claveElectoral={candidatoModel.claveElectoral}
                        candidato={candidatoModel.nombreCandidato}
                        partidos={partidoModels}
                        onSelect={onSelectPartido}
                        valueRadio={candidato.claveElectoral}
                      ></PartidoSelect>
                    ))}
                    {coalicion && (
                      <PartidoSelect
                        key={coalicion.candidatoModel.claveElectoral}
                        claveElectoral={coalicion.candidatoModel.claveElectoral}
                        candidato={coalicion.candidatoModel.nombreCandidato}
                        partidos={coalicion.partidoModels}
                        onSelect={onSelectPartido}
                        valueRadio={candidato.claveElectoral}
                      ></PartidoSelect>
                    )}
                  </Box>
                  {touched.candidato &&
                    candidato.candidato === "Sin candidato" && (
                      <ErrorField>{errors.candidato}</ErrorField>
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
                  {coalicion ? "ACTUALIZAR" : "CREAR"}
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
  }
);
