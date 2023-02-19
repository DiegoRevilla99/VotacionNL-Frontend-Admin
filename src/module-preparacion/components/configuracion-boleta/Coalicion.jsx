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
import { deleteCoalicion, getCoaliciones } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import { useDispatch } from "react-redux";
import { useCoaliciones } from "../../hooks/config-boleta/useCoaliciones";

export const Coalicion = memo(
  ({ color = "#511079", colorb = "#F8F8F8", info = {},actualizar }) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { coalicionModel, partidos, candidatoModel } = info;
    // const { update } = useCoaliciones(id);
    const [coalicionI, setCoalicionI] = useState(info);
    const [modalCoalicion, setModalCoalicion] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const editar = () => {
      abrirCerrarModalCoalicion();
    };

    const eliminarbtn = () => {
      abrirCerrarConfirmation();
    };
    const eliminarafter = () => {
      console.log("eliminar despues")
      abrirCerrarConfirmation();
      actualizar()
    };

    const eliminarCoalicion = () => {
      dispatch(deleteCoalicion(coalicionModel.claveCoalicion,eliminarafter));
      
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
            width: {xl:"500px",md:"500px",xs:"80%"},
          }}
        >
          <fieldset
          
            className="agrupacion "
            style={{
              width:"100%",
              display: "flex",
              boxShadow: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: colorb,
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

            <Typography sx={{ mb:1,fontSize:{lg:"25px",md:"19px",xs:"15px"},fontWeight: "bold" }}>
                  {coalicionModel.nombre}
                  </Typography>
          <Typography sx={{ fontSize:{lg:"17px",xs:"10px"},mb:2 }} >{coalicionModel.emblema}</Typography>
            <Box  width="100%" display={"flex"}  justifyContent="center" flexDirection={{lg:"row",xs:"column"}} alignItems="center">
              <Box width={{md:"150px",xs:"100px"}} sx={{mr:2}}>
                  <a href={coalicionModel.logo}><img width="100%" height="60px" src={coalicionModel.logo} alt="Logo coalición"/></a>
              </Box>
              <Box>
                  
                 
                  
                </Box>
                
            </Box>
            <Typography sx={{ mt:2,fontSize:{lg:"20px",md:"19px",xs:"15px"},fontWeight: "bold" }} >{candidatoModel.nombreCandidato }{" "}{candidatoModel.apellidoPCandidato}{" "}{candidatoModel.apellidoMCandidato}</Typography>
            
            <Typography sx={{ fontSize:{lg:"17px",xs:"10px"},fontWeight: "bold",mt:3 }} >Partidos:</Typography>
            
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
        actualizar={actualizar}
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
