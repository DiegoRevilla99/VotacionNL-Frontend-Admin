import { Button, Modal, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    width: "60%",
    backgroundColor: "white",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: "15px",
    top: "50%",
    left: "50%",
    transform: "translate(-40%,-50%)",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    height: "90%",
    overflowY: "scroll",
    alignItems: "center",
  },
  textField: {
    width: "100%",
    p: 2,
  },
});

export const AddPlanillaComite = ({
  isOpen = false,
  abrirCerrarModal = () => {},
}) => {
  const styles = useStyles();

  const cerrarM = () => {
    abrirCerrarModal();
  };

  const body = (
    <div className={styles.modal}>
      <div aling="left">
        <Typography sx={{ mb: 3 }}>REGISTRO PLANILLA</Typography>
      </div>
      <TextField
        label="NOMBRE DE LA PLANILLA"
        className={styles.textField}
      ></TextField>
      <br />
      <TextField
        label="INSERTAR EMBLEMA DE LA PLANILLA"
        className={styles.textField}
      ></TextField>
      <br />
      <TextField
        label="INSERTAR FOTOGRAFIA DEL REPRESENTANTE"
        className={styles.textField}
      ></TextField>
      <br />
      <TextField label="NOMBRE" className={styles.textField}></TextField>
      <br />
      <TextField label="SEUDÓNIMO" className={styles.textField}></TextField>
      <br />
      <TextField label="CARGO" className={styles.textField}></TextField>
      <br />
      <div aling="right">
        <Button>Enviar</Button>
        <Button>Cancelar</Button>
      </div>
    </div>
  );
  return (
    <>
      <div>
        <Modal open={isOpen} onClose={cerrarM}>
          {body}
        </Modal>
      </div>
    </>
  );
};
