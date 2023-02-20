import { PhotoCamera } from "@mui/icons-material";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Modal,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { memo, useEffect, useState } from "react";

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
    height: "100%",
  },
  contenedor: {
    borderRadius: "20px",
    backgroundColor: "black",
  },
});

const modalResponsive = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "fixed",
  width: { xl: "50%", sm: "60%", xs: "90%" },
  backgroundColor: "white",
  border: "1px solid rgba(0,0,0,0.0)",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  padding: "2rem",

  height: { xl: "200px", lg: "220px", sm: "230px", xs: "250px" },
  overflowY: "scroll",
  alignItems: "center",
};

export const ModalConfirmation = memo(
  ({
    isOpen = false,
    abrirCerrarModal = () => {},
    confirmar = () => {
      alert("Presionaste enviar del modal");
    },
  }) => {
    const styles = useStyles();

    const cerrarM = () => {
      abrirCerrarModal();
    };

    const body = (
      <Box sx={modalResponsive}>
        <Box sx={{ width: "100%" }}>
          <div aling="center">
            <Typography textAlign="center" sx={{ fontWeight: "bold", mb: 3 }}>
              ¿ESTA SEGURO DE ESTA ACCIÓN?
            </Typography>
          </div>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 1, p: 2, width: "100%" }}
        >
          <Button
            type="submit"
            variant="contained"
            onClick={confirmar}
            sx={{
              width: { sm: `150px`, xs: "150px" },
              borderRadius: "15px",
            }}
          >
            CONFIRMAR
          </Button>
          <Button
            variant="contained"
            onClick={cerrarM}
            sx={{
              width: { sm: `150px`, xs: "150px" },
              backgroundColor: "error.main",
              borderRadius: "15px",
              ml: 1,
            }}
          >
            Cancelar
          </Button>
        </Box>
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
  }
);
