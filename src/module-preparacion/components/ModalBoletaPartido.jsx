import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	Box,
	Button,
	Checkbox,
	Grid,
	Modal, Stack, TextField,
	Typography
} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import { Formik } from 'formik';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { object } from "yup";
import { useUiStore } from "../../hooks/useUiStore";
import { useJornadaStore } from "../hooks/useJornadaStore";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xl: "50rem", lg: "50rem", sm: "40rem", xs: "30rem" },
	// height: { xl: "30rem", lg: "30rem", md:"28rem",  sm: "35rem", xs: "40rem" },
	bgcolor: "background.paper",
	border: '2px solid #fff',
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
};

//Validaciones

const validationSchema = object({
	// nameParty: string("").required(
	// 	"Por favor, ingresa el nombre del partido"
	// 	).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	// siglasParty: string("").required(
	// 	"Por favor, ingresa las siglasParty del partido"
	// 	).matches(/^[0-9a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras, números y espacios"),

});
export const ModalBoletaPartido = ({ statusMatchModal, handleToggleModal }) => {
	const { toastSuccesOperation } = useUiStore();
	const dispatch = useDispatch();
	const params = useParams();
	const { 
		status, 
		partidos, 
		partidoSelected, 
		candidatoandSuplentes,
		candidatoandSuplenteSelected,
		addPartido, 
		setPartidoSelectedNull, 
		updateCandidatoAndSuplente,
		updatePartido,
		candidatosAMostrar,
	} = useJornadaStore();

	const onSubmit = (values) => {
		setfotografiaPartido({ name: "Sin Archivo seleccionado" });
		console.log("valuessssssss", values);
		if (Object.values(partidoSelected).length === 0) {
		addPartido(
			partidos.length,
			values.clavePartido,
			values.nameParty,
			values.siglasParty,
			values.emblemParty,
			values.fotografiaParty,
			values.statusParty,
			values.candidatosPartido,
		);
		toastSuccesOperation("Datos registrados con éxito");
		} else {
		updatePartido(
			partidoSelected.id,
			values.clavePartido,
			values.nameParty,
			values.siglasParty,
			values.emblemParty,
			values.fotografiaParty,
			values.statusParty,
			values.candidatosPartido,
		);
		toastSuccesOperation("Datos actualizados con éxito");
		}
		setPartidoSelectedNull();
		// setCandidatosPartido({});
		handleToggleModal();
	};

	const onCancel = () => {
		// setCandidatosPartido({});
		setPartidoSelectedNull();
		handleToggleModal();
	};

	//Validacion del formato imagen 
	const [fotografiaParty, setfotografiaPartido] = useState({
	  name: "Sin Archivo seleccionado",
	});
	 
   const validando = (values, props) => {
	   const errors = {};

	   if (fotografiaParty.name === "Sin Archivo seleccionado") {
		 errors.fotografiaParty = "Se necesita una fotografiaParty";
	   }
	   return errors;
	 };


	 const [switchValue, setSwitchValue] = useState(false);
	 const handleChangeSwitch = (event) => {
		setSwitchValue(event.target.checked);
	  };

	return (

		<>
		<Modal
			open={statusMatchModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
	<Formik
		initialValues={ 
			Object.values(partidoSelected).length === 0 ?
				{
				nameParty: "",	//Text
				siglasParty: "",//Text
				emblemParty: "",
				fotografiaParty: "",
				clavePartido: "",
				statusParty: switchValue,
				candidatosPartido: [],
			} : {
				nameParty: partidoSelected.nameParty,
				siglasParty: partidoSelected.siglasParty,
				emblemParty: partidoSelected.emblemParty,
				fotografiaParty: partidoSelected.fotografiaParty,
				clavePartido: partidoSelected.clavePartido,
				statusParty: partidoSelected.statusParty,
				candidatosPartido: partidoSelected.candidatosPartido,
			}
		}
		validate = {validando}
		validationSchema={validationSchema}
		onSubmit={(values, {resetForm}) => {
			onSubmit({ ...values, statusParty: switchValue });
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

				const [candidatosDisponibles, setCandidatosDisponibles] = useState(candidatoandSuplentes);

				useEffect(() => {
					setCandidatosDisponibles(
						candidatoandSuplentes.filter(candidato => !values.candidatosPartido.includes(candidato.id))
					);
				}, [values.candidatosPartido]);
					
				const candidatosNoAsociados = [];

				candidatosDisponibles.map(candidato => {
					let candidatoEncontrado = false;
					
					partidos.map(partido => {
					partido.candidatosPartido.map(candidatoPartido => {
						if (candidato.id === candidatoPartido.id) {
						candidatoEncontrado = true;
						}
					});
					});
				
					if (!candidatoEncontrado) {
					candidatosNoAsociados.push(candidato);
					}
				});
				
			return (

			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
					REGISTRO DE PARTIDO
				</Typography>

				<Box ml={"2rem"} mr={"2rem"}
					sx={{
						width: { xl: "90%", lg: "90%", sm: "90%", xs: "90%" },
						padding: "1rem",
						height: "100%",
						overflowY: "auto",
					}}>
					<form  onSubmit={handleSubmit} >
					<Typography variant= {{ xl: "2rem", lg: "1.5rem", sm: "1rem", xs: "0.8rem" }}>
						CLAVE PARTIDO <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label=""
						name="clavePartido"
						value={values.clavePartido}
						error = {touched.clavePartido && errors.clavePartido}
						helperText={touched.clavePartido && errors.clavePartido}
						onChange={handleChange}
						// onBlur={handleBlur}
					/>
					<Typography variant= {{ xl: "2rem", lg: "1.5rem", sm: "1rem", xs: "0.8rem" }}>
						NOMBRE DEL PARTIDO <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label=""
						name="nameParty"
						value={values.nameParty}
						error = {touched.nameParty && errors.nameParty}
						helperText={touched.nameParty && errors.nameParty}
						onChange={handleChange}
						// onBlur={handleBlur}
					/>				
					<Typography variant="h7" mt={"1rem"}>
						SIGLAS DEL PARTIDO <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label=""
						name="siglasParty"
						value={values.siglasParty}
						error = {touched.siglasParty && errors.siglasParty}
						helperText={touched.siglasParty && errors.siglasParty}
						onChange={handleChange}
						// onBlur={handleBlur}
					/>
					<Typography variant="h7" mt={"1rem"}>
					EMBLEMA DEL PARTIDO <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label=""
						name="emblemParty"
						value={values.emblemParty}
						error = {touched.emblemParty && errors.emblemParty}
						helperText={touched.emblemParty && errors.emblemParty}
						onChange={handleChange}
						// onBlur={handleBlur}
					/>
					<Typography variant="h7" mt={"1rem"}>
						INSERTAR FOTOGRAFÍA DEL PARTIDO <span style={{ color: "red" }}>*</span>
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
						value={fotografiaParty.name}
						disabled
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
								onChange={(e) => setfotografiaPartido(e.target.files[0])}
								accept="image/png,image/jpg"
								type="file"
							/>
							<PhotoCamera fontSize="" />
						</IconButton>
					</Box>
					{touched.fotografiaParty &&
						fotografiaParty.name === "Sin Archivo seleccionado" && (
							<Box ml={2} 
							sx={{
							fontSize: "12px",
								color: "#791010" }}
							>
							{errors.fotografiaParty}
						  </Box>
						)}
					<Typography variant="h7" mt={"1rem"}>
						¿EL PARTIDO ESTÁ VIGENTE? <span style={{ color: "red" }}>*</span>
					</Typography>
					<Stack direction="row" spacing={1} alignItems="center"> 
						<Typography>No</Typography>
						<FormControlLabel
							control={
								<Switch 
									name={"statusParty"}
									checked={switchValue}
									onChange={handleChangeSwitch}
									defaultChecked 
								/>}
							/>
						<Typography>Sí</Typography>
					</Stack>

					{/* AQUI VA LO DE CANDIDATOS */}
					<Box
						id="candidato"
						name="candidato"
						sx={{
							boxShadow: 1,
							width: "100%",
							height: { xl: "400px", lg: "350px" },
							marginTop: 5,
							padding: 3,
							border: "1px solid rgba(0, 0, 0, 0.4)",
							borderRadius: "15px",
						}}
						>

						<Typography sx={{ fontWeight: "bold" }}>
						SELECCIONE LOS CANDIDATOS CORRESPONDIENTES A ESTE PARTIDO
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

								{candidatosNoAsociados.map(candidato => (
								<Box
									sx={{
									boxShadow: values.candidatosPartido.findIndex(c => c.id === candidato.id) !== -1 ? 3 : 0,
									display: "flex",
									justifyContent: "space-around",
									alignItems: "center",
									width: "300px",
									height: "80px",
									m: 1,
									border: "1px solid rgba(0,0,0,0.2)",
									borderRadius: "8px",
									background: values.candidatosPartido.findIndex(c => c.id === candidato.id) !== -1 ? "#E7C0F9" : "#FFF",
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
									></Box>
									<Box sx={{ p: 2 }}>
									<Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
										{candidato.nombreCandidato}
									</Typography>
									</Box>
									<FormControlLabel
									control={
										<Checkbox
										checked={values.candidatosPartido.findIndex(c => c.id === candidato.id) !== -1}
										onChange={() => {
											if (values.candidatosPartido.findIndex(c => c.id === candidato.id) !== -1) {
											  setFieldValue("candidatosPartido", values.candidatosPartido.filter(c => c.id !== candidato.id));
											} else {
											  if (values.candidatosPartido.length === 0) {
												setFieldValue("candidatosPartido", [...values.candidatosPartido, candidato]);
											  }
											}
										  }}
										// }}
										// onChange={() => {
										// 	if (values.candidatosPartido.findIndex(c => c.id === candidato.id) !== -1) {
										// 	setFieldValue(
										// 		"candidatosPartido",
										// 		values.candidatosPartido.filter(c => c.id !== candidato.id)
										// 	);
										// 	} else {
										// 	setFieldValue(
										// 		"candidatosPartido",
										// 		[...values.candidatosPartido, candidato]
										// 	);
										// 	}
										// }}
										/>
									}
									/>
								</Box>
								))}
							</Box>
							{touched.candidatos && candidatosS.length === 0 && (
							<ErrorField>{errors.candidatos}</ErrorField>
							)}
						</Box>
						<br />
					{/* AQUI TERMINA LO DE CANDIDATOS */}
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
				</form>
			</Box>
		</Box>
	
	
	)}}
	</Formik>
	</Modal>
	</>
	);
};
