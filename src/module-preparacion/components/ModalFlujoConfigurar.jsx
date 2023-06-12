import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40rem",
  bgcolor: "background.paper",
  borderRadius: "2rem",
  boxShadow: 3,
  p: 4,
  height: "auto",
};

export const ModalFlujoConfigurar = ({ status, id }) => {
  const navigate = useNavigate();
  return (
    <Modal open={status}>
      <Box sx={style}>
        <Box sx={{ overflowY: "auto", height: "100%" }}>
          <Typography id="modal-modal-title" variant="h5" color="initial" align="center">
            ¿Deseas configurar la boleta o prefieres terminar y salir?
          </Typography>
          <Box sx={{ width: 1, display: "flex" }} justifyContent="space-around" pt={5}>
            <Button
              onClick={() => navigate("/preparacion/consulta/" + id)}
              variant="contained"
              size="large"
              sx={{
                boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
                transition: "all 0.5s ease",
                backgroundColor: "#791010",
                borderRadius: "2rem 2rem 2rem 2rem",
                "&:hover": {
                  backgroundColor: "#8B3232 !important",
                  transform: "translate(-5px, -5px)",
                  boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              Configurar después
            </Button>
            <Button
              type="submit"
              onClick={() => navigate("/preparacion/consulta/")}
              variant="contained"
              size="large"
              sx={{
                boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
                transition: "all 0.5s ease",
                backgroundColor: "#511079",

                borderRadius: "2rem 2rem 2rem 2rem",
                "&:hover": {
                  backgroundColor: "#7E328B !important",
                  transform: "translate(-5px, -5px)",
                  boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              Configurar ahora
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
