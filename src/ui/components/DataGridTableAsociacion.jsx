import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useDispatch } from "react-redux";
import { useJornadaNoFormalStore } from "../../module-preparacion/hooks/useJornadaNoFormalStore";
export const DataGridTableAsociacion = ({ handleOpenModal, handleOpenDeleteAsociacionModal}) => {
	const { asociaciones, deleteAsociacion, editAsociacion } = useJornadaNoFormalStore();
	const dispatch = useDispatch();
    const handleDelete = (id) => {
		dispatch(deleteAsociacion(id));
		console.log("Estas por el iliminar el ID", id);
	};
	const handleEdit = (id) => {
		handleOpenModal();
		editAsociacion(id);
	};

	const columns = [
		{ field: "id", headerName: "id", width: 65 },
		{ field: "nombreAsociacion", headerName: "Nombre de la asociacion", width: 230 },
		{ field: "emblema", headerName: "Emblema", width: 300 },
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
								onClick={() => handleDelete(params.id, params.row.nombreAsociacion)}
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
                rows={asociaciones}
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
