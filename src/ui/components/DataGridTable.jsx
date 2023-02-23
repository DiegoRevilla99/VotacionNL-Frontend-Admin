import { DataGrid } from "@mui/x-data-grid";
import { useConsultaCiudadanaStore } from "../../module-preparacion/hooks/useConsultaCiudadanaStore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const DataGridTable = ({ handleOpenModal }) => {
	const { questions, deleteQuestion, editQuestion } = useConsultaCiudadanaStore();

	const handleDelete = (id) => {
		console.log("ID: ", id);
		deleteQuestion(id);
	};

	const handleEdit = (id) => {
		// console.log("ID SELECCIONADO:", id);
		handleOpenModal();
		editQuestion(id);
	};

	const columns = [
		{ field: "id", headerName: "ID", flex: 1 },
		{ field: "pregunta", headerName: "Pregunta", flex: 4 },
		{ field: "tipoDeRespuesta", headerName: "Tipo de respuesta", flex: 3 },
		{ field: "subtipo", headerName: "Subtipo", flex: 3 },
		{ field: "respuesta1", headerName: "Respuesta 1", flex: 3 },
		{ field: "respuesta2", headerName: "Respuesta 2", flex: 3 },
		// { field: "respuesta3", headerName: "Respuesta 3", flex: 3 },
		// { field: "respuesta4", headerName: "Respuesta 4", flex: 3 },
		// { field: "respuesta5", headerName: "Respuesta 5", flex: 3 },
		{
			field: "actions",
			headerName: "Acciones",
			width: 100,
			sortable: false,
			disableColumnMenu: true,
			renderCell: (params) => {
				return (
					<Box>
						<IconButton sx={{ color: "#511079" }} onClick={() => handleEdit(params.id)}>
							<EditIcon />
						</IconButton>
						<IconButton
							sx={{ color: "#791010" }}
							onClick={() => handleDelete(params.id)}
						>
							<DeleteIcon />
						</IconButton>
					</Box>
				);
			},
		},
	];

	return (
		<div style={{ height: "100%", width: "100%" }}>
			<DataGrid
				rows={questions}
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
				}}
			/>
		</div>
	);
};
