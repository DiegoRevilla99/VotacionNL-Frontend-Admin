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

    actions.forEach((element, index) => {
      const info = data[id];
      botones.push(
        <Action
          key={index}
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
      <TableBody sx={{ width: { sm: "90%", xs: "90%" }, background: "#fff" }}>
        {data.map((row, index) => (
          <TableRow key={index}>
            {rows(row)}

            {actions.length > 0 && (
              <TableCell key={index + "vell"} align="center">
                {acciones(index)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};
