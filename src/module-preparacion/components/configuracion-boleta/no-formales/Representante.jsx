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

import { makeStyles } from "@mui/styles";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { PlantillaHeader } from "../../../layout/PlantillaHeader";
import { Agrupa } from "../Agrupa";
import { AddCoalicion } from "../AddCoalicion";
import { useCoaliciones } from "../../../hooks/config-boleta/useCoaliciones";
import { useBoleta } from "../../../hooks/config-boleta/useBoleta";
import { putCandRegNF } from "../../../../store/module-preparacion/configuracion-boletaNF/thunksConfigBoletaNF";

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
  mb: 3,
};

export const Representante = ({ boletaInfo }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [cnr, setCnr] = useState(boletaInfo?.mostrarCandidaturasNoReg);
  const [vn, setVn] = useState(boletaInfo?.mostrarVotoNulo);

  /* useEffect(() => {
    if (boletaInfo.mostrarCandidaturasNoReg != undefined)
      setCnr(boletaInfo.mostrarCandidaturasNoReg);
    if (boletaInfo.mostrarVotoNulo != undefined)
      setVn(boletaInfo.mostrarVotoNulo);
  }, [boletaInfo]); */

  // const abrirCerrarModalCoalicion = () => {
  //   setModalCoalicion(!modalCoalicion);
  // };

  const handleChangeCand = (event) => {
    setCnr(event.target.checked);
  };

  const handleChangeVoto = (event) => {
    setVn(event.target.checked);
  };

  const onGuardar = () => {
    console.log("guardando config");
    const datasend = {
      mostrarCandidaturasNoReg: cnr,
      mostrarVotoNulo: vn,
    };
    dispatch(putCandRegNF(id, datasend, error));
  };

  const error = () => {
    setCnr(boletaInfo.mostrarCandidaturasNoReg);
    setVn(boletaInfo.mostrarVotoNulo);
  };

  return (
    <>
      <Stack
        direction="column"
        className="animate__animated animate__zoomIn "
        justifyContent="space-between"
        alignItems="center"
        sx={{
          // minHeight: { lg: "700px" },
          width: "100%",
          background: "#ffffff",
          p: "2rem",
          borderRadius: "20px",
          boxShadow: 3,
        }}
      >
        <Typography sx={{ mb: 3, fontSize: "22px", fontWeight: "bold" }}>
          OPCIONES DE {boletaInfo?.modalidad}
        </Typography>
        <Box className="" sx={boxOpciones}>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={cnr ? cnr : false}
                  onChange={handleChangeCand}
                />
              }
              label="Opción o candidatura no registrada"
            />
            <FormControlLabel
              control={
                <Switch checked={vn ? vn : false} onChange={handleChangeVoto} />
              }
              label="Mostrar voto nulo"
            />
          </FormGroup>
        </Box>
        <Button type="submit" variant="contained" onClick={onGuardar}>
          Guardar
        </Button>
        {/* <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            mt: 0,
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
            onClick={abrirCerrarModalCoalicion}
          >
            Agregar coalición
          </Button>
        </Box>
        {isLoadingCoaliciones ? (
          <Stack
            justifyContent="center"
            sx={{ color: "grey.500" }}
            spacing={2}
            direction="row"
          >
            <CircularProgress color="primary" />
          </Stack>
        ) : (
          <Agrupa info={{ coaliciones: coaliciones }} tipo={1}></Agrupa>
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
    </>
  );
};
