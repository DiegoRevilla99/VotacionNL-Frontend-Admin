import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { AsociacionTabla } from "./AsociacionTabla";

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



export const AgrupaAsociacion = ({ info = {} }) => {
  const { asociaciones = [] } = info;

  console.log("esta es una asociacion",asociaciones);
  const guardar = () => {
    navigate("/preparacion/comite");
  };

  const cancelar = () => {
    navigate("/preparacion/comite");
  };

  return (
    <>
     
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
              // boxShadow: 1,
              width: "100%",
              mt: 1,
              p: 1,
              // border: "1px solid rgba(0,0,0,0.3)",
              borderRadius: "15px",
              // background: "#F1F1F1",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                p: 1,
              }}
            >
              {asociaciones.map((asociacion) => (
                // <Typography key={asociacion.id} sx={{ fontWeight: "bold" }}>
                //   {asociacion.nombreAsociacion}
                // </Typography>
                <AsociacionTabla
                  key={asociacion.id}
                  info={asociacion}
                ></AsociacionTabla>
              ))}
            </Box>
          </Box>
        </Box>
      {/* ) : (
        <Box>No hay asociaciones</Box>
      )} */}
    </>
  );
};
