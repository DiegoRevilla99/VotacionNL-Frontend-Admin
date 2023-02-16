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
import { Form, Formik, useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { date, object, string } from "yup";
import { useUiStore } from "../../hooks/useUiStore";
import { useJornadaStore } from "../hooks/useJornadaStore";
import { RadioButtMod } from "./RadioButtMod";
import { RadioButtModSuplente } from "./RadioButtModSuplente";
// import * as React from 'react';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { DateFieldFechaNacimiento } from '../../module-empadronamiento/components/DateFieldFechaNacimiento';
import { DateFieldFechaNacimientoSuplente } from '../../module-empadronamiento/components/DateFieldFechaNacimientoSuplente';
const steps = ['Registrar al candidato', 'Registrar al suplente'];
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xl: "50rem", lg: "50rem", sm: "40rem", xs: "30rem" },
	height: { xl: "85%", lg: "85%", md:"100%",  sm: "100%", xs: "100%" },
	bgcolor: "background.paper",
	border: '2px solid #fff',
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
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
		// Datos del candidato
	apellidoPCandidato: string("").required(
		"Por favor, ingresa el apellido paterno del candidato/a"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
		apellidoMCandidato: string("").required(
		"Por favor, ingresa el apellido materno del candidato/a"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
		nombreCandidato: string("").required(
		"Por favor, ingresa el nombre completo del candidato/a"
		).matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras y espacios"),
	seudonimoCandidato: string(
		"Por favor, ingresa el seudónimo del candidato/a"
		).matches(/^[0-9a-zA-ZÀ-ÿ\s]{1,40}$/, "Solo se permiten letras, números y espacios"),
		fechaNacimientoCandidatos: date()
			.required("Por favor, ingresa la fecha de nacimiento del candidato")
			.max(new Date(new Date().setFullYear(new Date().getFullYear() - 21)), "Debes ser mayor de 21 años"),
		generoCandidato: string("").required("Por favor, selecciona el género"),
		claveElectoralCandidato: string("").required(
			"Por favor, ingresa LA CURP del candidato/a"
			).matches(/^[0-9a-zA-ZÀ-ÿ\s]{17,18}$/, "Solo se permiten letras y espacios, el máximo es 18 caracteres"),
	// Datos del suplente
	claveElectoralSuplente: string("").required(
		"Por favor, ingresa LA CURP del candidato/a"
		).matches(/^[0-9a-zA-ZÀ-ÿ\s]{17,18}$/, "Solo se permiten letras y espacios, el máximo es 18 caracteres"),
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
		fechaNacimientoSuplentes: date()
		.required("Por favor, ingresa la fecha de nacimiento del Suplente")
		.max(new Date(new Date().setFullYear(new Date().getFullYear() - 21)), "Debes ser mayor de 21 años"), // el minimo para diputado
		generoSuplente: string("").required("Por favor, selecciona el género"),
});
export const ModalRegisterCS = ({ statusRegisterModal, handleToggleModal }) => {
	const dispatch = useDispatch();
	const { toastSuccesOperation } = useUiStore();
	const params = useParams();
	const {
		status,
		candidatoandSuplentes,
        candidatoandSuplenteSelected,
		addCandidatoAndSuplente,
		setCandidatoAndSuplenteSelectedNull,
		updateCandidatoAndSuplente,
	} = useJornadaStore();

	const onSubmit = (values) => {
		const info = { ...values };


		info.fechaNacimientoCandidatos = new Date(values.fechaNacimientoCandidatos);
        info.nombreCandidato = info.nombreCandidato.trim().toUpperCase();
        info.apellidoMCandidato = info.apellidoMCandidato.trim().toUpperCase();
        info.apellidoPCandidato = info.apellidoPCandidato.trim().toUpperCase();
		info.seudonimoCandidato = info.seudonimoCandidato.trim().toUpperCase();
		info.generoCandidato = info.generoCandidato.trim().toUpperCase();
		info.claveElectoralCandidato = info.claveElectoralCandidato.trim().toUpperCase();

		// suplentes
		info.fechaNacimientoSuplentes = new Date(values.fechaNacimientoSuplentes);
        info.nombreSuplente = info.nombreSuplente.trim().toUpperCase();
        info.apellidoPSuplente = info.apellidoPSuplente.trim().toUpperCase();
        info.apellidoMSuplente = info.apellidoMSuplente.trim().toUpperCase();
		info.seudonimoSuplente = info.seudonimoSuplente.trim().toUpperCase();
		info.generoSuplente = info.generoSuplente.trim().toUpperCase();
		info.claveElectoralSuplente = info.claveElectoralSuplente.trim().toUpperCase();
		
		setFotografia({ name: "Sin Archivo seleccionado" });
		setFotografiaSuplente({ name: "Sin Archivo seleccionado" });
		if (Object.values(candidatoandSuplenteSelected).length === 0) {
			addCandidatoAndSuplente(
				candidatoandSuplentes.length,
				info.apellidoPCandidato,
				info.apellidoMCandidato,
				info.nombreCandidato,
				values.fotografiaCandidato,
				info.seudonimoCandidato,
				info.fechaNacimientoCandidatos,
				info.generoCandidato,
				info.claveElectoralCandidato,
				info.claveElectoralSuplente,
				info.apellidoPSuplente,
				info.apellidoMSuplente,
				info.nombreSuplente,
				values.fotografiaSuplente,
				info.seudonimoSuplente,
				info.fechaNacimientoSuplentes,
				info.generoSuplente
			);
			toastSuccesOperation("Datos registrados con éxito");
		} else {
			updateCandidatoAndSuplente(
				candidatoandSuplenteSelected.length,
				info.apellidoPCandidato,
				info.apellidoMCandidato,
				info.nombreCandidato,
				values.fotografiaCandidato,
				info.seudonimoCandidato,
				info.fechaNacimientoCandidatos,
				info.generoCandidato,
				info.claveElectoralCandidato,
				info.claveElectoralSuplente,
				info.apellidoPSuplente,
				info.apellidoMSuplente,
				info.nombreSuplente,
				values.fotografiaSuplente,
				info.seudonimoSuplente,
				info.fechaNacimientoSuplentes,
				info.generoSuplente
			);
			toastSuccesOperation("Datos actualizados con éxito");
		}
		setCandidatoAndSuplenteSelectedNull();
		setActiveStep(0);
		handleToggleModal();

	};

	const onCancel = () => {
		setCandidatoAndSuplenteSelectedNull();
		setActiveStep(0);
		handleToggleModal();
	};

	 const [fotografiaCandidato, setFotografia] = useState({
	   name: "Sin Archivo seleccionado",
	 });
	 const [fotografiaSuplente, setFotografiaSuplente] = useState({
		name: "Sin Archivo seleccionado",
	  });
	  const FechaNacimientoField = ({ name }) => {
		const {
		  values: {
			claveElectoralCandidato,
			fechaNacimientoCandidatos,
		  },
		  touched,
		  setFieldValue,
		} = useFormikContext();
	  
		const [field, meta] = useField({ name });
	  
		useEffect(() => {
		  // set the value of textC, based on textA and textB
		  if (claveElectoralCandidato) {
			const fecha = getDateBirth(claveElectoralCandidato);
			setFieldValue(name, fecha);
			
		  }
		}, [claveElectoralCandidato, touched.claveElectoralCandidato, setFieldValue, name]);
	  
		return (
		  <>
			<Typography>FECHA DE NACIMIENTO</Typography>
			<DateFieldFechaNacimiento
			  name="fechaNacimientoCandidatos"
			  value={fechaNacimientoCandidatos}
			  // onChange={handleChange}
			  disabled={true}
			/>
			{/* {!!meta.touched && !!meta.error && <div>{meta.error}</div>} */}
		  </>
		);
	  };
	  
	  const getDateBirth = (claveElectoralCandidato = "") => {
		const fechaActual = new Date();
		if (validationCurp.test(claveElectoralCandidato.toUpperCase())) {
		  let anio = parseInt(claveElectoralCandidato.substring(4, 6), 10);
		  let mes = parseInt(claveElectoralCandidato.substring(6, 8), 10);
		  let dia = parseInt(claveElectoralCandidato.substring(8, 10), 10);
	  
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
	  
	  // ** suplente

	  const FechaNacimientoFieldSuplente = ({ name }) => {
		const {
		  values: {
			claveElectoralSuplente,
			fechaNacimientoSuplentes,
		  },
		  touched,
		  setFieldValue,
		} = useFormikContext();
	  
		const [field, meta] = useField({ name });
	  
		useEffect(() => {
		  // set the value of textC, based on textA and textB
		  if (claveElectoralSuplente) {
			const fecha = getDateBirthSuplente(claveElectoralSuplente);
			setFieldValue(name, fecha);
			// console.log("fechaaaaaaaaaaaaaa",name);
		  }
		}, [claveElectoralSuplente, touched.claveElectoralSuplente, setFieldValue, name]);
		
		return (
		  <>
			<Typography>FECHA DE NACIMIENTO</Typography>
			
			<DateFieldFechaNacimientoSuplente
			  name="fechaNacimientoSuplentes"
			  value={fechaNacimientoSuplentes}
			  // onChange={handleChange}
			  disabled={true}
			/>
			{/* {!!meta.touched && !!meta.error && <div>{meta.error}</div>} */}
		  </>
		);
	  };
	  
	  const getDateBirthSuplente = (claveElectoralSuplente = "") => {
		const fechaActual = new Date();
		if (validationCurp.test(claveElectoralSuplente.toUpperCase())) {
		  let anio = parseInt(claveElectoralSuplente.substring(4, 6), 10);
		  let mes = parseInt(claveElectoralSuplente.substring(6, 8), 10);
		  let dia = parseInt(claveElectoralSuplente.substring(8, 10), 10);
	  
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

	  // ****************************************************************
	  
	  const validando = (values, props) => {
		const errors = {};

		if (!validationCurp.test(values.claveElectoralCandidato.toUpperCase())) {
		  errors.claveElectoralCandidato = "Esta CURP no es valida";
		}
	  if(validationCurp.test(values.claveElectoralCandidato.toUpperCase())&& values.nombreCandidato.trim().length>0){
		  if(errorNombreCFuntion(values.nombreCandidato.trim().toUpperCase(),values.claveElectoralCandidato.charAt(15))){
			errors.nombreCandidato = "La segunda consonante debe ser '"+values.claveElectoralCandidato.charAt(15)+"'";
		  }
	  }
	  if(validationCurp.test(values.claveElectoralCandidato.toUpperCase())&& values.nombreCandidato.trim().length>0){
		if(errorNombreInitFuntion(values.nombreCandidato.trim().toUpperCase(),values.claveElectoralCandidato.charAt(3))) errors.nombreCandidato = "La inical debe ser '"+values.claveElectoralCandidato.charAt(3)+"'";
	  }
		if(validationCurp.test(values.claveElectoralCandidato.toUpperCase())&& values.apellidoPCandidato.trim().length>0){
		  if(!isSecondApPCons(values.apellidoPCandidato,values.claveElectoralCandidato.charAt(13))){
			errors.apellidoPCandidato = "La segunda consonante debe ser '"+values.claveElectoralCandidato.charAt(13)+"'";
		  }
		}
		if(validationCurp.test(values.claveElectoralCandidato.toUpperCase())&& values.apellidoPCandidato.trim().length>0){
		  if(!isFirstVocal(values.apellidoPCandidato,values.claveElectoralCandidato.charAt(1))){
			// errors.apellidoPCandidato = "La siguiente vocal debe ser '"+values.claveElectoralCandidato.charAt(1)+"'";
		  }
		}
		if(validationCurp.test(values.claveElectoralCandidato.toUpperCase())&& values.apellidoPCandidato.trim().length>0){
		  if(values.apellidoPCandidato.toUpperCase().charAt(0)!==values.claveElectoralCandidato.charAt(0)) errors.apellidoPCandidato = "La inical debe ser '"+values.claveElectoralCandidato.charAt(0)+"'";
		}
		if(validationCurp.test(values.claveElectoralCandidato.toUpperCase())&& values.apellidoMCandidato.trim().length>0){
		  if(!isSecondAMCons(values.apellidoMCandidato,values.claveElectoralCandidato.charAt(14))){
			errors.apellidoMCandidato = "La segunda consonante debe ser '"+values.claveElectoralCandidato.charAt(14)+"'";
		  }
		}
		if(validationCurp.test(values.claveElectoralCandidato.toUpperCase())&& values.apellidoMCandidato.trim().length>0){
		  if(values.apellidoMCandidato.toUpperCase().charAt(0)!==values.claveElectoralCandidato.charAt(2)) errors.apellidoMCandidato = "La inicial debe ser '"+values.claveElectoralCandidato.charAt(2)+"'";
		}
		// ** SUPLENTE

		if (!validationCurp.test(values.claveElectoralSuplente.toUpperCase())) {
			errors.claveElectoralSuplente = "Esta CURP no es valida";
		  }
		if(validationCurp.test(values.claveElectoralSuplente.toUpperCase())&& values.nombreSuplente.trim().length>0){
			if(errorNombreCFuntion(values.nombreSuplente.trim().toUpperCase(),values.claveElectoralSuplente.charAt(15))){
			  errors.nombreSuplente = "La segunda consonante debe ser '"+values.claveElectoralSuplente.charAt(15)+"'";
			}
		}
		  
		if(validationCurp.test(values.claveElectoralSuplente.toUpperCase())&& values.nombreSuplente.trim().length>0){
		  if(errorNombreInitFuntion(values.nombreSuplente.trim().toUpperCase(),values.claveElectoralSuplente.charAt(3))) errors.nombreSuplente = "La inical debe ser '"+values.claveElectoralSuplente.charAt(3)+"'";
		}

		  if(validationCurp.test(values.claveElectoralSuplente.toUpperCase())&& values.apellidoPSuplente.trim().length>0){
			if(!isSecondApPCons(values.apellidoPSuplente,values.claveElectoralSuplente.charAt(13))){
			  errors.apellidoPSuplente = "La segunda consonante debe ser '"+values.claveElectoralSuplente.charAt(13)+"'";
			}
		  }
		
		  if(validationCurp.test(values.claveElectoralSuplente.toUpperCase())&& values.apellidoPSuplente.trim().length>0){
			if(!isFirstVocal(values.apellidoPSuplente,values.claveElectoralSuplente.charAt(1))){
			//   errors.apellidoPSuplente = "La siguiente vocal debe ser '"+values.claveElectoralSuplente.charAt(1)+"'";
			}
		  }
		
		  if(validationCurp.test(values.claveElectoralSuplente.toUpperCase())&& values.apellidoPSuplente.trim().length>0){
			if(values.apellidoPSuplente.toUpperCase().charAt(0)!==values.claveElectoralSuplente.charAt(0)) errors.apellidoPSuplente = "La inical debe ser '"+values.claveElectoralSuplente.charAt(0)+"'";
		  }

		  if(validationCurp.test(values.claveElectoralSuplente.toUpperCase())&& values.apellidoMSuplente.trim().length>0){
			if(!isSecondAMCons(values.apellidoMSuplente,values.claveElectoralSuplente.charAt(14))){
			  errors.apellidoMSuplente = "La segunda consonante debe ser '"+values.claveElectoralSuplente.charAt(14)+"'";
			}
		  }
		
		  if(validationCurp.test(values.claveElectoralSuplente.toUpperCase())&& values.apellidoMSuplente.trim().length>0){
			if(values.apellidoMSuplente.toUpperCase().charAt(0)!==values.claveElectoralSuplente.charAt(2)) errors.apellidoMSuplente = "La inicial debe ser '"+values.claveElectoralSuplente.charAt(2)+"'";
		  }

		if (fotografiaCandidato.name === "Sin Archivo seleccionado") {
			errors.fotografiaCandidato = "Se necesita una fotografiaCandidato";
		  }
		  if (fotografiaSuplente.name === "Sin Archivo seleccionado") {
			  errors.fotografiaSuplente = "Se necesita una fotografiaSuplente";
			}
		return errors;
	  };
    // LOS STEPS
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
	return (

		<>
<Modal
			open={statusRegisterModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ overflowY: "auto", height: "100%" }}>
					<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
						REGISTRO DE CANDIDATOS Y SUPLENTE
					</Typography>
					<Box m={"2rem"}>

						<Formik
							initialValues={
								Object.values(candidatoandSuplenteSelected).length === 0
                                ? 	{
									// CANDIDATO
									claveElectoralCandidato: "",
									apellidoPCandidato: "",
									apellidoMCandidato: "", 
									nombreCandidato: "", 
									fotografiaCandidato: "candidato.jpg",
									seudonimoCandidato: "",//Text
									fechaNacimientoCandidatos: "",//Date
									generoCandidato: "",//Text
									// SUPLENTE
									claveElectoralSuplente: "",
									apellidoPSuplente: "",
									apellidoMSuplente: "", 
									nombreSuplente: "", 
									fotografiaSuplente: "suplente.jpg",
									seudonimoSuplente: "",//Text
									fechaNacimientoSuplentes: "",//Date
									generoSuplente: "",//Text
								} : {
									// CANDIDATO
									claveElectoralCandidato: candidatoandSuplenteSelected["claveElectoralCandidato"],
									apellidoPCandidato:candidatoandSuplenteSelected["apellidoPCandidato"],
									apellidoMCandidato: candidatoandSuplenteSelected["apellidoMCandidato"],
									nombreCandidato: candidatoandSuplenteSelected["nombreCandidato"],
									fotografiaCandidato:candidatoandSuplenteSelected["fotografiaCandidato"],
									seudonimoCandidato: candidatoandSuplenteSelected["seudonimoCandidato"],
									fechaNacimientoCandidatos: candidatoandSuplenteSelected["fechaNacimientoCandidato"],
									generoCandidato: candidatoandSuplenteSelected["generoCandidato"],
									// SUPLENTE
									claveElectoralSuplente:candidatoandSuplenteSelected["claveElectoralSuplente"],
									apellidoPSuplente:candidatoandSuplenteSelected["apellidoPSuplente"],
									apellidoMSuplente: candidatoandSuplenteSelected["apellidoMSuplente"],
									nombreSuplente: candidatoandSuplenteSelected["nombreSuplente"],
									fotografiaSuplente:candidatoandSuplenteSelected["fotografiaSuplente"],
									seudonimoSuplente: candidatoandSuplenteSelected["seudonimoSuplente"],
									fechaNacimientoSuplentes: candidatoandSuplenteSelected["fechaNacimientoSuplente"],
									generoSuplente: candidatoandSuplenteSelected["generoSuplente"],
								}
							}
							validationSchema={validationSchema}
							validate = {validando}
							onSubmit={(values, {resetForm}) => {
								onSubmit(values)
								resetForm();
							}}
						>
							{({values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue}) => (
								<Form  onSubmit={handleSubmit} >

								<Box sx={{ width: '100%' }}>
									<Stepper activeStep={activeStep}>
										{steps.map((label, index) => {
										const stepProps = {};
										const labelProps = {};
										return (

											<Step key={label} {...stepProps}>
												<StepLabel {...labelProps}>{label}</StepLabel>
											</Step>
										);
										})}
									</Stepper>
									{activeStep === steps.length ? (
										<React.Fragment>
										<Typography sx={{ mt: 2, mb: 1 }}>
											Finalizó el registro.
										</Typography>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
											{errors.claveElectoralCandidato ? "Verifica el apellido paterno del candidato" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
											{errors.apellidoPCandidato ? "Verifica el apellido paterno del candidato" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.apellidoMCandidato? "Verifica el apellido materno del candidato" : ""}
											</Box>	
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.nombreCandidato? "Verifica el nombre del candidato" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.fotografiaCandidato? "Verifica la fotografia del candidato" : ""}

										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.seudonimoCandidato? "Verifica el seudonimo del candidato" : ""}

										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.fechaNacimientoCandidatos? "Verifica la fecha de nacimiento del candidato" : ""}

										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.generoCandidato? "Verifica el genero del candidato" : ""}

										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.claveElectoralSuplente? "Verifica el apellido paterno del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.apellidoPSuplente? "Verifica el apellido paterno del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.apellidoMSuplente? "Verifica el apellido materno del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.nombreSuplente? "Verifica el nombre del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.fotografiaSuplente? "Verifica la fotografia del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.seudonimoSuplente? "Verifica el seudonimo del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.fechaNacimientoSuplentes? "Verifica la fecha de nacimiento del suplente" : ""}
										</Box>
										<Box ml={2} sx={{fontSize: "12px", color: "#791010" }}>
										{errors.generoSuplente? "Verifica el genero del suplente" : ""}
										</Box>


										<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
										<Button
											color="inherit"
											disabled={activeStep === 0}
											onClick={handleBack}
											sx={{ mr: 1 }}
											>
											Regresar y verificar
											</Button>
											<Box sx={{ flex: '1 1 auto' }} />
											<Button color="inherit"
											disabled={status === "checking"}
											type="submit"
											sx={{
												boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
													transition: "all 0.5s ease",
													backgroundColor: "#511079",
													color: "#FFFFFF",
													width: "30%",
													borderRadius: "25px 25px 25px 25px",
													"&:hover": {
														backgroundColor: "#7E328B !important",
														transform: "translate(-5px, -5px)",
														boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
													},
											}
												
											}>guardar y salir</Button>

										</Box>
										</React.Fragment>
									) : (
										<React.Fragment>
										{activeStep === 0 ? (
											// CANDIDATO
											<>
											<Box sx={{ mt: 4, mb: 1, ml: 2, mr: 2}}>
											<Typography variant="h7" mt={"2rem"}>
												CURP DEL CANDIDATO <span style={{ color: "red" }}>*</span>
													</Typography>
													<TextField
														fullWidth
														size="small"
														id="outlined-basic" 
														variant="outlined"
														label=""
														name="claveElectoralCandidato"
														value={values.claveElectoralCandidato}
														error = {touched.claveElectoralCandidato && errors.claveElectoralCandidato}
														helperText={touched.claveElectoralCandidato && errors.claveElectoralCandidato}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
											<Typography variant="h7" mt={"2rem"}>
												PRIMER APELLIDO <span style={{ color: "red" }}>*</span>
													</Typography>
													<TextField
														fullWidth
														size="small"
														id="outlined-basic" 
														variant="outlined"
														label=""
														name="apellidoPCandidato"
														value={values.apellidoPCandidato}
														error = {touched.apellidoPCandidato && errors.apellidoPCandidato}
														helperText={touched.apellidoPCandidato && errors.apellidoPCandidato}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
											<Typography variant="h7" mt={"2rem"}>
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
													{/* <Typography variant="h7" mt={"2rem"}>
													FECHA DE NACIMIENTO<span style={{ color: "red" }}>*</span>
														</Typography> */}
													<Grid
													>				

															<FechaNacimientoField name="fechaNacimientoCandidatos" />
															{touched.fechaNacimientoCandidatos && (
															<Box ml={2}
																sx={{
																fontSize: "12px",
																	color: "#791010" }}
																>
																{errors.fechaNacimientoCandidatos}
															</Box>
														)}
													</Grid>  
													
													
												
														<Typography variant="h7" mt={"2rem"}>
														GENERO DEL CANDIDATO <span style={{ color: "red" }}>*</span>
														</Typography>
													<Box>
															<RadioButtMod
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
												</Box>
											</>
											// END CANDIDATO
										) : (
											// SUPLENTE
											<>
											<Box sx={{ mt: 4, mb: 1, ml: 2, mr: 2}}>
											<Typography variant="h7" mt={"2rem"}>
												CURP DEL SUPLENTE <span style={{ color: "red" }}>*</span>
													</Typography>
													<TextField
														fullWidth
														size="small"
														id="outlined-basic" 
														variant="outlined"
														label=""
														name="claveElectoralSuplente"
														value={values.claveElectoralSuplente}
														error = {touched.claveElectoralSuplente && errors.claveElectoralSuplente}
														helperText={touched.claveElectoralSuplente && errors.claveElectoralSuplente}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
											<Typography variant="h7" mt={"2rem"}>
												PRIMER APELLIDO <span style={{ color: "red" }}>*</span>
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
												SEGUNDO APELLIDO <span style={{ color: "red" }}>*</span>
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
												NOMBRES <span style={{ color: "red" }}>*</span>
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

													<Grid
													>				
														<FechaNacimientoFieldSuplente name="fechaNacimientoSuplentes" />
														{touched.fechaNacimientoSuplentes && (
															<Box ml={2}
																sx={{
																fontSize: "12px",
																	color: "#791010" }}
																>
																{errors.fechaNacimientoSuplentes}
															</Box>
														)}
													</Grid>  
													
													
													
														<Typography variant="h7" mt={"2rem"}>
														GÉNERO DEL SUPLENTE <span style={{ color: "red" }}>*</span>
														</Typography>
													<Box>
															<RadioButtModSuplente
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
											</Box>
											</>
											// END SUPLENTE
										)}
										<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
											<Button
											color="inherit"
											disabled={activeStep === 0}
											onClick={handleBack}
											sx={{ mr: 1 }}
											>
											Regresar
											</Button>
											<Box sx={{ flex: '1 1 auto' }} />

											<Button 
											disabled={status === "checking"}
											sx={{
												boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
												transition: "all 0.5s ease",
												backgroundColor: "#511079",
												color: "#FFFFFF",
												width: "20%",
												borderRadius: "25px 25px 25px 25px",
												"&:hover": {
													backgroundColor: "#7E328B !important",
													transform: "translate(-5px, -5px)",
													boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
												},
											}}
											onClick={handleNext}>
											{activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
											</Button>
											
											<Button
												disabled={status === "checking"}
												
												onClick={onCancel}
												sx={{
													boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
													transition: "all 0.5s ease",
													backgroundColor: "#791010",
													color: "#FFFFFF",
													width: "20%",
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
										</Box>
										</React.Fragment>
									 )
									}
									</Box>
									
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Modal>
	</>
	);
};
