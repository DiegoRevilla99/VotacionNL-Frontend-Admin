import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
import { Tooltip } from '@mui/material';

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
		{ field: "id", headerName: "Clave", width: 70 },
		{ field: "nombrePartido", headerName: "Nombre", width: 200 },
		{ field: "siglasPartido", headerName: "Siglas", width: 80 },
		{ field: "emblemaPartido", headerName: "emblema", width: 90 },
		{ field: "fotografiaPartido", headerName: "logo", width: 70 },
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
