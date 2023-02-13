import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
export const DataGridTableJornada = ({ handleOpenModal, handleOpenDeleteCandidatoModal}) => {
	const { candidatoandSuplentes, deleteCandidatoAndSuplente, editCandidatoAndSuplente} = useJornadaStore();

    const handleDelete = (id) => {
		deleteCandidatoAndSuplente(id);
	};
	const handleEdit = (id) => {
		handleOpenModal();
		editCandidatoAndSuplente(id);
	};


	const columns = [
		{ field: "id", headerName: "ID", width: 80 },
		{ field: "nombreCandidato", headerName: "Nombres Candidato", width: 140 },
		{ field: "apellidoPCandidato", headerName: "Primer Apellido", width: 120 },
		{ field: "apellidoMCandidato", headerName: "Segundo Apellido", width: 120 },
        // { field: "seudonimoCandidato", headerName: "Seudonimo", width: 100 },
		// { field: "fechaNacimientoCandidato", headerName: "Fecha de Nacimiento", width: 100 },
		// { field: "generoCandidato", headerName: "Género", width: 100 },
		{ field: "nombreSuplente", headerName: "Nombres Suplente", width: 140 },
		{ field: "apellidoPSuplente", headerName: "Primer Apellido Suplente", width: 120 },
		{ field: "apellidoMSuplente", headerName: "Segundo Apellido Suplente", width: 120 },

		{
			field: "actions",
			headerName: "Acciones",
			width: 100,
			sortable: false,
			disableColumnMenu: true,
			renderCell: (params) => {
				return (
					<Box>
						<Tooltip title="Editar">
							<IconButton 
							sx={{ color: "#511079" }} 
							onClick={() => handleEdit(params.id)}>
								<EditIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Eliminar">
							<IconButton
								sx={{ color: "#791010" }}
								onClick={() => handleDelete(params.id)}
							>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</Box>
				);
			},
		},
	];

	return (
		<div style={{ height: "100%", width: "100%" }}>
			<DataGrid
                rows={candidatoandSuplentes}
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
