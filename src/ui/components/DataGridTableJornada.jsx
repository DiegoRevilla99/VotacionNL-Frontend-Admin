import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";

export const DataGridTableJornada = ({ handleOpenModal }) => {
	const { candidatoAndSuplente, deleteCandidatoAndSuplente, editCandidatoAndSuplente} = useJornadaStore();

    const handleDelete = (id) => {
		console.log("ID: ", id);
		deleteCandidatoAndSuplente(id);
	};
	const handleEdit = (id) => {
		handleOpenModal();
		editCandidatoAndSuplente(id);
	};


	const columns = [
		// { field: "id", headerName: "clave Electoral", width: 130 },
		{ field: "nombreCandidato", headerName: "Nombre", width: 140 },
		{ field: "apellidoPCandidato", headerName: "Apellido Paterno", width: 120 },
		{ field: "apellidoMCandidato", headerName: "Apellido Materno", width: 150 },
        // { field: "seudonimoCandidato", headerName: "Seudonimo", width: 100 },
		// { field: "fechaNacimientoCandidato", headerName: "Fecha de Nacimiento", width: 100 },
		// { field: "generoCandidato", headerName: "Género", width: 100 },
		{ field: "nombreSuplente", headerName: "Nombre Suplente", width: 140 },
		{ field: "apellidoPSuplente", headerName: "Apellido Paterno Suplente", width: 120 },
		{ field: "apellidoMSuplente", headerName: "Apellido Materno Suplente", width: 150 },

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
                rows={candidatoAndSuplente}
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
