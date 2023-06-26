import * as yup from "yup";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  IconButton,
  Modal,
  RadioGroup,
  Stack,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { transformDate } from "../helpers/transformDate";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
const useStyles = makeStyles({
  textField: {
    width: "100%",
    p: 2,
  },
  fomi: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contenedor: {
    borderRadius: "20px",
    backgroundColor: "black",
  },
  hr: {
    height: "1px",
    color: "rgb(210, 210, 210)",
    background: "rgb(210, 210, 210)",
    width: "100%",
    boxShadow: 1,
  },
});

const modalResponsive = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  position: "fixed",
  width: { xl: "40%", sm: "55%", xs: "80%" },
  backgroundColor: "white",
  border: "1px solid rgba(0,0,0,0.0)",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-42%,-50%)",
  pl: "3rem",
  pr: "3rem",
  pt: "3rem",
  height: { xl: "60%", lg: "80%", sm: "85%", xs: "90%" },
  overflowY: "scroll",
  alignItems: "start",
};

export const ModalInfo = ({ isOpen = false, abrirCerrarModal = () => {} }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { votanteSelected, status } = useSelector(
    (state) => state.empVotantesSlice
  );

  const cerrarM = () => {
    abrirCerrarModal();
  };

  const AddVotanteNext = () => {
    abrirCerrarModal();
  };

  useEffect(() => {
    console.log("Ver foto: ", votanteSelected);
  }, [votanteSelected]);

  useEffect(() => {}, [isOpen]);

  const body = (
    <Box sx={modalResponsive}>
      <Box className={styles.fomi}>
        <Typography textAlign="center" sx={{ fontWeight: "bold", mb: 2 }}>
          INFORMACIÓN DEL VOTANTE
        </Typography>

        {!votanteSelected ? (
          <Stack
            justifyContent="center"
            sx={{ color: "grey.500" }}
            spacing={2}
            direction="row"
          >
            <CircularProgress color="primary" />
          </Stack>
        ) : (
          <Box
            sx={{
              boxShadow: "10px 10px 5px -8px rgba(0,0,0,0.75)",
              width: "100%",
              p: 4,
              border: "1px solid #7E328B",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" sx={{ mb: 1 }}>
              <AccountBoxIcon />
              <Typography sx={{ ml: 2, fontWeight: "bold" }}>
                GENERAL
              </Typography>
            </Box>

            <hr className={styles.hr} />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Box display="flex" flexDirection="row">
                  <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                    CURP:
                  </Typography>
                  <Typography>{votanteSelected.curp}</Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                    Nombre:{" "}
                  </Typography>
                  <Typography>
                    {votanteSelected.nombreVotante +
                      " " +
                      votanteSelected.apellidoPVotante +
                      " " +
                      votanteSelected.apellidoMVotante}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                    Fecha nacimiento:
                  </Typography>
                  <Typography>
                    {transformDate(votanteSelected.fechaNacimiento)}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                    Genero:
                  </Typography>
                  <Typography>{votanteSelected.genero}</Typography>
                </Box>
              </Box>
              <img
                style={{ marginRight: "50px" }}
                width={"100px"}
                src={votanteSelected?.foto ? votanteSelected?.foto : ""}
              />
            </Box>
            <Box display="flex" sx={{ mt: 4, mb: 1 }}>
              <PersonPinCircleIcon />
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                DIRECCIÓN
              </Typography>
            </Box>
            <hr className={styles.hr} />
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                Estado:
              </Typography>
              <Typography>{votanteSelected.estado}</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                Municipio:
              </Typography>
              <Typography>{votanteSelected.municipio}</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                Colonia:
              </Typography>
              <Typography>{votanteSelected.colonia}</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                Código postal:
              </Typography>
              <Typography>{votanteSelected.cp}</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>Calle:</Typography>
              <Typography>{votanteSelected.calle}</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                Número:
              </Typography>
              <Typography>{votanteSelected.numero}</Typography>
            </Box>
            <Box display="flex" sx={{ mb: 1, mt: 4 }}>
              <ContactPhoneIcon />
              <Typography sx={{ ml: 2, fontWeight: "bold" }}>
                CONTACTO
              </Typography>
            </Box>

            <hr className={styles.hr} />
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                Correo:
              </Typography>
              <Typography>{votanteSelected.correoVotante}</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                Teléfono:
              </Typography>
              <Typography>{votanteSelected.telefonoVotante}</Typography>
            </Box>
          </Box>
        )}
      </Box>
      <br />
    </Box>
  );

  return (
    <>
      <div className={styles.contenedor}>
        <Modal open={isOpen} onClose={cerrarM}>
          {body}
        </Modal>
      </div>
    </>
  );
};
