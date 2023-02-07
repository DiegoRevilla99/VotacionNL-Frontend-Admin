import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	Box,
	Button,
	Grid,
	Modal, Stack, TextField,
	Typography
} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';

import { Formik } from 'formik';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { object } from "yup";
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

	const dispatch = useDispatch();
	const params = useParams();
	const { 
		status, 
		partidos, 
		partidoSelected, 
		addPartido, 
		setPartidoSelectedNull, 
		updatePartido
	} = useJornadaStore();

	const onSubmit = (values) => {
		setfotografiaPartido({ name: "Sin Archivo seleccionado" });
		console.log("valuessssssss", values);
		addPartido(
			partidos.length,
			values.clavePartido,
			values.nameParty,
			values.siglasParty,
			values.emblemParty,
			values.fotografiaParty,
			values.statusParty,
		);
		setPartidoSelectedNull();
		handleToggleModal();
	};

	const onCancel = () => {
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
		initialValues={{
			nameParty: "",	//Text
			siglasParty: "",//Text
			emblemParty: "",
			fotografiaParty: "",
			clavePartido: "",
			// statusParty: "",
			statusParty: switchValue,
		}}
		validate = {validando}
		validationSchema={validationSchema}
		onSubmit={(values, {resetForm}) => {
			// dispatch(savePartido(values, onSave));
			// onSubmit(values);
			onSubmit({ ...values, statusParty: switchValue });
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
						onBlur={handleBlur}
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
						onBlur={handleBlur}
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
						onBlur={handleBlur}
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
						onBlur={handleBlur}
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
						¿EL PARTIDO ESTÁ VIEGENTE? <span style={{ color: "red" }}>*</span>
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
	
	
	)}
	</Formik>
	</Modal>
	</>
	);
};
