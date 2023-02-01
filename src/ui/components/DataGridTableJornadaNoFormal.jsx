import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useJornadaNoFormalStore } from "../../module-preparacion/hooks/useJornadaNoFormalStore";
export const DataGridTableJornadaNoFormal = ({ handleOpenModal, handleOpenDeleteCandidatoModal}) => {
	const { candidatos, deleteCandidato, editCandidato} = useJornadaNoFormalStore();

    const handleDelete = (id) => {
		deleteCandidato(id);
		console.log("Estas por el iliminar el ID", id);
	};
	const handleEdit = (id) => {
		handleOpenModal();
		editCandidato(id);
	};

	const columns = [
		{ field: "id", headerName: "clave Electoral", width: 65 },
		{ field: "nombreCandidato", headerName: "Nombres Candidato", width: 210 },
		{ field: "apellidoPCandidato", headerName: "Primer Apellido", width: 180 },
		{ field: "apellidoMCandidato", headerName: "Segundo Apellido", width: 180 },
        // { field: "seudonimoCandidato", headerName: "Seudonimo", width: 100 },
		// { field: "fechaNacimientoCandidato", headerName: "Fecha de Nacimiento", width: 100 },
		// { field: "generoCandidato", headerName: "Género", width: 100 },

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
