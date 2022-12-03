import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Columns } from "./Columns";
import { Body } from "./Body";
import { NoData } from "./NoData";

export const Tabla = ({ data = [], actions = [], columns = [] }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid rgba(0,0,0,0.1)",
        background: "#F0ECEC",
        width: { sm: "95%", xs: "90%" },
        height: { xl: "90%", lg: "85%", xs: "90%" },
      }}
    >
      {data.length > 0 ? (
        <Table aria-label="simple table">
          <TableHead
            sx={{ width: "100%", color: "#ffffff", background: "#3B3A3A" }}
          >
            <Columns columns={columns} actions={actions}></Columns>
          </TableHead>

          <Body data={data} actions={actions}></Body>
        </Table>
      ) : (
        <>
          <Table>
            <TableHead
              sx={{ width: "100%", color: "#ffffff", background: "#3B3A3A" }}
            >
              <Columns columns={columns} actions={actions}></Columns>
            </TableHead>
          </Table>

          <NoData></NoData>
        </>
      )}
    </TableContainer>
  );
};
