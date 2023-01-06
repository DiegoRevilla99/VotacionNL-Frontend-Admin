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
import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Formik, Form } from 'formik';
import { ErrorField } from "../components/ErrorField";
import { object, string, date } from "yup";
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import { useDispatch } from "react-redux";
import { saveCandidatoandSuplente } from "../../store/module-preparacion/jornada/jornadaThunks";
import { useAddBoletasJornada } from "../hooks/useAddBoletasJornada";
import CircularProgress from "@mui/material/CircularProgress";
import { editBoleta, saveBoleta } from "../../store/module-preparacion/jornada/jornadaThunks";
import { DatePickerMod } from "./DatePickerMod";
import { RadioButtMod } from "./RadioButtMod";
import { DatePickerModSuplente } from "./DatePickerModSuplente";
import { RadioButtModSuplente } from "./RadioButtModSuplente";
import { useJornadaStore } from "../hooks/useJornadaStore";
import { useNavigate, useParams } from "react-router-dom";
// import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const steps = ['Registrar al candidato', 'Registrar al suplente'];
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xl: "50rem", lg: "50rem", sm: "40rem", xs: "30rem" },
	height: { xl: "30rem", lg: "30rem", md:"28rem",  sm: "35rem", xs: "40rem" },
	bgcolor: "background.paper",
	border: '2px solid #fff',
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
};

