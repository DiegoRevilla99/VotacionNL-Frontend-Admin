import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { object } from "yup";
import { useJornadaNoFormalStore } from "../hooks/useJornadaNoFormalStore";
import { CandidatoCheck } from './configuracion-boleta/CandidatoCheck';
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
		// // Datos del candidato
	// nombreAsociacion: string("").required(
	// 	"Por favor, ingresa el apellido paterno del candidato/a"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,50}$/, "Solo se permiten letras y espacios"),
	// 	emblema: string("").required(
	// 	"Por favor, ingresa el apellido materno del candidato/a"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,50}$/, "Solo se permiten letras y espacios"),

});

export const ModalAsociacionGenerico = ({ statusRegisterAsociacionModal, handleCloseRegisterAsociacionModal }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { status, candidatos, asociaciones, addAsociacion, setAsociacionesSelectedNull } = useJornadaNoFormalStore();
	const onSubmit = (values) => {
		setLogo({ name: "Sin Archivo seleccionado" });
		console.log(values);
		addAsociacion(
			asociaciones.length,
			values.nombreAsociacion,
			values.emblema,
			values.logo,
		);
		setAsociacionesSelectedNull();
		handleCloseRegisterAsociacionModal();
	};
	const onCancel = () => {
        setAsociacionesSelectedNull();
		handleCloseRegisterAsociacionModal();
	};
	 //Validacion del formato imagen 
	 const [logo, setLogo] = useState({
		name: "Sin Archivo seleccionado",
	  });
		
	 const validando = (values, props) => {
		 const errors = {};
 
		 if (logo.name === "Sin Archivo seleccionado") {
		   errors.logo = "Se necesita una logo";
		 }
		 return errors;
	   };


	const [candidatosS, setCandidatosS] = useState(
		asociaciones ? asociaciones.candidatos : []
	);
	const onSelectCandidato = (candidato) => {
		console.log("cnadidato: " + candidato);
		let candi = null;
		candi = candidatosS.find((c) => c === candidato);
		if (candi) {
			setCandidatosS(candidatosS.filter((c) => c !== candidato));
		} else {
			setCandidatosS([...candidatosS, candidato]);
		}
	};
	return (
		<Modal
			open={statusRegisterAsociacionModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ overflowY: "auto", height: "100%" }}>
					<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
						REGISTRO DE ASOCIACIONES
					</Typography>
					<Box m={"2rem"}>
						<Formik
							initialValues={{
								nombreAsociacion: "",
								emblema: "",
								logo: "",
                                // "nombreAsociacion": "VERDE",
                                // "emblema": "PLANILLA C",
                                // "logo": "GRIS.PNG"
							}}
							validate = {validando}
							validationSchema={validationSchema}
							onSubmit={(values, {resetForm}) => {
								onSubmit(values);
								resetForm();
							}}
						>
							{({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue }) => (
								<Form onSubmit={handleSubmit}>
									<Typography variant="h7">
										NOMBRE DE LA ASOCIACIÓN <span style={{ color: "red" }}>*</span>
									</Typography>
									<TextField
										name="nombreAsociacion"
										fullWidth
										size="small"
										// id="titulo"
										label=""
										variant="outlined"
										onChange={handleChange}
										value={values.nombreAsociacion}
										error={touched.nombreAsociacion && Boolean(errors.nombreAsociacion)}
										helperText={touched.nombreAsociacion && errors.nombreAsociacion}
										onBlur={handleBlur}
									/>
									<Typography variant="h7" mt={"20rem"}>
									EMBLEMA <span style={{ color: "red" }}>*</span>
									</Typography>
									<TextField
										name="emblema"
										fullWidth
										size="small"
										// id="titulo"
										label=""
										variant="outlined"
										onChange={handleChange}
										value={values.emblema}
										error={touched.emblema && Boolean(errors.emblema)}
										helperText={touched.emblema && errors.emblema}
										onBlur={handleBlur}
									/>
									<Typography variant="h7" mt={"1rem"}>
									INSERTAR LOGO DE LA ASOCIACIÓN  <span style={{ color: "red" }}>*</span>
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
										value={logo.name}
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
												onChange={(e) => setLogo(e.target.files[0])}
												accept="image/png,image/jpg"
												type="file"
											/>
											<PhotoCamera fontSize="" />
										</IconButton>
									</Box>
									{touched.logo &&
										logo.name === "Sin Archivo seleccionado" && (
										<Box ml={2} 
											sx={{
											fontSize: "12px",
											color: "#791010" }}
											>
											{errors.logo}
										</Box>
										)}

										{/* Esto es del recuadrod el componente de lso candidatos */}
										<Box
										id="candidato"
										name="candidato"
										onBlur={handleBlur}
										sx={{
										boxShadow: 1,
										width: "100%",
										height: { xl: "400px", lg: "350px" },
										mt: 2,
										p: 3,
										border: "1px solid rgba(0,0,0,0.4)",
										borderRadius: "15px",
										// background: "#F1F1F1",
										}}
									>
										{/* <Typography sx={{ fontWeight: "bold" }}> */}
										{/* <Typography sx={{ fontWeight: "bold" }}>
										SELECCIONE LOS CANDIDATOS CORRESPONDIENTES A ESTA ASOCIACIÓN
										</Typography> */}
										<Typography variant="h7" mt={"1rem"}>
										SELECCIONE LOS CANDIDATOS CORRESPONDIENTES A ESTA ASOCIACIÓN  <span style={{ color: "red" }}>*</span>
									</Typography>
										<Box
										sx={{
											display: "flex",
											width: "100%",
											height: "100%",
											overflowY: "scroll",
											flexDirection: "row",
											flexWrap: "wrap",
											p: 1,
											mb: 1,
										}}
										>
										{candidatos.map((candidat) => (
											<CandidatoCheck
											key={candidat.claveElectoral}
											claveElectoral={candidat.claveElectoral}
											candidato={candidat.nombreCandidato}
											onSelect={onSelectCandidato}
											candidatosSeleted={candidatosS}
											></CandidatoCheck>
										))}
										</Box>
										{touched.candidatos && candidatosS.length === 0 && (
										<ErrorField>{errors.candidatos}</ErrorField>
										)}
									</Box>
									<br />

									{/* Esto es del los botones */}
									<Grid
										container
										direction="row"
										justifyContent="flex-end"
										alignItems="center"
										spacing={2}
										mt={0.1}
										marginBottom={2}
									>
									<Grid item xs={12} md={6} lg={3} >
										<Button
											type="submit"
											variant="contained"
											size="large"
											sx={{
												boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
												transition: "all 0.5s ease",
												backgroundColor: "#511079",
												width: "100%",
												borderRadius: "25px 25px 25px 25px",
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
											disabled={status === "checking"}
											onClick={onCancel}
											variant="contained"
											size="large"
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
