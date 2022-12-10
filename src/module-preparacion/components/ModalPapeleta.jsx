import { Box, Button, Grid, Modal, TextareaAutosize, Typography } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useUiStore } from "../../hooks/useUiStore";
import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";
import { TiposRespuestas } from "./TiposRespuestas";
import { validationSchema } from "../helpers/validationSchemaPreguntas";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "70rem",
	bgcolor: "background.paper",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
	height: "90%",
};

const config = (values) => {
	if (!(values.tipo === "cerrada")) {
		values.tipoCerrada = "";
		values.respuesta1 = "";
		values.respuesta2 = "";
		values.respuesta3 = "";
		values.respuesta4 = "";
		values.respuesta5 = "";
		return values;
	}

	if (
		values.tipoCerrada === "2respuestas" ||
		values.tipoCerrada === "3respuestas" ||
		values.tipoCerrada === "escaladelikert"
	) {
		values.respuesta1 = "";
		values.respuesta2 = "";
		values.respuesta3 = "";
		values.respuesta4 = "";
		values.respuesta5 = "";
		return values;
	}

	if (values.tipoCerrada === "personalizado1") {
		values.respuesta3 = "";
		values.respuesta4 = "";
		values.respuesta5 = "";
		return values;
	}

	if (values.tipoCerrada === "personalizado2") {
		values.respuesta4 = "";
		values.respuesta5 = "";
		return values;
	}

	return values;
};

export const ModalPapeleta = ({ statusModal, handleToggleModal }) => {
	const { addQuestion, questions, questionSelected, setQuestionsSelectedNull, updateQuestion } =
		useConsultaCiudadanaStore();
	const { toastSuccesOperation } = useUiStore();
	const [isCerrada, setIsCerrada] = useState(false);
	console.log("QUESTION", Object.values(questionSelected).length);

	const onSave = (values) => {
		setIsCerrada(false);
		if (Object.values(questionSelected).length === 0) {
			addQuestion(
				questions.length,
				values.pregunta,
				values.tipo,
				values.tipoCerrada,
				values.respuesta1,
				values.respuesta2,
				values.respuesta3,
				values.respuesta4,
				values.respuesta5
			);
			toastSuccesOperation("Pregunta registrada con éxito");
		} else {
			const newValues = config(values);
			console.log("NUEVOS: ", newValues);
			updateQuestion(
				questionSelected.id,
				newValues.pregunta,
				newValues.tipo,
				newValues.tipoCerrada,
				newValues.respuesta1,
				newValues.respuesta2,
				newValues.respuesta3,
				newValues.respuesta4,
				newValues.respuesta5
			);
			toastSuccesOperation("Pregunta actualizada con éxito");
		}
		setQuestionsSelectedNull();
		handleToggleModal();
	};

	const onCancel = () => {
		setIsCerrada(false);
		setQuestionsSelectedNull();
		handleToggleModal();
	};

	return (
		<Modal
			open={statusModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ overflowY: "auto", height: "100%" }}>
					<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
						REGISTRO DE PREGUNTA DE PAPELETA
					</Typography>
					<Box m={"2rem"}>
						<Typography variant="h6">
							INGRESE LA PREGUNTA <span style={{ color: "red" }}>*</span>
						</Typography>

						<Formik
							initialValues={
								Object.values(questionSelected).length === 0
									? {
											pregunta: "",
											tipo: "",
											tipoCerrada: "",
											respuesta1: "",
											respuesta2: "",
											respuesta3: "",
											respuesta4: "",
											respuesta5: "",
									  }
									: {
											pregunta: questionSelected["pregunta"],
											tipo: questionSelected["tipoDeRespuesta"],
											tipoCerrada: questionSelected["subtipo"],
											respuesta1: questionSelected["respuesta1"],
											respuesta2: questionSelected["respuesta2"],
											respuesta3: questionSelected["respuesta3"],
											respuesta4: questionSelected["respuesta4"],
											respuesta5: questionSelected["respuesta5"],
									  }
							}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								onSave(values);
							}}
						>
							{({ values, handleSubmit, handleChange, errors }) => (
								<form onSubmit={handleSubmit}>
									<TextareaAutosize
										name="pregunta"
										id="pregunta"
										value={values.pregunta}
										onChange={handleChange}
										minRows={6}
										style={{
											width: "100%",
											marginTop: "0.5rem",
											backgroundColor: "#f0f0f0",
											fontSize: "1.5rem",
											padding: "0.7rem",
										}}
									/>
									{errors.pregunta?.length > 0 ? (
										<Typography
											variant="subtitle1"
											color="red"
											textAlign={"right"}
										>
											No se ha agregado ninguna pregunta
										</Typography>
									) : (
										""
									)}

									<TiposRespuestas
										isCerrada={isCerrada}
										setIsCerrada={setIsCerrada}
										valuesTipo={values.tipo}
										valuesTipoCerrada={values.tipoCerrada}
										handleChange={handleChange}
										errorsTipo={errors.tipo}
										errorsTipoCerrada={errors.tipoCerrada}
										valuesRespuesta1={values.respuesta1}
										valuesRespuesta2={values.respuesta2}
										valuesRespuesta3={values.respuesta3}
										valuesRespuesta4={values.respuesta4}
										valuesRespuesta5={values.respuesta5}
										errorsRespuesta1={errors.respuesta1}
										errorsRespuesta2={errors.respuesta2}
										errorsRespuesta3={errors.respuesta3}
										errorsRespuesta4={errors.respuesta4}
										errorsRespuesta5={errors.respuesta5}
									/>

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
								</form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};
