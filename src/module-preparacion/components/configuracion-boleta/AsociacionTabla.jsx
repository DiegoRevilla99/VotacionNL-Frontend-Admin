import EditIcon from "@mui/icons-material/Edit";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo, useState } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "../../../styles/generalContainer.css";
import { BoxCandidato } from "./BoxCandidato";

export const AsociacionTabla = memo(({
  info = {},
}) => {
  const { idAsociacion, nombreAsociacion, candidatosAsociacion } = info;
  const [asociacionI, setAsociacionI] = useState(info);
  // console.log("candidatosAsociacion", candidatosAsociacion);
  // const { id } = useParams();
  const dispatch = useDispatch();
  const params = useParams();
  const [modalAsociacion, setModalAsociacion] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const editar = () => {
    // abrirCerrarModalAsociacion();
  };

  const abrirCerrarModalAsociacion = () => {
    // setModalAsociacion(!modalAsociacion);
  };

  const abrirCerrarConfirmation = () => {
    // setConfirmation(!confirmation);
  };
  const eliminarbtn = () => {
    // abrirCerrarConfirmation();
  };

  const eliminarAsociacion = () => {
    // dispatch(deleteCoalicion(params.id, abrirCerrarConfirmation));
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
            // background: colorb,
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
            {candidatosAsociacion.map((candidato) => (
              <BoxCandidato
                key={candidato.id}
                candidato={candidato.nombreCandidato}
              ></BoxCandidato>
            ))}
          </Box>
        </fieldset>
      </Box>
      {/* <EditAsociacion
        isOpen={modalAsociacion}
        abrirCerrarModal={abrirCerrarModalAsociacion}
        idBoleta={params.id}
        asociacion={asociacionI}
      ></EditAsociacion>
      <ModalConfirmation
        isOpen={confirmation}
        abrirCerrarModal={abrirCerrarConfirmation}
        confirmar={eliminarAsociacion}
      /> */}
    </>
  );
});
