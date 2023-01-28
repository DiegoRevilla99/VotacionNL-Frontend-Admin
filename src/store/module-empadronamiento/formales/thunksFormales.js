import { envioLinkAPI, getEleccionAPI } from "../../../module-empadronamiento/helpers/FakeAPI";
import { getStatusEmp } from "../../../module-empadronamiento/helpers/getStatusEmp";
import { transformDate } from "../../../module-empadronamiento/helpers/transformDate";
import { getEleccionFormalProvider, getJornadasFormalesProvider } from "../../../providers/Micro-JornadasElectorales/providerFormales";

import { onToastCheckingOperation, onToastErrorOperation, onToastSuccessOperation } from "../../ui/uiSlice";
import { onCheckingOperation, onErrorOperation, onSuccessOperation, setEleccion, setJornadasFormales, startLoadingEleccion, startLoadingFormales } from "./EmpFormalesSlice";


//Cambiar provider
export const getJornadasFormales = () => {

    return async (dispatch, getState) => {
        dispatch(startLoadingFormales());
        const { ok, data, errorMessage } = await getJornadasFormalesProvider();
        let newData = data.map((eleccion) => {
            let ne = {
                ...eleccion.eleccionModel
                , ...eleccion.configuracionModel,
            }
            ne.status = getStatusEmp(ne.inicioEmpadronamiento, ne.finEmpadronamiento)
            ne.inicioEmpadronamiento = transformDate(ne.inicioEmpadronamiento)
            ne.finEmpadronamiento = transformDate(ne.finEmpadronamiento)
            return ne;
        })

        if (ok) {
            dispatch(setJornadasFormales({ jornadasFormales: newData }));
        }
    }
}

//Cambiar provider
//Get Eleccion con su config
export const getEleccionFormal = (id) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingEleccion());
        const { ok, data, errorMessage } = await getEleccionFormalProvider(id);

        let newData = {
            ...data.eleccionModel
            , ...data.configuracionModel,
        }
        newData.status = getStatusEmp(newData.inicioEmpadronamiento, newData.finEmpadronamiento)
        newData.inicioEmpadronamiento = transformDate(newData.inicioEmpadronamiento)
        newData.finEmpadronamiento = transformDate(newData.finEmpadronamiento)


        if (ok) {
            dispatch(setEleccion({ eleccion: newData }));
        }
    }
}


