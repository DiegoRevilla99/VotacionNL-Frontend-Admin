import EditIcon from "@mui/icons-material/Edit";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { onDeletePartido, onEditPartido } from "../../../store/module-preparacion/jornada/SliceJornada";
import "../../../styles/generalContainer.css";
import { BoxCandidato } from "./BoxCandidato";

export const PartidosTable = memo(({info = {}, handleOpenModal}) => {

    const params = useParams();
    const dispatch = useDispatch();
    console.log("INFOR EN TABLE",info);
    const { id, nameParty, candidatosPartido } = info;


    const editar = () => {
      handleOpenModal();
      dispatch(onEditPartido(id));
      console.log("press btn Editar", id);
    };
    
    const eliminarbtn = () => {
      console.log("press btn Eliminar", id);
      dispatch(onDeletePartido(id));
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
              {candidatosPartido.map(({ id, nombreCandidato }) => (
                <BoxCandidato
                  key={id}
                  candidato={nombreCandidato}
                ></BoxCandidato>
              ))}
            </Box>
          </fieldset>
        </Box>
      </>
    );
  });
