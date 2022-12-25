import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/system";
import React from "react";
import { Agrupa } from "../../components/configuracion-boleta/Agrupa";
import { PlantillaHeader } from "../../layout/PlantillaHeader";
import { makeStyles } from "@mui/styles";
import { Button, Stack, TextField, Typography } from "@mui/material";

const useStyles = makeStyles({
  hr: {
    height: "1px",
    color: "rgb(210, 210, 210)",
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

export const ConfigBoletaMultiple = () => {
  const styles = useStyles();

  const [modalidad, setmodalidad] = React.useState("");

  const handleChange = (event) => {
    setmodalidad(event.target.value);
  };

  return (
    <>
      <PlantillaHeader titulo="BOLETA">
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "100%",
            background: "#ffffff",
            p: "2rem",
            borderRadius: "20px",
            boxShadow: 3,
          }}
        >
          <Typography
            textAlign="center"
            sx={{ fontWeight: "bold", fontSize: "30px", mb: 4 }}
          >
            CONFIGURACIÓN
          </Typography>
          <Box sx={{ width: "350px" }}>
            <Typography textAlign="center" sx={{ mb: 1 }}>
              Seleccione la modalidad de la boleta
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Modalidad</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={modalidad}
                label="modalidad"
                onChange={handleChange}
              >
                <MenuItem value={1}>REPRESENTANTE</MenuItem>
                <MenuItem value={2}>COMITE</MenuItem>
                <MenuItem value={3}>PLANILLA</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "350px",
            }}
          >
            <Typography textAlign="center" sx={{ mb: 2 }}>
              Indique la cantidad maxima de selecciones
            </Typography>
            <TextField
              id="outlined-number"
              label="Cantidad"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              p: 2,
              mt: 1,
            }}
          >
            <Agrupa tipo={2}></Agrupa>
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
                className={styles.boton}
                variant="contained"
                style={styleButton}
                sx={{
                  width: { sm: `150px`, xs: "150px" },
                  backgroundColor: "error.main",
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Stack>
      </PlantillaHeader>
    </>
  );
};
