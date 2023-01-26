import React from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const InicioPage = () => {
  const navigate = useNavigate();
  const plantilla1 = () => {
    navigate("formal");
  };
  const plantilla2 = () => {
    navigate("noformal");
  };
  const plantilla3 = () => {
    navigate("consultas");
  };
  return (
    <>
      <div>
        <Box ml={3}>
          <h3>EMPADRONAMIENTO</h3>
        </Box>
        <hr />
      </div>

      <div align="center">
        <Box mt={3}>
          <Box
            p={6}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              border: 1,
              boxShadow: 5,
              width: { xl: "90%", lg: "90%", sm: "80%", xs: "70%" },
              height: { xl: "100%", lg: "90%", sm: "80%", xs: "70%" },
            }}
          >
            <Typography ml={4} variant="h5" align="left" paragraph>
              ¿EN QUÉ TIPO DE ELECCIÓN DESEA HACER EL EMPADRONAMIENTO?
            </Typography>

            <Stack
              direction={{ xl: "row", lg: "row", sm: "column", xs: "column" }}
              justifyContent="center"
              alignItems="center"
              spacing={{ xl: 9.5, lg: 7, md: 4, sm: 4, xs: 2 }}
            >
              <Button
                onClick={plantilla1}
                sx={{
                  backgroundColor: "#511079",
                  borderRadius: "0px 25px 25px 25px",
                  color: "#fff",
                  fontSize: {
                    xl: "2rem",
                    lg: "1.5rem",
                    sm: "1rem",
                    xs: "0.8rem",
                  },
                  fontWeight: "bold",
                  letterSpacing: "0.01rem",
                  lineHeight: {
                    xl: "2rem",
                    lg: "1.5rem",
                    sm: "1.5rem",
                    xs: "1.5rem",
                  },
                  width: { xl: 340, lg: 240, sm: "80%", xs: "80%" },
                  height: { xl: 370, lg: 270, sm: "80%", xs: "80%" },
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #7E328B 30%, #7E328B 90%)",
                    boxShadow: "9px 10px 4px rgba(0, 0, 0, 0.37)",
                    transform: "translate(-5px, -5px)",
                    transition: "all 0.5s ease",
                  },
                }}
              >
                FORMALES
              </Button>
              <Button
                onClick={plantilla2}
                sx={{
                  backgroundColor: "#511079",
                  borderRadius: "0px 25px 25px 25px",
                  color: "#fff",
                  fontSize: {
                    xl: "2rem",
                    lg: "1.5rem",
                    sm: "1rem",
                    xs: "0.8rem",
                  },
                  fontWeight: "bold",
                  letterSpacing: "0.01rem",
                  lineHeight: {
                    xl: "2rem",
                    lg: "1.5rem",
                    sm: "1.5rem",
                    xs: "1.5rem",
                  },
                  textAlign: "center",
                  width: { xl: 340, lg: 240, sm: "80%", xs: "80%" },
                  height: { xl: 370, lg: 270, sm: "80%", xs: "80%" },
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #7E328B 30%, #7E328B 90%)",
                    boxShadow: "9px 10px 4px rgba(0, 0, 0, 0.37)",
                    transform: "translate(-5px, -5px)",
                    transition: "all 0.5s ease",
                  },
                }}
              >
                NO FORMALES
              </Button>
              <Button
                onClick={plantilla3}
                sx={{
                  backgroundColor: "#511079",
                  borderRadius: "0px 25px 25px 25px",
                  color: "#fff",
                  fontSize: {
                    xl: "2rem",
                    lg: "1.5rem",
                    sm: "1rem",
                    xs: "0.8rem",
                  },
                  fontWeight: "bold",
                  letterSpacing: "0.01rem",
                  lineHeight: {
                    xl: "2rem",
                    lg: "1.5rem",
                    sm: "1.5rem",
                    xs: "1.5rem",
                  },
                  textAlign: "center",
                  width: { xl: 340, lg: 240, sm: "80%", xs: "80%" },
                  height: { xl: 370, lg: 270, sm: "80%", xs: "80%" },
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #7E328B 30%, #7E328B 90%)",
                    boxShadow: "9px 10px 4px rgba(0, 0, 0, 0.37)",
                    transform: "translate(-5px, -5px)",
                    transition: "all 0.5s ease",
                  },
                }}
              >
                CONSULTA CIUDADANA
              </Button>
            </Stack>
          </Box>
        </Box>
      </div>
    </>
  );
};
