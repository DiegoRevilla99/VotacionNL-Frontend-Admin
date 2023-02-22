import EditIcon from "@mui/icons-material/Edit";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { onDeleteAsociacion, onEditAsociacion } from "../../../store/module-preparacion/jornada/SliceJornadaNoFormal";

import "../../../styles/generalContainer.css";
import { BoxCandidatoFormal } from "./BoxCandidatoFormal";

export const AsociacionTabla = memo(({
  info = {}, handleOpenModal
}) => {
  console.log("AsociacionTabla", info);
  const { id, nombreAsociacion, logo, candidatosAsociacion } = info;

  const dispatch = useDispatch();
  const params = useParams();

  const editar = () => {
    console.log('Editar', id);
    handleOpenModal();
    dispatch(onEditAsociacion(id));
  };

  const eliminarbtn = () => {
    // abrirCerrarConfirmation();
    console.log('ELIMINAR', id);
    dispatch(onDeleteAsociacion(id));
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
          <Tooltip title="Editar la asociación">
            <IconButton aria-label="edit" onClick={editar}>
              <EditIcon fontSize="large" color="primary" />
            </IconButton>
            </Tooltip>
              <Tooltip title="Eliminar la asociación">
            <IconButton aria-label="delete" onClick={eliminarbtn}>
              <HighlightOffSharpIcon fontSize="large" color="primary" />
            </IconButton>
            </Tooltip>
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
              <BoxCandidatoFormal
                key={candidato.id}
                candidato={candidato.nombreCandidato}
                img={logo}
              ></BoxCandidatoFormal>
            ))}
          </Box>
        </fieldset>
      </Box>

    </>
  );
});
