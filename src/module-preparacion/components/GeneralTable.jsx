import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export const GeneralTable = ({ data = [], columns, idName, loading = false }) => {
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
						justifyContent: "left",
					},
					"& .MuiDataGrid-cell--textLeft": {
						justifyContent: "left",
						align: "left",
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
