import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, Button, Checkbox, FormControlLabel, Grid, Modal, TextField, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { array, object, string } from "yup";
import { useUiStore } from "../../hooks/useUiStore";
import { useJornadaNoFormalStore } from "../hooks/useJornadaNoFormalStore";
// import { CandidatoCheck } from './configuracion-boleta/CandidatoCheck';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import { onPostImage } from '../../store/module-preparacion/jornada/ThunksJornadaNoFormal';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "70%",
	height: { xl: "85%", lg: "85%", md:"100%",  sm: "100%", xs: "100%" },
	bgcolor: "background.paper",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
	pb: 1,
	// height: "90%",
};

const validationSchema = object({
		// // Datos del candidato
	nombreAsociacion: string("").required(
		"Por favor, ingresa el nombre de la asociación"
		),
		emblema: string("").required(
		"Por favor, ingresa el emblema de las asociación"
		),
		candidatosAsociacion: array().min(1, "Es necesario que la asociación cuente con un candidato al menos"),
});

export const ModalAsociacionGenerico = ({ statusRegisterAsociacionModal, handleCloseRegisterAsociacionModal }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { toastSuccesOperation } = useUiStore();
	const { status, candidatos, asociaciones,asociacionesSelected, updateAsociacion, addAsociacion, setAsociacionesSelectedNull } = useJornadaNoFormalStore();
	const onSubmit = async(values) => {
		// setLogo({ name: "Sin Archivo seleccionado" });
		// console.log(values);
		if (Object.values(asociacionesSelected).length === 0) {
			const urll = await getURLImage();
			addAsociacion(
				asociaciones.length,
				values.nombreAsociacion,
				values.emblema,
				urll,
				values.candidatosAsociacion,
			);
			toastSuccesOperation("Datos registrados con éxito");
		} else {
			let logos=logo.name;
                if(asociaciones.logo!==logo.name){
                    console.log("se cambio la imagen")
                    logos=await getURLImage();
                    console.log("url:",logos)
                }else{
                  console.log("no se cambio la imagen")
                }
			updateAsociacion(
				asociacionesSelected.id,
				values.nombreAsociacion,
				values.emblema,
				values.logo,
				values.candidatosAsociacion,
			)
			toastSuccesOperation("Datos actualizados con éxito");
		}
		setAsociacionesSelectedNull();
		handleCloseRegisterAsociacionModal();
		setLogo({ name: "Sin Archivo seleccionado" });
	};
	const onCancel = () => {
        setAsociacionesSelectedNull();
		handleCloseRegisterAsociacionModal();
	};
	 //Validacion del formato imagen 
	//  const [logo, setLogo] = useState({
	// 	name: "Sin Archivo seleccionado",
	//   });
		
	 const validando = (values, props) => {
		 const errors = {};
 
		 if (logo.name === "Sin Archivo seleccionado") {
		   errors.logo = "Se necesita una logo";
		 }
		 return errors;
	   };

	   const [logo, setLogo] = useState(
		asociaciones
        ? {
            name: asociaciones.logo
              ? asociaciones.logo
              : "Sin Archivo seleccionado",
          }
        : { name: "Sin Archivo seleccionado" }
    );
	   const getURLImage = async () => {
		const url = await dispatch(onPostImage(logo));
		return url;
	  };
	   // PARA EL LOGO DE ASOCIACIONES
	//    https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/asociacion/logo/202
	  
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
							initialValues={
								Object.values(asociacionesSelected).length === 0 ?
								{
								nombreAsociacion: "",
								emblema: "",
								logo: "",
								candidatosAsociacion: [],
								} :{
									nombreAsociacion: asociacionesSelected.nombreAsociacion,
									emblema: asociacionesSelected.emblema,
									logo: asociacionesSelected.logo,
									candidatosAsociacion: asociacionesSelected.candidatosAsociacion,
								}
							}
							validate = {validando}
							validationSchema={validationSchema}
							onSubmit={(values, {resetForm}) => {
								onSubmit(values);
								resetForm();
							}}
							>
							{({
							values,
							handleSubmit,
							handleChange,
							errors,
							touched,
							handleBlur,
							setFieldValue,
							}) => {
								const [candidatosDisponibles, setCandidatosDisponibles] = useState(candidatos);
							return (
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
												disabled={status==="checking"}
												onChange={(e) => setLogo(e.target.files[0])}
												onBlur={handleBlur}
												accept="image/x-png,image/jpeg"
												type="file"
												name="logo"
												id="logo"
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
										<Typography variant="h7" mt={"1rem"}>
										SELECCIONE LOS CANDIDATOS CORRESPONDIENTES A ESTA ASOCIACIÓN  <span style={{ color: "red" }}>*</span>
									</Typography>
									<Tooltip title="RECUERDE QUE DEBES SELECCIONAR LOS MISMOS CANDIDATOS QUE CORRESPONDEN A LA ASOCIACIÓN EN CASO DE CREAR UNA NUEVA." 
									placement="right">
									<IconButton>
										<HelpOutlineIcon/>
									</IconButton>
									</Tooltip>
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

											{candidatosDisponibles.map(candidato => (
											<Box
												sx={{
												boxShadow: values.candidatosAsociacion.findIndex(c => c.id === candidato.id) !== -1 ? 3 : 0,
												display: "flex",
												justifyContent: "space-around",
												alignItems: "center",
												width: "300px",
												height: "80px",
												m: 1,
												border: "1px solid rgba(0,0,0,0.2)",
												borderRadius: "8px",
												background: values.candidatosAsociacion.findIndex(c => c.id === candidato.id) !== -1 ? "#E7C0F9" : "#FFF",
												transition: "boxShadow,background 0.4s ease-in-out",
												}}
											>
												<Box
												sx={{
													borderRadius: "15px",
													width: "50px",
													height: "50px",
													background: "#000",
													ml: 1,
												}}
												>
												<a href={candidato.fotografiaCandidato}>
													<img width="60px" height="55px" src={candidato.fotografiaCandidato} alt="fotoCandidato"/>
												</a>

												</Box>
												<Box sx={{ p: 2 }}>
												<Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
													{candidato.nombreCandidato}
												</Typography>
												</Box>
												<FormControlLabel
												control={
													<Checkbox
													checked={values.candidatosAsociacion.findIndex(c => c.id === candidato.id) !== -1}
													onChange={() => {
														if (values.candidatosAsociacion.findIndex(c => c.id === candidato.id) !== -1) {
														setFieldValue(
															"candidatosAsociacion",
															values.candidatosAsociacion.filter(c => c.id !== candidato.id)
														);
														} else {
														setFieldValue(
															"candidatosAsociacion",
															[...values.candidatosAsociacion, candidato]
														);
														}
													}}
													/>
												}
												/>
											</Box>
											))}
										</Box>
									</Box>
									{touched.candidatosAsociacion &&
												(
													   <Box ml={2} 
														   sx={{
														   fontSize: "12px",
															   color: "#791010" }}
														   >
														   {errors.candidatosAsociacion}
													   </Box>
											   )}
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
							)}}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};
