import { Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useEffect } from "react";
import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";

export const GeneralTable = ({
  data = [],
  columns,
  idName,
  loading = false,
}) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        loading={loading}
        getRowId={(row) => row[idName]}
        disableSelectionOnClick
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
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
