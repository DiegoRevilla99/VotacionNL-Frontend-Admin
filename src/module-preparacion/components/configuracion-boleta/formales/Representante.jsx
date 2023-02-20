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

import { makeStyles } from "@mui/styles";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { Agrupa } from "../Agrupa";
import { AddCoalicion } from "../AddCoalicion";
import { useCoaliciones } from "../../../hooks/config-boleta/useCoaliciones";
import { useBoleta } from "../../../hooks/config-boleta/useBoleta";
import { EditCoalicion } from "../EditCoalicion";
import {
  getCandidatos,
  getCoaliciones,
} from "../../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

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
  flexDirection: "row",
  width: "100%",
  height: "50px",
  justifyContent: "center",
  mt: 1,
  mb: 5,
};

export const Representante = memo(({ boletaInfo, updateCand }) => {
  const dispatch = useDispatch();

  const styles = useStyles();
  const { id } = useParams();

  const { coaliciones, isLoadingCoaliciones } = useCoaliciones(id);

  const [modalCoalicion, setModalCoalicion] = useState(false);
  const [cnr, setCnr] = useState(false);
  const [vn, setVn] = useState(false);

  const { candidatos, isLoadingCandidatos = [] } = useSelector(
    (state) => state.configBoleta
  );

  useEffect(() => {}, []);

  const abrirCerrarModalCoalicion = () => {
    setModalCoalicion(!modalCoalicion);
  };

  const handleChangeCand = (event) => {
    changeCandNoReg(event.target.checked);
    setCnr(event.target.checked);
  };

  const handleChangeVoto = (event) => {
    setVn(event.target.checked);
  };

  const actualizar = () => {
    console.log("actualizando las coaliciones ddd");
    dispatch(getCoaliciones(id));
    updateCand();
    // dispatch(getCandidatos(id));
  };

  return (
    <>
      <Stack
        className="animate__animated animate__bounceInUp "
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: "100%",
          background: "#ffffff",
          p: "1rem",
          borderRadius: "20px",
          boxShadow: 3,
          mt: 5,
        }}
      >
        <Box>
          {coaliciones?.length <= 0 && candidatos.length <= 0 ? (
            <>
              <Typography
                textAlign={"center"}
                sx={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  pl: 5,
                  pr: 5,
                  pt: 5,
                }}
              >
                {boletaInfo?.nombreEstructuraBoleta.toUpperCase()}
              </Typography>
              <Typography textAlign={"center"} sx={{ p: 5 }}>
                No hay posibles coaliciones para esta boleta
              </Typography>
            </>
          ) : (
            <>
              <Typography
                textAlign={"center"}
                sx={{
                  mb: 3,
                  mt: 3,
                  fontSize: { md: "22px", xs: "15px" },
                  fontWeight: "bold",
                }}
              >
                COALICIONES PARA {boletaInfo?.nombreEstructuraBoleta}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,

                  mt: 2,
                }}
              >
                {!isLoadingCandidatos && candidatos.length > 0 ? (
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
                    {"Agregar coalición  "}
                    <GroupAddIcon sx={{ ml: 1 }} />
                  </Button>
                ) : (
                  <Typography sx={{ color: "#09AD29" }}>
                    ¡COALICIONES COMPLETADAS CON ÉXITO!
                  </Typography>
                )}
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
                <Agrupa
                  actualizar={actualizar}
                  info={{ coaliciones: coaliciones }}
                  tipo={1}
                ></Agrupa>
              )}

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
            </>
          )}
        </Box>
      </Stack>

      <AddCoalicion
        actualizar={actualizar}
        isOpen={modalCoalicion}
        abrirCerrarModal={abrirCerrarModalCoalicion}
        idBoleta={id}
      ></AddCoalicion>
    </>
  );
});
