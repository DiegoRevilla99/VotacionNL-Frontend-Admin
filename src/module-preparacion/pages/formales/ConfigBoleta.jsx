import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import { PlantillaHeader } from "../../layout/PlantillaHeader";
import { makeStyles } from "@mui/styles";

import { useParams } from "react-router-dom";
import {
  getBoleta,
  getCoaliciones,
} from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import { useDispatch, useSelector } from "react-redux";
import { useCoaliciones } from "../../hooks/config-boleta/useCoaliciones";
import { useBoleta } from "../../hooks/config-boleta/useBoleta";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { Agrupa } from "../../components/configuracion-boleta/Agrupa";
import { AddCoalicion } from "../../components/configuracion-boleta/AddCoalicion";
import { Representante } from "../../components/configuracion-boleta/formales/Representante";

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
  flexDirection: { md: "row", sm: "column", xs: "column" },
  width: "100%",
  justifyContent: "center",
  mt: 1,
  mb: 5,
};

export const ConfigBoleta = () => {
  const styles = useStyles();
  const { id } = useParams();

  const { boletaInfo, errorBoleta, isLoadingBoleta, changeCandNoReg } =
    useBoleta(id);

  useEffect(() => {}, [boletaInfo]);

  return (
    <>
      {errorBoleta ? (
        <PlantillaHeader titulo={"CONFIGURACIÓN BOLETA"}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Typography>No se encontro boleta</Typography>
          </Box>
        </PlantillaHeader>
      ) : (
        <Representante
          boletaInfo={boletaInfo}
          changeCandNoReg={changeCandNoReg}
        ></Representante>
      )}
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
