import { CoalicionApi } from "../../../module-preparacion/api/CoalicionApi";
import { EstructuraBoletaApi } from "../../../module-preparacion/api/EstructuraBoletaApi";
import { addBoletaApi, addComiteApi, addPlanillaApi, editBoletaApi, getBoletasApi } from "../../../module-preparacion/helpers/ApiComite";
import { getCandidatosAPI, getCoalicionesAPI } from "../../../module-preparacion/helpers/ApiConfigBoletas";

import {
    onToastCheckingOperation,
    onToastErrorOperation,
    onToastOffOperation,
    onToastSuccessOperation,
} from "../../ui/uiSlice";
import { onCheckingOperation, onErrorOperation, onSuccessOperation, setCoaliciones, setPartidos, startLoadingCoaliciones, startLoadingPartidos } from "./configBoletaSlice";



export const getCoaliciones = () => {

    return async (dispatch, getState) => {
        console.log("consiguiendo coaliciones")
        dispatch(startLoadingCoaliciones());
        const coaliciones = await getCoalicionesAPI();
        dispatch(setCoaliciones({ coaliciones: coaliciones }));


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

