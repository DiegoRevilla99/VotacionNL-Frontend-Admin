import {
	Box,
	Button,
	Grid,
	Modal,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Formik, Form } from 'formik';

// import { useDispatch } from "react-redux";
// import { useUiStore } from "../../hooks/useUiStore";

// import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xl: "50rem", lg: "50rem", sm: "40rem", xs: "30rem" },
	height: { xl: "39rem", lg: "38rem", sm: "41rem", xs: "42rem" },
	// height: "42.5rem",
	bgcolor: "background.paper",
	border: '2px solid #fff',
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
};


export const ModalBoletaPartido = ({ statusMatchModal, handleToggleModal }) => {

	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);


		// const [file, setFile] = useState("");
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

	return (

		<>
				<Modal
			open={statusMatchModal}
			onClose={handleToggleModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
	<Formik
		initialValues={{
			nombrePartido: "",	//Text
			nombrePropietario: "",//Text
			seudonimoCandidato: "",//Text
			nombreSuplente: "",//Text
		}}
		validate={(valores) => {
			let errores = {};

			// Validacion nombrePartido
			if(!valores.nombrePartido){
				errores.nombrePartido = 'Por favor,  ingresa un nombre del partido'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombrePartido)){
				errores.nombrePartido = 'El nombre del partido solo puede contener letras y espacios'
			}
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
					REGISTRO DE PARTIDO
				</Typography>

				<Box ml={"2rem"} mr={"2rem"}
					sx={{
						width: { xl: "90%", lg: "90%", sm: "90%", xs: "90%" },
						padding: "1rem",
						height: "100%",
						overflowY: "auto",
					}}>
						<Form className="formulario" onSubmit={handleSubmit} >
					<Typography variant= {{ xl: "2rem", lg: "1.5rem", sm: "1rem", xs: "0.8rem" }}>
						NOMBRE DEL PARTIDO <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label="Ingrese el nombre del partido"
						name="nombrePartido"
						value={values.nombrePartido}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.nombrePartido && errors.nombrePartido && <Typography className="error" ml={2} style={{ color: "red"}}>{errors.nombrePartido}</Typography>}
				
					<Typography variant="h7" mt={"1rem"}>
					INSERTAR EMBLEMA DEL PARTIDO <span style={{ color: "red" }}>*</span>
					</Typography>
						<Box
							display="flex"
							alignItems="center"
							sx={{ width: "100%" }}
							flexDirection="row"
						>
							<TextField
							label="Sin archivo seleccionado"
							disabled
							fullWidth
							variant="outlined"
							size="small"
							></TextField>
							<IconButton
							color="primary"
							aria-label="upload picture"
							component="label"
							size="large"
							>
							<input hidden accept="image/*" type="file" />
							<PhotoCamera fontSize="" />
							</IconButton>
						</Box>
					<Typography variant="h7" mt={"1rem"}>
						INSERTAR FOTOGRAFÍA DEL PROPIETARIO/A <span style={{ color: "red" }}>*</span>
					</Typography>
					<Box
						display="flex"
						alignItems="center"
						sx={{ width: "100%" }}
						flexDirection="row"
						>
						<TextField
						fullWidth
						label="Sin archivo seleccionado"
						disabled
						variant="outlined"
						size="small"
						></TextField>
						<IconButton
							color="primary"
							aria-label="upload picture"
							component="label"
							size="large"
							>
							<input hidden accept="image/*" type="file" />
							<PhotoCamera fontSize="" />
						</IconButton>
					</Box>
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
						mt={0.1}
						marginBottom={2}
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
	</Formik></Modal>
</>
	);
};
