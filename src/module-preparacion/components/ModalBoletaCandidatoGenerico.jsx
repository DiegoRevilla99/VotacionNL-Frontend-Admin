import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Form, Formik, useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { date, object, string } from "yup";
import { useUiStore } from "../../hooks/useUiStore";
import { DateFieldFechaNacimientoNoFormal } from '../../module-empadronamiento/components/DateFieldFechaNacimientoNoFormal';
import { onPostImage } from '../../store/module-preparacion/jornada/ThunksJornadaNoFormal';
import { useJornadaNoFormalStore } from "../hooks/useJornadaNoFormalStore";
import { FielTextCustomRegistro } from './FielTextCustomRegistro';
import { GeneroRadioButton } from "./GeneroRadioButton";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "70%",
	height: { xl: "85%", lg: "85%", md:"100%",  sm: "100%", xs: "100%" },
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
			"Por favor, ingresa la CURP del candidato/a"
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
	const onSubmit = async(values) => {
		
		const info = { ...values };
		info.fechaNacimientoCandidatos = new Date(values.fechaNacimientoCandidatos).toISOString();
        info.nombreCandidato = info.nombreCandidato.trim().toUpperCase();
        info.apellidoMCandidato = info.apellidoMCandidato.trim().toUpperCase();
        info.apellidoPCandidato = info.apellidoPCandidato.trim().toUpperCase();
		info.seudonimoCandidato = info.seudonimoCandidato.trim().toUpperCase();
		info.generoCandidato = info.generoCandidato.trim().toUpperCase();
		info.claveCandidato = info.claveCandidato.trim().toUpperCase();

		// setFotografia({ name: "Sin Archivo seleccionado" });
		// console.log(values);
		if (Object.values(candidatoSelected).length === 0) {
			const urll = await getURLImage();
			addCandidato(
				candidatos.length,
				info.claveCandidato,
				info.nombreCandidato,
				info.apellidoPCandidato,
				info.apellidoMCandidato,
				urll,
				info.seudonimoCandidato,
				info.fechaNacimientoCandidatos,
				info.generoCandidato,
			  );
			toastSuccesOperation("Candidato/a registrado/a con éxito");
		} else {
			let fotografiaCandidatos=fotografiaCandidato.name;
			if(candidatos.fotografiaCandidato!==fotografiaCandidato.name){
				console.log("se cambio la imagen")
				fotografiaCandidatos=await getURLImage();
				console.log("url:",fotografiaCandidatos)
			}else{
			  console.log("no se cambio la imagen")
			}
			updateCandidato(
				candidatoSelected.id,
				info.claveCandidato,
				info.nombreCandidato,
				info.apellidoPCandidato,
				info.apellidoMCandidato,
				fotografiaCandidatos,
				info.seudonimoCandidato,
				info.fechaNacimientoCandidatos,
				info.generoCandidato,
			  );
			toastSuccesOperation("Registro actualizada con éxito");
		}
		setCandidatosSelectedNull();
		handleCloseRegisterModal();
		setFotografiaCandidato({ name: "Sin Archivo seleccionado" });
		}
	
	const onCancel = () => {
		setCandidatosSelectedNull();
		handleCloseRegisterModal();
	};
	 //Validacion del formato imagen 
	//  const [fotografiaCandidato, setFotografia] = useState({
	// 	name: "Sin Archivo seleccionado",
	//   });
