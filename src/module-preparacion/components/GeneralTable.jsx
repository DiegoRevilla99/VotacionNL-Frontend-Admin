import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export const GeneralTable = ({
  data = [],
  columns,
  idName,
  loading = false,
  colorRow = () => {},
}) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <DataGrid
        loading={loading}
        getRowId={(row) => row[idName]}
        disableSelectionOnClick
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowClassName={colorRow}
        sx={{
          border: "0px",
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            justifyContent: "center",
          },
          "& .MuiDataGrid-cell--textLeft": {
            justifyContent: "center",
            align: "center",
          },
          "& .MuiDataGrid-cell": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeader": {
            outline: "none !important",
          },
        }}
      />
    </div>
  );
};
