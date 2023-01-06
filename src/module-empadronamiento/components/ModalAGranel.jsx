import PostAddIcon from "@mui/icons-material/PostAdd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";

import { useDispatch, useSelector } from "react-redux";

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
  alignItems: "center",
  alignContent: "center",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  width: { xl: "50%", sm: "60%", xs: "80%" },
  backgroundColor: "white",
  border: "1px solid rgba(0,0,0,0.0)",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-47%,-50%)",
  padding: "2rem",
  height: { xl: "40%", lg: "50%", sm: "60%", xs: "70%" },
  overflowY: "scroll",
};

export const ModalAGranel = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  agregar = () => {
    alert("Subiendo archivo");
  },
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [archivo, setArchivo] = useState({ name: "Sin Archivo seleccionado" });

  const cerrarM = () => {
    abrirCerrarModal();
  };

  useEffect(() => {}, [isOpen]);

  const body = (
    <Box sx={modalResponsive}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div aling="center">
          <Typography textAlign="center" sx={{ fontWeight: "bold", mb: 3 }}>
            REGISTRAR VOTANTES A GRANEL
          </Typography>
        </div>

        <br />
        <Typography>INSERTAR ARCHIVO</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          sx={{ width: "100%" }}
          flexDirection="row"
        >
          <TextField
            label=""
            disabled
            variant="outlined"
            size="small"
            value={archivo.name}
            className={styles.textField}
          ></TextField>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            size="large"
          >
            <input
              hidden
              onChange={(e) => setArchivo(e.target.files[0])}
              // onBlur={handleBlur}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              type="file"
              name="logo"
              id="logo"
            />
            <PostAddIcon fontSize="" />
          </IconButton>
        </Box>

        <br />
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{
            width: { sm: `150px`, xs: "150px" },
            borderRadius: "15px",
          }}
          endIcon={<CloudUploadIcon />}
        >
          SUBIR
        </Button>
      </Box>

      <Box
        display="flex"
        sx={{ mt: 1, p: 2, width: "100%" }}
        justifyContent="end"
      >
        {/* <Button
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
        </Button> */}
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
};
