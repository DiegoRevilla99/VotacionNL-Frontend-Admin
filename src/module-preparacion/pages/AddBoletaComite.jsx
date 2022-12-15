import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { PlantillaCRUD } from "../layout/PlantillaCRUD";
import { useDispatch } from "react-redux";
import { useUiStore } from "../../hooks/useUiStore";
import * as yup from "yup";
import { Stack } from "@mui/system";
import { AddPlanillaComite } from "../components/AddPlanillaComite";
import { AddRepresentanteComite } from "../components/AddRepresentanteComite";
import { Formik, Form, ErrorMessage, useFormikContext } from "formik";
import { PlantillaRegistro } from "../layout/PlantillaRegistro";
import { ErrorField } from "../components/ErrorField";
import { useNavigate, useParams } from "react-router-dom";
import {
  editBoleta,
  saveBoleta,
} from "../../store/module-preparacion/comite/thunksComite";
import { useAddBoletasComite } from "../hooks/useAddBoletasComite";
import { getBoletaByIdApi } from "../helpers/ApiComite";
import CircularProgress from "@mui/material/CircularProgress";

// // CONECTAR EL MODAL DE ELIMINAR BOLETA
// import { Grid } from "@mui/material";
// import { ModalEliminarPR } from "../components/ModalEliminarPR";

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
});

const styleButton = {
  borderRadius: 50,
};

const botones = {
  display: "flex",
  justifyContent: "end",
  alignContent: "space-around",
  width: "95%",
  height: "50px",
  pt: 2,
};

let schema = yup.object().shape({
  encabezado: yup.string().required("El encabezado es necesario"),
  nombre: yup.string().required("El nombre es necesario"),
  entidad: yup.string().required("La entidad es necesaria"),
  municipio: yup.string().required("El municipio es necesario"),
});

