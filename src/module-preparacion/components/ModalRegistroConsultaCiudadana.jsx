import { Box, Modal, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { object, string } from "yup";
import React from "react";
import { ButtonsContainer } from "./ButtonsContainer";
import { onCreateConsultaCiudadana } from "../../store/module-preparacion/consulta-ciudadana/thunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";

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
	titulo: string("Ingresa un título").required("Este campo es requerido"),
	entidad: string("Ingresa la entidad donde se llevará a cabo la consulta ciudadana").required(
		"Este campo es requerido"
	),
});

export const ModalRegistroConsultaCiudadana = ({ modalStatus, closeModal, openModal }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { status } = useConsultaCiudadanaStore();
	const onSubmit = (values) => {
		dispatch(
			onCreateConsultaCiudadana(values.titulo, values.entidad, (id) => {
				navigate("/preparacion/consulta/" + id);
			})
		);
		// if
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
						REGISTRO DE CONSULTA CIUDADANA
					</Typography>
					<Box m={"2rem"}>
						<Formik
							initialValues={{
								titulo: "",
								entidad: "NUEVO LEÓN",
							}}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								onSubmit(values);
							}}
						>
							{({ values, handleSubmit, handleChange, errors, touched }) => (
								<form onSubmit={handleSubmit}>
									<Typography variant="h6" mb="0.5rem">
										TÍTULO DE LA CONSULTA CIUDADANA
									</Typography>
									<TextField
										name="titulo"
										fullWidth
										size="small"
										id="titulo"
										label="Título de la consulta"
										variant="filled"
										onChange={handleChange}
										value={values.titulo}
										error={touched.titulo && Boolean(errors.titulo)}
										helperText={touched.titulo && errors.titulo}
										sx={{ marginBottom: "2rem" }}
									/>

									<Typography variant="h6" mb="0.5rem">
										ENTIDAD DONDE SE LLEVARÁ A CABO LA CONSULTA CIUDADANA
									</Typography>

									<TextField
										name="entidad"
										fullWidth
										size="small"
										id="titulo"
										label="Entidad donde se llevará a cabo la consulta"
										variant="filled"
										disabled={true}
										onChange={handleChange}
										value={values.entidad}
										error={touched.entidad && Boolean(errors.entidad)}
										helperText={touched.entidad && errors.entidad}
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
