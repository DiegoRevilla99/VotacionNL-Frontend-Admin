import {
	Box,
	Button,
	Grid,
	Modal,
	TextField,
	Typography,
	Stack,
	MenuItem, 
} from "@mui/material";
// import { useState } from "react";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Formik, Form } from 'formik';
import { ErrorField } from "../components/ErrorField";
import { object, string } from "yup";
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
import { TextFieldSelectMod } from "./TextFieldSelectMod";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "50rem",

	bgcolor: "background.paper",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
	height: "60%",
};
const validationSchema = object({
	// candidato: string("").required(
	// 	"Por favor, selecciona un candidato"
	// 	),
	// partido: string("").required(
	// 	"Por favor, selecciona un partido"
	// 	),
});
export const ModalAsociacionCP = ({ statusAsociacionModal, handleToggleModal }) => {

	const { status, candidatoandSuplentes, partidos} = useJornadaStore();

	const [candidatoandSuplente, setCandidato] = React.useState("");
	const [partido, setPartido] = React.useState("");

	const onSubmit = (values) => {
		console.log("Aqui est[an los valores", values);
		// handleToggleModal();
	};

	const onCancel = () => {
		handleToggleModal();
	};

	const handleChangeCandidato = (event) => {
		setCandidato(event.target.value);

	};
	const handleChangePartido = (event) => {
		setPartido(event.target.value);
	};
	return (
		<Modal
			open={statusAsociacionModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ overflowY: "auto", height: "100%" }}>
					<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
						AFILIAR PARTICIPANTES A PARTIDOS
					</Typography>
					<Box m={"2rem"}>
						<Formik
							initialValues={
								{
									candidatoandSuplente: "",
									partido: "",
								}
							}
							validationSchema={validationSchema}
							onSubmit={(values, {resetForm}) => {
								onSubmit(values);
								resetForm();
							}}
						>
							{({values, errors, touched, handleSubmit, handleChange, handleBlur}) => (
								<Form  onSubmit={handleSubmit} >
							<Box
							 sx={{
								width: "100%",
							 }}
							>
								<Typography variant= {{ xl: "2rem", lg: "1.5rem", sm: "1rem", xs: "0.8rem" }}>
									Selecciona un candidato <span style={{ color: "red" }}>*</span>
								</Typography>
								<TextField
									select
									size="small"
									value={candidatoandSuplente}
									onChange={handleChangeCandidato}
									fullWidth
								>
									{candidatoandSuplentes.map((candidatoandSuplente) => (
										<MenuItem 
											key={candidatoandSuplente.id}
											value = {candidatoandSuplente.id}>
												{candidatoandSuplente.nombreCandidato}
										</MenuItem>
									))}

								</TextField>
							</Box>

							<Box
							 sx={{
								width: "100%",
							 }}
							>
								<Typography variant= {{ xl: "2rem", lg: "1.5rem", sm: "1rem", xs: "0.8rem" }}>
									Selecciona un partido ejemplo<span style={{ color: "red" }}>*</span>
								</Typography>
								<TextField
									id="outlined-select-currency"
									select
									fullWidth
									size="small"
									value={partido}
									onChange={handleChangePartido}
									>
									{partidos.map((partido) => (
										<MenuItem key={partido.id} value={partido.id}>
										{partido.nombrePartido}
										</MenuItem>
									))}
									</TextField>
							</Box>












							{/* <Box mb={2}
							 sx={{
								width: "100%",
							 }}
							>
									<Typography variant= "1rem">
										Selecciona un partido <span style={{ color: "red" }}>*</span>
									</Typography>
									<TextField
									select
									size="small"
									value={partido}
									onChange={handleChangePartido}
									fullWidth
								>
									{partidos.map((partido) => (
										<MenuItem 
											key={partido.id}
											value = {partido.id}>
												{partido.nombrePartido}
										</MenuItem>
									))}
								</TextField>
							</Box> */}

								{/* <TextFieldSelectMod
									valuesTipo={values.partido}
									handleChange={handleChangePartido}
									// errorsTipo=
									titulo="Selecciona un partido"
									partidos={partidos}
									>
									</TextFieldSelectMod> */}
                                    












									<Grid
										container
										direction="row"
										justifyContent="flex-end"
										alignItems="center"
										spacing={2}
									>
										<Grid item xs={12} md={6} lg={3}>
											<Button
												type="sumbit"
												variant="contained"
												disabled={status === "checking"}
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
												Guardar
											</Button>
										</Grid>
										<Grid item xs={12} md={6} lg={3}>
											<Button
												onClick={onCancel}
												variant="contained"
												disabled={status === "checking"}
												size="large"
												sx={{
													boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
													transition: "all 0.5s ease",
													backgroundColor: "#791010",
													width: "100%",
													borderRadius: "2rem 2rem 2rem 2rem",
													"&:hover": {
														backgroundColor: "#8B3232 !important",
														transform: "translate(-5px, -5px)",
														boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
													},
												}}
											>
												Cancelar
											</Button>
										</Grid>
									</Grid>
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};