export const AddBoletaComite = () => {
  const { nombre } = useParams();
  const styles = useStyles();
  const navigate = useNavigate();
  const { toastOffOperation } = useUiStore();
  const { status } = useAddBoletasComite();
  const dispatch = useDispatch();
  const [modalPlanilla, setModalPlanilla] = useState(false);
  const [modalRepresentante, setModalRepresentante] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [datos, setDatos] = useState({
    encabezado: "",
    nombre: "",
    entidad: "",
    municipio: "",
  });
  const [, forceUpdate] = React.useState();

  const abrirCerrarModalPlanilla = () => {
    setModalPlanilla(!modalPlanilla);
  };
  const abrirCerrarModalRepresentante = () => {
    setModalRepresentante(!modalRepresentante);
  };

  const guardar = () => {
    navigate("/preparacion/comite");
  };

  const cancelar = () => {
    navigate("/preparacion/comite");
  };

  const setInfo = async () => {
    console.log(nombre);
    if (nombre != undefined) {
      setIsLoading(true);
      const info = await getBoletaByIdApi(nombre);
      setIsLoading(false);
      console.log("datps desde set info");
      setDatos(info);
    }
  };

  useEffect(() => {
    setInfo();
  }, []);

  useEffect(() => {
    console.log("se actualizo datos");
    forceUpdate();
  }, [datos]);

  	// CONECTAR EL MODAL DE ELIMINAR REPRESENTANTES Y CANDIDATO/A
	// const [statusDeleteModal, setStatusDeleteModal] = useState(false);
	// const handleCloseDeleteModal = () => setStatusDeleteModal(false);
	// const handleOpenDeleteModal = () => {
	// 	// toastOffOperation();
	// 	setStatusDeleteModal(true);
	// };

  return (
    <>
      <PlantillaRegistro>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "100%",
            background: "#ffffff",
            p: "2rem",
            overflowY: "scroll",
            borderRadius: "20px",
            boxShadow: 3,
          }}
        >
          {isLoading ? (
            <Stack
              justifyContent="center"
              sx={{ color: "grey.500" }}
              spacing={2}
              direction="row"
            >
              <CircularProgress color="primary" />
            </Stack>
          ) : (
            <Formik
              initialValues={datos}
              // validate={validando}
              validationSchema={schema}
              onSubmit={(valores) => {
                if (nombre != undefined) {
                  dispatch(editBoleta(valores, guardar));
                } else {
                  dispatch(saveBoleta(valores, guardar));
                }
              }}
            >
              {({ errors, handleBlur, handleChange, values }) => (
                <Form className={styles.fomi}>
                  <div className={styles.formulario}>
                    <Typography
                      align="center"
                      variant="h5"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      BOLETA
                    </Typography>

                    <TextField
                      disabled={status === "checking"}
                      name="encabezado"
                      id="encabezado"
                      variant="filled"
                      label="ENCABEZADO DE LA BOLETA"
                      sx={{ width: "100%" }}
                      value={values.encabezado}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <ErrorMessage
                      name="encabezado"
                      component={() => (
                        <ErrorField>{errors.encabezado}</ErrorField>
                      )}
                    />

                    <TextField
                      disabled={status === "checking"}
                      id="nombre"
                      name="nombre"
                      variant="filled"
                      label="NOMBRE DE LA CARRERA"
                      sx={{ width: "100%", mt: 2 }}
                      value={values.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="nombre"
                      component={() => <ErrorField>{errors.nombre}</ErrorField>}
                    />

                    <Typography sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
                      DATOS GEOELECTORALES
                    </Typography>

                    <TextField
                      disabled={status === "checking"}
                      id="entidad"
                      name="entidad"
                      label="ENTIDAD FEDERATIVA"
                      variant="filled"
                      sx={{ width: "100%", mt: 2 }}
                      value={values.entidad}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="entidad"
                      component={() => (
                        <ErrorField>{errors.entidad}</ErrorField>
                      )}
                    />
                    <TextField
                      disabled={status === "checking"}
                      id="municipio"
                      name="municipio"
                      variant="filled"
                      label="MUNICIPIO O DELEGACIÓN"
                      sx={{ width: "100%", mt: 2 }}
                      value={values.municipio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="municipio"
                      component={() => (
                        <ErrorField>{errors.municipio}</ErrorField>
                      )}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { sm: "row", xs: "column" },
                        justifyContent: "space-between",
                        width: { xl: "40%", lg: "60%", sm: "85%", xs: "95%" },
                        height: { sm: "50px", xs: "100px" },
                        mt: 2,
                      }}
                    >
                      <Button
                        disabled={status === "checking"}
                        style={{ borderRadius: 15 }}
                        variant="contained"
                        color="primary"
                        onClick={abrirCerrarModalPlanilla}
                      >
                        <Typography>Agregar planilla</Typography>
                      </Button>
                      <Button
                        disabled={status === "checking"}
                        style={{ borderRadius: 15 }}
                        variant="contained"
                        color="primary"
                        onClick={abrirCerrarModalRepresentante}
                      >
                        Agregar representante independiente
                      </Button>
                    </Box>
                  </div>
{/* 
                    <Grid item xs={4} md={2} lg={2}>
                    <Button
                    onClick={handleOpenDeleteModal}
                      variant="contained"
                      size="small"
                      disabled={status === "checking"}
                      sx={{
                        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
                        transition: "all 0.5s ease",
                        backgroundColor: "#791010",
                        width: "100%",
                        borderRadius: "25px 25px 25px 25px",
                        "&:hover": {
                          backgroundColor: "#8B3232 !important",
                          transform: "translate(-5px, -5px)",
                          boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
                        },
                      }}
                    >
                      eliminar
                    </Button>
                  </Grid>
                  <ModalEliminarPR statusDeleteModal={statusDeleteModal} handleToggleModal={handleCloseDeleteModal} />
                   */}
                  <Box
                    sx={{
                      boxShadow: 1,
                      width: "95%",
                      height: "300px",
                      mt: 5,
                      p: 2,
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "15px",
                      background: "#F1F1F1",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      PLANILLAS O REPRESENTANTES REGISTRADOS
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        height: "200px",
                        overflowY: "scroll",
                        flexDirection: "column",
                        p: 1,
                      }}
                    >
                      <Typography>asdasdasdasd</Typography>
                      <Typography>asdasdasdas</Typography>
                      <Typography>MUNICIPIO O DELEGACIÓN</Typography>
                      <Typography>MUNICIPIO O DELEGACIÓN</Typography>
                      <Typography>MUNICIPIO O DELEGACIÓN</Typography>
                      <Typography>asdas</Typography>
                      <Typography>asdasdasdasd</Typography>
                      <Typography>asdasdasdas</Typography>
                      <Typography>asdas</Typography>
                      <Typography>MUNICasdasdaN</Typography>
                      <Typography>MUNICIPIO O DELEGACIÓN</Typography>
                      <Typography>MUNICIPIO O DELEGACIÓN</Typography>
                      <Typography>MUNICIPIO O DELEGACIÓN</Typography>
                      <Typography>MUNICIPIO O DELEGACIÓN</Typography>
                      <Typography>MUNICIPIO O DELEGACIÓN</Typography>
                    </Box>
                  </Box>
                  <Box sx={botones}>
                    <Box
                      sx={{
                        width: "500px",
                        display: "flex",

                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        type="submit"
                        className={styles.boton}
                        variant="contained"
                        color="primary"
                        style={styleButton}
                        sx={{
                          width: { sm: `150px`, xs: "150px" },
                        }}
                      >
                        Guardar
                      </Button>

                      <Button
                        disabled={status === "checking"}
                        className={styles.boton}
                        variant="contained"
                        style={styleButton}
                        sx={{
                          width: { sm: `150px`, xs: "150px" },
                          backgroundColor: "error.main",
                        }}
                        onClick={cancelar}
                      >
                        Cancelar
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </Stack>

        <AddPlanillaComite
          isOpen={modalPlanilla}
          abrirCerrarModal={abrirCerrarModalPlanilla}
        ></AddPlanillaComite>

        <AddRepresentanteComite
          isOpen={modalRepresentante}
          abrirCerrarModal={abrirCerrarModalRepresentante}
        ></AddRepresentanteComite>
      </PlantillaRegistro>
    </>
  );
};
