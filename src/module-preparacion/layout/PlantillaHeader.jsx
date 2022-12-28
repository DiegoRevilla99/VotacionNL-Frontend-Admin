import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

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
const hijoResponsive = {
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  width: "100%",
  pl: "2rem",
  pr: "2rem",
};

export const PlantillaHeader = ({ titulo = " ", children }) => {
  const classes = useStyles();
  return (
    <>
      <>
        <Box
          direction="column"
          sx={{
            width: "100%",
            overflowY: "scroll",
            pb: 2,
          }}
        >
          <Box
            sx={{
              mt: 2,
              mb: 2,
              width: "100%",
              height: "40px",
            }}
          >
            <Typography sx={{ ml: "2rem" }} variant="h6">
              {titulo != undefined ? titulo : ""}
            </Typography>
            <hr className={classes.hr} />
          </Box>

          <Box sx={hijoResponsive}>{children}</Box>
        </Box>
      </>
    </>
  );
};
