import { Box, Divider, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUiStore } from "../../hooks/useUiStore";
import {
	onCreatePapeleta,
	onGetBallotData,
	onUpdateBallotData,
	saveConsultaPrueba,
} from "../../store/module-preparacion/consulta-ciudadana/thunks";
import { ModalPapeleta } from "../components/ModalPapeleta";
import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";
import { object, string } from "yup";
import { FielTextCustom } from "../components/FielTextCustom";
import { AddPapeletasTable } from "../components/AddPapeletasTable";
import { ButtonsContainer } from "../components/ButtonsContainer";
import { useNavigate, useParams } from "react-router-dom";
import { getBallotData } from "../../providers/Micro-Consultas/provider";

const validationSchema = object({
	encabezadoConsulta: string("Ingresa el encabezado de la consulta").required(
		"Este campo es requerido"
	),
	asunto: string("Ingresa el asunto").required("Este campo es requerido"),
	// entidadFedereativa: string("Ingresa la entidad federativa").required("Este campo es requerido"),
	// distritoElectoral: string("Ingresa el distrito electoral").required("Este campo es requerido"),
	nombrePrimerFirmante: string("Ingresa el nombre del primer firmante").required(
		"Este campo es requerido"
	),
	cargoPrimerFirmante: string("Ingresa el cargo del primer firmante").required(
		"Este campo es requerido"
	),
	nombreSegundoFirmante: string("Ingresa el nombre del segundo firmante").required(
		"Este campo es requerido"
	),
	cargoSegundoFirmante: string("Ingresa el cargo del segundo firmante").required(
		"Este campo es requerido"
	),
});

