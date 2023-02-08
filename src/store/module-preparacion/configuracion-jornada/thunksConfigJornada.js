import { JornadaApi } from "../../../module-preparacion/api/JornadaApi";
import { getConfigJornadaAPI, putConfigJornadaAPI } from "../../../module-preparacion/helpers/ApiConfigJornada";
import { getConfigEleccionFormalProvider, getEleccionFormalByID, getEleccionFormalProvider, postConfigEleccionFormalProvider, putConfigEleccionFormalProvider } from "../../../providers/Micro-JornadasElectorales/providerFormales";
import {
    onToastCheckingOperation,
    onToastErrorOperation,
    onToastOffOperation,
    onToastSuccessOperation,
} from "../../ui/uiSlice";
import { endLoadingConfigJornada, setErrorJornada, setConfigJornada, startLoadingConfigJornada, setJornada, startLoadingJornada, onCheckingOperation, onSuccessOperation, onErrorOperation } from "./configJornadaSlice";

export const getConfigJornada = (idJornada) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingConfigJornada());
        const { ok,data,errorMessage}= await getConfigEleccionFormalProvider(idJornada);
        if(ok){
            dispatch(setConfigJornada({ configJornada: data }));
        }
        
    }
}

export const getConfigJornadaNF = (idJornada) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingConfigJornada());
        const { ok,data,errorMessage}= await getConfigEleccionFormalProvider(idJornada);
        if(ok){
            dispatch(setConfigJornada({ configJornada: data }));
        }
        
    }
}


export const getJornadatoConfig = (idJornada) => {
    
    return async (dispatch, getState) => {
        dispatch(startLoadingJornada());
        const { ok,data,errorMessage}= await getEleccionFormalByID(idJornada);
        if(ok){
            dispatch(setJornada({ jornada: data }));
        }
        
    }
}


export const putConfiguracion = (idboleta,datainfo, funcion) => {
    console.log("entre en dongi");
    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Guardando configuración..."));
        dispatch(onCheckingOperation());

        const { ok, data, errorMessage } = await putConfigEleccionFormalProvider(idboleta,datainfo);
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Configuracion guardada con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La configuración no se pudo guardar" }));
        }
    }
}


export const postConfiguracion = (id,datainfo, funcion) => {
    console.log("id: ",id);
    console.log("entre a postthunks: ",datainfo);
    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Guardando configuración..."));
        dispatch(onCheckingOperation());

        const { ok, data, errorMessage } = await postConfigEleccionFormalProvider(id,datainfo);
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Configuracion guardada con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La configuración no se pudo guardar" }));
        }
    }
}