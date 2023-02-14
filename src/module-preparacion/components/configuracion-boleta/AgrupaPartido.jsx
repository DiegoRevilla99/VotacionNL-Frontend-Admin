import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
// import { useJornadaStore } from "../../../../../../../store/module-jornada/jornadaStore";
import { useJornadaStore } from "../../hooks/useJornadaStore";

import { PartidosTable } from "./PartidosTable";
const useStyles = makeStyles({
  hr: {
    height: "1px",
    color: "rgb(210, 210, 210)",
  },
  boton: {
    boxShadow: 1,
    color: "white",
    height: 42,
  },
});
const styleButton = {
  borderRadius: 50,
};

export const AgrupaPartido = ({}) => {
	const { 
		status, 
		partidos, 
		partidoSelected, 
		candidatoandSuplentes,
		candidatoandSuplenteSelected,
		addPartido, 
		setPartidoSelectedNull, 
		updatePartido
	} = useJornadaStore();


  const guardar = () => {
    navigate("/preparacion/comite");
  };

  const cancelar = () => {
    navigate("/preparacion/comite");
  };

  return (
    <>

      {partidos.length > 0 ? (
          <Box
            sx={{
              width: "100%",
              boxShadow: 1,
              border: "2px solid rgba(0,0,0,0.5)",
              borderRadius: "10px",
              background: "#F8F8F8",
            }}
          >
            <Box
              sx={{
                width: "100%",
                mt: 1,
                p: 1,
                borderRadius: "10px",
                background: "#F8F8F8",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                }}
              >
                {partidos.map((partidosAll, id) => (
                  // console.log("Este no se que es",partidosAll), // Todo: Se muestran los partidos
                  // console.log("Este id",id), // Todo: Se muestran los id de los partidos
                  <PartidosTable key={id} info={partidosAll}></PartidosTable>
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, color: "#ff0000" }}>
            No existen partidos ahora mismo. Por favor, agregue uno para mostrarlo aquí.
          </Typography>

        )} 
    </>
  );
};
