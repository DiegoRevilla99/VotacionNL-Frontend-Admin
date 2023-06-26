import { Box, Typography } from "@mui/material";
import React from "react";

export const InicioInfo = () => {
  return (
    <Box
      justifyContent={"center"}
      display={"flex"}
      height={"auto"}
      width={"100%"}
      mt={5}
      sx={{ overflowY: "scroll" }}
    >
      <img
        width={"80%"}
        src={
          "https://imagesvotacion.s3.eu-north-1.amazonaws.com/1677223707464_3.png"
        }
      />
    </Box>
  );
};