export const AddPapeleta = () => {
	const [statusModal, setStatusModal] = useState(false);
	const [isSubmited, setIsSubmited] = useState(false);
	const { toastOffOperation } = useUiStore();
	const { status, questions, consultaSelected } = useConsultaCiudadanaStore();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();

	const values =
		Object.values(consultaSelected.ballotSelected).length === 0
			? {
					encabezadoConsulta: "",
					asunto: "",
					// entidadFedereativa: "",
					// distritoElectoral: "",
					nombrePrimerFirmante: "",
					cargoPrimerFirmante: "",
					nombreSegundoFirmante: "",
					cargoSegundoFirmante: "",
			  }
			: {
					encabezadoConsulta: consultaSelected.ballotSelected.encabezadoConsulta,
					asunto: "",
					// entidadFedereativa: "",
					// distritoElectoral: "",
					nombrePrimerFirmante: "",
					cargoPrimerFirmante: "",
					nombreSegundoFirmante: "",
					cargoSegundoFirmante: "",
			  };

	const onCancel = () => {
		navigate("/preparacion/consulta/" + params.id);
	};

	const handleCloseModal = () => setStatusModal(false);

	const handleOpenModal = () => {
		toastOffOperation();
		setStatusModal(true);
	};

	const onSubmit = (values) => {
		setIsSubmited(true);
		if (Object.values(consultaSelected.ballotSelected).length === 0) {
			if (questions.length > 0)
				dispatch(
					onCreatePapeleta(values.encabezadoConsulta, () => {
						navigate("/preparacion/consulta/" + params.id);
					})
				);
		} else {
			dispatch(
				onUpdateBallotData(values.id, () => {
					navigate("/preparacion/consulta/" + params.id);
				})
			);
			// updateBallot(values.encabezadoConsulta);
			// setBallotSelectedNull();
			// navigate("/preparacion/consulta/" + params.id);
		}
	};

	return (
		<Box
			sx={{
				height: "100%",
				overflowY: "auto",
			}}
		>
			<Box sx={{ m: "0.5rem", ml: "2rem" }}>
				<Typography variant="h6" align="left" color="initial">
					REGISTRO DE PAPELETA
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
				<Formik
					initialValues={values}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						onSubmit(values);
					}}
				>
					{({ values, handleSubmit, handleChange, errors, touched }) => (
						<form onSubmit={handleSubmit}>
							<Grid
								container
								sx={{
									height: "100%",
									display: "flex",
								}}
								spacing={3}
							>
								{/* {console.log("ME RENDERIZO PADRE")} */}
								<Grid item xs={12} mt="0.5rem">
									<Typography variant="h6" color="initial">
										DATOS GENERALES
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<FielTextCustom
										name="encabezadoConsulta"
										label="ENCABEZADO DE LA PAPELETA"
										value={values.encabezadoConsulta}
										handleChange={handleChange}
										error={errors.encabezadoConsulta}
										touched={touched.encabezadoConsulta}
									/>
								</Grid>

								<Grid item xs={12}>
									<FielTextCustom
										name="asunto"
										label="ASUNTO"
										value={values.asunto}
										handleChange={handleChange}
										error={errors.asunto}
										touched={touched.asunto}
									/>
								</Grid>
								{/* <Grid item xs={12}>
									<Typography variant="h6" color="initial">
										DATOS GEOELECTORALES
									</Typography>
								</Grid>
								<Grid item xs={12} md={12} lg={8}>
									<FielTextCustom
										name="entidadFedereativa"
										label="ENTIDAD FEDERATIVA"
										value={values.entidadFederativa}
										handleChange={handleChange}
										error={errors.entidadFedereativa}
										touched={touched.entidadFedereativa}
									/>
								</Grid>
								<Grid item xs={12} md={12} lg={4}>
									<FielTextCustom
										name="distritoElectoral"
										label="DISTRITO ELECTORAL"
										value={values.distritoElectoral}
										handleChange={handleChange}
										error={errors.distritoElectoral}
										touched={touched.distritoElectoral}
									/>
								</Grid> */}
								<Grid item xs={12}>
									<Typography variant="h6" color="initial">
										FIRMANTES
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<FielTextCustom
										name="nombrePrimerFirmante"
										label="NOMBRE DEL PRIMER FIRMANTE"
										value={values.nombrePrimerFirmante}
										handleChange={handleChange}
										error={errors.nombrePrimerFirmante}
										touched={touched.nombrePrimerFirmante}
									/>
								</Grid>
								<Grid item xs={12}>
									<FielTextCustom
										name="cargoPrimerFirmante"
										label="CARGO DEL PRIMER FIRMANTE"
										value={values.cargoPrimerFirmante}
										handleChange={handleChange}
										error={errors.cargoPrimerFirmante}
										touched={touched.cargoPrimerFirmante}
									/>
								</Grid>
								<Grid item xs={12}>
									<FielTextCustom
										name="nombreSegundoFirmante"
										label="NOMBRE DEL SEGUNDO FIRMANTE"
										value={values.nombreSegundoFirmante}
										handleChange={handleChange}
										error={errors.nombreSegundoFirmante}
										touched={touched.nombreSegundoFirmante}
									/>
								</Grid>
								<Grid item xs={12}>
									<FielTextCustom
										name="cargoSegundoFirmante"
										label="CARGO DEL SEGUNDO FIRMANTE"
										value={values.cargoSegundoFirmante}
										handleChange={handleChange}
										error={errors.cargoSegundoFirmante}
										touched={touched.cargoSegundoFirmante}
									/>
								</Grid>

								<AddPapeletasTable
									handleOpenModal={handleOpenModal}
									status={status}
								/>
							</Grid>
							<ButtonsContainer status={status} onCancel={onCancel} />
							{isSubmited && questions.length === 0 ? (
								<Typography variant="subtitle1" color="red" textAlign={"right"}>
									No se ha agregado ninguna pregunta
								</Typography>
							) : (
								""
							)}
						</form>
					)}
				</Formik>
			</Box>
			<ModalPapeleta statusModal={statusModal} handleToggleModal={handleCloseModal} />
		</Box>
	);
};
