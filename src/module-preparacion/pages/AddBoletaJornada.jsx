import { Box, Divider, Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUiStore } from "../../hooks/useUiStore";
import { getBoletaByIdApi } from "../helpers/ApiJornada";
import { FielTextCustom } from "../components/FielTextCustom";
import { DataGridTable } from "../../ui/components/DataGridTable";
import { ModalBoletaPartido } from "../components/ModalBoletaPartido";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from 'formik';
import { object, string, number } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { ModalAsociacionCP } from "../components/ModalAsociacionCP";
import { ModalRegisterCS } from "../components/ModalRegisterCS";
import { DataGridTableJornada } from "../../ui/components/DataGridTableJornada";
import { DataGridTablePartido } from "../../ui/components/DataGridTablePartido";
import { AddPartidosMod } from "../components/AddPartidosMod";

import { useJornadaStore } from "../hooks/useJornadaStore";
import { onCreateBoleta, onUpdateBoletaData } from "../../store/module-preparacion/jornada/ThunksJornada";
import { onUpdateBoleta } from "../../store/module-preparacion/jornada/SliceJornada";
import { AddCandidatoMod } from "../components/AddCandidatoMod";
import { ModalEliminarPartido } from "../components/ModalEliminarPartido";
import { ModalEliminarCandidato } from "../components/ModalEliminarCandidato";


