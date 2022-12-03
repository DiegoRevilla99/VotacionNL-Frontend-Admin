import { Button, Modal, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  textField: {
    width: "100%",
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
      <div aling="center">
        <h2>Formuario</h2>
      </div>
      <TextField label="Nombre" className={styles.textField}></TextField>
      <br />
      <TextField label="Nombre" className={styles.textField}></TextField>
      <br />
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
