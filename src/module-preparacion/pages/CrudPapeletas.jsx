import React from "react";
import { Box, Button, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";
import { GeneralTable } from "../components/GeneralTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { onGetBallotData } from "../../store/module-preparacion/consulta-ciudadana/thunks";

export const CrudPapeletas = () => {
	const { consultaSelected } = useConsultaCiudadanaStore();
	const navigate = useNavigate();
	const params = useParams();
	const dispatch = useDispatch();
	const columns = [
		{ field: "id", headerName: "ID", flex: 1 },
		{ field: "encabezado", headerName: "Título de la papeleta", flex: 10 },
		{
			field: "actions",
			headerName: "Acciones",
			flex: 3,
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

	const handleEdit = (id) => {
		dispatch(
			onGetBallotData(id, () => {
				navigate("/preparacion/consulta/" + params.id + "/papeleta/" + id);
			})
		);
	};

	const go = () => {
		console.log("consulta/" + params.id + "/papeleta/" + consultaSelected.ballots.length);
		navigate(
			"/preparacion/consulta/" + params.id + "/papeleta/" + consultaSelected.ballots.length
		);
	};

	return (
		<Grid
			container
			sx={{
				height: "100%",
				width: "100%",
				overflowY: "auto",
			}}
		>
			<Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
				<Box sx={{ m: "0.5rem", ml: "2rem" }}>
					<Typography variant="h6" align="left" color="initial">
						{consultaSelected.title}
					</Typography>
				</Box>
				<Divider />
				<Box
					sx={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						m: "2rem",
						mt: "2rem",
					}}
				>
					<Grid container>
						<Grid item lg={3} md={4} sm={12} xs={12}>
							<Button
								onClick={go}
								variant="contained"
								size="large"
								sx={{
									boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
									transition: "all 0.5s ease",
									backgroundColor: "#511079",
									width: "100%",
									borderRadius: "2rem 2rem 2rem 2rem",
									"&:hover": {
										backgroundColor: "#7E328B !important",
										transform: "translate(-5px, -5px)",
										boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
									},
								}}
							>
								Registrar Papeletas
							</Button>
						</Grid>
					</Grid>

					<Box
						sx={{
							boxShadow: 1,
							height: "100%",
							display: "flex",
							flexDirection: "column",
							backgroundColor: "white",
							mt: "2rem",
							borderRadius: "2rem",
							p: "2rem",
							pt: "1rem",
						}}
					>
						<Typography variant="h5" color="initial" mb="0.5rem">
							Papeletas
						</Typography>
						<Divider />
						<Box
							mt={"1rem"}
							sx={{ height: "100%", display: "flex", flexDirection: "column" }}
						>
							<GeneralTable data={consultaSelected.ballots} columns={columns} />
						</Box>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
