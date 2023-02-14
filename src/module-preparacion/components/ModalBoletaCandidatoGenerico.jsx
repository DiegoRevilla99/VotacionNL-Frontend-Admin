import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Form, Formik, useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { date, object, string } from "yup";
import { useUiStore } from "../../hooks/useUiStore";
import { DateFieldFechaNacimiento } from '../../module-empadronamiento/components/DateFieldFechaNacimiento';
import { useJornadaNoFormalStore } from "../hooks/useJornadaNoFormalStore";
import { GeneroRadioButton } from "./GeneroRadioButton";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "70%",
	bgcolor: "background.paper",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
	pb: 1,
	// height: "90%",
};


const isFirstVocal = (name, vocalC) => {
	const vowels = "aAáÁeEéÉiIíÍoOóÓuUúÚ";
	const firstVocal = name.charAt(0);
	return vowels.includes(firstVocal) && firstVocal.toUpperCase() === vocalC;
  };
  
  const isSecondCons = (name, consonanteC) => {
	const tam = name.length;
	const vowels = 'aeiou';
	let bandera = false;
	let consonante = "";
	let consonantRegex = new RegExp(`(?![${vowels}h])[a-z]`, 'gi');
	for (let ic = 1; ic < tam; ic++) {
	  const letra = name.charAt(ic);
	  if (!bandera && consonantRegex.test(letra)) {
		bandera = true;
		consonante = letra;
	  }
	}
	if (bandera && consonante.toUpperCase() === "H") {
	  const prevChar = name.charAt(name.indexOf(consonante) - 1);
	  if (vowels.includes(prevChar.toLowerCase())) {
		consonante = "H";
	  }
	}
	return bandera && consonante.toUpperCase() === consonanteC;
  };
  
  
const isSecondApPCons=(name,consonanteC)=>{
	const tam=name.length;
	const vowels = 'aeiouAEIOU';
	const consonantess = 'BCDFGHJKLMNPQRSTVWXYZ';
	let bandera=false;
	let consonante="";
	let consonantRegex = new RegExp(`(?![${vowels}])[a-z]`);
	
	for (let ic = 1; ic < tam; ic++) {
		const letra=name.charAt(ic);
		// console.log("letra en turno:",letra)
		if(consonantess.includes(letra.toUpperCase())){
		  // console.log("entreeee:",letra)
		  if(!bandera){    
			// console.log("cond2:")
			consonante=letra;
			bandera=true;
		  }
		};
	}
	if(bandera && consonante.toUpperCase()===consonanteC){
	  return true
	}else{
	  return false
	}
}
	
const isSecondAMCons=(name,consonanteC)=>{
	const tam=name.length;
	const vowels = 'aeiouAEIOU';
	const consonantess = 'BCDFGHJKLMNPQRSTVWXYZ';
	let bandera=false;
	let consonante="";
	let consonantRegex = new RegExp(`(?![${vowels}])[a-z]`);
	
	for (let ic = 1; ic < tam; ic++) {
		const letra=name.charAt(ic);
		// console.log("letra en turno:",letra)
		if(consonantess.includes(letra.toUpperCase())){
		  // console.log("entreeee:",letra)
		  if(!bandera){    
			// console.log("cond2:")
			consonante=letra;
			bandera=true;
		  }
		};
	}
	if(bandera && consonante.toUpperCase()===consonanteC){
	  return true
	}else{
	  return false
	}
  }

let validationCurp =
  /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;

  const valiMariaJose=(name)=>{
	const nombress=name.trim().split(" ")
	if(nombress.length>1){
	  if(nombress[0]==="JOSÉ"|nombress[0]==="JOSE"|nombress[0]==="MARIA"|nombress[0]==="MARÍA"){
		return true
	  }
	}
	return false
  }
  
  const errorNombreInitFuntion=(name,val1)=>{
	if(valiMariaJose(name)){
	  const nombress=name.trim().split(" ")
	  const name2=nombress[1]
	  console.log(name2)
	  if(name2.charAt(0)!==val1) return true
	}else{
	  if(name.toUpperCase().charAt(0)!==val1) return true
	}
	return false
  }
  
  const errorNombreCFuntion=(name,val2)=>{
	if(valiMariaJose(name.toUpperCase())){
	  const nombress=name.trim().split(" ")
	  const name2=nombress[1]
	  if(!isSecondCons(name2.toUpperCase(),val2)){
		return true
	  }
	  
	}else{
	  if(!isSecondCons(name.toUpperCase(),val2)){
		return true
	  }
	}
	return false
  }

