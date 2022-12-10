import { Box } from "@mui/system";
import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export const ErrorField = ({ children }) => {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      sx={{ fontWeight: "bold", color: "#791010" }}
    >
      {children}*
    </Box>
  );
};
