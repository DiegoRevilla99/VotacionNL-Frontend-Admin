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
import React, { memo, useEffect, useState } from "react";

import { PlantillaHeader } from "../../layout/PlantillaHeader";
import { makeStyles } from "@mui/styles";

import { useParams } from "react-router-dom";
import { useBoleta } from "../../hooks/config-boleta/useBoleta";
import { Representante } from "../../components/configuracion-boleta/formales/Representante";
import { useCandidatos } from "../../../module-empadronamiento/hooks/useCandidatos";
import { getCandidatos } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import { useDispatch } from "react-redux";

export const ConfigBoleta = memo(() => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { boleta, errorBoleta, isLoadingBoleta} =useBoleta(id);
  const {candidatos,
    isLoadingCandidatos,
  }=useCandidatos(id)

  useEffect(() => {
      console.log("cambio boleta info:",boleta)
  }, [boleta])

  const updateCand =()=>{
    console.log("Actualizando candi")
    dispatch(getCandidatos(id));
  }
     
  

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
        ) :  (
          
            <Representante
            updateCand={updateCand}
            boletaInfo={boleta}
          ></Representante>
          
          
        ) }
      </PlantillaHeader>
    </>
  );
});