const validationSchema = object({
		// // Datos del candidato
		claveCandidato: string("").required(
			"Por favor, ingresa la clave del candidato/a"
			),
		apellidoPCandidato: string("").required(
			"Por favor, ingresa el apellido paterno del candidato/a"
			),
			apellidoMCandidato: string("").required(
			"Por favor, ingresa el apellido materno del candidato/a"
			),
			nombreCandidato: string("").required(
			"Por favor, ingresa el nombre completo del candidato/a"
			),
		seudonimoCandidato: string(
			"Por favor, ingresa el seudónimo del candidato/a"
			),
			fechaNacimientoCandidatos: date().required(
			"Por favor, ingresa la fecha de nacimiento del candidato/a"
			),
			generoCandidato: string("").required("Por favor, selecciona el género"),
});

export const ModalBoletaCandidatoGenerico = ({ statusRegisterModal, handleCloseRegisterModal }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { toastSuccesOperation } = useUiStore();
	const { status, candidatos, addCandidato, setCandidatosSelectedNull, candidatoSelected, updateCandidato } = useJornadaNoFormalStore();
	const onSubmit = (values) => {

		const info = { ...values };
		info.fechaNacimientoCandidatos = new Date(values.fechaNacimientoCandidatos);
        info.nombreCandidato = info.nombreCandidato.trim().toUpperCase();
        info.apellidoMCandidato = info.apellidoMCandidato.trim().toUpperCase();
        info.apellidoPCandidato = info.apellidoPCandidato.trim().toUpperCase();
		info.seudonimoCandidato = info.seudonimoCandidato.trim().toUpperCase();
		info.generoCandidato = info.generoCandidato.trim().toUpperCase();
		info.claveCandidato = info.claveCandidato.trim().toUpperCase();

		setFotografia({ name: "Sin Archivo seleccionado" });
		// console.log(values);
		if (Object.values(candidatoSelected).length === 0) {
			// const fechaNacimientoCandidato = new Date(values.fechaNacimientoCandidatos);
			addCandidato(
				candidatos.length,
				info.claveCandidato,
				info.nombreCandidato,
				info.apellidoPCandidato,
				info.apellidoMCandidato,
				values.fotografiaCandidato,
				info.seudonimoCandidato,
				info.fechaNacimientoCandidatos,
				info.generoCandidato,
			  );
			toastSuccesOperation("Candidato/a registrado/a con éxito");
		} else {
			updateCandidato(
				candidatoSelected.id,
				info.claveCandidato,
				info.nombreCandidato,
				info.apellidoPCandidato,
				info.apellidoMCandidato,
				values.fotografiaCandidato,
				info.seudonimoCandidato,
				info.fechaNacimientoCandidatos,
				info.generoCandidato,
			  );
			toastSuccesOperation("Registro actualizada con éxito");
		}
		setCandidatosSelectedNull();
		handleCloseRegisterModal();
	};
	const onCancel = () => {
		setCandidatosSelectedNull();
		handleCloseRegisterModal();
	};
	 //Validacion del formato imagen 
	 const [fotografiaCandidato, setFotografia] = useState({
		name: "Sin Archivo seleccionado",
	  });
		
const FechaNacimientoField = ({ name }) => {
		const {
		  values: {
			claveCandidato,
			fechaNacimientoCandidatos,
		  },
		  touched,
		  setFieldValue,
		} = useFormikContext();
	  
		const [field, meta] = useField({ name });
	  
		useEffect(() => {
		  // set the value of textC, based on textA and textB
		  if (claveCandidato) {
			const fecha = getDateBirth(claveCandidato);
			setFieldValue(name, fecha);
		  }
		}, [claveCandidato, touched.claveCandidato, setFieldValue, name]);
	  
		return (
		  <>
			<Typography>FECHA DE NACIMIENTO</Typography>
			<DateFieldFechaNacimiento
			  name="fechaNacimientoCandidatos"
			  value={fechaNacimientoCandidatos}
			  // onChange={handleChange}
			  disabled={true}
			/>
			{!!meta.touched && !!meta.error && <div>{meta.error}</div>}
		  </>
		);
	  };
	  
	  const getDateBirth = (claveCandidato = "") => {
		const fechaActual = new Date();
		if (validationCurp.test(claveCandidato.toUpperCase())) {
		  let anio = parseInt(claveCandidato.substring(4, 6), 10);
		  let mes = parseInt(claveCandidato.substring(6, 8), 10);
		  let dia = parseInt(claveCandidato.substring(8, 10), 10);
	  
		  const anioActual = fechaActual.getFullYear() - 2005;
		  console.log(anioActual);
		  if (anio > anioActual) {
			anio = anio + 1900;
		  } else {
			anio = anio + 2000;
		  }
		  const fechaN = new Date(anio, mes - 1, dia);
		  return fechaN;
		}
		return false;
	  };

	  const validando = (values, props) => {
		const errors = {};

		if (!validationCurp.test(values.claveCandidato.toUpperCase())) {
		  errors.claveCandidato = "Esta clave Electoral no es valida";
		}
	  
	  if(validationCurp.test(values.claveCandidato.toUpperCase())&& values.nombreCandidato.trim().length>0){
		  if(errorNombreCFuntion(values.nombreCandidato.trim().toUpperCase(),values.claveCandidato.charAt(15))){
			errors.nombreCandidato = "La segunda consonante debe ser '"+values.claveCandidato.charAt(15)+"'";
		  }
	  }
		
	  if(validationCurp.test(values.claveCandidato.toUpperCase())&& values.nombreCandidato.trim().length>0){
		if(errorNombreInitFuntion(values.nombreCandidato.trim().toUpperCase(),values.claveCandidato.charAt(3))) errors.nombreCandidato = "La inical debe ser '"+values.claveCandidato.charAt(3)+"'";
	  }

		if(validationCurp.test(values.claveCandidato.toUpperCase())&& values.apellidoPCandidato.trim().length>0){
		  if(!isSecondApPCons(values.apellidoPCandidato,values.claveCandidato.charAt(13))){
			errors.apellidoPCandidato = "La segunda consonante debe ser '"+values.claveCandidato.charAt(13)+"'";
		  }
		}
	  
		if(validationCurp.test(values.claveCandidato.toUpperCase())&& values.apellidoPCandidato.trim().length>0){
		  if(!isFirstVocal(values.apellidoPCandidato,values.claveCandidato.charAt(1))){
			// errors.apellidoPCandidato = "La siguiente vocal debe ser '"+values.claveCandidato.charAt(1)+"'";
		  }
		}
	  
		if(validationCurp.test(values.claveCandidato.toUpperCase())&& values.apellidoPCandidato.trim().length>0){
		  if(values.apellidoPCandidato.toUpperCase().charAt(0)!==values.claveCandidato.charAt(0)) errors.apellidoPCandidato = "La inical debe ser '"+values.claveCandidato.charAt(0)+"'";
		}

		if(validationCurp.test(values.claveCandidato.toUpperCase())&& values.apellidoMCandidato.trim().length>0){
		  if(!isSecondAMCons(values.apellidoMCandidato,values.claveCandidato.charAt(14))){
			errors.apellidoMCandidato = "La segunda consonante debe ser '"+values.claveCandidato.charAt(14)+"'";
		  }
		}
	  
		if(validationCurp.test(values.claveCandidato.toUpperCase())&& values.apellidoMCandidato.trim().length>0){
		  if(values.apellidoMCandidato.toUpperCase().charAt(0)!==values.claveCandidato.charAt(2)) errors.apellidoMCandidato = "La inicial debe ser '"+values.claveCandidato.charAt(2)+"'";
		}
 
		 if (fotografiaCandidato.name === "Sin Archivo seleccionado") {
		   errors.fotografiaCandidato = "Se necesita una fotografiaCandidato";
		 }
		 return errors;
	   };
	return (
		<Modal
			open={statusRegisterModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ overflowY: "auto", height: "100%" }}>
					<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
						REGISTRO DE CANDIDATOS
					</Typography>
					<Box m={"2rem"}>
						<Formik
							initialValues={
								Object.values(candidatoSelected).length === 0
								? {
									claveCandidato: "",//Text
									apellidoPCandidato: "",
									apellidoMCandidato: "",
									nombreCandidato: "",
									seudonimoCandidato: "",//Text
									fotografiaCandidato: "",
									fechaNacimientoCandidatos: "",//Date
									generoCandidato: "",//Text
								}
								: {
									claveCandidato: candidatoSelected["claveCandidato"],
									apellidoPCandidato: candidatoSelected["apellidoPCandidato"],
									apellidoMCandidato: candidatoSelected["apellidoMCandidato"],
									nombreCandidato: candidatoSelected["nombreCandidato"],
									seudonimoCandidato: candidatoSelected["fotografiaCandidato"],
									fotografiaCandidato: candidatoSelected["seudonimoCandidato"],
									fechaNacimientoCandidatos: candidatoSelected["fechaNacimientoCandidato"],
									generoCandidato: candidatoSelected["generoCandidato"],
								}
							}
							validate = {validando}
							validationSchema={validationSchema}
							onSubmit={(values, {resetForm}) => {
								onSubmit(values);
								resetForm();
							}}
						>
							{({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue }) => (
								<Form onSubmit={handleSubmit}>
									<Typography variant="h7">
										CLAVE ELECTORAL DEL CANDIDATO <span style={{ color: "red" }}>*</span>
									</Typography>
									<TextField
										name="claveCandidato"
										fullWidth
										size="small"
										// id="titulo"
										label=""
										variant="outlined"
										onChange={handleChange}
										value={values.claveCandidato}
										error={touched.claveCandidato && Boolean(errors.claveCandidato)}
										helperText={touched.claveCandidato && errors.claveCandidato}
										onBlur={handleBlur}
									/>
									<Typography variant="h7">
										PRIMER APELLIDO <span style={{ color: "red" }}>*</span>
									</Typography>
									<TextField
										name="apellidoPCandidato"
										fullWidth
										size="small"
										// id="titulo"
										label=""
										variant="outlined"
										onChange={handleChange}
										value={values.apellidoPCandidato}
										error={touched.apellidoPCandidato && Boolean(errors.apellidoPCandidato)}
										helperText={touched.apellidoPCandidato && errors.apellidoPCandidato}
										onBlur={handleBlur}
									/>
									<Typography variant="h7" mt={"20rem"}>
									SEGUNDO APELLIDO <span style={{ color: "red" }}>*</span>
									</Typography>
									<TextField
										fullWidth
										size="small"
										id="outlined-basic" 
										variant="outlined"
										label=""
										name="apellidoMCandidato"
										value={values.apellidoMCandidato}
										error = {touched.apellidoMCandidato && errors.apellidoMCandidato}
										helperText={touched.apellidoMCandidato && errors.apellidoMCandidato}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<Typography variant="h7" mt={"2rem"}>
									NOMBRES <span style={{ color: "red" }}>*</span>
									</Typography>
									<TextField
										fullWidth
										size="small"
										id="outlined-basic" 
										variant="outlined"
										label=""
										name="nombreCandidato"
										value={values.nombreCandidato}
										error = {touched.nombreCandidato && errors.nombreCandidato}
										helperText={touched.nombreCandidato && errors.nombreCandidato}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<Typography variant="h7" mt={"1rem"}>
									SEUDÓNIMO DEL CANDIDATO/A <span style={{ color: "gray" }}> (opcional)</span>
									</Typography>
									<TextField
										name="seudonimoCandidato"
										fullWidth
										size="small"
										id="outlined-basic" 
										variant="outlined"
										label=""
										value={values.seudonimoCandidato}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
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
										value={fotografiaCandidato.name}
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
									{touched.fotografiaCandidato &&
										fotografiaCandidato.name === "Sin Archivo seleccionado" && (
										<Box ml={2} 
											sx={{
											fontSize: "12px",
											color: "#791010" }}
											>
											{errors.fotografiaCandidato}
										</Box>
										)}
									{/* <Typography variant="h7" mt={"2rem"}>
									FECHA DE NACIMIENTO<span style={{ color: "red" }}>*</span>
									</Typography> */}
									<Grid>				
										{/* <DatePickerModGenerico
											label=""
											name={"fechaNacimientoCandidatos"}
											value={values.fechaNacimientoCandidatos}
											setFieldValue={setFieldValue}
											handleChange={handleChange}
											error={errors.fechaNacimientoCandidatos}
											touched={touched.fechaNacimientoCandidatos}
										/> */}
										<FechaNacimientoField name="fechaNacimientoCandidatos" />
									</Grid>
									<Typography variant="h7" mt={"2rem"}>
									GENERO DEL CANDIDATO <span style={{ color: "red" }}>*</span>
									</Typography>
									<Box>
										<GeneroRadioButton
											valuesTipo={values.generoCandidato}
											handleChange={handleChange}
											errorsTipo={errors.generoCandidato}
										/>
										{touched.generoCandidato && (
										<Box ml={2}
											sx={{
											fontSize: "12px",
												color: "#791010" }}
											>
											{errors.generoCandidato}
										</Box>
									)}
									</Box>	  
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
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};
