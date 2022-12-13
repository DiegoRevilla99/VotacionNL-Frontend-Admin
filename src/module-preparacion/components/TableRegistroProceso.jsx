import { DataGrid } from "@mui/x-data-grid";
import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";
import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";
import { Stack } from "@mui/system";

export const TableRegistroProceso = ({ handleOpenModal, title }) => {
	const handleConfig = (id) => {
		handleOpenModal();
	};

	const columns = [
		{ field: "id", headerName: "ID", flex: 1 },
		{ field: "title", headerName: title, flex: 10 },
		{
			field: "configuracion",
			headerName: "Configuración",
			flex: 5,
			sortable: false,
			disableColumnMenu: true,
			renderCell: (params) => {
				return (
					<Stack spacing={2} direction="row">
						<Button variant="outlined" startIcon={<BallotIcon />}>
							Ver
						</Button>
						<Button variant="outlined" startIcon={<SettingsIcon />}>
							Configuración
						</Button>
					</Stack>
				);
			},
		},
	];

	const rows = [
		{
			id: 1,
			title: "JORNADA ELECTORAL DE ELECCIONS DE PRESIDENCIA DE LA REPUBLICA MEXICANA DEL AÑO DOS MIL VEINTIDOS",
		},
	];

	return (
		<div style={{ height: "100%", width: "100%" }}>
			<DataGrid
				disableSelectionOnClick
				rows={rows}
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