const validationSchema = object({
		// // Datos del candidato
	// apellidoPCandidato: string("").required(
	// 	"Por favor, ingresa el apellido paterno del candidato/a"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// 	apellidoMCandidato: string("").required(
	// 	"Por favor, ingresa el apellido materno del candidato/a"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// 	nombreCandidato: string("").required(
	// 	"Por favor, ingresa el nombre completo del candidato/a"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// seudonimoCandidato: string(
	// 	"Por favor, ingresa el seudónimo del candidato/a"
	// 	).matches(/^[0-9a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras, números y espacios"),
	// 	fechaNacimientoCandidato: date().required(
	// 	"Por favor, ingresa la fecha de nacimiento del candidato/a"
	// 	).max(new Date(), "No puedes ingresar una fecha futura"),
	// 	generoCandidato: string("").required("Por favor, selecciona el género"),
	// // Datos del suplente

	// apellidoPSuplente: string("").required(
	// 	"Por favor, ingresa el apellido paterno del Suplente"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// 	apellidoMSuplente: string("").required(
	// 	"Por favor, ingresa el apellido materno del Suplente"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// 	nombreSuplente: string("").required(
	// 	"Por favor, ingresa el nombre completo del Suplente"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// seudonimoSuplente: string(
	// 	"Por favor, ingresa el seudónimo del Suplente"
	// 	).matches(/^[0-9a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras, números y espacios"),
	// 	fechaNacimientoSuplente: date().required(
	// 	"Por favor, ingresa la fecha de nacimiento del Suplente"
	// 	).max(new Date(), "No puedes ingresar una fecha futura"),
	// 	generoSuplente: string("").required("Por favor, selecciona el género"),
});
export const ModalRegisterCS = ({ statusRegisterModal, handleToggleModal }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const {
		status,
		candidatoandSuplentes,
        candidatoandSuplenteSelected,
		addCandidatoAndSuplente,
		setCandidatoAndSuplenteSelectedNull,
	} = useJornadaStore();

	const onSubmit = (values) => {
		setFotografia({ name: "Sin Archivo seleccionado" });
		setFotografiaSuplente({ name: "Sin Archivo seleccionado" });
		console.log("AQUI ANDAMOS EN EL ONSUBMIT",values);
		addCandidatoAndSuplente(
			candidatoandSuplentes.length,
			values.apellidoPCandidato,
			values.apellidoMCandidato,
			values.nombreCandidato,
			values.fotografiaCandidato,
			values.seudonimoCandidato,
			values.fechaNacimientoCandidato,
			values.generoCandidato,
			values.apellidoPSuplente,
			values.apellidoMSuplente,
			values.nombreSuplente,
			values.fotografiaSuplente,
			values.seudonimoSuplente,
			values.fechaNacimientoSuplente,
			values.generoSuplente
		);
		setCandidatoAndSuplenteSelectedNull();
		setActiveStep(0);
		handleToggleModal();

	};

	const onCancel = () => {
		setCandidatoAndSuplenteSelectedNull();
		setActiveStep(0);
		handleToggleModal();
	};

	 const [fotografiaCandidato, setFotografia] = useState({
	   name: "Sin Archivo seleccionado",
	 });
	 const [fotografiaSuplente, setFotografiaSuplente] = useState({
		name: "Sin Archivo seleccionado",
	  });
	   
	const validando = (values, props) => {
		const errors = {};

		if (fotografiaCandidato.name === "Sin Archivo seleccionado") {
		  errors.fotografiaCandidato = "Se necesita una fotografiaCandidato";
		}
		if (fotografiaSuplente.name === "Sin Archivo seleccionado") {
			errors.fotografiaSuplente = "Se necesita una fotografiaSuplente";
		  }
		return errors;
	  };

    // LOS STEPS
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
	return (

		<>
<Modal
			open={statusRegisterModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ overflowY: "auto", height: "100%" }}>
					<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
						REGISTRO DE CANDIDATOS Y SUPLENTE
					</Typography>
					<Box m={"2rem"}>

						<Formik
							initialValues={
                                        {
								// CANDIDATO
								apellidoPCandidato: "",
								apellidoMCandidato: "", 
								nombreCandidato: "", 
								fotografiaCandidato: "",
								seudonimoCandidato: "",//Text
								fechaNacimientoCandidato: "",//Date
								generoCandidato: "",//Text
								// SUPLENTE
								apellidoPSuplente: "",
								apellidoMSuplente: "", 
								nombreSuplente: "", 
								fotografiaSuplente: "",
								seudonimoSuplente: "",//Text
								fechaNacimientoSuplente: "",//Date
								generoSuplente: "",//Text
									  }
							}
							validationSchema={validationSchema}
							validate = {validando}
							onSubmit={(values, {resetForm}) => {
								onSubmit(values)
								resetForm();
							}}
						>
							{({values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue}) => (
								<Form  onSubmit={handleSubmit} >

								<Box sx={{ width: '100%' }}>
									<Stepper activeStep={activeStep}>
										{steps.map((label, index) => {
										const stepProps = {};
										const labelProps = {};
										return (

											<Step	Step key={label} {...stepProps}>
												<StepLabel {...labelProps}>{label}</StepLabel>
											</Step>
										);
										})}
									</Stepper>
									{activeStep === steps.length ? (
										<React.Fragment>
										<Typography sx={{ mt: 2, mb: 1 }}>
											Finalizó el registro.
										</Typography>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
											{errors.apellidoPCandidato ? "Verifica el apellido paterno del candidato" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.apellidoMCandidato? "Verifica el apellido materno del candidato" : ""}
											</Box>	
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.nombreCandidato? "Verifica el nombre del candidato" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.fotografiaCandidato? "Verifica la fotografia del candidato" : ""}

										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.seudonimoCandidato? "Verifica el seudonimo del candidato" : ""}

										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.fechaNacimientoCandidato? "Verifica la fecha de nacimiento del candidato" : ""}

										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.generoCandidato? "Verifica el genero del candidato" : ""}

										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.apellidoPSuplente? "Verifica el apellido paterno del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.apellidoMSuplente? "Verifica el apellido materno del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.nombreSuplente? "Verifica el nombre del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.fotografiaSuplente? "Verifica la fotografia del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.seudonimoSuplente? "Verifica el seudonimo del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.fechaNacimientoSuplente? "Verifica la fecha de nacimiento del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.generoSuplente? "Verifica el genero del suplente" : ""}
										</Box>


										<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
										<Button
											color="inherit"
											disabled={activeStep === 0}
											onClick={handleBack}
											sx={{ mr: 1 }}
											>
											Regresar y verificar
											</Button>
											<Box sx={{ flex: '1 1 auto' }} />
											<Button color="inherit"
											disabled={status === "checking"}
											type="submit"
											sx={{
												boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
													transition: "all 0.5s ease",
													backgroundColor: "#511079",
													color: "#FFFFFF",
													width: "30%",
													borderRadius: "25px 25px 25px 25px",
													"&:hover": {
														backgroundColor: "#7E328B !important",
														transform: "translate(-5px, -5px)",
														boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
													},
											}
												
											}>guardar y salir</Button>

										</Box>
										</React.Fragment>
									) : (
										<React.Fragment>
										{activeStep === 0 ? (
											// CANDIDATO
											<>
											<Box sx={{ mt: 4, mb: 1, ml: 2, mr: 2}}>
											
											<Typography variant="h7" mt={"2rem"}>
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
											<Typography variant="h7" mt={"2rem"}>
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
												<Typography variant="h7" mt={"2rem"}>
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
													value={fotografiaCandidato.name}
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
															onChange={(e) => setFotografia(e.target.files[0])}
															accept="image/png,image/jpg"
															type="file"
														/>
														<PhotoCamera fontSize="" />
													</IconButton>
												</Box>
												{touched.fotografiaCandidato &&
													fotografiaCandidato.name === "Sin Archivo seleccionado" && (
															<Box ml={2} 
																sx={{
																fontSize: "12px",
																	color: "#791010" }}
																>
																{errors.fotografiaCandidato}
															</Box>
													)}
											<Typography variant="h7" mt={"1rem"}>
											SEUDÓNIMO DEL CANDIDATO/A <span style={{ color: "gray" }}> (opcional)</span>
												</Typography>
												<TextField
													name="seudonimoCandidato"
													fullWidth
													size="small"
													id="outlined-basic" 
													variant="outlined"
													label=""
													value={values.seudonimoCandidato}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
													<Typography variant="h7" mt={"2rem"}>
													FECHA DE NACIMIENTO<span style={{ color: "red" }}>*</span>
														</Typography>
													<Grid
													>				
														<DatePickerMod
															label=""
															name={"fechaNacimientoCandidato"}
															value={values.fechaNacimientoCandidato}
															setFieldValue={setFieldValue}
															handleChange={handleChange}
															error={errors.fechaNacimientoCandidato}
															touched={touched.fechaNacimientoCandidato}
															
														/>
													</Grid>  
													
													
													
														<Typography variant="h7" mt={"2rem"}>
														GENERO DEL CANDIDATO <span style={{ color: "red" }}>*</span>
														</Typography>
													<Box>
															<RadioButtMod
																valuesTipo={values.generoCandidato}
																handleChange={handleChange}
																errorsTipo={errors.generoCandidato}
															/>
															{touched.generoCandidato && (
															<Box ml={2}
																sx={{
																fontSize: "12px",
																	color: "#791010" }}
																>
																{errors.generoCandidato}
															</Box>
														)}
													</Box>	
												</Box>
											</>
											// END CANDIDATO
										) : (
											// SUPLENTE
											<>
											<Box sx={{ mt: 4, mb: 1, ml: 2, mr: 2}}>
											<Typography variant="h7" mt={"2rem"}>
												APELLIDO PATERNO <span style={{ color: "red" }}>*</span>
													</Typography>
													<TextField
														fullWidth
														size="small"
														id="outlined-basic" 
														variant="outlined"
														label=""
														name="apellidoPSuplente"
														value={values.apellidoPSuplente}
														error = {touched.apellidoPSuplente && errors.apellidoPSuplente}
														helperText={touched.apellidoPSuplente && errors.apellidoPSuplente}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
											<Typography variant="h7" mt={"2rem"}>
												APELLIDO MATERNO <span style={{ color: "red" }}>*</span>
													</Typography>
													<TextField
														fullWidth
														size="small"
														id="outlined-basic" 
														variant="outlined"
														label=""
														name="apellidoMSuplente"
														value={values.apellidoMSuplente}
														error = {touched.apellidoMSuplente && errors.apellidoMSuplente}
														helperText={touched.apellidoMSuplente && errors.apellidoMSuplente}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
												<Typography variant="h7" mt={"2rem"}>
												NOMBRE COMPLETO <span style={{ color: "red" }}>*</span>
													</Typography>
													<TextField
														fullWidth
														size="small"
														id="outlined-basic" 
														variant="outlined"
														label=""
														name="nombreSuplente"
														value={values.nombreSuplente}
														error = {touched.nombreSuplente && errors.nombreSuplente}
														helperText={touched.nombreSuplente && errors.nombreSuplente}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
											<Typography variant="h7" mt={"1rem"}>
											INSERTAR FOTOGRAFÍA DEL SUPLENTE  <span style={{ color: "red" }}>*</span>
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
													value={fotografiaSuplente.name}
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
															onChange={(e) => setFotografiaSuplente(e.target.files[0])}
															accept="image/png,image/jpg"
															type="file"
														/>
														<PhotoCamera fontSize="" />
													</IconButton>
												</Box>
												{touched.fotografiaSuplente &&
													fotografiaSuplente.name === "Sin Archivo seleccionado" && (
															<Box ml={2} 
																sx={{
																fontSize: "12px",
																	color: "#791010" }}
																>
																{errors.fotografiaSuplente}
															</Box>
													)}
											<Typography variant="h7" mt={"1rem"}>
											SEUDÓNIMO DEL SUPLENTE <span style={{ color: "gray" }}> (opcional)</span>
												</Typography>
												<TextField
													name="seudonimoSuplente"
													fullWidth
													size="small"
													id="outlined-basic" 
													variant="outlined"
													label=""
													value={values.seudonimoSuplente}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
													<Typography variant="h7" mt={"2rem"}>
													FECHA DE NACIMIENTO<span style={{ color: "red" }}>*</span>
														</Typography>
													<Grid
													>				
														<DatePickerModSuplente
															label=""
															name={"fechaNacimientoSuplente"}
															value={values.fechaNacimientoSuplente}
															setFieldValue={setFieldValue}
															handleChange={handleChange}
															error={errors.fechaNacimientoSuplente}
															touched={touched.fechaNacimientoSuplente}
															
														/>
													</Grid>  
													
													
													
														<Typography variant="h7" mt={"2rem"}>
														GÉNERO DEL SUPLENTE <span style={{ color: "red" }}>*</span>
														</Typography>
													<Box>
															<RadioButtModSuplente
																valuesTipo={values.generoSuplente}
																handleChange={handleChange}
																errorsTipo={errors.generoSuplente}
															/>
															{touched.generoSuplente && (
															<Box ml={2}
																sx={{
																fontSize: "12px",
																	color: "#791010" }}
																>
																{errors.generoSuplente}
															</Box>
														)}
													</Box>	
											</Box>
											</>
											// END SUPLENTE
										)}
										<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
											<Button
											color="inherit"
											disabled={activeStep === 0}
											onClick={handleBack}
											sx={{ mr: 1 }}
											>
											Regresar
											</Button>
											<Box sx={{ flex: '1 1 auto' }} />

											<Button 
											disabled={status === "checking"}
											sx={{
												boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
												transition: "all 0.5s ease",
												backgroundColor: "#511079",
												color: "#FFFFFF",
												width: "20%",
												borderRadius: "25px 25px 25px 25px",
												"&:hover": {
													backgroundColor: "#7E328B !important",
													transform: "translate(-5px, -5px)",
													boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
												},
											}}
											onClick={handleNext}>
											{activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
											</Button>
											
											<Button
												disabled={status === "checking"}
												
												onClick={onCancel}
												sx={{
													boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
													transition: "all 0.5s ease",
													backgroundColor: "#791010",
													color: "#FFFFFF",
													width: "20%",
													borderRadius: "25px 25px 25px 25px",
													"&:hover": {
														backgroundColor: "#8B3232 !important",
														transform: "translate(-5px, -5px)",
														boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
													},
												}}
											>
												Cancelar
											</Button>
										</Box>
										</React.Fragment>
									 )
									}
									</Box>
									
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Modal>
	</>
	);
};
