import { Box, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { onCreateJornadaNoFormal } from "../../store/module-preparacion/jornada/ThunksJornadaNoFormal";
import { useJornadaNoFormalStore } from "../hooks/useJornadaNoFormalStore";
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
	tipoEleccion: string("Elija la opción del tipo de elección que se llevará a cabo").required(
		"Este campo es requerido"
	),
});
const eleccionType = [ {
    value: 'ORDINARIA',
    label: 'ORDINARIA',
  },
  {
    value: 'EXTRAORDINARIA',
    label: 'EXTRAORDINARIA',
  },
];
export const ModalRegistroJornadaNoFormal = ({ modalStatus, closeModal, openModal }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// !!TU ESTADO GLOBAL
	// const { status } = useConsultaCiudadanaStore();
	const { status } = useJornadaNoFormalStore();

	const onSubmit = (values) => {
		// !!AQUI PON LA RUTA Y EL GUARDADO DE TU JORNADA ELECTORAL
		dispatch(
			onCreateJornadaNoFormal(values.title, values.tipoEleccion, (id) => {
				navigate("/preparacion/jornada/noFormal/" + id);//EDITAR LA RUTA
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
						REGISTRO DE JORNADA NO FORMAL
					</Typography>
					<Box m={"2rem"}>
						<Formik
							initialValues={{
								title: "",
								tipoEleccion: "",
							}}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								onSubmit(values);
							}}
						>
							{({ values, handleSubmit, handleChange, errors, touched, setValues }) => (
								<form onSubmit={handleSubmit}>
									<Typography variant="h6" mb="0.5rem">
										TÍTULO DE LA JORNADA NO FORMAL
									</Typography>
									<TextField
										name="title"
										fullWidth
										size="small"
										id="title"
										label="Título de la jornada"
										variant="filled"
										onChange={handleChange}
										value={values.title}
										error={touched.title && Boolean(errors.title)}
										helperText={touched.title && errors.title}
										sx={{ marginBottom: "2rem" }}
									/>

									<Typography variant="h6" mb="0.5rem">
										TIPO DE ELECCIÓN QUE SE LLEVARÁ A CABO
									</Typography>
									<TextField
										id="filled-select-currency"
										name="tipoEleccion"
										size="small"
										select
										disabled={status === "checking"}
										label="Tipo de elección"
										defaultValue="REPRESENTANTE"
										variant="filled"
										error={touched && touched.tipoEleccion && Boolean(errors.tipoEleccion)}
										helperText={touched && touched.tipoEleccion && errors.tipoEleccion}
										sx={{ width: {
											xs: "100%",
											sm: "100%",
											md: "50%",
											lg: "50%",
											xl: "50%",
										} }}
										value={values.tipoEleccion}
										onChange={(event) => {
											setValues({
											...values,
											tipoEleccion: event.target.value
											});
										}}
										>
										{eleccionType.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
										))}
									</TextField>


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
