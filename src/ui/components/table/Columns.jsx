import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

export const Columns = ({ data = [], columns = [], actions = [] }) => {
  return (
    <>
      <TableRow>
        {columns.map((row) => (
          <TableCell sx={{ boxShadow: 1 }} key={row.title} align="center">
            <Typography
              sx={{ width: "100%", fontWeight: "bold", color: "#000" }}
              variant="body2"
            >
              {row.title}
            </Typography>
          </TableCell>
        ))}
        {actions.length > 0 && (
          <TableCell sx={{ boxShadow: 1 }} key={"action"} align="center">
            <Typography sx={{ fontWeight: "bold", color: "#000" }}>
              ACCIONES
            </Typography>
          </TableCell>
        )}
      </TableRow>
    </>
  );
};
