import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";

export const DataGridTablePartido = ({ handleOpenModal, handleOpenDeletePartidoModal }) => {
	const { partidos, deletePartido, editPartido} = useJornadaStore();

    const handleDelete = (id) => {
		handleOpenDeletePartidoModal(id);
		// deletePartido(id);
	};

	const handleEdit = (id) => {
		handleOpenModal();
		editPartido(id);
	};

	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "clavePartido", headerName: "Clave", width: 100 },
		{ field: "nameParty", headerName: "Nombre", width: 300 },
		{ field: "siglasParty", headerName: "Siglas", width: 90 },
		{ field: "emblemParty", headerName: "Emblema", width: 290 },
		// { field: "fotografiaPartido", headerName: "logo", width: 70 },
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
				rows={partidos}
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
