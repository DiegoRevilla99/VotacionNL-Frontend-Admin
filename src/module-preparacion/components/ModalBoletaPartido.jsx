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
import { ErrorField } from "../components/ErrorField";
import { object, string } from "yup";

import { useDispatch } from "react-redux";
import { savePartido } from "../../store/module-preparacion/jornada/jornadaThunks";
import { useAddBoletasJornada } from "../hooks/useAddBoletasJornada";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xl: "50rem", lg: "50rem", sm: "40rem", xs: "30rem" },
	height: { xl: "39rem", lg: "38rem", sm: "41rem", xs: "42rem" },
	bgcolor: "background.paper",
	border: '2px solid #fff',
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
};

//Validaciones

const validationSchema = object({
	nombrePartido: string("").required(
		"Por favor, ingresa el nombre del partido"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	nombrePropietario: string("").required(
		"Por favor, ingresa el nombre del propietario"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	seudonimoCandidato: string("").required(
		"Por favor, ingresa el seudónimo del candidato"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	nombreSuplente: string("").required(
		"Por favor, ingresa el nombre del suplente"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
});
export const ModalBoletaPartido = ({ statusMatchModal, handleToggleModal }) => {

	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
	// const { status } = useAddBoletasJornada();
	const dispatch = useDispatch();

	const onSave = () => {
		setEmblema({ name: "Sin Archivo seleccionado" });
		setFotografia({ name: "Sin Archivo seleccionado" });
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
			open={statusMatchModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
	<Formik
		initialValues={{
			nombrePartido: "",	//Text
			nombrePropietario: "",//Text
			seudonimoCandidato: "",//Text
			nombreSuplente: "",//Text
			emblema: "",
			fotografia: "",
		}}
		validate = {validando}
		validationSchema={validationSchema}
		onSubmit={(values, {resetForm}) => {
			dispatch(savePartido(values, onSave));
			resetForm();
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
					<Form  onSubmit={handleSubmit} >
					<Typography variant= {{ xl: "2rem", lg: "1.5rem", sm: "1rem", xs: "0.8rem" }}>
						NOMBRE DEL PARTIDO <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label=""
						name="nombrePartido"
						value={values.nombrePartido}
						error = {touched.nombrePartido && errors.nombrePartido}
						helperText={touched.nombrePartido && errors.nombrePartido}
						onChange={handleChange}
						onBlur={handleBlur}
					/>				
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
						label=""
						value={fotografia.name}
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
						label=""
						name="nombrePropietario"
						value={values.nombrePropietario}
						error = {touched.nombrePropietario && errors.nombrePropietario}
						helperText={touched.nombrePropietario && errors.nombrePropietario}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<Typography variant="h7" mt={"1rem"}>
						SEUDÓNIMO DEL CANDIDATO/A <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label=""
						name="seudonimoCandidato"
						value={values.seudonimoCandidato}
						error = {touched.seudonimoCandidato && errors.seudonimoCandidato}
						helperText={touched.seudonimoCandidato && errors.seudonimoCandidato}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<Typography variant="h7" mt={"1rem"}>
						NOMBRE DEL SUPLENTE <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label=""
						name="nombreSuplente"
						value={values.nombreSuplente}
						error = {touched.nombreSuplente && errors.nombreSuplente}
						helperText={touched.nombreSuplente && errors.nombreSuplente}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
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
