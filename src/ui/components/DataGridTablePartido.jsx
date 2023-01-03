import { DataGrid } from "@mui/x-data-grid";
// import { useConsultaCiudadanaStore } from "../../module-preparacion/hooks/useConsultaCiudadanaStore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { getPartidos } from "../../store/module-preparacion/jornada/jornadaThunks";
import { useDispatch } from "react-redux";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";

export const DataGridTablePartido = ({ handleOpenModal }) => {
	// const { questions, deleteQuestion, editQuestion } = useConsultaCiudadanaStore();
	const { partidos, deletePartido, editPartido} = useJornadaStore();

    const handleDelete = (id) => {
		console.log("ID: ", id);
		deletePartido(id);
	};
	const handleEdit = (id) => {
		handleOpenModal();
		editPartido(id);
	};

	const columns = [
		{ field: "clavePartido", headerName: "Clave del partido", width: 130 },
		{ field: "nombre", headerName: "Nombre", width: 180 },
		{ field: "siglas", headerName: "Siglas", width: 70 },
		{ field: "emblema", headerName: "emblema", width: 90 },
		{ field: "logo", headerName: "logo", width: 70 },
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
