import {
	Box,
	Button,
	Grid,
	Modal,
	Typography,
	TextField,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Formik, Form } from 'formik';
import React, { useState } from "react";
import { object, string, date } from "yup";
import { ErrorField } from "../components/ErrorField";
import { useDispatch } from "react-redux";
import { saveSuplente } from "../../store/module-preparacion/jornada/jornadaThunks";
import { useAddBoletasJornada } from "../hooks/useAddBoletasJornada";
import { DatePickerMod } from "./DatePickerMod";
import { RadioButtMod } from "./RadioButtMod";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xl: "50rem", lg: "50rem", sm: "40rem", xs: "30rem" },
	height: { xl: "34rem", lg: "34rem", sm: "37rem", xs: "40rem" },
	bgcolor: "background.paper",
	border: '2px solid #fff',
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
};

//Validaciones

const validationSchema = object({
	apellidoPSuplente: string("").required(
		"Por favor, ingresa el apellido paterno del Suplente"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
		apellidoMSuplente: string("").required(
		"Por favor, ingresa el apellido materno del Suplente"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
		nombreSuplente: string("").required(
		"Por favor, ingresa el nombre completo del Suplente"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	seudonimoSuplente: string(
		"Por favor, ingresa el seudónimo del Suplente"
		).matches(/^[0-9a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras, números y espacios"),
		fechaNacimientoSuplente: date().required(
		"Por favor, ingresa la fecha de nacimiento del Suplente"
		).max(new Date(), "No puedes ingresar una fecha futura"),
		generoSuplente: string("").required("Por favor, selecciona el género"),
});

export const ModalSustitutoBoleta = ({ statusSubstituteModal, handleToggleModal }) => {
	const { status } = useAddBoletasJornada();

	const dispatch = useDispatch();

	const onSave = () => {
		setFotografiaSuplente({ name: "Sin Archivo seleccionado" });
		handleToggleModal();
	};

	const onCancel = () => {
		handleToggleModal();
	};

	 const [fotografiaSuplente, setFotografiaSuplente] = useState({
	   name: "Sin Archivo seleccionado",
	 });
	  
	const validando = (values, props) => {
		const errors = {};

		if (fotografiaSuplente.name === "Sin Archivo seleccionado") {
		  errors.fotografiaSuplente = "Se necesita una fotografiaSuplente";
		}
		return errors;
	  };

	return (
		<>
		<Modal
			open={statusSubstituteModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Formik
				initialValues={{
					apellidoPSuplente: "",
					apellidoMSuplente: "", 
                    nombreSuplente: "", 
					fotografiaSuplente: "",
					seudonimoSuplente: "",//Text
					fechaNacimientoSuplente: "",//Date
					generoSuplente: "",//Text
				}}
				validate = {validando}
				validationSchema={validationSchema}
				onSubmit={(values, {resetForm}) => {
					dispatch(saveSuplente(values, onSave));
					resetForm();
				}}
	>
		{( {values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue} ) => (
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
					REGISTRO DE SUPLENTE 
				</Typography>
				<Box ml={"2rem"} mr={"2rem"}
				
				sx={{
					width: { xl: "90%", lg: "90%", sm: "90%", xs: "90%" },
					padding: "1rem",
					height: "100%",
					overflowY: "auto",
				}}
			>
				<Form onSubmit={handleSubmit} >
				<Typography variant="h7" mt={"2rem"}>
					APELLIDO PATERNO <span style={{ color: "red" }}>*</span>
						</Typography>
						<TextField
							fullWidth
							size="small"
							id="outlined-basic" 
							variant="outlined"
							label=""
							name="apellidoPSuplente"
							value={values.apellidoPSuplente}
							error = {touched.apellidoPSuplente && errors.apellidoPSuplente}
							helperText={touched.apellidoPSuplente && errors.apellidoPSuplente}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
				<Typography variant="h7" mt={"2rem"}>
					APELLIDO MATERNO <span style={{ color: "red" }}>*</span>
						</Typography>
						<TextField
							fullWidth
							size="small"
							id="outlined-basic" 
							variant="outlined"
							label=""
							name="apellidoMSuplente"
							value={values.apellidoMSuplente}
							error = {touched.apellidoMSuplente && errors.apellidoMSuplente}
							helperText={touched.apellidoMSuplente && errors.apellidoMSuplente}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					<Typography variant="h7" mt={"2rem"}>
					NOMBRE COMPLETO <span style={{ color: "red" }}>*</span>
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
				<Typography variant="h7" mt={"1rem"}>
				INSERTAR FOTOGRAFÍA DEL SUPLENTE  <span style={{ color: "red" }}>*</span>
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
						value={fotografiaSuplente.name}
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
								onChange={(e) => setFotografiaSuplente(e.target.files[0])}
								accept="image/png,image/jpg"
								type="file"
							/>
							<PhotoCamera fontSize="" />
						</IconButton>
					</Box>
					{touched.fotografiaSuplente &&
						fotografiaSuplente.name === "Sin Archivo seleccionado" && (
								<Box ml={2} 
									sx={{
									fontSize: "12px",
										color: "#791010" }}
									>
									{errors.fotografiaSuplente}
					  			</Box>
						)}
				<Typography variant="h7" mt={"1rem"}>
				SEUDÓNIMO DEL SUPLENTE <span style={{ color: "gray" }}> (opcional)</span>
					</Typography>
					<TextField
						name="seudonimoSuplente"
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label=""
						value={values.seudonimoSuplente}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
						 <Typography variant="h7" mt={"2rem"}>
						FECHA DE NACIMIENTO<span style={{ color: "red" }}>*</span>
							</Typography>
						 <Grid
						>				
							<DatePickerMod
								label=""
								name={"fechaNacimientoSuplente"}
								value={values.fechaNacimientoSuplente}
								setFieldValue={setFieldValue}
								handleChange={handleChange}
								error={errors.fechaNacimientoSuplente}
								touched={touched.fechaNacimientoSuplente}
								
							/>
						</Grid>  
						
						 
						
							<Typography variant="h7" mt={"2rem"}>
						    GÉNERO <span style={{ color: "red" }}>*</span>
							</Typography>
						<Box>
								<RadioButtMod
									valuesTipo={values.generoSuplente}
									handleChange={handleChange}
									errorsTipo={errors.generoSuplente}
								/>
								{touched.generoSuplente && (
								<Box ml={2}
									sx={{
									fontSize: "12px",
										color: "#791010" }}
									>
									{errors.generoSuplente}
					  			</Box>
							)}
						</Box>	
						 
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
								disabled={status === "checking"}
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
					</Form>
				</Box>
			</Box>
		)}
			</Formik>
		</Modal>
	</>
	);
};
