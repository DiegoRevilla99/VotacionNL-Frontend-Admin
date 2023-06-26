import { Box, Button, CircularProgress, Divider, Grid, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FielTextCustomJornadas } from "../components/FielTextCustomJornadas";
// import { ModalEliminarPC } from "../components/ModalEliminarPC";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from '@mui/material/IconButton';
import { Formik } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";
import { onCreateBoleta, onCreateBoletaAsociaciones, onUpdateBoletaData, onUpdateBoletaDataAsociacion } from "../../store/module-preparacion/jornada/ThunksJornadaNoFormal";
import { AddCandidatoGenericoMod } from "../components/AddCandidatoGenericoMod";
import { ModalAsociacionGenerico } from "../components/ModalAsociacionGenerico";
import { ModalBoletaCandidatoGenerico } from "../components/ModalBoletaCandidatoGenerico";
import { AgrupaAsociacion } from "../components/configuracion-boleta/AgrupaAsociacion";
import { useJornadaNoFormalStore } from "../hooks/useJornadaNoFormalStore";

import { onGetModalidades } from "../../store/module-preparacion/jornada/ThunksJornadaNoFormal";

// 8 ES DE PLANILLA, 7 COMITE Y 6 REPRESENTANTE
const validationSchema = object({
	encabezado: string("").required(
		"Por favor, ingresa el nombre del encabezado de la boleta"
		),
	modalidadVotacion: string("").required(
		"Por favor, elige una modalidad de votación"),
	entidadFederativa: string("").required(
		"Por favor, ingresa el nombre de la entidad federativa"
		),
	municipio: string("").required(
		"Por favor, ingresa el nombre del municipio"
		),
	primerFirmante: string("").required(
		"Por favor, ingresa el nombre del primer firmante"
		),
	cargoPrimerFirmante: string("").required(
		"Por favor, ingresa el cargo del primer firmante"
		),
	segundoFirmante: string("").required(
		"Por favor, ingresa el nombre del segundo firmante"
		),
	cargoSegundoFirmante: string("").required(
		"Por favor, ingresa el cargo del segundo firmante"
		),
});





