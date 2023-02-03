import { Box, Button, Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FielTextCustom } from "../components/FielTextCustom";

// import { ModalEliminarPC } from "../components/ModalEliminarPC";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import { object } from "yup";
import { onCreateBoleta } from "../../store/module-preparacion/jornada/ThunksJornadaNoFormal";
import { AddAsociacionMod } from "../components/AddAsociacionMod";
import { AddCandidatoGenericoMod } from "../components/AddCandidatoGenericoMod";
import { ModalAsociacionGenerico } from "../components/ModalAsociacionGenerico";
import { ModalBoletaCandidatoGenerico } from "../components/ModalBoletaCandidatoGenerico";
import { useJornadaNoFormalStore } from "../hooks/useJornadaNoFormalStore";

const modalidadNoFormal = [ {
    value: '1',
    label: 'REPRESENTANTE',
  },
  {
    value: '2',
    label: 'COMITÉ',
  },
  {
    value: '3',
    label: 'PLANILLA',
  },
];
const validationSchema = object({
	// encabezado: string("").required(
	// 	"Por favor, ingresa un encabezado"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// modalidadVotacion: string("").required(
	// 	"Por favor, elige una modalidad de votación"),
	// entidadFederativa: string("").required(
	// 	"Por favor, ingresa un municipio"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// municipio: string("").required(
	// 	"Por favor, ingresa un municipio"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// primerFirmante: string("").required(
	// 	"Por favor, ingresa el nombre del Primer Firmante"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// cargoPrimerFirmante: string("").required(
	// 	"Por favor, ingresa un segundo Firmante"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// segundoFirmante: string("").required(
	// 	"Por favor, ingresa el nombre de Segundo Firmante"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// cargoSegundoFirmante: string("").required(
	// 	"Por favor, ingresa el cargo de Segundo Firmante"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
});

export const AddBoletaJornadaGenerica = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();

	const { 
		status,
		candidatos,
		asociaciones,
        candidatosSelected,
		jornadaNoFormalSelected,
	} = useJornadaNoFormalStore();

	const [datos, setDatos] = useState({
		encabezado: "",	//Text
		modalidadVotacion: "",//Text
		entidadFederativa: "",//Text
		municipio: "",//Text
		primerFirmante: "",//Text
		cargoPrimerFirmante: "",//Text
		segundoFirmante: "",//Text
		cargoSegundoFirmante: "",//Text
	});
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
	};

	  const onSubmit = (values) => {
		// navigate("/preparacion/jornada");
		dispatch(
			onCreateBoleta( values, params.id, candidatos, asociaciones, ()=>{
				navigate("/preparacion/jornada/noFormal/"+params.id);
			})
		)
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
						REGISTRO DE BOLETA NO FORMAL
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
							<TextField
								id="filled-select-currency"
								name="modalidadVotacion"
								select
								disabled={status === "checking"}
								label="MODALIDAD DE VOTACIÓN"
								defaultValue="REPRESENTANTE"
								variant="filled"
								touched={touched.modalidadVotacion}
								error={touched && touched.modalidadVotacion && Boolean(errors.modalidadVotacion)}
								helperText={touched && touched.modalidadVotacion && errors.modalidadVotacion}
								sx={{ width: {
									xs: "100%",
									sm: "100%",
									md: "50%",
									lg: "50%",
									xl: "50%",
								} }}
								value={values.modalidadVotacion}
								onChange={(event) => {
									setValues({
									...values,
									modalidadVotacion: event.target.value
									});
								}}
								>
								{modalidadNoFormal.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
								))}
							</TextField>

						</Grid>
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
						<AddCandidatoGenericoMod
							handleOpenModal={handleOpenRegisterModal}
							handleOpenDeleteCandidatoModal={handleOpenDeleteCandidatoModal}
							status={status}
						/> 
						{values.modalidadVotacion === '3' && 
						<AddAsociacionMod
							handleOpenModal={handleOpenRegisterAsociacionModal}
							handleDeleteAsociacionModal={handleDeleteAsociacionModal}
							status={status}
						/> 
							}
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
	</>
		  
	);
};
