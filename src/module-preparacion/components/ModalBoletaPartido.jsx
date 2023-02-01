import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	Box,
	Button,
	Grid,
	Modal,
	TextField,
	Typography
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Formik } from 'formik';
import { useState } from "react";
import { object, string } from "yup";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useJornadaStore } from "../hooks/useJornadaStore";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xl: "50rem", lg: "50rem", sm: "40rem", xs: "30rem" },
	height: { xl: "30rem", lg: "30rem", md:"28rem",  sm: "35rem", xs: "40rem" },
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
	siglasPartido: string("").required(
		"Por favor, ingresa las siglasPartido del partido"
		).matches(/^[0-9a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras, números y espacios"),

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
		setEmblema({ name: "Sin Archivo seleccionado" });
		setfotografiaPartido({ name: "Sin Archivo seleccionado" });
		console.log("hola", partidos.length);
		addPartido(
			partidos.length,
			values.nombrePartido,
			values.siglasPartido,
			values.emblemaPartido,
			values.fotografiaPartido
		);
		console.log(values);
		setPartidoSelectedNull();
		handleToggleModal();
	};

	const onCancel = () => {
		setPartidoSelectedNull();
		handleToggleModal();
	};

	//Validacion del formato imagen 
	const [emblemaPartido, setEmblema] = useState({ name: "Sin Archivo seleccionado" });
	const [fotografiaPartido, setfotografiaPartido] = useState({
	  name: "Sin Archivo seleccionado",
	});
	 
   const validando = (values, props) => {
	   const errors = {};
	   if (emblemaPartido.name === "Sin Archivo seleccionado") {
		 errors.emblemaPartido = "Se necesita un emblemaPartido";
	   }
	   if (fotografiaPartido.name === "Sin Archivo seleccionado") {
		 errors.fotografiaPartido = "Se necesita una fotografiaPartido";
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
			siglasPartido: "",//Text
			emblemaPartido: "",
			fotografiaPartido: "",
		}}
		validate = {validando}
		validationSchema={validationSchema}
		onSubmit={(values, {resetForm}) => {
			// dispatch(savePartido(values, onSave));
			onSubmit(values);
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
						siglasPartido <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label=""
						name="siglasPartido"
						value={values.siglasPartido}
						error = {touched.siglasPartido && errors.siglasPartido}
						helperText={touched.siglasPartido && errors.siglasPartido}
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
							value={emblemaPartido.name}
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
								name="emblemaPartido"
								id="emblemaPartido"
							/>
							<PhotoCamera fontSize="" />
							</IconButton>
						</Box>
						{touched.emblemaPartido &&
						emblemaPartido.name === "Sin Archivo seleccionado" && (
							<Box ml={2} 
							sx={{
							fontSize: "12px",
								color: "#791010" }}
							>
							{errors.emblemaPartido}
						  </Box>
						)}
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
						value={fotografiaPartido.name}
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
					{touched.fotografiaPartido &&
						fotografiaPartido.name === "Sin Archivo seleccionado" && (
							<Box ml={2} 
							sx={{
							fontSize: "12px",
								color: "#791010" }}
							>
							{errors.fotografiaPartido}
						  </Box>
						)}
				
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
