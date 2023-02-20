import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { PlantillaHeader } from "../../../layout/PlantillaHeader";
import { AddCoalicion } from "../AddCoalicion";
import { useCoaliciones } from "../../../hooks/config-boleta/useCoaliciones";
import { useBoleta } from "../../../hooks/config-boleta/useBoleta";
import { Agrupa } from "../Agrupa";
import { AddAsociacion } from "../AddAsociacion";
import { SeleccionesForm } from "../SeleccionesForm";
import { useAsociaciones } from "../../../hooks/config-boleta/useAsociaciones";
import { putPlanilla } from "../../../../store/module-preparacion/configuracion-boletaNF/thunksConfigBoletaNF";

const useStyles = makeStyles({
  hr: {
    height: "3px",
    color: "rgb(210, 210, 210)",
    background: "rgb(210, 210, 210)",
    width: "100%",
    boxShadow: 3,
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

const boxOpciones = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  mt: 1,
  mb: 5,
};

export const Planilla = ({ boletaInfo }) => {
  const styles = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  // const { asociaciones, isLoadingAsociaciones } = useAsociaciones(id);

  const [modalAsociacion, setModalAsociacion] = useState(false);
  const [cnr, setCnr] = useState(false);
  const [vn, setVn] = useState(false);

  const abrirCerrarModalAsociacion = () => {
    setModalAsociacion(!modalAsociacion);
  };

  const guardarOpciones = (data) => {
    const newData = { idBoleta: id, modalida: data };
    console.log(newData);
    dispatch(putPlanilla(newData));
  };

  return (
    <>
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
        <Typography sx={{ mb: 3, fontSize: "22px", fontWeight: "bold" }}>
          OPCIONES DE {boletaInfo.modalidad}
        </Typography>

        <Box sx={boxOpciones}>
          <SeleccionesForm
            minC={boletaInfo.minOpciones}
            maxC={boletaInfo.maxOpciones}
            cnr={boletaInfo.mostrarCandidaturasNoReg}
            vn={boletaInfo.mostrarVotoNulo}
            onGuardar={guardarOpciones}
          ></SeleccionesForm>
        </Box>

        {/* <hr className={styles.hr} /> */}
        {/* <Typography sx={{ mt: 3, fontWeight: "bold" }}>ASOCIACIONES</Typography> */}

        {/* <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
            mb: 2,
          }}
        >
          <Button
            className={styles.boton}
            variant="contained"
            style={styleButton}
            sx={{
              width: { sm: `270px`, xs: "150px" },
              backgroundColor: "#511079",
              color: "#fff",
            }}
            onClick={abrirCerrarModalAsociacion}
          >
            Agrega
          </Button>
        </Box>
        {isLoadingAsociaciones ? (
          <Stack
            justifyContent="center"
            sx={{ color: "grey.500" }}
            spacing={2}
            direction="row"
          >
            <CircularProgress color="primary" />
          </Stack>
        ) : (
          <Agrupa info={{ asociaciones: asociaciones }} tipo={2}></Agrupa>
        )} */}

        <Box sx={botones}>
          <Box
            sx={{
              width: "100%",
              display: "flex",

              justifyContent: "start",
            }}
          >
            {/* <Button
              type="submit"
              className={styles.boton}
              variant="contained"
              color="primary"
              style={styleButton}
              sx={{
                width: { sm: `150px`, xs: "150px" },
              }}
            >
              <ReplyAllIcon />
              Regresar
            </Button> */}
          </Box>
        </Box>
      </Stack>

      <AddAsociacion
        isOpen={modalAsociacion}
        abrirCerrarModal={abrirCerrarModalAsociacion}
        idBoleta={id}
      ></AddAsociacion>
    </>
  );
};
{
  /* <Stack
      justifyContent="center"
      sx={{ color: "grey.500" }}
      spacing={2}
      direction="row"
      >
      <CircularProgress color="primary" />
      </Stack> */
}
