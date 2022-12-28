import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import React, { useState } from "react";
import { BoxPartido } from "./BoxPartido";

import "../../../styles/generalContainer.css";
import { BoxCandidato } from "./BoxCandidato";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalConfirmation } from "./ModalConfirmation";
import { EditCoalicion } from "./EditCoalicion";
import { EditAsociacion } from "./EditAsociacion";
import { deleteCoalicion } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";

export const Asociacion = ({
  color = "#511079",
  colorb = "#F8F8F8",
  info = {},
}) => {
  const { idAsociacion, nombreAsociacion, candidatos } = info;
  const [asociacionI, setAsociacionI] = useState(info);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [modalAsociacion, setModalAsociacion] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const editar = () => {
    abrirCerrarModalAsociacion();
  };

  const abrirCerrarModalAsociacion = () => {
    setModalAsociacion(!modalAsociacion);
  };

  const abrirCerrarConfirmation = () => {
    setConfirmation(!confirmation);
  };
  const eliminarbtn = () => {
    abrirCerrarConfirmation();
  };

  const eliminarAsociacion = () => {
    dispatch(deleteCoalicion(id, abrirCerrarConfirmation));
  };

  const styles = {
    marco: {
      "&:hover": {
        background: "#EB240C",
        borderColor: "#EB240C",
      },
    },
  };

  return (
    <>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <fieldset
          className="agrupacion"
          style={{
            display: "flex",
            boxShadow: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: colorb,
            width: "100%",

            mb: 5,
            borderRadius: "5px",
            border: "1px solid rgba(0,0,0,0.4)",
          }}
        >
          <legend style={{ textAlign: "right" }}>
            <IconButton aria-label="edit" onClick={editar}>
              <EditIcon fontSize="large" color="primary" />
            </IconButton>
            <IconButton aria-label="delete" onClick={eliminarbtn}>
              <HighlightOffSharpIcon fontSize="large" color="primary" />
            </IconButton>
          </legend>
          <Typography sx={{ fontWeight: "bold" }}>
            {nombreAsociacion}
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {candidatos.map(({ claveElectoral, nombreCandidato }) => (
              <BoxCandidato
                key={claveElectoral}
                candidato={nombreCandidato}
              ></BoxCandidato>
            ))}
          </Box>
        </fieldset>
      </Box>
      <EditAsociacion
        isOpen={modalAsociacion}
        abrirCerrarModal={abrirCerrarModalAsociacion}
        idBoleta={id}
        asociacion={asociacionI}
      ></EditAsociacion>
      <ModalConfirmation
        isOpen={confirmation}
        abrirCerrarModal={abrirCerrarConfirmation}
        confirmar={eliminarAsociacion}
      />
    </>
  );
};
