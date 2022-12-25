import { CoalicionApi } from "../../../module-preparacion/api/CoalicionApi";
import { EstructuraBoletaApi } from "../../../module-preparacion/api/EstructuraBoletaApi";
import { addBoletaApi, addComiteApi, addPlanillaApi, editBoletaApi, getBoletasApi } from "../../../module-preparacion/helpers/ApiComite";
import { getBoletaAPI, getCandidatosAPI, getCoalicionesAPI } from "../../../module-preparacion/helpers/ApiConfigBoletas";

import {
    onToastCheckingOperation,
    onToastErrorOperation,
    onToastOffOperation,
    onToastSuccessOperation,
} from "../../ui/uiSlice";
import { endLoadingBoleta, onCheckingOperation, onErrorOperation, onSuccessOperation, setBoleta, setCoaliciones, setErrorBoleta, setPartidos, startLoadingBoleta, startLoadingCoaliciones, startLoadingPartidos } from "./configBoletaSlice";



export const getCoaliciones = () => {

    return async (dispatch, getState) => {
        console.log("consiguiendo coaliciones")
        dispatch(startLoadingCoaliciones());
        const coaliciones = await getCoalicionesAPI();
        dispatch(setCoaliciones({ coaliciones: coaliciones }));


    }
}

export const getBoleta = (idBoleta) => {

    return async (dispatch, getState) => {
        console.log("consiguiendo la boleta")
        dispatch(startLoadingBoleta());
        // const { data } = await getBoletaAPI(idBoleta);

        EstructuraBoletaApi.get(`${idBoleta}`).then((response) => {

            const { httpCode, mensaje, data } = response.data;

            if (httpCode === "NOT_FOUND") {
                dispatch(setErrorBoleta({ errorBoleta: mensaje }));
            } else {
                console.log(data)
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
        console.log("actualizando la boleta " + idBoleta)
        console.log(data)
        dispatch(startLoadingBoleta());

        // const { data } = await getBoletaAPI(idBoleta);

        const response = await EstructuraBoletaApi.put(`${idBoleta}`, data);
        console.log(response)
        dispatch(endLoadingBoleta());
        //dispatch(setBoleta({ boleta: data.data }));


    }
}

export const getPartidos = (idBoleta) => {

    return async (dispatch, getState) => {
        console.log("consiguiendo los partidos de la boleta " + idBoleta)
        dispatch(startLoadingPartidos());
        // const { data } = await EstructuraBoletaApi.get(`${idBoleta}/candidatos`);
        // const partidos = data.data
        const partidos = await getCandidatosAPI();
        // const newPartidos = partidos.filter((candidato) => {
        //     if (candidato.partidoModel.coalicionModel.claveCoalicion == 12) return candidato
        // })

        console.log(partidos);

        dispatch(setPartidos({ partidos: partidos }));
    }
}



// POST
export const postCoalición = (data, funcion) => {

    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Guardando Coalicion..."));
        dispatch(onCheckingOperation());

        const response = await CoalicionApi.post("", data);

        console.log(response)

        if (response) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Boleta guardada con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La boleta no se pudo guardar" }));
        }
    }
}

