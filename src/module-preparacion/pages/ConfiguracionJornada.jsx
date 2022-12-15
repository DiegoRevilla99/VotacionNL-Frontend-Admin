import {
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { Form, Formik } from "formik";
import React from "react";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { Box } from "@mui/system";
import { PlantillaHeader } from "../layout/PlantillaHeader";
import { HoraField } from "../components/HoraField";

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
  hr: {
    height: "3px",
    color: "rgb(210, 210, 210)",
    background: "rgb(210, 210, 210)",
    width: "100%",
    boxShadow: 3,
  },
});

const boxTime = {
  display: "flex",
  flexDirection: { sm: "row", xs: "column" },
  height: { sm: "50px", xs: "130px" },
  justifyContent: "space-between",
  width: { xl: "40%", lg: "60%", md: "80%", sm: "100%" },
  mt: 1,
  mb: 6,
};

const boxDuracion = {
  display: "flex",
  flexDirection: { sm: "row", xs: "column" },

  justifyContent: "space-between",
  width: { xl: "50%", md: "80%", xs: "100%" },
  mt: 1,
  mb: 6,
  height: "auto",
};

const boxOpciones = {
  display: "flex",
  flexDirection: { md: "row", sm: "column", xs: "column" },
  width: "100%",
  mt: 1,
  mb: 5,
};

export const ConfiguracionJornada = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <PlantillaHeader titulo='CONFIGURACIÓN JORNADA "NOMBRE"'>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          background: "#ffffff",
          p: "2rem",
          height: "auto",
          borderRadius: "20px",
          boxShadow: 3,
        }}
      >
        <Formik>
          {({}) => (
            <Form className={styles.fomi}>
              <Box sx={{}}>
                <Typography sx={{ fontWeight: "bold" }}>
                  DISPONIBILIDAD DEL SISTEMA
                </Typography>
                <hr className={styles.hr} />
              </Box>

              <Box sx={boxTime}>
                <DateTimePicker
                  label="Inicio"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="Fin"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Typography sx={{ fontWeight: "bold" }}>
                RECEPCIÓN DE EMPADRONAMIENTO
              </Typography>
              <hr className={styles.hr} />
              <Box sx={boxTime}>
                <DateTimePicker
                  label="Inicio empadronamiento"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />

                <DateTimePicker
                  label="Fin empadonamiento"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Typography sx={{ fontWeight: "bold" }}>
                RECEPCIÓN DE VOTACIÓN
              </Typography>
              <hr className={styles.hr} />
              <Box sx={boxTime}>
                <DateTimePicker
                  label="Inicio recepción"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />

                <DateTimePicker
                  label="Fin recepción"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Typography sx={{ fontWeight: "bold" }}>
                ASIGNACIÓN DE CONTRASEÑAS
              </Typography>
              <hr className={styles.hr} />
              <Box sx={boxTime}>
                <DateTimePicker
                  label="Inicio de asignación"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />

                <DateTimePicker
                  label="Fin de asignación"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Typography sx={{ fontWeight: "bold" }}>DURACIÓN VOTO</Typography>
              <hr className={styles.hr} />
              <Box sx={boxDuracion}>
                <HoraField titulo="Duración normal"></HoraField>
                <HoraField titulo="Tiempo extra"></HoraField>
              </Box>
              <Typography sx={{ fontWeight: "bold" }}>OPCIONES</Typography>
              <hr className={styles.hr} />
              <Box sx={boxOpciones}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Opción o candidatura no registrada"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Mostrar voto nulo"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Verificación del sentido del sufragio por parte del votante"
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Stack>
    </PlantillaHeader>
  );
};
