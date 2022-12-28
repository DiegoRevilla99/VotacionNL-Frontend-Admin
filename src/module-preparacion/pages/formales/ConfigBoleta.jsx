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

export const ConfigBoleta = () => {
  const { id } = useParams();

  const { boletaInfo, errorBoleta, isLoadingBoleta, changeCandNoReg } =
    useBoleta(id);

  useEffect(() => {}, [boletaInfo]);

  return (
    <>
      <PlantillaHeader titulo={"CONFIGURACIÓN BOLETA"}>
        {isLoadingBoleta ? (
          <Stack
            justifyContent="center"
            sx={{ color: "grey.500" }}
            spacing={2}
            direction="row"
          >
            <CircularProgress color="primary" />
          </Stack>
        ) : errorBoleta ? (
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
        ) : boletaInfo.modalidad === "REPRESENTANTE" &&
          boletaInfo.formalidad === "FORMAL" ? (
          <Representante
            boletaInfo={boletaInfo}
            changeCandNoReg={changeCandNoReg}
          ></Representante>
        ) : (
          <Typography>No esta permitida ver esta boleta</Typography>
        )}
      </PlantillaHeader>
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
