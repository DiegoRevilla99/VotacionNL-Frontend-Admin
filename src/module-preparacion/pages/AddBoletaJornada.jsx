import { Box, Button, CircularProgress, Divider, Grid, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Formik } from 'formik';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { number, object, string } from "yup";
// import { useUiStore } from "../../hooks/useUiStore";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { onCreateBoleta, onUpdateBoletaData } from "../../store/module-preparacion/jornada/ThunksJornada";
import { FielTextCustomJornadas } from "../components/FielTextCustomJornadas";
import { ModalBoletaPartido } from "../components/ModalBoletaPartido";
import { ModalRegisterCS } from "../components/ModalRegisterCS";
// import { DataGridRowGrouping } from "../../ui/components/DataGridRowGrouping";
import { AddCandidatoMod } from "../components/AddCandidatoMod";
import { ModalEliminarCandidato } from "../components/ModalEliminarCandidato";
import { ModalEliminarPartido } from "../components/ModalEliminarPartido";
import { useJornadaStore } from "../hooks/useJornadaStore";

import { AgrupaPartido } from "../components/configuracion-boleta/AgrupaPartido";

const validationSchema = object({

	nombreCandidatura: string("").required(
		"Por favor, ingresa un nombre de la candidatura"
		),

	municipio: string("").required(
		"Por favor, ingresa el nombre del municipio"
		),
	distritoElectoral: number("").required(
		"Por favor, ingresa el número del distrito electoral"
		).max("300").positive("Solo números positivos, por favor.").typeError("Debes ingresar un número").moreThan(1, "Debes ingresar un número mayor a 1"),
	primerFirmante: string("").required(
		"Por favor, ingresa el nombre del primer firmante"
		),
	cargoPrimerFirmante: string("").required(
		"Por favor, ingresa el cargo del primer firmante"
		),
	segundoFirmante: string("").required(
		"Por favor, ingresa el nombre de segundo firmante"
		),
	cargoSegundoFirmante: string("").required(
		"Por favor, ingresa el cargo de segundo firmante"
		),
});

