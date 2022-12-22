import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { date, object, string } from "yup";
import { ErrorField } from "../components/ErrorField";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker } from "@mui/x-date-pickers";
import { DatePickerMod } from "./DatePickerMod";

// import { useUiStore } from "../../hooks/useUiStore";
// import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";
// import { TiposRespuestas } from "./TiposRespuestas";
// import { validationSchema } from "../helpers/validationSchemaPreguntas";

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
	height: "90%",
};

const validationSchema = object({
	apellidoPCandidato: string("").required(
		"Por favor, ingresa un encabezado"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
    apellidoMCandidato: string("").required(
		"Por favor, ingresa un nombre de Candidatura"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
    nombreCandidato: string("").required(
		"Por favor, ingresa una modalidad de Votación"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
    // fotoCandidato: string("").required(
	// 	"Por favor, ingresa una entidad Federativa"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
    seudonimoCandidato: string("").required(
		"Por favor, ingresa un municipio"
		).matches(/^[0-9a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras, espacios y números"),
    fechaNacimiento: date("").required(
		"Por favor, ingresa un distrito Electoral Local"
		),
    genero: string("Selecciona el género").required("Este campo es requerido"),

});
export const ModalRegistroCandidato = ({ statusRegisterCandidateModal, handleToggleModal }) => {
	// const { addQuestion, questions, questionSelected, setQuestionsSelectedNull, updateQuestion } =
	// 	useConsultaCiudadanaStore();
	// const { toastSuccesOperation } = useUiStore();
	const [isCerrada, setIsCerrada] = useState(false);
	// console.log("QUESTION", Object.values(questionSelected).length);

	const onSave = (values) => {
		setIsCerrada(false);
		setfotoCandidato({ name: "Sin Archivo seleccionado" });
		handleToggleModal();

        // fechaNacimiento: new Date(values.fechaNacimiento).toISOString();
        // dispatch(
		// 	// onSaveConfig(params.idConsulta, data, () => {
		// 	// 	navigate("/preparacion/jornada/boleta");
		// 	})
		// );
	};
    
    const [selectedDate, handleDateChange] = useState(new Date());
    const [valueGender, setValueGender] = React.useState('FEMENINO');

    const handleChangeGender = (event) => {
        setValueGender(event.target.value);
    };
  
	const onCancel = () => {
		setIsCerrada(false);
		// setQuestionsSelectedNull();
		handleToggleModal();
	};

	 //Validacion del formato imagen 
	 const [fotoCandidato, setfotoCandidato] = useState({
	   name: "Sin Archivo seleccionado",
	 });
	  
	const validando = (values, props) => {
		const errors = {};
		if (fotoCandidato.name === "Sin Archivo seleccionado") {
		  errors.fotoCandidato = "Se necesita una fotoCandidato";
		}
		return errors;
	  };
	return (
		<Modal
			open={statusRegisterCandidateModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ overflowY: "auto", height: "100%" }}>
					<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
						REGISTRO DE CANDIDATOS
					</Typography>
					<Box m={"2rem"}>
						<Formik
							initialValues={
								// Object.values(questionSelected).length === 0
								// 	? {
                                        {
                                        apellidoPCandidato: "", 
                                        apellidoMCandidato: "", 
                                        nombreCandidato: "", 
                                        fotoCandidato: "",
                                        seudonimoCandidato: "", 
                                        // fechaNacimiento: "2019-07-04T20:38:38.604+00:00", 
                                        fechaNacimiento: "", 
                                        genero: "",} //tipo}

									//   }
									// : {
									// 		pregunta: questionSelected["pregunta"],
									// 		tipo: questionSelected["tipoDeRespuesta"],
									// 		tipoCerrada: questionSelected["subtipo"],
									// 		respuesta1: questionSelected["respuesta1"],
									// 		respuesta2: questionSelected["respuesta2"],
									// 		respuesta3: questionSelected["respuesta3"],
									// 		respuesta4: questionSelected["respuesta4"],
									// 		respuesta5: questionSelected["respuesta5"],
									//   }
							}
                            validate = {validando}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								onSave(values);
							}}
						>
							{({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue}) => (
								<form onSubmit={handleSubmit}>
									<Typography variant="h7" mt={"1rem"}>
                                    APELLIDO PATERNO <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            id="outlined-basic" 
                                            variant="outlined"
                                            label=""
                                            name="apellidoPCandidato"
                                            value={values.apellidoPCandidato}
                                            error = {touched.apellidoPCandidato && errors.apellidoPCandidato}
                                            helperText={touched.apellidoPCandidato && errors.apellidoPCandidato}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    <Typography variant="h7" mt={"1rem"}>
                                    APELLIDO MATERNO <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            id="outlined-basic" 
                                            variant="outlined"
                                            label=""
                                            name="apellidoMCandidato"
                                            value={values.apellidoMCandidato}
                                            error = {touched.apellidoMCandidato && errors.apellidoMCandidato}
                                            helperText={touched.apellidoMCandidato && errors.apellidoMCandidato}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    <Typography variant="h7" mt={"1rem"}>
                                    NOMBRE COMPLETO <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            id="outlined-basic" 
                                            variant="outlined"
                                            label=""
                                            name="nombreCandidato"
                                            value={values.nombreCandidato}
                                            error = {touched.nombreCandidato && errors.nombreCandidato}
                                            helperText={touched.nombreCandidato && errors.nombreCandidato}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    <Typography variant="h7" mt={"1rem"}>
                                    INSERTAR FOTOGRAFÍA DEL CANDIDATO/A  <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{ width: "100%" }}
                                            flexDirection="row"
                                        >
                                            <TextField
                                            fullWidth
                                            label=""
                                            disabled
                                            value={fotoCandidato.name}
                                            variant="outlined"
                                            size="small"
                                            ></TextField>
                                            <IconButton
                                                disabled={status === "checking"}
                                                color="primary"
                                                aria-label="upload picture"
                                                component="label"
                                                size="large"
                                                >
                                                <input
                                                    hidden
                                                    onChange={(e) => setfotoCandidato(e.target.files[0])}
                                                    accept="image/png,image/jpg"
                                                    type="file"
                                                />
                                                <PhotoCamera fontSize="" />
                                            </IconButton>
                                        </Box>
                                        {touched.fotoCandidato &&
                                            fotoCandidato.name === "Sin Archivo seleccionado" && (
                                            <ErrorField>{errors.fotoCandidato}</ErrorField>
                                            )}
                                    <Typography variant="h7" mt={"1rem"}>
                                    SEUDÓNIMO <span style={{ color: "gray" }}>- Opcional</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            id="outlined-basic" 
                                            variant="outlined"
                                            label=""
                                            name="seudonimoCandidato"
                                            value={values.seudonimoCandidato}
                                            // error = {touched.seudonimoCandidato && errors.seudonimoCandidato}
                                            // helperText={touched.seudonimoCandidato && errors.seudonimoCandidato}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    <Typography variant="h7" mt={"1rem"}>
                                    FECHA DE NACIMIENTO<span style={{ color: "red" }}>*</span>
                                        </Typography>

                                        <DatePickerMod
											label=""
											name={"fechaNacimiento"}
											value={values.fechaNacimiento}
											setFieldValue={setFieldValue}
											handleChange={handleChange}
											error={errors.fechaNacimiento}
											touched={touched.fechaNacimiento}
                                            
                                        />
                                    <Typography variant="h7" mt={"1rem"}>
                                    GENERO <span style={{ color: "red" }}>*</span>
                                        </Typography>

                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={valueGender}
                                            onChange={handleChangeGender}
                                        >
                                            <FormControlLabel value="FEMENINO" control={<Radio />} label="FEMENINO" />
                                            <FormControlLabel value="MASCULINO" control={<Radio />} label="MASCULINO" />
                                            <FormControlLabel value="OTRO" control={<Radio />} label="OTRO" />

                                        </RadioGroup>
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
