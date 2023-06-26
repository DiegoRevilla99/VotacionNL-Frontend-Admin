import { InputAdornment, Link } from "@material-ui/core";
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
import { onPostImage } from '../../store/module-preparacion/jornada/ThunksJornada';
import { useJornadaStore } from "../hooks/useJornadaStore";
import { RadioButtMod } from "./RadioButtMod";
import { RadioButtModSuplente } from "./RadioButtModSuplente";
// import * as React from 'react';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { DateFieldFechaNacimiento } from '../../module-empadronamiento/components/DateFieldFechaNacimiento';
import { DateFieldFechaNacimientoSuplente } from '../../module-empadronamiento/components/DateFieldFechaNacimientoSuplente';
import { FielTextCustomRegistro } from './FielTextCustomRegistro';
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

	// console.log("candidatoandSuplenteSelected:",candidatoandSuplenteSelected)
	// console.log("setCandidatoAndSuplenteSelectedNull:",setCandidatoAndSuplenteSelectedNull)
	const onSubmit = async(values) => {

		
		const info = { ...values };


		info.fechaNacimientoCandidatos = new Date(values.fechaNacimientoCandidatos).toISOString();
        info.nombreCandidato = info.nombreCandidato.trim().toUpperCase();
        info.apellidoMCandidato = info.apellidoMCandidato.trim().toUpperCase();
        info.apellidoPCandidato = info.apellidoPCandidato.trim().toUpperCase();
		info.seudonimoCandidato = info.seudonimoCandidato.trim().toUpperCase();
		info.generoCandidato = info.generoCandidato.trim().toUpperCase();
		info.claveElectoralCandidato = info.claveElectoralCandidato.trim().toUpperCase();

		// suplentes
		info.fechaNacimientoSuplentes = new Date(values.fechaNacimientoSuplentes).toISOString();
        info.nombreSuplente = info.nombreSuplente.trim().toUpperCase();
        info.apellidoPSuplente = info.apellidoPSuplente.trim().toUpperCase();
        info.apellidoMSuplente = info.apellidoMSuplente.trim().toUpperCase();
		info.seudonimoSuplente = info.seudonimoSuplente.trim().toUpperCase();
		info.generoSuplente = info.generoSuplente.trim().toUpperCase();
		info.claveElectoralSuplente = info.claveElectoralSuplente.trim().toUpperCase();
		
		if (Object.values(candidatoandSuplenteSelected).length === 0) {
			const urllCandidato = await getURLImageCandidato();
			const urllSuplente = await getURLImageSuplente();
			addCandidatoAndSuplente(
				candidatoandSuplentes.length,
				info.apellidoPCandidato,
				info.apellidoMCandidato,
				info.nombreCandidato,
				urllCandidato,
				info.seudonimoCandidato,
				info.fechaNacimientoCandidatos,
				info.generoCandidato,
				info.claveElectoralCandidato,
				info.claveElectoralSuplente,
				info.apellidoPSuplente,
				info.apellidoMSuplente,
				info.nombreSuplente,
				urllSuplente,
				info.seudonimoSuplente,
				info.fechaNacimientoSuplentes,
				info.generoSuplente
			);
			toastSuccesOperation("Datos registrados con éxito");
		} else {
				  	// lo de fotografia
// fotografiaCandidato
// fotografiaSuplente
			let urlCandidatos=fotografiaCandidato.name;
			let urlSuplentes=fotografiaSuplente.name;
                if(candidatoandSuplentes.fotografiaCandidato!==fotografiaCandidato.name || candidatoandSuplentes.fotografiaSuplente!==fotografiaSuplente.name){
                    console.log("se cambio la imagen")
                    urlCandidatos=await getURLImageCandidato();
                    urlSuplentes=await getURLImageSuplente();
                    console.log("url:",urlCandidatos)
                    console.log("url:",urlSuplentes)
                }else{
                  console.log("no se cambio la imagen")
                }
			updateCandidatoAndSuplente(
				candidatoandSuplenteSelected.id,
				info.apellidoPCandidato,
				info.apellidoMCandidato,
				info.nombreCandidato,
				urlCandidatos,
				info.seudonimoCandidato,
				info.fechaNacimientoCandidatos,
				info.generoCandidato,
				info.claveElectoralCandidato,
				info.claveElectoralSuplente,
				info.apellidoPSuplente,
				info.apellidoMSuplente,
				info.nombreSuplente,
				urlSuplentes,
				info.seudonimoSuplente,
				info.fechaNacimientoSuplentes,
				info.generoSuplente
			);
			toastSuccesOperation("Datos actualizados con éxito");
		}
		setCandidatoAndSuplenteSelectedNull();
		setActiveStep(0);
		handleToggleModal();
		setFotografia({ name: "Sin Archivo seleccionado" });
		setFotografiaSuplente({ name: "Sin Archivo seleccionado" });
	};

	const onCancel = () => {
		setCandidatoAndSuplenteSelectedNull();
		setActiveStep(0);
		handleToggleModal();
	};

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
			<Typography>FECHA DE NACIMIENTO DEL CANDIDATO/A</Typography>
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
			<Typography>FECHA DE NACIMIENTO DEL/LA SUPLENTE</Typography>
			
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
	  // imagenes
	  const [fotografiaCandidato, setFotografia] = useState(candidatoandSuplentes
        ? {
            name: candidatoandSuplentes.fotografiaCandidato
              ? candidatoandSuplentes.fotografiaCandidato
              : "Sin Archivo seleccionado",
          }
        : { name: "Sin Archivo seleccionado" });
	  const [fotografiaSuplente, setFotografiaSuplente] = useState(candidatoandSuplentes
        ? {
            name: candidatoandSuplentes.fotografiaSuplente
              ? candidatoandSuplentes.fotografiaSuplente
              : "Sin Archivo seleccionado",
          }
        : { name: "Sin Archivo seleccionado" });
			
		const getURLImageCandidato = async () => {
			const urlCandidato = await dispatch(onPostImage(fotografiaCandidato));
			return urlCandidato;
		};
		const getURLImageSuplente = async () => {
			const urlSuplente = await dispatch(onPostImage(fotografiaSuplente));
			return urlSuplente;
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
						REGISTRO DE CANDIDATO Y SUPLENTE
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
									fotografiaCandidato: "",
									seudonimoCandidato: "",//Text
									fechaNacimientoCandidatos: "",//Date
									generoCandidato: "",//Text
									// SUPLENTE
									claveElectoralSuplente: "",
									apellidoPSuplente: "",
									apellidoMSuplente: "", 
									nombreSuplente: "", 
									fotografiaSuplente: "",
									seudonimoSuplente: "",//Text
									fechaNacimientoSuplentes: "",//Date
									generoSuplente: "",//Text
								} : {
									// CANDIDATO
									apellidoPCandidato:candidatoandSuplenteSelected["apellidoPCandidato"],
									apellidoMCandidato: candidatoandSuplenteSelected["apellidoMCandidato"],
									nombreCandidato: candidatoandSuplenteSelected["nombreCandidato"],
									fotografiaCandidato:candidatoandSuplenteSelected["fotografiaCandidato"],
									seudonimoCandidato: candidatoandSuplenteSelected["seudonimoCandidato"],
									fechaNacimientoCandidatos: candidatoandSuplenteSelected["fechaNacimientoCandidato"],
									generoCandidato: candidatoandSuplenteSelected["generoCandidato"],
									claveElectoralCandidato: candidatoandSuplenteSelected["claveElectoralCandidato"],
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
											Finalizaste el formulario. En caso de existir algún error se te mostrará a continuación.
											Presiona el botón de GUARDAR Y SALIR para guardar los cambios.
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
												CURP DEL CANDIDATO/A <span style={{ color: "red" }}>*</span>
													</Typography>
													<FielTextCustomRegistro
														disabled={status === "checking"}
														label="Introduce la CURP del candidato/a..."
														name="claveElectoralCandidato"
														placeholder="Ej: CASK00..."
														value={values.claveElectoralCandidato}
														handleChange={handleChange}
														error = {errors.claveElectoralCandidato}
														touched = {errors.claveElectoralCandidato}
														maxLength={18} // se agrega el atributo maxLength
													/>
											<Typography variant="h7" mt={"2rem"}>
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
											<Typography variant="h7" mt={"2rem"}>
												SEGUNDO APELLIDO DEL CANDIDATO/A <span style={{ color: "red" }}>*</span>
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
												NOMBRES DEL CANDIDATO/A <span style={{ color: "red" }}>*</span>
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
													value={
														fotografiaCandidato && fotografiaCandidato.name
														? fotografiaCandidato.name
														: candidatoandSuplenteSelected.fotografiaCandidato || "Sin Archivo seleccionado"
													}
													variant="outlined"
													size="small"
													InputProps={{
														startAdornment: candidatoandSuplenteSelected.fotografiaCandidato &&
														candidatoandSuplenteSelected.fotografiaCandidato.length > 0 ? (
															<InputAdornment position="start">
															<Link
																href={candidatoandSuplenteSelected.fotografiaCandidato}
																target="_blank"
																rel="noopener noreferrer"
															>
																Presione aquí para ver la fotografía -----------------------------------------------------------------
															</Link>
															</InputAdornment>
														) : null,
													}}
													/>


													<IconButton
														disabled={status === "checking"}
														color="primary"
														aria-label="upload picture"
														component="label"
														size="large"
														>
														<input
															hidden
															disabled={status==="checking"}
															onChange={(e) => setFotografia(e.target.files[0])}
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
														GÉNERO DEL CANDIDATO/A <span style={{ color: "red" }}>*</span>
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
												CURP DEL/LA SUPLENTE <span style={{ color: "red" }}>*</span>
													</Typography>
													<FielTextCustomRegistro
														disabled={status === "checking"}
														label="Introduce la CURP del/la suplente..."
														name="claveElectoralSuplente"
														placeholder="Ej: CASK00..."
														value={values.claveElectoralSuplente}
														handleChange={handleChange}
														error = {errors.claveElectoralSuplente}
														touched = {errors.claveElectoralSuplente}
														maxLength={18} // se agrega el atributo maxLength
													/>
											<Typography variant="h7" mt={"2rem"}>
												PRIMER APELLIDO DEL/LA SUPLENTE <span style={{ color: "red" }}>*</span>
													</Typography>
													<FielTextCustomRegistro
														disabled={status === "checking"}
														label="Introduce el primer apellido del/la suplente..."
														name="apellidoPSuplente"
														placeholder="Ej: Chavez..."
														value={values.apellidoPSuplente}
														handleChange={handleChange}
														error = {errors.apellidoPSuplente}
														touched = {errors.apellidoPSuplente}
													/>
											<Typography variant="h7" mt={"2rem"}>
												SEGUNDO APELLIDO DEL/LA SUPLENTE <span style={{ color: "red" }}>*</span>
													</Typography>
													<FielTextCustomRegistro
														disabled={status === "checking"}
														label="Introduce el segundo apellido del/la suplente..."
														name="apellidoMSuplente"
														placeholder="Ej: Sanchez..."
														value={values.apellidoMSuplente}
														handleChange={handleChange}
														error = {errors.apellidoMSuplente}
														touched = {errors.apellidoMSuplente}
													/>
												<Typography variant="h7" mt={"2rem"}>
												NOMBRES DEL/LA SUPLENTE <span style={{ color: "red" }}>*</span>
													</Typography>
													<FielTextCustomRegistro
														disabled={status === "checking"}
														label="Introduce el nombre completo del/la suplente..."
														name="nombreSuplente"
														placeholder="Ej: Kevin..."
														value={values.nombreSuplente}
														handleChange={handleChange}
														error = {errors.nombreSuplente}
														touched = {errors.nombreSuplente}
													/>
											<Typography variant="h7" mt={"1rem"}>
											INSERTAR FOTOGRAFÍA DEL/A SUPLENTE  <span style={{ color: "red" }}>*</span>
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
													value={
														fotografiaSuplente && fotografiaSuplente.name
														? fotografiaSuplente.name
														: candidatoandSuplenteSelected.fotografiaSuplente || "Sin Archivo seleccionado"
													}
													variant="outlined"
													size="small"
													InputProps={{
														startAdornment: candidatoandSuplenteSelected.fotografiaSuplente &&
														candidatoandSuplenteSelected.fotografiaSuplente.length > 0 ? (
															<InputAdornment position="start">
															<Link
																href={candidatoandSuplenteSelected.fotografiaSuplente}
																target="_blank"
																rel="noopener noreferrer"
															>
																Presione aquí para ver la fotografía -----------------------------------------------------------------
															</Link>
															</InputAdornment>
														) : null,
													}}
													/>

													<IconButton
														disabled={status === "checking"}
														color="primary"
														aria-label="upload picture"
														component="label"
														size="large"
														>
														<input
															hidden
															disabled={status==="checking"}
															onChange={(e) => setFotografiaSuplente(e.target.files[0])}
															onBlur={handleBlur}
															accept="image/x-png,image/jpeg"
															type="file"
															name="fotografiaSuplente"
															id="fotografiaSuplente"
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
											SEUDÓNIMO DEL/LA SUPLENTE <span style={{ color: "gray" }}> (opcional)</span>
												</Typography>
												<FielTextCustomRegistro
														disabled={status === "checking"}
														label="Introduce el seudónimo del/la suplente..."
														name="seudonimoSuplente"
														placeholder="Ej: El Kevin..."
														value={values.seudonimoSuplente}
														handleChange={handleChange}
														// error = {errors.seudonimoSuplente}
														// touched = {errors.seudonimoSuplente}
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
														GÉNERO DEL/LA SUPLENTE <span style={{ color: "red" }}>*</span>
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
