import { Box } from "@mui/system";
import React, { memo } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export const ErrorField = memo(({ children }) => {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      sx={{ fontWeight: "bold", color: "#D80F0F" }}
    >
      {children}
    </Box>
  );
});