export const AddBoletaJornadaGenerica = () => {
	const [modalidades, setModalidades] = useState([]);
	const dispatch = useDispatch();
  
	useEffect(() => {
	  const getData = async () => {
		const data = await dispatch(onGetModalidades());
		setModalidades(data);
	  };
	  getData();
	}, [dispatch]);

	// console.log("modalidades", modalidades);
	// console.log("modalidades", modalidades.modalidad);

	// const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	
	const { 
		status,
		candidatos,
		asociaciones,
        candidatosSelected,
		jornadaNoFormalSelected,
		setCandidatosSelectedNull,
		setAsociacionesSelectedNull,
	} = useJornadaNoFormalStore();

	const datos = Object.values(jornadaNoFormalSelected.boletaNoFormalSelected).length === 0 
	? {
		encabezado: "",	//Text
		modalidadVotacion: "",//Text
		entidadFederativa: "",//Text
		municipio: "",//Text
		primerFirmante: "",//Text
		cargoPrimerFirmante: "",//Text
		segundoFirmante: "",//Text
		cargoSegundoFirmante: "",//Text
	}:{
		encabezado: jornadaNoFormalSelected.boletaNoFormalSelected.encabezado,	//Text
		modalidadVotacion: jornadaNoFormalSelected.boletaNoFormalSelected.modalidadVotacion,//Text
		entidadFederativa: jornadaNoFormalSelected.boletaNoFormalSelected.entidadFederativa,//Text
		municipio: jornadaNoFormalSelected.boletaNoFormalSelected.municipio,//Text
		primerFirmante: jornadaNoFormalSelected.boletaNoFormalSelected.primerFirmante,//Text
		cargoPrimerFirmante: jornadaNoFormalSelected.boletaNoFormalSelected.cargoPrimerFirmante,//Text
		segundoFirmante: jornadaNoFormalSelected.boletaNoFormalSelected.segundoFirmante,//Text
		cargoSegundoFirmante: jornadaNoFormalSelected.boletaNoFormalSelected.cargoSegundoFirmante,//Text
	}

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

	const [, forceUpdate] = React.useState();
	const [statusDeleteCandidatoModal, setStatusDeleteCandidatoModal] = useState(false);
	const handleCloseDeleteCandidatoModal = () => setStatusDeleteCandidatoModal(false);
	const [statusDeleteAsociacionModal, setStatusDeleteAsociacionModal] = useState(false);
	const handleCloseDeleteAsociacionModal = () => setStatusDeleteAsociacionModal(false);

	const [statusRegisterModal, setStatusRegisterModal] = useState(false);
	const [statusRegisterAsociacionModal, setStatusRegisterAsociacionModal ] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const handleCloseRegisterModal = () => setStatusRegisterModal(false);
	const handleCloseRegisterAsociacionModal = () => setStatusRegisterAsociacionModal(false);

	const handleOpenRegisterModal = () => {
	    // toastOffOperation();
		setStatusRegisterModal(true);
	};
	const handleOpenRegisterAsociacionModal = () => {
		// toastOffOperation();
		setStatusRegisterAsociacionModal(true);
	};
	const handleOpenDeleteCandidatoModal = () => {
		// toastOffOperation();
		setStatusDeleteCandidatoModal(true);
	};
	const handleDeleteAsociacionModal = () => {
		// toastOffOperation();
		setStatusDeleteAsociacionModal(false);
	};
	const onCancel = () => {
		navigate("/preparacion/jornada/noFormal/"+params.id);
		setCandidatosSelectedNull();
		setAsociacionesSelectedNull();
	};

	// const onSubmit = (values) => {
	// 	if(Object.values(jornadaNoFormalSelected.boletaNoFormalSelected).length === 0){
	// 		if(candidatos.length > 0)
	// 			dispatch(
	// 				onCreateBoletaAsociaciones( values, params.id, candidatos, asociaciones, ()=>{
	// 					navigate("/preparacion/jornada/noFormal/"+params.id);
	// 				})
	// 			) 
	// 	}else{
	// 		dispatch(
	// 			onUpdateBoletaData( 
	// 				values, 
	// 				params.id, 
	// 				candidatos, 
	// 				asociaciones, 
	// 				params.idBoleta,
	// 				()=>{
	// 					navigate("/preparacion/jornada/noFormal/"+params.id);
	// 				}
	// 			)
	// 		);
	// 	}
	// };
	const [showModal, setShowModal] = useState(false);
	const [estructuraBoletaId, setEstructuraBoletaId] = useState(null);
	const onSubmit = (values) => {
		console.log("valuesssssssssssssssssss",values);
		if (Object.values(jornadaNoFormalSelected.boletaNoFormalSelected).length === 0) {
			if (candidatos.length > 0 && asociaciones.length > 0 && values.modalidadVotacion === 8) {

				dispatch(onCreateBoletaAsociaciones(values, params.id, candidatos, asociaciones, (idEstructuraBoleta) => {
				//   navigate("/preparacion/jornada/noFormal/" + params.id);
				setEstructuraBoletaId(idEstructuraBoleta);
				}));
				if (estructuraBoletaId >= 0) 
				{			
					setTimeout(() => {
					 setShowModal(true);
					}, 1000);
				}
			  } else {

				dispatch(onCreateBoleta(values, params.id, candidatos, (idEstructuraBoleta) => {
				//   navigate("/preparacion/jornada/noFormal/" + params.id);
				setEstructuraBoletaId(idEstructuraBoleta);
				}));
				if (estructuraBoletaId >= 0) 
				{			
					setTimeout(() => {
					 setShowModal(true);
					}, 1000);
				}
			  }			  
		  setCandidatosSelectedNull();
		  setAsociacionesSelectedNull();
		} else {
		  if (values.modalidadVotacion === 8) { // Seleccionaron planilla
			dispatch(onUpdateBoletaDataAsociacion(values, params.id, candidatos, asociaciones, params.idBoleta, () => {
			  navigate("/preparacion/jornada/noFormal/" + params.id);
			}
			));
		  } else { // Otras opciones distintas de planilla
			console.log("params.idBoleta", params.idBoleta);
			dispatch(onUpdateBoletaData(
			  values,
			  params.id,
			  candidatos,
			//   asociaciones,
			  params.idBoleta,
			  () => {
				navigate("/preparacion/jornada/noFormal/" + params.id);
			  }
			));
		  }
		  setCandidatosSelectedNull();
		  setAsociacionesSelectedNull();
		}
	  };
	  

	const handleTerminar = () => {
	  navigate("/preparacion/jornada/noFormal/"+params.id);
	};
	const handleConfigurar = () => {
		// navigate("/preparacion/jornadaNoFormal/configboleta/" + estructuraBoletaId);
		// navigate("/preparacion/jornadaNoFormal/configboleta/" + estructuraBoletaId);

		navigate("/preparacion/jornadaNoFormal/configboleta/" + params.id + "/" + estructuraBoletaId);
	};
	// INICIO DEL RETURN

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
		initialValues={datos}
		validationSchema={validationSchema}
		onSubmit={(values) => {
			onSubmit(values);
		  }}
	>
		{( {values, errors, touched, handleSubmit, handleChange, handleBlur, setValues} ) => (
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
						PASO 3.- REGISTRO DE BOLETA PARA UNA ELECCIÓN POPULAR
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
							name="encabezado"
							label="ENCABEZADO DE LA BOLETA"
							value={values.encabezado}
							handleChange={handleChange}
							error={errors.encabezado}
							touched={touched.encabezado}
						/>
							{/* {touched.encabezado && errors.encabezado && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.encabezado}</Typography>} */}
						</Grid>

						<Grid item xs={12}>
							<TextField
								id="filled-select-currency"
								name="modalidadVotacion"
								size="small"
								select
								disabled={status === "checking"}
								label="MODALIDAD DE VOTACIÓN"
								defaultValue="REPRESENTANTE"
								variant="filled"
								// touched={touched.modalidadVotacion}
								error={touched && touched.modalidadVotacion && Boolean(errors.modalidadVotacion)}
								helperText={touched && touched.modalidadVotacion && errors.modalidadVotacion}
								sx={{ width: {
									xs: "100%",
									sm: "100%",
									md: "50%",
									lg: "50%",
									xl: "50%",
								} }}
								// value={values.modalidadVotacion}
								value={values.modalidadVotacion}
									// CORREGIR ESTA PARTE
								onChange={(event) => {
									setValues({
									...values,
									modalidadVotacion: event.target.value
									});
								}}
								>
								{modalidades.map((option) => (
								<MenuItem key={option.idModalidadVotacion} value={option.idModalidadVotacion}>
									{option.modalidad}
								</MenuItem>
								))}
							</TextField>
							<Tooltip title="Las modalidades disponibles son tres, de las cuales, en caso de elegir planilla debe recordar que es importante tener cuidado con los candidatos que pertenecen a las mismas asociaciones." 
							placement="right">
								<IconButton>
									<HelpOutlineIcon fontSize="large"/>
								</IconButton>
								</Tooltip>

						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" color="initial">
							PASO 3.2.- DATOS GEOELECTORALES
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<FielTextCustomJornadas
							disabled={status === "checking"}
								label="ENTIDAD FEDERATIVA"
								name="entidadFederativa"
								value={values.entidadFederativa}
								handleChange={handleChange}
								error={errors.entidadFederativa}
								touched={touched.entidadFederativa}
							/>
							{/* {touched.entidadFederativa && errors.entidadFederativa && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.entidadFederativa}</Typography>} */}
						</Grid>
						<Grid item xs={12}>
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
						<AddCandidatoGenericoMod
							handleOpenModal={handleOpenRegisterModal}
							handleOpenDeleteCandidatoModal={handleOpenDeleteCandidatoModal}
							status={status}
						/> 
						{values.modalidadVotacion === 8 && 
						<>
						<Box
							pl={3}
							width="100%"
							mt={5}
						>
							<Grid item xs={12} md={6} lg={4}>
							<Tooltip title="Registrar una nueva asociación">
								<Button
									
									// onClick={abrirCerrarModalAsociacion}
									onClick={handleOpenRegisterAsociacionModal}
									variant="contained"
									size="large"
									disabled={status === "checking" || candidatos.length === 0 ? true : false}
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
									PASO 3.5.- AGREGAR ASOCIACIÓN
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
								mb: 2,
							  }}
							>
							</Box>
							
							  <AgrupaAsociacion info={{ asociaciones: asociaciones }} handleOpenModal={handleOpenRegisterAsociacionModal}></AgrupaAsociacion>
							
							</Box>

						  </>
						}
					</Grid>
					<Grid mt={"1rem"} container direction="row" justifyContent="flex-end" spacing={2}>
						<Grid item xs={12} md={6} lg={3}>
							<Button
								type="submit"
								variant="contained"
								size="large"
								// disabled={status === "checking"}
								disabled={candidatos.length === 0  || status === "checking"}

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

			{/* MODAL PARA REGISTRAR A LOS CANDIDATOS */}
			<ModalBoletaCandidatoGenerico statusRegisterModal={statusRegisterModal} handleCloseRegisterModal={handleCloseRegisterModal} />
			<ModalAsociacionGenerico statusRegisterAsociacionModal={statusRegisterAsociacionModal} handleCloseRegisterAsociacionModal={handleCloseRegisterAsociacionModal} />
			{/* MODAL PARA CONFIRMAR LA ELIMINACIÓN */}
			{/* <ModalEliminarCandidato statusDeleteCandidatoModal={statusDeleteCandidatoModal} handleToggleModal={handleCloseDeleteCandidatoModal} /> */}
			{/* <ModalEliminarCandidato statusDeleteAsociacionModal={statusDeleteAsociacionModal} handleToggleModal={handleCloseDeleteCandidatoModal} /> */}
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
				¿Deseas configurar la boleta o prefieres terminar y salir?
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
								disabled={status === "checking"}
								variant="contained"
								size="large"
								endIcon={<SettingsIcon />}
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
								Configurar boleta
							</Button>


							<Button
								onClick={handleTerminar}
								disabled={status === "checking"}
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
								Terminar y configurar después
							</Button>

					</Grid>
			</div>
		)}
		</div>
	</>
		  
	);
};
