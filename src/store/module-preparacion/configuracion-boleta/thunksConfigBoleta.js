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
import { endLoadingBoleta, onCheckingOperation, onErrorOperation, onSuccessOperation, setBoleta, setCandidatos, setCoaliciones, setErrorBoleta, startLoadingBoleta, startLoadingCoaliciones, startLoadingCandidatos, startLoadingAsociaciones, setAsociaciones, endLoadingCoaliciones } from "./configBoletaSlice";
import { getBoletaProvider, getCandidatosProvider, getCoalicionesProvider, postCoalicionProvider } from "../../../providers/Micro-Preparacion/providerConfigBoleta";


export const getBoleta = (idBoleta) => {
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

/** 
* TODO: Rehacer para update candidatura no registrada y mostrar voto nulo
*/
/* export const updateBoleta = (idBoleta, data) => {

    return async (dispatch, getState) => {

        //dispatch(startLoadingBoleta());

        // const { data } = await getBoletaAPI(idBoleta);

        const response = await EstructuraBoletaApi.put(`${idBoleta}`, data);
        EstructuraBoletaApi.get(`${idBoleta}`).then((response) => {

            const { httpCode, mensaje, data } = response.data;

            if (httpCode === "NOT_FOUND") {
                dispatch(setErrorBoleta({ errorBoleta: mensaje }));
            } else {

                dispatch(setBoleta({ boleta: data }));
            }


        }).catch((error) => {
            console.log(error)
            dispatch(endLoadingBoleta());
        })

    }
} */

export const getCandidatos = (idBoleta) => {
    return async (dispatch, getState) => {

        dispatch(startLoadingCandidatos());
        const { ok, data, errorMessage } = await getCandidatosProvider(idBoleta);
        if (ok) {
            dispatch(setCandidatos({ candidatos: data }));
        }
    }
}



//---------CRUD COALICIÓN---------

export const getCoaliciones = (idBoleta) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingCoaliciones());
        const { ok, data, errorMessage } = await getCoalicionesProvider(idBoleta);
        if (ok) dispatch(setCoaliciones({ coaliciones: data }));
        else dispatch(endLoadingCoaliciones());
    }
}

/** 
* TODO: Por comprobar funcionalidad
*/
export const postCoalición = (data, funcion) => {

    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Guardando Coalicion..."));
        dispatch(onCheckingOperation());

        const { ok, data, errorMessage } = await postCoalicionProvider(data);
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Coalición guardada con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La coalicion no se pudo guardar" }));
        }
    }
}

/** 
* TODO: Por REFACTORIZAR
*/
export const deleteCoalicion = (data, funcion) => {

    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Eliminando Coalicion..."));
        dispatch(onCheckingOperation());

        const response = await deleteCoalicionAPI(data);



        if (response) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Coalición eliminada con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La coalicion no se pudo eliminar" }));
        }
    }
}

/** 
* TODO: Por REFACTORIZAR
*/
export const putCoalición = (id, data, funcion) => {

    return async (dispatch, getState) => {
        dispatch(onToastCheckingOperation("Editando Coalicion..."));
        dispatch(onCheckingOperation());
        const response = await JornadaApi.put(`coalicion/${id}`, data)

        if (response) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Coalición editada con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La coalicion no se pudo editar" }));
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

