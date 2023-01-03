import { DataGrid } from "@mui/x-data-grid";
import { useConsultaCiudadanaStore } from "../../module-preparacion/hooks/useConsultaCiudadanaStore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { getCandidatosSuplentes } from "../../store/module-preparacion/jornada/jornadaThunks";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";

export const DataGridTableJornada = ({ handleOpenModal }) => {
	const { candidatos, deleteCandidato, editCandidato} = useJornadaStore();

    const handleDelete = (id) => {
		console.log("ID: ", id);
		deleteCandidato(id);
	};
	const handleEdit = (id) => {
		handleOpenModal();
		editCandidato(id);
	};


	const columns = [
		{ field: "claveElectoral", headerName: "clave Electoral", width: 130 },
		{ field: "nombreCandidato", headerName: "Nombre", width: 140 },
		{ field: "apellidoPCandidato", headerName: "Apellido Paterno", width: 120 },
		{ field: "apellidoMCandidato", headerName: "Apellido Materno", width: 150 },
        { field: "seudonimoCandidato", headerName: "Seudonimo", width: 100 },
		{ field: "fechaNacimientoCandidato", headerName: "Fecha de Nacimiento", width: 100 },
		{ field: "generoCandidato", headerName: "Género", width: 100 },

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
                rows={candidatos}
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