const validationSchema = object({
	encabezado: string("").required(
		"Por favor, ingresa un encabezado"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	nombreCandidatura: string("").required(
		"Por favor, ingresa un nombre de Candidatura"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// modalidadVotacion: string(""),
	entidadFederativa: string("").required(
		"Por favor, ingresa una entidad Federativa"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	municipio: string("").required(
		"Por favor, ingresa un municipio"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	distritoElectoralLocal: number("").required(
		"Por favor, ingresa un distrito Electoral Local"
		).max("26").positive("Solo números positivos, por favor.").integer(""),
	distritoElectoral: number("").required(
		"Por favor, ingresa un distrito Electoral"
		).max("3000").positive("Solo números positivos, por favor.").integer(""),
	tipoCasilla: string("").required(
		"Por favor, ingresa un tipo de Casilla"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	primerFirmante: string("").required(
		"Por favor, ingresa el nombre del Primer Firmante"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	cargoPrimerFirmante: string("").required(
		"Por favor, ingresa un segundo Firmante"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	segundoFirmante: string("").required(
		"Por favor, ingresa el nombre de Segundo Firmante"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	cargoSegundoFirmante: string("").required(
		"Por favor, ingresa el cargo de Segundo Firmante"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
});

export const AddBoletaJornada = () => {

	const [isSubmited, setIsSubmited] = useState(false);
	const { toastOffOperation } = useUiStore();
	// const { status, questions, consultaSelected } = useConsultaCiudadanaStore();
	const { 
		status,
		candidatos,
        candidatosSelected,
        suplentes,
        suplentesSelected,
        partidos,
        partidoSelected,
        candidatoAndSuplente,
        candidatoandSuplenteSelected,
		
		jornadaSelected,
	} = useJornadaStore();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();

	const values = Object.values(jornadaSelected.boletaSelected).length === 0 ? {
		encabezado: "",
		nombreCandidatura: "",
		modalidadVotacion: "1",
		entidadFederativa: "",
		municipio: "",
		distritoElectoralLocal: "",
		distritoElectoral: "",
		tipoCasilla: "",
		primerFirmante: "",
		cargoPrimerFirmante: "",
		segundoFirmante: "",
		cargoSegundoFirmante: "",
	} : {
		encabezado: jornadaSelected.boletaSelected.encabezado,
		nombreCandidatura: jornadaSelected.boletaSelected.nombreCandidatura,
		modalidadVotacion: jornadaSelected.boletaSelected.modalidadVotacion,
		entidadFederativa: jornadaSelected.boletaSelected.entidadFederativa,
		municipio: jornadaSelected.boletaSelected.municipio,
		distritoElectoralLocal: jornadaSelected.boletaSelected.distritoElectoralLocal,
		distritoElectoral: jornadaSelected.boletaSelected.distritoElectoral,
		tipoCasilla: jornadaSelected.boletaSelected.tipoCasilla,
		primerFirmante: jornadaSelected.boletaSelected.primerFirmante,
		cargoPrimerFirmante: jornadaSelected.boletaSelected.cargoPrimerFirmante,
		segundoFirmante: jornadaSelected.boletaSelected.segundoFirmante,
		cargoSegundoFirmante: jornadaSelected.boletaSelected.cargoSegundoFirmante,
	
	};


	const [, forceUpdate] = React.useState();
	const [isLoading, setIsLoading] = useState(false);

	const [statusMatchModal, setStatusMatchModal] = useState(false);
	const [statusDeletePartidoModal, setStatusDeletePartidoModal] = useState(false);
	const [statusDeleteCandidatoModal, setStatusDeleteCandidatoModal] = useState(false);
	const [statusRegisterModal, setStatusRegisterModal] = useState(false);
	const [statusAsociacionModal, setStatusAsociacionModal] = useState(false);

	const handleCloseMatchModal = () => setStatusMatchModal(false);

	const handleCloseDeletePartidoModal = () => setStatusDeletePartidoModal(false);
	const handleCloseDeleteCandidatoModal = () => setStatusDeleteCandidatoModal(false);
	const handleCloseRegisterModal = () => setStatusRegisterModal(false);
	const handleCloseAsociacionModal = () => setStatusAsociacionModal(false);


	const handleOpenRegisterModal = () => {
	    // toastOffOperation();
		setStatusRegisterModal(true);
	};

	const handleOpenMatchModal = () => {
	// toastOffOperation();
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

	const handleOpenAsociacionModal = () => {
		// toastOffOperation();
		setStatusAsociacionModal(true);
	};

	const onCancel = () => {
		navigate("/preparacion/jornada/"+ params.id);
	};

	const onSubmit = (values) => {
		// dispatch(
		// 	onCreateBoleta(values, params.id, candidatoAndSuplente, partidos));
		// console.log("PARTIDOOOOOS: ", partidos);
		// console.log("CANDIDATOS: ", candidatoAndSuplente);
		console.log("VALORRRRRRRRRRRRRRRRR: ", values);
	};


	

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
						<FielTextCustom
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
							<FielTextCustom
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
						{/* <Grid item xs={12}>
							<FielTextCustom
								disabled={status === "checking"}
								label="MODALIDAD DE VOTACIÓN"
								name="modalidadVotacion"
								value={values.modalidadVotacion}
								handleChange={handleChange}
								error={errors.modalidadVotacion}
								touched={touched.modalidadVotacion}
							/>
						</Grid> */}
						<Grid item xs={12}>
							<Typography variant="h6" color="initial">
								DATOS GEOELECTORALES
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<FielTextCustom
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
							<FielTextCustom
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
						<Grid item xs={12} md={12} lg={5}>
							<FielTextCustom
							disabled={status === "checking"}
								label="DISTRITO ELECTORAL LOCAL"
								name="distritoElectoralLocal"
								value={values.distritoElectoralLocal}
								handleChange={handleChange}
								error={errors.distritoElectoralLocal}
								touched={touched.distritoElectoralLocal}
							/>
							{/* {touched.distritoElectoralLocal && errors.distritoElectoralLocal && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.distritoElectoralLocal}</Typography>} */}
						</Grid>
						<Grid item xs={12} md={12} lg={3}>
							<FielTextCustom
							disabled={status === "checking"}
								label="DISTRITO ELECTORAL"
								name="distritoElectoral"
								value={values.distritoElectoral}
								handleChange={handleChange}
								error={errors.distritoElectoral}
								touched={touched.distritoElectoral}
							/>
							{/* {touched.distritoElectoral && errors.distritoElectoral && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.distritoElectoral}</Typography>} */}
						</Grid>
						<Grid item xs={12} md={12} lg={4}>
							<FielTextCustom
							disabled={status === "checking"}
								label="TIPO DE CASILLA"
								name="tipoCasilla"
								value={values.tipoCasilla}
								handleChange={handleChange}
								error={errors.tipoCasilla}
								touched={touched.tipoCasilla}
							/>
							{/* {touched.tipoCasilla && errors.tipoCasilla && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.tipoCasilla}</Typography>} */}
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" color="initial">
								FIRMANTES
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<FielTextCustom
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
							<FielTextCustom
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
							<FielTextCustom
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
							<FielTextCustom
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
						<AddPartidosMod 
							handleOpenModal={handleOpenMatchModal}
							handleOpenDeletePartidoModal={handleOpenDeletePartidoModal}
							status={status}
						/> 
						<Grid item xs={12} md={6} lg={4}>
							<Button
								onClick={handleOpenAsociacionModal}
								variant="contained"
								size="large"
								
								disabled={status === "checking"}
								sx={{
									width: "100%",
									height: "100%",
									boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
									transition: "all 0.5s ease",
									backgroundColor: "#511079",
									fontSize: { xl: "14px", lg: "14px", sm: "15px", xs: "15px" },
									borderRadius: "25px 25px 25px 25px",
									"&:hover": {
										backgroundColor: "#7E328B !important",
										transform: "translate(-5px, -5px)",
										boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
									},
								}}
							>
								Afiliar participantes a partido
							</Button>
						</Grid>
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
			{/* ELIMINAR EL SIGUIENTE MODAL */}
            {/* <ModalBoletaCandidato statusCandidateModal={statusCandidateModal} handleToggleModal={handleCloseCandidateModal} /> */}
			{/* MODAL PARA CONFIRMAR LA ELIMINACIÓN */}
			<ModalEliminarPartido statusDeletePartidoModal={statusDeletePartidoModal} handleToggleModal={handleCloseDeletePartidoModal} />
			<ModalEliminarCandidato statusDeleteCandidatoModal={statusDeleteCandidatoModal} handleToggleModal={handleCloseDeleteCandidatoModal} />
			{/* MODAL PARA REGISTRAR A LOS CANDIDATOS Y SUPLENTES */}
			<ModalRegisterCS statusRegisterModal={statusRegisterModal} handleToggleModal={handleCloseRegisterModal} />
			{/* MODAL PARA REGISTRAR ASOCIAR CANDIDATOS Y PARTIDOS */}
			<ModalAsociacionCP statusAsociacionModal={statusAsociacionModal} handleToggleModal={handleCloseAsociacionModal} />
			{/* ELIMINAR EL SIGUIENTE MODAL */}
			{/* <ModalSustitutoBoleta statusSubstituteModal={statusSubstituteModal} handleToggleModal={handleCloseSubstituteModal} /> */}
		</form>
		</Box>
		)}
		</Formik>
		)}
	</>
		  
	);
};
