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
import { endLoadingBoleta, onCheckingOperation, onErrorOperation, onSuccessOperation, setBoleta, setCandidatos, setCoaliciones, setErrorBoleta, startLoadingBoleta, startLoadingCoaliciones, startLoadingCandidatos, endLoadingCoaliciones } from "./configBoletaSlice";
import { deleteCoalicionProvider, getBoletaProvider, getCandidatosProvider, getCoalicionesProvider, postCoalicionProvider, putCoalicionProvider } from "../../../providers/Micro-JornadasElectorales/providerConfigBoleta";


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



export const getCandidatos = (idBoleta) => {
    return async (dispatch, getState) => {
               
        dispatch(startLoadingCandidatos());
        const { ok, data, errorMessage } = await getCandidatosProvider(idBoleta);
        if(ok){
            dispatch(setCandidatos({ candidatos: data }));
        }
        
        
    }
}


export const getCoaliciones = (idBoleta) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingCoaliciones());
        
        const { ok, data, errorMessage } = await getCoalicionesProvider(idBoleta);
        dispatch(setCoaliciones({ coaliciones: data }))

    }
}


export const postCoalición = (idboleta,idcandidato,datainfo, funcion) => {
    console.log("id boleta: ",idboleta)
    console.log("id candidato: ",idcandidato)
    console.log("informacion post: ",datainfo)
    console.log(datainfo)
    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Guardando Coalicion..."));
        dispatch(onCheckingOperation());

        const { ok, data, errorMessage } = await postCoalicionProvider(idboleta,idcandidato,datainfo);
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


export const deleteCoalicion = (datainfo, funcion) => {

    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Eliminando Coalicion..."));
        dispatch(onCheckingOperation());

       
        const { ok, data, errorMessage } = await deleteCoalicionProvider(datainfo);

        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Coalición eliminada con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La coalicion no se pudo eliminar" }));
        }
    }
}


export const putCoalición = (id, datainfo, funcion) => {
    console.log("informacion put")
    console.log(id)
    console.log(datainfo)
    return async (dispatch, getState) => {
        dispatch(onToastCheckingOperation("Editando Coalicion..."));
        dispatch(onCheckingOperation());
        const { ok, data, errorMessage } = await putCoalicionProvider(id,datainfo);

        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Coalición editada con éxito" }));
            funcion();

        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La coalicion no se pudo editar" }));
        }
    }
}





