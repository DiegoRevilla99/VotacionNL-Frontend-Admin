import { CoalicionApi } from "../../../module-preparacion/api/CoalicionApi";
import { EstructuraBoletaApi } from "../../../module-preparacion/api/EstructuraBoletaApi";
import { addBoletaApi, addComiteApi, addPlanillaApi, editBoletaApi, getBoletasApi } from "../../../module-preparacion/helpers/ApiComite";
import { deleteCoalicionAPI, getAsociacionesAPI, getBoletaAPI, getCandidatosAPI, getCoalicionesAPI, postAsociacionAPI, putComiteAPI, putPlanillaAPI } from "../../../module-preparacion/helpers/ApiConfigBoletas";
import { JornadaApi } from "../../../module-preparacion/api/JornadaApi.js"
import {
    onToastCheckingOperation,
    onToastErrorOperation,
    onToastOffOperation,
    onToastSuccessOperation,
} from "../../ui/uiSlice";

import { getBoletaProvider } from "../../../providers/Micro-NoFormales/providerBoletas";
import { endLoadingBoleta, onCheckingOperation, onErrorOperation, onSuccessOperation, setAsociaciones, setBoleta, setCandidatos, startLoadingAsociaciones, startLoadingBoleta, startLoadingCandidatos } from "./configBoletaNFSlice";
import { getCandidatosProviderNF } from "../../../providers/Micro-NoFormales/providerCandidatos";




export const getBoletaNF = (idBoleta) => {
    console.log("entre getBoletaNF")
    return async (dispatch, getState) => {
        dispatch(startLoadingBoleta());
        const { ok, data, errorMessage } = await getBoletaProvider(idBoleta);
        if (ok) {
            if (errorMessage === "NOT_FOUND") {
                dispatch(setErrorBoleta({ errorBoleta: "No se encontro" }));
            } else dispatch(setBoleta({ boleta: data }));
        }
        else dispatch(endLoadingBoleta());

    }
}



export const getCandidatosNF = (idBoleta) => {
    return async (dispatch, getState) => {

        dispatch(startLoadingCandidatos());
        const { ok, data, errorMessage } = await getCandidatosProviderNF(idBoleta);
        if (ok) {
            dispatch(setCandidatos({ candidatos: data.candidatoModels }));
        }
    }
}


/** 
* TODO: Por REFACTORIZAR
*/
export const putComite = (data, funcion = () => { }) => {

    return async (dispatch, getState) => {


        dispatch(onToastCheckingOperation("Guardando configuración del comite..."));
        dispatch(onCheckingOperation());
        const response = await putComiteAPI(data);

        if (response) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Comite actualizado con exito con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "El comite no se pudo actualizar" }));
        }

    }
}





//---------ASOCIACIONES---------

/** 
* TODO: Separar el codigo con el provider  
*/
export const postAsociacion = (data, funcion) => {

    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Guardando Asociacion..."));
        dispatch(onCheckingOperation());

        const response = await postAsociacionAPI(data);



        if (response) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Asociacion guardada con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La Asociacion no se pudo guardar" }));
        }
    }
}

/** 
* TODO: Separar el codigo con el provider  
*/
export const getAsociaciones = () => {

    return async (dispatch, getState) => {
        dispatch(startLoadingAsociaciones());
        const asociaciones = await getAsociacionesAPI();
        dispatch(setAsociaciones({ asociaciones: asociaciones }));
    }
}


/** 
* TODO: Por REFACTORIZAR
*/
export const putPlanilla = (data, funcion = () => { }) => {

    return async (dispatch, getState) => {


        dispatch(onToastCheckingOperation("Guardando configuración de planilla..."));
        dispatch(onCheckingOperation());
        const response = await putPlanillaAPI(data);

        if (response) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Planilla actualizada con exito con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La planilla no se pudo actualizar" }));
        }

    }
} 

