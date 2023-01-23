import PostAddIcon from "@mui/icons-material/PostAdd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  IconButton,
  Modal,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { uploadCSV } from "../../store/module-empadronamiento/formales/thunksFormales";

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
  height: { lg: "300px", xs: "350px" },
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
  const { status } = useSelector((state) => state.empFormales);
  const [archivo, setArchivo] = useState({ name: "Sin Archivo seleccionado" });

  const cerrarM = () => {
    abrirCerrarModal();
  };

  const uploadFile = () => {
    console.log("dando click");
    const f = new FormData();
    f.append("file", archivo);
    dispatch(uploadCSV(f, cerrarM));
  };

  useEffect(() => {
    setArchivo({ name: "Sin Archivo seleccionado" });
  }, [isOpen]);

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
            disabled={status == "checking"}
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
          disabled={
            (status == "checking") |
            (archivo.name === "Sin Archivo seleccionado")
          }
          type="submit"
          onClick={uploadFile}
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

      {status === "checking" && (
        <Stack
          justifyContent="center"
          sx={{ color: "grey.500" }}
          spacing={2}
          direction="row"
        >
          <CircularProgress color="primary" />
        </Stack>
      )}
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
