import {
	Box,
	Button,
	Grid,
	Modal,
	TextField,
	Typography,
} from "@mui/material";

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Formik, Form } from 'formik';
import { useState } from "react";

import { ErrorField } from "../components/ErrorField";
// import { useDispatch } from "react-redux";
// import { useUiStore } from "../../hooks/useUiStore";

// import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xl: "50rem", lg: "50rem", sm: "40rem", xs: "30rem" },
	height: { xl: "34rem", lg: "34rem", sm: "37rem", xs: "40rem" },
	// height: "38rem",
	bgcolor: "background.paper",
	border: '2px solid #fff',
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
};



export const ModalBoletaCandidato = ({ statusCandidateModal, handleToggleModal }) => {
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
	// const { addQuestion } = useConsultaCiudadanaStore();

	// const { toastSuccesOperation } = useUiStore();

	const onSave = () => {
		// addQuestion("¿Pregunta 1?", ["Respuesta 1", "Respuesta 2"]);
		// toastSuccesOperation("Pregunta registrada con éxito");
		handleToggleModal();
	};

	 const onCancel = () => {
	 	handleToggleModal();
	 };

	 //Validacion del formato imagen 
	 const [emblema, setEmblema] = useState({ name: "Sin Archivo seleccionado" });
	 const [fotografia, setFotografia] = useState({
	   name: "Sin Archivo seleccionado",
	 });
	 const cerrarM = () => {
		abrirCerrarModal();
		setEmblema({ name: "Sin Archivo seleccionado" });
		setFotografia({ name: "Sin Archivo seleccionado" });
	  };
	  
	const validando = (values, props) => {
		const errors = {};
		if (emblema.name === "Sin Archivo seleccionado") {
		  errors.emblema = "Se necesita un emblema";
		}
		if (fotografia.name === "Sin Archivo seleccionado") {
		  errors.fotografia = "Se necesita una fotografia";
		}
		return errors;
	  };

	return (
		<>
		<Modal
			open={statusCandidateModal}
			onClose={handleToggleModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Formik
				initialValues={{
					nombrePropietario: "",//Text
					seudonimoCandidato: "",//Text
					nombreSuplente: "",//Text
				}}
		validate={(valores) => {
			let errores = {};
			// Validacion nombrePropietario
			if(!valores.nombrePropietario){
				errores.nombrePropietario = 'Por favor,  ingresa un nombre del propietario/a'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombrePropietario)){
				errores.nombrePropietario = 'El nombre del propietario/a solo puede contener letras y espacios'
			}
			// Validacion seudonimoCandidato
			if(!valores.seudonimoCandidato){
				errores.seudonimoCandidato = 'Por favor,  ingresa un seudónimo del candidato/a'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.seudonimoCandidato)){
				errores.seudonimoCandidato = 'La seudónimo del candidato/a solo puede contener letras y espacios'
			}
			// Validacion nombreSuplente
			if(!valores.nombreSuplente){
				errores.nombreSuplente = 'Por favor, ingresa un nombre del suplente'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombreSuplente)){
				errores.nombreSuplente = 'El nombre del suplente solo puede contener letras y espacios'
			}

			return errores;
		}}
		onSubmit={(valores, {resetForm}) => {
			resetForm();
			console.log('Formulario enviado');
			cambiarFormularioEnviado(true);
			setTimeout(() => cambiarFormularioEnviado(false), 5000);
			// handleToggleModal();
		}}
	>
		{( {values, errors, touched, handleSubmit, handleChange, handleBlur} ) => (
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
					REGISTRO DE CANDIDATO/A INDEPENDIENTE
				</Typography>
				<Box ml={"2rem"} mr={"2rem"}
				
				sx={{
					width: { xl: "90%", lg: "90%", sm: "90%", xs: "90%" },
					padding: "1rem",
					height: "100%",
					overflowY: "auto",
				}}
			>
				<Form className="formulario" onSubmit={handleSubmit} >
				<Typography variant="h7" mt={"1rem"}>
				INSERTAR EMBLEMA DEL CANDIDATO/A <span style={{ color: "red" }}>*</span>
					</Typography>
					<Box
						display="flex"
						alignItems="center"
						sx={{ width: "100%" }}
						flexDirection="row"
					>
						<TextField
						label=""
						disabled
						fullWidth
						variant="outlined"
						size="small"
						value={emblema.name}
						></TextField>
						<IconButton
						disabled={status === "checking"}
						color="primary"
						aria-label="upload picture"
						component="label"
						size="large"
						>
						<input hidden
							onChange={(e) => setEmblema(e.target.files[0])}
							onBlur={handleBlur}
							accept="image/x-png,image/jpeg"
							type="file"
							name="emblema"
							id="emblema"
						/>
						<PhotoCamera fontSize="" />
						</IconButton>
					</Box>
					{touched.emblema &&
					emblema.name === "Sin Archivo seleccionado" && (
					<ErrorField>{errors.emblema}</ErrorField>
					)}
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
						value={fotografia.name}
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
					{touched.fotografia &&
						fotografia.name === "Sin Archivo seleccionado" && (
						<ErrorField>{errors.fotografia}</ErrorField>
						)}
				<Typography variant="h7" mt={"1rem"}>
				NOMBRE DEL PROPIETARIO/A <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label="Ingrese el nombre del propietario/a"
						name="nombrePropietario"
						value={values.nombrePropietario}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.nombrePropietario && errors.nombrePropietario && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.nombrePropietario}</Typography>}
				<Typography variant="h7" mt={"1rem"}>
				SEUDÓNIMO DEL CANDIDATO/A <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label="Ingrese el seudónimo del candidato/a"
						name="seudonimoCandidato"
						value={values.seudonimoCandidato}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.seudonimoCandidato && errors.seudonimoCandidato && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.seudonimoCandidato}</Typography>}
				<Typography variant="h7" mt={"1rem"}>
				NOMBRE DEL SUPLENTE <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label="Ingrese el nombre del suplente"
						name="nombreSuplente"
						value={values.nombreSuplente}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.nombreSuplente && errors.nombreSuplente && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.nombreSuplente}</Typography>}
					<Grid
						container
						direction="row"
						justifyContent="flex-end"
						alignItems="center"
						spacing={2}
						mt={2}
						mb={2}
					>
						<Grid item xs={12} md={6} lg={3} >
							<Button
								// onClick={onSave}
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
				{formularioEnviado && <p className="exito" align="center">Formulario enviado con exito!</p>}
					</Form>
				</Box>
			</Box>
		)}
			</Formik>
		</Modal>
	</>
	);
};
