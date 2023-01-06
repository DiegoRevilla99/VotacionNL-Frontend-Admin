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
import { Representante } from "../../components/configuracion-boleta/no-formales/Representante";
import { Comite } from "../../components/configuracion-boleta/no-formales/Comite";
import { Planilla } from "../../components/configuracion-boleta/no-formales/Planilla";

export const ConfigBoletaMultiple = () => {
  const { id } = useParams();

  const { boletaInfo, errorBoleta, isLoadingBoleta, changeCandNoReg } =
    useBoleta(id);

  const { modalidad } = boletaInfo;

  const isType = (type) => {
    if (type === "REPRESENTANTE")
      return (
        <Representante
          boletaInfo={boletaInfo}
          changeCandNoReg={changeCandNoReg}
        ></Representante>
      );

    if (type === "COMITÉ") return <Comite boletaInfo={boletaInfo}></Comite>;

    if (type === "PLANILLA")
      return (
        <Planilla
          boletaInfo={boletaInfo}
          changeCandNoReg={changeCandNoReg}
        ></Planilla>
      );

    return <></>;
  };

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
        ) : (
          isType(modalidad)
        )}
      </PlantillaHeader>
    </>
  );
};
{
}
