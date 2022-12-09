import { Box, Divider, Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useUiStore } from "../../hooks/useUiStore";
// import { saveConsultaPrueba } from "../../store/module-preparacion/consulta-ciudadana/thunks";
import { DataGridTable } from "../../ui/components/DataGridTable";
import { ModalBoletaPartido } from "../components/ModalBoletaPartido";
import { ModalBoletaCandidato } from "../components/ModalBoletaCandidato";
import { ModalEliminarPC } from "../components/ModalEliminarPC";

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useNavigate } from "react-router-dom";
// import { ModalPapeleta } from "../components/ModalPapeleta";
// import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";

export const AddBoletaJornada = () => {
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

	const navigate = useNavigate();

	const [statusMatchModal, setStatusMatchModal] = useState(false);
	// const { toastOffOperation } = useUiStore();
	// const { status } = useConsultaCiudadanaStore();
	// const dispatch = useDispatch();

    const [statusCandidateModal, setStatusCandidateModal] = useState(false);
	const [statusDeleteModal, setStatusDeleteModal] = useState(false);

	const handleCloseMatchModal = () => setStatusMatchModal(false);
    const handleCloseCandidateModal = () => setStatusCandidateModal(false);
	const handleCloseDeleteModal = () => setStatusDeleteModal(false);

	 const handleOpenMatchModal = () => {
	 	// toastOffOperation();
	 	setStatusMatchModal(true);
	 };

     const handleOpenCandidateModal = () => {
        // toastOffOperation();
        setStatusCandidateModal(true);
    };

	const handleOpenDeleteModal = () => {
        // toastOffOperation();
        setStatusDeleteModal(true);
    };

	// const onSubmit = (data) => {
	// 	console.log(data);
	// 	// dispatch(saveConsultaPrueba());
	// 	// navigate("/preparacion/jornada");
	// };
	const onCancel = () => {
		navigate("/preparacion/jornada");
	};


	// INICIO DEL RETURN

	return (
		<>
	<Formik
		initialValues={{
			encabezado: "",	//Text
			nombreCandidatura: "",//Text
			entidadFederativa: "",//Text
			municipio: "",//Text
			distritoElectoralLocal: "",//Number
			distritoElectoral: "",//Number
			tipoCasilla: "",//text
			primerFirmante: "",//Text
			cargoPrimerFirmante: "",//Text
			segundoFirmante: "",//Text
			cargoSegundoFirmante: "",//Text
		}}
		validate={(valores) => {
			let errores = {};

			// Validacion encabezado
			if(!valores.encabezado){
				errores.encabezado = 'Por favor,  ingresa un encabezado'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.encabezado)){
				errores.encabezado = 'El encabezado solo puede contener letras y espacios'
			}
			// Validacion nombreCandidatura
			if(!valores.nombreCandidatura){
				errores.nombreCandidatura = 'Por favor,  ingresa un nombre de Candidatura'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombreCandidatura)){
				errores.nombreCandidatura = 'El nombre de Candidatura solo puede contener letras y espacios'
			}
			// Validacion entidadFederativa
			if(!valores.entidadFederativa){
				errores.entidadFederativa = 'Por favor,  ingresa una entidad Federativa'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.entidadFederativa)){
				errores.entidadFederativa = 'La entidad Federativa solo puede contener letras y espacios'
			}
			// Validacion municipio
			if(!valores.municipio){
				errores.municipio = 'Por favor, ingresa un municipio'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.municipio)){
				errores.municipio = 'El municipio solo puede contener letras y espacios'
			}
			// Validacion distritoElectoralLocal NUMBER
			if(!valores.distritoElectoralLocal){
				errores.distritoElectoralLocal = 'Por favor, ingresa un distrito Electoral Local'
			} else if(!/^[0-9]{1,10}$/.test(valores.distritoElectoralLocal)){
				errores.distritoElectoralLocal = 'El distrito Electoral Local solo puede contener numeros'
			}
			// Validacion distritoElectoral NUMBER
			if(!valores.distritoElectoral){
				errores.distritoElectoral = 'Por favor, ingresa un distrito Electoral'
			} else if(!/^[0-9]{1,10}$/.test(valores.distritoElectoral)){
				errores.distritoElectoral = 'El distrito Electoral solo puede contener numeros'
			}
			// Validacion tipoCasilla
			if(!valores.tipoCasilla){
				errores.tipoCasilla = 'Por favor, ingresa un tipo de Casilla'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.tipoCasilla)){
				errores.tipoCasilla = 'El tipo de Casilla solo puede contener letras y espacios'
			}
			// Validacion primerFirmante
			if(!valores.primerFirmante){
				errores.primerFirmante = 'Por favor, ingresa un primer Firmante'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.primerFirmante)){
				errores.primerFirmante = 'El nombre del primer Firmante solo puede contener letras y espacios'
			}
			// Validacion cargoPrimerFirmante
			if(!valores.cargoPrimerFirmante){
				errores.cargoPrimerFirmante = 'Por favor, ingresa el cargo del Primer Firmante'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.cargoPrimerFirmante)){
				errores.cargoPrimerFirmante = 'El cargo del Primer Firmante solo puede contener letras y espacios'
			}
			// Validacion segundoFirmante
			if(!valores.segundoFirmante){
				errores.segundoFirmante = 'Por favor, ingresa un segundo Firmante'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.segundoFirmante)){
				errores.segundoFirmante = 'El nombre del segundo Firmante solo puede contener letras y espacios'
			}
			// Validacion cargoSegundoFirmante
			if(!valores.cargoSegundoFirmante){
				errores.cargoSegundoFirmante = 'Por favor, ingresa el cargo de Segundo Firmante'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.cargoSegundoFirmante)){
				errores.cargoSegundoFirmante = 'El cargo del Segundo Firmante solo puede contener letras y espacios'
			}

			return errores;
		}}
		onSubmit={(valores, {resetForm}) => {
			resetForm();
			console.log('Formulario enviado');
			cambiarFormularioEnviado(true);
			setTimeout(() => cambiarFormularioEnviado(false), 5000);
		}}
	>
		{( {values, errors, touched, handleSubmit, handleChange, handleBlur} ) => (
			<Box 
			sx={{
				height: "100%",
				width: "100%",
				overflowY: "auto",
			}}
		>
			<Form className="formulario" onSubmit={handleSubmit} >
				
				<Box sx={{ m: "0.5rem", ml: "2rem" }}>
					<Typography variant="h6" align="left" color="initial">
						REGISTRO DE BOLETA
					</Typography>
				</Box>
				<Divider />
				<Box
					m={"2rem"}
					sx={{
						boxShadow: 1,
						backgroundColor: "white",
						mt: "2rem",
						borderRadius: "2rem",
						p: "2rem",
						pt: "1rem",
					}}
				>
					<Grid
						container
						sx={{
							height: "100%",
							display: "flex",
						}}
						spacing={3}
					>
						<Grid item xs={12} mt="0.5rem">
							<Typography variant="h6" color="initial">
								DATOS GENERALES
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								size="small"
								id="filled-basic"
								label="ENCABEZADO DE LA BOLETA"
								variant="filled"
								name="encabezado"
								value={values.encabezado}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.encabezado && errors.encabezado && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.encabezado}</Typography>}
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								size="small"
								id="filled-basic"
								label="NOMBRE DE LA CANDIDATURA"
								variant="filled"
								name="nombreCandidatura"
								value={values.nombreCandidatura}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.nombreCandidatura && errors.nombreCandidatura && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.nombreCandidatura}</Typography>}
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" color="initial">
								DATOS GEOELECTORALES
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								size="small"
								id="filled-basic"
								label="ENTIDAD FEDERATIVA"
								variant="filled"
								name="entidadFederativa"
								value={values.entidadFederativa}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.entidadFederativa && errors.entidadFederativa && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.entidadFederativa}</Typography>}
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								size="small"
								id="filled-basic"
								label="MUNICIPIO O DELEGACIÓN"
								variant="filled"
								name="municipio"
								value={values.municipio}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.municipio && errors.municipio && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.municipio}</Typography>}
						</Grid>
						<Grid item xs={12} md={12} lg={5}>
							<TextField
								fullWidth
								size="small"
								id="filled-basic"
								label="DISTRITO ELECTORAL LOCAL"
								variant="filled"
								name="distritoElectoralLocal"
								value={values.distritoElectoralLocal}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.distritoElectoralLocal && errors.distritoElectoralLocal && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.distritoElectoralLocal}</Typography>}
						</Grid>
						<Grid item xs={12} md={12} lg={3}>
							<TextField
								fullWidth
								size="small"
								id="filled-basic"
								label="DISTRITO ELECTORAL"
								variant="filled"
								name="distritoElectoral"
								value={values.distritoElectoral}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.distritoElectoral && errors.distritoElectoral && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.distritoElectoral}</Typography>}
						</Grid>
						<Grid item xs={12} md={12} lg={4}>
							<TextField
								fullWidth
								size="small"
								id="filled-basic"
								label="TIPO DE CASILLA"
								variant="filled"
								name="tipoCasilla"
								value={values.tipoCasilla}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.tipoCasilla && errors.tipoCasilla && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.tipoCasilla}</Typography>}
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" color="initial">
								FIRMANTES
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								size="small"
								id="filled-basic"
								label="NOMBRE DEL PRIMER FIRMANTE"
								variant="filled"
								name="primerFirmante"
								value={values.primerFirmante}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.primerFirmante && errors.primerFirmante && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.primerFirmante}</Typography>}
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								size="small"
								id="filled-basic"
								label="CARGO DEL PRIMER FIRMANTE"
								variant="filled"
								name="cargoPrimerFirmante"
								value={values.cargoPrimerFirmante}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.cargoPrimerFirmante && errors.cargoPrimerFirmante && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.cargoPrimerFirmante}</Typography>}
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								size="small"
								id="filled-basic"
								label="NOMBRE DEL SEGUNDO FIRMANTE"
								variant="filled"
								name="segundoFirmante"
								value={values.segundoFirmante}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.segundoFirmante && errors.segundoFirmante && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.segundoFirmante}</Typography>}
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								size="small"
								id="filled-basic"
								label="CARGO DEL SEGUNDO FIRMANTE"
								variant="filled"
								name="cargoSegundoFirmante"
								value={values.cargoSegundoFirmante}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.cargoSegundoFirmante && errors.cargoSegundoFirmante && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.cargoSegundoFirmante}</Typography>}
						</Grid>
						<Grid item xs={12} md={6} lg={4}>
							<Button
								onClick={handleOpenMatchModal}
								variant="contained"
								size="large"
								disabled={status === "checking"}
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
								Agregar partido
							</Button>
						</Grid>
						<Grid item xs={12} md={6} lg={4}>
							<Button
								onClick={handleOpenCandidateModal}
								variant="contained"
								size="large"
								
								disabled={status === "checking"}
								sx={{
									width: { xl: "140%", lg: "140%", sm: "100%", xs: "100%" },
									boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
									transition: "all 0.5s ease",
									backgroundColor: "#511079",
									fontSize: { xl: "15px", lg: "15px", sm: "15px", xs: "15px" },
									borderRadius: "25px 25px 25px 25px",
									"&:hover": {
										backgroundColor: "#7E328B !important",
										transform: "translate(-5px, -5px)",
										boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
									},
								}}
							>
								Agregar candidato independiente
							</Button>
						</Grid>
						<Grid item xs={4} md={2} lg={2}>
							<Button
							onClick={handleOpenDeleteModal}
								variant="contained"
								size="small"
								disabled={status === "checking"}
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
								eliminar
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Box
								sx={{
									height: "25rem",
									backgroundColor: "#f0f0f0",
									borderRadius: "2rem",
									p: "2rem",
									pt: "1rem",
									pb: "1rem",
								}}
							>
								<DataGridTable />
							</Box>
						</Grid>

					</Grid>
					<Grid mt={"1rem"} container direction="row" justifyContent="flex-end" spacing={2}>
						<Grid item xs={12} md={6} lg={3}>
							<Button
								// onClick={onSubmit}
								type="submit"
								variant="contained"
								size="large"
								disabled={status === "checking"}
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
								onClick={onCancel}
								variant="contained"
								size="large"
								disabled={status === "checking"}
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
					{formularioEnviado && <p className="exito" align="center">Formulario enviado con exito!</p>}
				</Box>
			<ModalBoletaPartido statusMatchModal={statusMatchModal} handleToggleModal={handleCloseMatchModal} />
            <ModalBoletaCandidato statusCandidateModal={statusCandidateModal} handleToggleModal={handleCloseCandidateModal} />
			<ModalEliminarPC statusDeleteModal={statusDeleteModal} handleToggleModal={handleCloseDeleteModal} />
			
			
		</Form>
		</Box>
		)}
		</Formik>
	</>
		
	);
};
