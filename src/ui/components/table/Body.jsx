import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { Action } from "./Action";
import { NoData } from "./NoData";

export const Body = ({ data = [], actions = [] }) => {
  const rows = (element) => {
    let arr = [];
    for (let clave in element) {
      arr.push(
        <TableCell key={clave} align="center" component="th" scope="row">
          {element[clave]}
        </TableCell>
      );
    }
    return arr;
  };

  const acciones = (id) => {
    let botones = [];

    actions.forEach((element) => {
      const info = data[id];
      botones.push(
        <Action
          icon={element.icon}
          sx={element.sx}
          title={element.title}
          click={element.onClick}
          info={info}
        ></Action>
      );
    });

    return botones;
  };

  return (
    <>
      <TableBody sx={{ width: { sm: "90%", xs: "90%" } }}>
        {data.map((row, index) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {rows(row)}

            {actions.length > 0 && (
              <TableCell align="center">{acciones(index)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};
