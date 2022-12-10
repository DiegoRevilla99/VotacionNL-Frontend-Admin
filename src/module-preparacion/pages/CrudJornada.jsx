import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Tabla } from "../../ui/components/table/Tabla";
import { PlantillaCRUD } from "../layout/PlantillaCRUD";

import { columns, data } from "../helpers/DataBoletas";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
	boton: {
		boxShadow: 1,
		color: "white",
		height: 42,
	},
});
const styleButton = {
	borderRadius: 50,
};

export const CrudJornada = () => {
	const [datos, setDatos] = useState(data);

	const guardar = () => {
		alert("Se ha presionado guardar de jornada");
	};

	const cancelar = () => {
		alert("Se ha presionado cancelar de jornada");
	};

	const onEliminar = (event, rowData) => {
		const { candidato } = rowData;
		console.log("has presionado " + candidato);
		const newData = datos.filter((obj) => {
			if (obj.candidato !== candidato) return obj;
		});
		setDatos(newData);
	};

	const actions = [
		{
			icon: "edit",
			title: "Editar",
			sx: {},
			onClick: (event, rowData) => alert("Se ha editado a " + rowData.candidato),
		},
		{
			icon: "delete",
			title: "Eliminar",
			sx: { ml: 1, mr: 1, backgroundColor: "error.main" },
			onClick: (event, rowData) => onEliminar(event, rowData),
		},
	];

	useEffect(() => {
		setDatos(data);
	}, []);

	return (
		<>
			<PlantillaCRUD go="/preparacion/jornada/boleta" guardar={guardar} cancelar={cancelar}>
				<Box
					sx={{
						display: "flex",
						height: "100%",
						width: "100%",
						flexDirection: "column",
					}}
				>
					<Box
						sx={{
							display: "flex",
							height: "100%",
							width: "100%",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<Tabla
							titulo={"BOLETAS"}
							data={datos}
							actions={actions}
							columns={columns}
						></Tabla>
					</Box>
				</Box>
			</PlantillaCRUD>
		</>
	);
};
