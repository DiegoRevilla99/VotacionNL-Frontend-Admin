import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

export const Columns = ({ data = [], columns = [], actions = [] }) => {
  return (
    <>
      <TableRow sx={{ width: "100%", color: "#ffffff", background: "#3B3A3A" }}>
        {columns.map((row) => (
          <TableCell key={row.title} align="center">
            <Typography
              sx={{ width: "100%", fontWeight: "bold", color: "#ffffff" }}
              variant="body2"
            >
              {row.title}
            </Typography>
          </TableCell>
        ))}
        {actions.length > 0 && (
          <TableCell key={"actions"} align="center">
            <Typography sx={{ fontWeight: "bold", color: "#ffffff" }}>
              ACCIONES
            </Typography>
          </TableCell>
        )}
      </TableRow>
    </>
  );
};
