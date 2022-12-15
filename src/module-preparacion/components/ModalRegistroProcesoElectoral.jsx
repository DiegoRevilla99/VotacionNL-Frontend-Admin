import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Modal,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import { object, string } from "yup";
import { ButtonsContainer } from "./ButtonsContainer";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "70%",
	bgcolor: "background.paper",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
	pb: 1,
	// height: "90%",
};

const validationSchema = object({
	titulo: string("Ingresa una pregunta").required("Este campo es requerido"),
	tipo: string("Selecciona el tipo").required("Este campo es requerido"),
});

export const ModalRegistroProcesoElectoral = ({ title, modalStatus, closeModal, openModal }) => {
	const campos = () => {
		if (title === "REGISTRO DE JORNADA ELECTORAL") return "TÍTULO DE LA NORNADA ELECTORAL";
	};

	const onSubmit = (values) => {
		console.log(values);
	};

	return (
		<Modal
			open={modalStatus}
			onClose={closeModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ overflowY: "auto", height: "100%" }}>
					<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
						{title}
					</Typography>
					<Box m={"2rem"}>
						<Formik
							initialValues={{
								titulo: "",
								tipo: "",
							}}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								onSubmit(values);
							}}
						>
							{({ values, handleSubmit, handleChange, errors, touched }) => (
								<form onSubmit={handleSubmit}>
									<Typography variant="h6" mb="0.5rem">
										DATOS GENERALES
									</Typography>
									<TextField
										name="titulo"
										fullWidth
										size="small"
										id="titulo"
										label="Título de la jornada"
										variant="filled"
										onChange={handleChange}
										value={values.titulo}
										error={touched.titulo && Boolean(errors.titulo)}
										helperText={touched.titulo && errors.titulo}
									/>
									<Typography variant="h6" mt={"1rem"}>
										TIPO DE JORNADA
									</Typography>
									<FormControl error={Boolean(errors.tipo)} variant="standard">
										{/* <FormLabel id="tipso">
										</FormLabel> */}
										<RadioGroup
											name="tipo"
											onChange={handleChange}
											value={values.tipo}
											aria-labelledby="demo-radio-buttons-group-label"
										>
											<FormControlLabel
												value="ordinaria"
												control={
													<Radio
														sx={{
															"& .MuiSvgIcon-root": {
																fontSize: 28,
															},
														}}
													/>
												}
												label="ORDINARIA"
											/>
											<FormControlLabel
												value="extraordinaria"
												control={
													<Radio
														sx={{
															"& .MuiSvgIcon-root": {
																fontSize: 28,
															},
														}}
													/>
												}
												label="EXTRAORDINARIA"
											/>
										</RadioGroup>
										{Boolean(errors.tipo) && (
											<FormHelperText sx={{ marginLeft: "0.8rem" }}>
												Selecciona el tipo de jornada
											</FormHelperText>
										)}
										{/* <FormHelperText>
											Selecciona el tipo de jornada
										</FormHelperText> */}
									</FormControl>
									<ButtonsContainer />
								</form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};
