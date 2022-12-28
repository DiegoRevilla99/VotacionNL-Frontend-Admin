import { CoalicionApi } from "../../../module-preparacion/api/CoalicionApi";
import { EstructuraBoletaApi } from "../../../module-preparacion/api/EstructuraBoletaApi";
import { addBoletaApi, addComiteApi, addPlanillaApi, editBoletaApi, getBoletasApi } from "../../../module-preparacion/helpers/ApiComite";
import { deleteCoalicionAPI, getAsociacionesAPI, getBoletaAPI, getCandidatosAPI, getCoalicionesAPI, postAsociacionAPI, putComiteAPI, putPlanillaAPI } from "../../../module-preparacion/helpers/ApiConfigBoletas";

import {
    onToastCheckingOperation,
    onToastErrorOperation,
    onToastOffOperation,
    onToastSuccessOperation,
} from "../../ui/uiSlice";
import { endLoadingBoleta, onCheckingOperation, onErrorOperation, onSuccessOperation, setBoleta, setCandidatos, setCoaliciones, setErrorBoleta, startLoadingBoleta, startLoadingCoaliciones, startLoadingCandidatos, startLoadingAsociaciones, setAsociaciones } from "./configBoletaSlice";



export const getCoaliciones = () => {

    return async (dispatch, getState) => {

        dispatch(startLoadingCoaliciones());
        const coaliciones = await getCoalicionesAPI();
        dispatch(setCoaliciones({ coaliciones: coaliciones }));
    }
}

export const getAsociaciones = () => {

    return async (dispatch, getState) => {

        dispatch(startLoadingAsociaciones());
        const asociaciones = await getAsociacionesAPI();
        dispatch(setAsociaciones({ asociaciones: asociaciones }));
    }
}


export const getBoleta = (idBoleta) => {

    return async (dispatch, getState) => {

        dispatch(startLoadingBoleta());
        // const { data } = await getBoletaAPI(idBoleta);

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
}

export const updateBoleta = (idBoleta, data) => {

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

        //dispatch(endLoadingBoleta());
        //dispatch(setBoleta({ boleta: data.data }));


    }
}

export const getCandidatos = (idBoleta) => {

    return async (dispatch, getState) => {

        dispatch(startLoadingCandidatos());
        // const { data } = await EstructuraBoletaApi.get(`${idBoleta}/candidatos`);
        // const partidos = data.data
        const partidos = await getCandidatosAPI();
        // const newPartidos = partidos.filter((candidato) => {
        //     if (candidato.partidoModel.coalicionModel.claveCoalicion == 12) return candidato
        // })



        dispatch(setCandidatos({ candidatos: partidos }));
    }
}



// POST
export const postCoalición = (data, funcion) => {

    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Guardando Coalicion..."));
        dispatch(onCheckingOperation());

        // const response = await CoalicionApi.post("", data);
        const response = await postAsociacionAPI(data);



        if (response) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Coalición guardada con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La coalicion no se pudo guardar" }));
        }
    }
}

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

export const putCoalición = (data, funcion) => {

    return async (dispatch, getState) => {


        console.log("Actualizando coalicion")


    }
}

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

