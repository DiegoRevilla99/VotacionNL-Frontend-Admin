import { Box, Typography } from "@mui/material";
import NoDataImg from "./img/nodata.png";
import React from "react";

export const NoData = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <img width="400" height="240" src={NoDataImg} />
      </Box>
    </>
  );
};
