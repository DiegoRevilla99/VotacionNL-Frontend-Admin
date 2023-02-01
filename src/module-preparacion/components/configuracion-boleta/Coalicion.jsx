import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import React, { memo, useEffect, useState } from "react";
import { BoxPartido } from "./BoxPartido";
import "../../../styles/generalContainer.css";
import { EditCoalicion } from "./EditCoalicion";
import { useParams } from "react-router-dom";
import { ModalConfirmation } from "./ModalConfirmation";
import { deleteCoalicion } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import { useDispatch } from "react-redux";

export const Coalicion = memo(
  ({ color = "#511079", colorb = "#F8F8F8", info = {} }) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { coalicionModel, partidos, candidatoModel } = info;
    const [coalicionI, setCoalicionI] = useState(info);
    const [modalCoalicion, setModalCoalicion] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const editar = () => {
      abrirCerrarModalCoalicion();
    };

    useEffect(() => {
      console.log("info:")
      console.log(info)
    }, [])
    

    const eliminarbtn = () => {
      abrirCerrarConfirmation();
    };

    const eliminarCoalicion = () => {
      dispatch(deleteCoalicion(id, abrirCerrarConfirmation));
    };

    const abrirCerrarModalCoalicion = () => {
      setModalCoalicion(!modalCoalicion);
    };

    const abrirCerrarConfirmation = () => {
      setConfirmation(!confirmation);
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
            ml: 1,
          }}
        >
          <fieldset
            className="agrupacion "
            style={{
              display: "flex",
              boxShadow: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: colorb,
              width: "100%",

              mb: 5,
              borderRadius: "8px",
              border: "1px solid rgba(0,0,0,0.9)",
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
              {coalicionModel.nombre}
            </Typography>
            <Typography sx={{}}>{candidatoModel.nombreCandidato}</Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {partidos?.length > 0 &&
                partidos.map(({ clavePartido, nombre }) => (
                  <BoxPartido key={clavePartido} partido={nombre}></BoxPartido>
                ))}
            </Box>
          </fieldset>
        </Box>

        <EditCoalicion
          isOpen={modalCoalicion}
          abrirCerrarModal={abrirCerrarModalCoalicion}
          idBoleta={id}
          coalicion={coalicionI}
        ></EditCoalicion>
        <ModalConfirmation
          isOpen={confirmation}
          abrirCerrarModal={abrirCerrarConfirmation}
          confirmar={eliminarCoalicion}
        />
      </>
    );
  }
);
