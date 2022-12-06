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
import { Box, Divider, Typography } from "@mui/material";

export const Tabla = ({
  data = [],
  actions = [],
  columns = [],
  titulo = "TIUTLO",
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <TableContainer
        component={Paper}
        sx={{
          mt: 1,
          // border: "1px solid rgba(0,0,0,0.2)",
          // background: "#fff",
          borderRadius: "20px",
          width: "100%",
          height: { xl: "95%", lg: "88%", xs: "85%" },
          boxShadow: 2,
        }}
      >
        {data.length > 0 ? (
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <Columns columns={columns} actions={actions}></Columns>
            </TableHead>

            <Body
              rowsPerPage={rowsPerPage}
              page={page}
              data={data}
              actions={actions}
            ></Body>
          </Table>
        ) : (
          <>
            <Table>
              <TableHead>
                <Columns columns={columns} actions={actions}></Columns>
              </TableHead>
            </Table>

            <NoData></NoData>
          </>
        )}
      </TableContainer>
    </Box>
  );
};