export const AddBoletaJornada = () => {
	const { 
		status,
        partidos,
        partidoSelected,
		candidatoandSuplentes,
		candidatoandSuplenteSelected,
		updateCandidatoAndSuplente,
		jornadaSelected,
		candidatosAMostrar,
	} = useJornadaStore();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	
	const values = Object.values(jornadaSelected.boletaSelected).length === 0 ? {

		nombreCandidatura: "",
		municipio: "",
		distritoElectoral: "",
		primerFirmante: "",
		cargoPrimerFirmante: "",
		segundoFirmante: "",
		cargoSegundoFirmante: "",
	} : {

		nombreCandidatura: jornadaSelected.boletaSelected.nombreCandidatura,
		// modalidadVotacion: jornadaSelected.boletaSelected.modalidadVotacion,
		municipio: jornadaSelected.boletaSelected.municipio,
		distritoElectoral: jornadaSelected.boletaSelected.distritoElectoral,
		primerFirmante: jornadaSelected.boletaSelected.primerFirmante,
		cargoPrimerFirmante: jornadaSelected.boletaSelected.cargoPrimerFirmante,
		segundoFirmante: jornadaSelected.boletaSelected.segundoFirmante,
		cargoSegundoFirmante: jornadaSelected.boletaSelected.cargoSegundoFirmante,
	
	};

	const [isLoading, setIsLoading] = useState(false);

	const [statusMatchModal, setStatusMatchModal] = useState(false);
	const [statusDeletePartidoModal, setStatusDeletePartidoModal] = useState(false);
	const [statusDeleteCandidatoModal, setStatusDeleteCandidatoModal] = useState(false);
	const [statusRegisterModal, setStatusRegisterModal] = useState(false);


	const handleCloseMatchModal = () => setStatusMatchModal(false);

	const handleCloseDeletePartidoModal = () => setStatusDeletePartidoModal(false);
	const handleCloseDeleteCandidatoModal = () => setStatusDeleteCandidatoModal(false);
	const handleCloseRegisterModal = () => setStatusRegisterModal(false);



	const handleOpenRegisterModal = () => {
	    // toastOffOperation();
		setStatusRegisterModal(true);
	};

	const handleOpenMatchModal = () => {
		// console.log("partidos en la boleta", partidos);
	setStatusMatchModal(true);
	};

	const handleOpenDeletePartidoModal = () => {
		// toastOffOperation();
		setStatusDeletePartidoModal(true);
	};

	const handleOpenDeleteCandidatoModal = () => {
		// toastOffOperation();
		setStatusDeleteCandidatoModal(true);
	};

	const onCancel = () => {
		navigate("/preparacion/jornada/"+ params.id);
	};


	const [showModal, setShowModal] = useState(false);
	const [estructuraBoletaId, setEstructuraBoletaId] = useState(null);
	
	const onSubmit = (values) => {
	  if(Object.values(jornadaSelected.boletaSelected).length === 0){
		if(candidatoandSuplentes.length > 0 && partidos.length > 0)
		  dispatch(
			onCreateBoleta( values, params.id, candidatoandSuplentes, partidos, (idEstructuraBoleta)=>{
				setEstructuraBoletaId(idEstructuraBoleta);
			})
		  ) 
		  if (estructuraBoletaId >= 0) 
		{			
			setTimeout(() => {
		 	setShowModal(true);
			}, 1000);
		}
	  }else{
		dispatch(
		  onUpdateBoletaData( 
			values, 
			params.id, 
			candidatoandSuplentes, 
			partidos, 
			params.idBoleta,
			()=>{
				navigate("/preparacion/jornada/"+params.id);
			}
		  )
		);
	  }
	};
	
	const handleTerminar = () => {
	  navigate("/preparacion/jornada/"+params.id);
	};
	const handleConfigurar = () => {
		// console.log("boletaId aaaaa", estructuraBoletaId);
		navigate("/preparacion/jornada/configboleta/" + estructuraBoletaId);
	};

	// const onSubmit = (values) => {
	// 	console.log("partidoooooooooooooooos",partidos);
	// 	if(Object.values(jornadaSelected.boletaSelected).length === 0){
	// 		if(candidatoandSuplentes.length > 0)
	// 			dispatch(
	// 				onCreateBoleta( values, params.id, candidatoandSuplentes, partidos, ()=>{
	// 					navigate("/preparacion/jornada/"+params.id);
	// 				})
	// 			) 
	// 	}else{
	// 		dispatch(
	// 			onUpdateBoletaData( 
	// 				values, 
	// 				params.id, 
	// 				candidatoandSuplentes, 
	// 				partidos, 
	// 				params.idBoleta,
	// 				()=>{
	// 					navigate("/preparacion/jornada/"+params.id);
	// 				}
	// 			)
	// 		);
	// 	}
	// };
	return (
		<>
          {isLoading ? (
            <Stack
              justifyContent="center"
              sx={{ color: "grey.500" }}
              spacing={2}
              direction="row"
            >
              <CircularProgress color="primary" />
            </Stack>
          ) : (
            <Formik
		initialValues={values}
		validationSchema={validationSchema}
		onSubmit={(values) => {
			onSubmit(values);
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
			<form onSubmit={handleSubmit} >
				
				<Box sx={{ m: "0.5rem", ml: "2rem" }}>
					<Typography variant="h6" align="left" color="initial">
					PASO 3.- REGISTRO DE BOLETA
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
							PASO 3.1.- DATOS GENERALES
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<FielTextCustomJornadas
							disabled={status === "checking"}
								label="NOMBRE DE LA CANDIDATURA"
								name="nombreCandidatura"
								value={values.nombreCandidatura}
								handleChange={handleChange}
								error={errors.nombreCandidatura}
								touched={touched.nombreCandidatura}
							/>
							{/* {touched.nombreCandidatura && errors.nombreCandidatura && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.nombreCandidatura}</Typography>} */}
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" color="initial">
							PASO 3.2.- DATOS GEOELECTORALES
							</Typography>
						</Grid>

						<Grid item xs={12} md={12} lg={8}>
							<FielTextCustomJornadas
							disabled={status === "checking"}
								label="MUNICIPIO O DELEGACIÓN"
								name="municipio"
								value={values.municipio}
								handleChange={handleChange}
								error={errors.municipio}
								touched={touched.municipio}
							/>
							{/* {touched.municipio && errors.municipio && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.municipio}</Typography>} */}
						</Grid>

						<Grid item xs={12} md={12} lg={4}>
							<FielTextCustomJornadas
							disabled={status === "checking"}
								label="DISTRITO ELECTORAL"
								name="distritoElectoral"
								value={values.distritoElectoral}
								handleChange={(e) => {
									const inputValue = e.target.value;
									const isNumber = /^\d+$/.test(inputValue);
									const isPositive = parseInt(inputValue) > 0;
									if (isNumber && isPositive) {
									  handleChange(e);
									}
								  }}
								error={errors.distritoElectoral}
								touched={touched.distritoElectoral}
								type="number"
							/>
							{/* {touched.distritoElectoral && errors.distritoElectoral && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.distritoElectoral}</Typography>} */}
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" color="initial">
							PASO 3.3.- FIRMANTES
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<FielTextCustomJornadas
							disabled={status === "checking"}
								label="NOMBRE DEL PRIMER FIRMANTE"
								name="primerFirmante"
								value={values.primerFirmante}
								handleChange={handleChange}
								error={errors.primerFirmante}
								touched={touched.primerFirmante}
							/>
							{/* {touched.primerFirmante && errors.primerFirmante && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.primerFirmante}</Typography>} */}
						</Grid>
						<Grid item xs={12}>
							<FielTextCustomJornadas
							disabled={status === "checking"}
								label="CARGO DEL PRIMER FIRMANTE"
								name="cargoPrimerFirmante"
								value={values.cargoPrimerFirmante}
								handleChange={handleChange}
								error={errors.cargoPrimerFirmante}
								touched={touched.cargoPrimerFirmante}
							/>
							{/* {touched.cargoPrimerFirmante && errors.cargoPrimerFirmante && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.cargoPrimerFirmante}</Typography>} */}
						</Grid>
						<Grid item xs={12}>
							<FielTextCustomJornadas
							disabled={status === "checking"}
								label="NOMBRE DEL SEGUNDO FIRMANTE"
								name="segundoFirmante"
								value={values.segundoFirmante}
								handleChange={handleChange}
								error={errors.segundoFirmante}
								touched={touched.segundoFirmante}
							/>
							{/* {touched.segundoFirmante && errors.segundoFirmante && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.segundoFirmante}</Typography>} */}
						</Grid>
						<Grid item xs={12}>
							<FielTextCustomJornadas
							disabled={status === "checking"}
								label="CARGO DEL SEGUNDO FIRMANTE"
								name="cargoSegundoFirmante"
								value={values.cargoSegundoFirmante}
								handleChange={handleChange}
								error={errors.cargoSegundoFirmante}
								touched={touched.cargoSegundoFirmante}
							/>
							{/* {touched.cargoSegundoFirmante && errors.cargoSegundoFirmante && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.cargoSegundoFirmante}</Typography>} */}
						</Grid>

						<AddCandidatoMod
							handleOpenModal={handleOpenRegisterModal}
							handleOpenDeleteCandidatoModal={handleOpenDeleteCandidatoModal}
							status={status}
						/> 
						<> 
						 <Box
							pl={3}
							width="100%"
							mt={5}
						>
							
							<Grid item xs={12} md={6} lg={4}>
							<Tooltip title="Registrar una nuevo partido">
								<Button
									// onClick={setShowModal(true)}
									onClick={handleOpenMatchModal}
									variant="contained"
									size="large"
									disabled={status === "checking" || candidatoandSuplentes.length === 0 ? true : false}
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
									PASO 3.6.- AGREGAR PARTIDO
								</Button>
								</Tooltip>
							</Grid>
								<Box
								sx={{
									display: "flex",
									width: "100%",
									alignItems: "center",
									justifyContent: "center",
									mt: 3,
									// mb: 2,
								}}
								>
									<AgrupaPartido info={{ partidos: partidos}} handleOpenModal={handleOpenMatchModal}/>
								</Box>

							</Box>
						  </>

					</Grid>
					<Grid mt={"1rem"} container direction="row" justifyContent="flex-end" spacing={2}>
						<Grid item xs={12} md={6} lg={3}>
							<Button
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
				</Box>
			{/* MODAL PARA REGISTRAR LOS PARTIDOS */}
			<ModalBoletaPartido statusMatchModal={statusMatchModal} handleToggleModal={handleCloseMatchModal} />
			{/* MODAL PARA REGISTRAR A LOS candidatoandSuplentes Y SUPLENTES */}
			<ModalRegisterCS statusRegisterModal={statusRegisterModal} handleToggleModal={handleCloseRegisterModal} />
			{/* MODAL PARA CONFIRMAR LA ELIMINACIÓN */}
			<ModalEliminarPartido statusDeletePartidoModal={statusDeletePartidoModal} handleToggleModal={handleCloseDeletePartidoModal} />
			<ModalEliminarCandidato statusDeleteCandidatoModal={statusDeleteCandidatoModal} handleToggleModal={handleCloseDeleteCandidatoModal} />
			{/* ELIMINAR EL SIGUIENTE MODAL */}
            {/* <ModalBoletaCandidato statusCandidateModal={statusCandidateModal} handleToggleModal={handleCloseCandidateModal} /> */}
			{/* ELIMINAR EL SIGUIENTE MODAL */}
			{/* <ModalSustitutoBoleta statusSubstituteModal={statusSubstituteModal} handleToggleModal={handleCloseSubstituteModal} /> */}
		</form>
		</Box>
		)}
		</Formik>
		)}
		<div>
		{/* Resto de la interfaz */}
		{showModal && (
			<div style={{
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				background: '#fff',
				width: '400px',
				height: '400px',
				zIndex: 9999,
				padding: '20px',
				borderRadius: '10px',
				textAlign: 'center'
			}}>
				<Typography id="modal-modal-title" variant="h4" color="black" align="center" mr={5} ml={5} mb={5}>
					¿Deseas crear las coaliciones o prefieres terminar y salir?
				</Typography>
				
				<Grid
					container
					direction="row"
					justifyContent="center"  // Cambio aquí
					alignItems="center"
					// spacing={5}
				>
							<Button
								onClick={handleConfigurar}
								variant="contained"
								size="large"
								endIcon={<HandshakeIcon />}
								sx={{
									boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
									transition: "all 0.5s ease",
									backgroundColor: "#511079",
									width: "80%",
									borderRadius: "25px 25px 25px 25px",
									"&:hover": {
										backgroundColor: "#7E328B !important",
										transform: "translate(-5px, -5px)",
										boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
									},
								}}
							>
								Crear coaliciones
							</Button>


							<Button
								onClick={handleTerminar}
								variant="contained"
								size="large"
								endIcon={<ExitToAppIcon />}
								sx={{
									margin: '10px 0 0 0',
									boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
									transition: "all 0.5s ease",
									backgroundColor: "#791010",
									width: "80%",
									borderRadius: "25px 25px 25px 25px",
									"&:hover": {
										backgroundColor: "#8B3232 !important",
										transform: "translate(-5px, -5px)",
										boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
									},
								}}
							>
								Terminar y salir
							</Button>

					</Grid>
			</div>
		)}
		</div>

	</>
		  
	);
};
