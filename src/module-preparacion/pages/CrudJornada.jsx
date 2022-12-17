import { Box, Button, Typography, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Tabla } from "../../ui/components/table/Tabla";
import { PlantillaCRUD } from "../layout/PlantillaCRUD";
import { columns, data } from "../helpers/DataBoletas";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetBoletasJornada } from "../hooks/useGetBoletasJornada";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUiStore } from "../../hooks/useUiStore";
import { saveJornada } from "../../store/module-preparacion/jornada/jornadaThunks";

// CONECTAR EL MODAL DE ELIMINAR BOLETA
import {Grid } from "@mui/material";
import { ModalEliminarBoleta } from "../components/ModalEliminarBoleta";

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
  	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [datos, setDatos] = useState(data);
	const { boletas, isLoadingBoletas } = useGetBoletasJornada();


	const guardar = () => {
		dispatch(
		  saveJornada({}, () => {
			navigate("/preparacion/registroJornada");
		  })
		);
	  };

	const cancelar = () => {
		navigate("/preparacion/registroJornada");
	};

	const onEliminar = (event, rowData) => {
		const { candidato } = rowData;
		console.log("has presionado " + candidato);
		const newData = datos.filter((obj) => {
			if (obj.candidato !== candidato) return obj;
		});
		setDatos(newData);
	};
	const onEditar = (event, rowData) => {
		navigate("/preparacion/jornada/boleta/" + rowData.candidato);
	};

	const actions = [
		{
			icon: "edit",
			title: "Editar",
			sx: {},
			onClick: (event, rowData) => onEditar(event, rowData),
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

	// CONECTAR EL MODAL DE ELIMINAR BOLETA


	// const [statusDeleteModal, setStatusDeleteModal] = useState(false);
	// const handleCloseDeleteModal = () => setStatusDeleteModal(false);
	// const handleOpenDeleteModal = () => {
	// 	// toastOffOperation();
	// 	setStatusDeleteModal(true);
	// };
	return (
		<>
			<PlantillaCRUD 
			go="/preparacion/jornada/boleta" 
			guardar={guardar} 
			cancelar={cancelar}>
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
						{isLoadingBoletas ? (
						// <CircularProgress color="primary" />
						<Stack
							justifyContent="center"
							sx={{ color: "grey.500" }}
							spacing={2}
							direction="row"
						>
							<CircularProgress color="primary" />
						</Stack>
						) : (
						<Tabla
							titulo={"BOLETAS"}
							data={boletas}
							actions={actions}
							columns={columns}
						></Tabla>
						)}
					</Box>
				</Box>
			</PlantillaCRUD>
			{/* <Grid item xs={4} md={2} lg={2}>
			<Button
			onClick={handleOpenDeleteModal}
				variant="contained"
				size="small"
				disabled={status === "checking"}
				sx={{
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
					transition: "all 0.5s ease",
					backgroundColor: "#791010",
					width: "100%",
					borderRadius: "25px 25px 25px 25px",
					"&:hover": {
						backgroundColor: "#8B3232 !important",
						transform: "translate(-5px, -5px)",
						boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
					},
				}}
			>
				eliminar
			</Button>
		</Grid>
		<ModalEliminarBoleta statusDeleteModal={statusDeleteModal} handleToggleModal={handleCloseDeleteModal} /> */}
		</>
	);
};