// ASDASDASDASDASD FECHAS
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
			<Typography>FECHA NACIMIENTO DEL CANDIDATO/A</Typography>
			<DateFieldFechaNacimientoNoFormal
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
/// ASDASDASDASDASD
	  const validando = (values, props) => {
		const errors = {};

		if (!validationCurp.test(values.claveCandidato.toUpperCase())) {
		  errors.claveCandidato = "Esta CURP no es valida";
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
	 
	   const [fotografiaCandidato, setFotografiaCandidato] = useState(
		candidatos
        ? {
            name: candidatos.fotografiaCandidato
              ? candidatos.fotografiaCandidato
              : "Sin Archivo seleccionado",
          }
        : { name: "Sin Archivo seleccionado" }
    );

	  
	  const getURLImage = async () => {
		const url = await dispatch(onPostImage(fotografiaCandidato));
		return url;
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
									nombreCandidato: candidatoSelected["nombreCandidato"],
									apellidoPCandidato: candidatoSelected["apellidoPCandidato"],
									apellidoMCandidato: candidatoSelected["apellidoMCandidato"],
									fotografiaCandidato: candidatoSelected["fotografiaCandidato"],
									seudonimoCandidato: candidatoSelected["seudonimoCandidato"],
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
										CURP DEL CANDIDATO/A <span style={{ color: "red" }}>*</span>
									</Typography>
									<FielTextCustomRegistro
										disabled={status === "checking"}
										label="Introduce la CURP del candidato/a..."
										name="claveCandidato"
										placeholder="Ej: CASK0..."
										value={values.claveCandidato}
										handleChange={handleChange}
										error = {errors.claveCandidato}
										maxLength={18}
										touched = {errors.claveCandidato}
									/>
									<Typography variant="h7">
										PRIMER APELLIDO DEL CANDIDATO/A <span style={{ color: "red" }}>*</span>
									</Typography>
									<FielTextCustomRegistro
										disabled={status === "checking"}
										label="Introduce el primer apellido del candidato/a..."
										name="apellidoPCandidato"
										placeholder="Ej: Chavez..."
										value={values.apellidoPCandidato}
										handleChange={handleChange}
										error = {errors.apellidoPCandidato}
										touched = {errors.apellidoPCandidato}
									/>
									<Typography variant="h7" mt={"20rem"}>
									SEGUNDO APELLIDO DEL CANDIDATO/A<span style={{ color: "red" }}>*</span>
									</Typography>
									<FielTextCustomRegistro
										disabled={status === "checking"}
										label="Introduce el segundo apellido del candidato/a..."
										name="apellidoMCandidato"
										placeholder="Ej: Sanchez..."
										value={values.apellidoMCandidato}
										handleChange={handleChange}
										error = {errors.apellidoMCandidato}
										touched = {errors.apellidoMCandidato}
									/>
									<Typography variant="h7" mt={"2rem"}>
									NOMBRES DEL CANDIDATO/A<span style={{ color: "red" }}>*</span>
									</Typography>
									<FielTextCustomRegistro
										disabled={status === "checking"}
										label="Introduce el nombre completo del candidato/a..."
										name="nombreCandidato"
										placeholder="Ej: Kevin..."
										value={values.nombreCandidato}
										handleChange={handleChange}
										error = {errors.nombreCandidato}
										touched = {errors.nombreCandidato}
									/>
									<Typography variant="h7" mt={"1rem"}>
									SEUDÓNIMO DEL CANDIDATO/A <span style={{ color: "gray" }}> (opcional)</span>
									</Typography>
									<FielTextCustomRegistro
										disabled={status === "checking"}
										label="Introduce el seudónimo del candidato/a..."
										name="seudonimoCandidato"
										placeholder="Ej: El Kevin..."
										value={values.seudonimoCandidato}
										handleChange={handleChange}
										// error = {errors.seudonimoCandidato}
										// touched = {errors.seudonimoCandidato}
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
                    label=""
                    disabled
                    variant="outlined"
                    size="small"
                    value={fotografiaCandidato.name}
                    // className={styles.textField}
                  ></TextField>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    size="large"
                  >
                    <input
                    disabled={status==="checking"}
                      hidden
                      onChange={(e) => setFotografiaCandidato(e.target.files[0])}
                      onBlur={handleBlur}
                      accept="image/x-png,image/jpeg"
                      type="file"
                      name="fotografiaCandidato"
                      id="fotografiaCandidato"
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
										<FechaNacimientoField name="fechaNacimientoCandidatos" />
									</Grid>
									<Typography variant="h7" mt={"2rem"}>
									GENERO DEL CANDIDATO/A <span style={{ color: "red" }}>*</span>
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
