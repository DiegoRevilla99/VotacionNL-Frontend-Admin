import { Box, Typography } from "@mui/material";
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



export const AgrupaAsociacion = ({ info = {}, handleOpenModal }) => {
  const { asociaciones = [] } = info;

  return (
    <>
     {asociaciones.length > 0 ? (
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
                  handleOpenModal={handleOpenModal}
                ></AsociacionTabla>
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, color: "#ff0000" }}>
        No existen asociaciones ahora mismo. Por favor, agregue uno para mostrarlo aquí.
      </Typography>
      )}
    </>
  );
};
