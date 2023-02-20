import { Box, Modal, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { onCreateJornada } from "../../store/module-preparacion/jornada/ThunksJornada";
import { useJornadaStore } from "../hooks/useJornadaStore";
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
};

const validationSchema = object({
	title: string("Ingresa un título").required("Este campo es requerido"),
	entidad: string("Ingresa la entidad donde se llevará a cabo la jornada").required(
		"Este campo es requerido"
	),
});

export const ModalRegistroJornadaFormal = ({ modalStatus, closeModal, openModal }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// TODO:TU STATUS DE TU ESTADO GLOBAL
	// const { status } = useConsultaCiudadanaStore();
	const { status } = useJornadaStore();

	const onSubmit = (values) => {
		// TODO:AQUI PON EL REDIRECCIONAMIENTO Y LAS ACCIONES DE GUARDADO DE TU JORNADA ELECTORAL
		dispatch(
			onCreateJornada(values.title, values.entidad, (id) => {
				navigate("/preparacion/jornada/" + id);
			})
		);
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
						REGISTRO DE JORNADA ELECTORAL
					</Typography>
					<Box m={"2rem"}>
						<Formik
							initialValues={{
								title: "",
								entidad: "NUEVO LEÓN",
								tipoJornada: "",
							}}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								onSubmit(values);
							}}
						>
							{({ values, handleSubmit, handleChange, errors, touched, setValues }) => (
								<form onSubmit={handleSubmit}>
									<Typography variant="h6" mb="0.5rem">
										TÍTULO DE LA JORNADA ELECTORAL
									</Typography>
									<TextField
										name="title"
										fullWidth
										size="small"
										id="title"
										label="Título de la jornada"
										variant="filled"
										onChange={(event) => {
											// Convertir el valor a mayúsculas antes de actualizar el estado del formulario
											const uppercaseValue = event.target.value.toUpperCase();
											handleChange(event);
											setValues((values) => ({ ...values, title: uppercaseValue }));
										}}
										value={values.title}
										error={touched.title && Boolean(errors.title)}
										helperText={touched.title && errors.title}
										sx={{ marginBottom: "2rem" }}
									/>

									<Typography variant="h6" mb="0.5rem">
										ENTIDAD DONDE SE LLEVARÁ A CABO LA JORNADA FORMAL
									</Typography>
									<TextField
									disabled
										name="entidad"
										fullWidth
										size="small"
										id="entidad"
										label="Entidad donde se llevará a cabo la jornada"
										variant="filled"
										onChange={handleChange}
										value={values.entidad}
										error={touched.entidad && Boolean(errors.entidad)}
										helperText={touched.entidad && errors.entidad}
										sx={{ marginBottom: "2rem" }}
									/>
									<ButtonsContainer onCancel={closeModal} status={status} />
								</form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};
