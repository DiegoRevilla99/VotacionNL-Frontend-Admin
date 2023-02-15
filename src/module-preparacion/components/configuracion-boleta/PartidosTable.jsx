import EditIcon from "@mui/icons-material/Edit";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "../../../styles/generalContainer.css";
import { BoxCandidato } from "./BoxCandidato";

import { onDeletePartido } from "../../../store/module-preparacion/jornada/SliceJornada";

export const PartidosTable = memo(({info = {}}) => {

    const params = useParams();
    const dispatch = useDispatch();

    // En info recibo todos los datos de la boleta
    const { id, nameParty, candidatosPartido } = info;

    // console.log("partidos info", info)
    const editar = () => {
      // abrirCerrarModalAsociacion();
      console.log("press btn Editar");
    };
    
    // const abrirCerrarModalAsociacion = () => {
      //   setModalAsociacion(!modalAsociacion);
    // };
  
    const eliminarbtn = () => {
      console.log("press btn Eliminar");
      onDeletePartido(id);
      // abrirCerrarConfirmation();
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
              {nameParty}
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {Array.isArray(candidatosPartido) &&
                candidatosPartido.map(({ id, nombreCandidato }) => (
                  <BoxCandidato key={id} candidato={nombreCandidato} />
                ))}
              {/* {candidatosPartido.map(({ id, nombreCandidato }) => (
                <BoxCandidato
                  key={id}
                  candidato={nombreCandidato}
                ></BoxCandidato>
              ))} */}
            </Box>
          </fieldset>
        </Box>
      </>
    );
  });
