import { envioLinkAPI, getEleccionAPI } from "../../../module-empadronamiento/helpers/FakeAPI";
import { getStatusEmp } from "../../../module-empadronamiento/helpers/getStatusEmp";
import { transformDate } from "../../../module-empadronamiento/helpers/transformDate";
import { getJornadasNoFormalesProvider } from "../../../providers/Micro-NoFormales/providerNoFormales";
import { getVotantesPorJornadaProvider, postCSVProvider, postVotanteProvider, putVotanteProvider } from "../../../providers/Micro-Votante/providerVotante";
import { onToastCheckingOperation, onToastErrorOperation, onToastSuccessOperation } from "../../ui/uiSlice";
import { onCheckingOperation, onErrorOperation, onSuccessOperation, setEleccion, setJornadasFormales, setVotantes, startLoadingEleccion, startLoadingFormales, startLoadingVotantes } from "./EmpFormalesSlice";

export const uploadCSV = (file, funcion = () => { }) => {

    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Subiendo votantes..."));
        dispatch(onCheckingOperation());


        const { ok, data, errorMessage } = await postCSVProvider(file);
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Los votantes se han subido con éxito" }));
            setTimeout(() => {
                funcion();
            }, 800);


        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo subir el archivo" }));
        }

    }
}


export const postVotante = (info, funcion = () => { }) => {
    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Subiendo votante..."));
        dispatch(onCheckingOperation());


        const { ok, data, errorMessage } = await postVotanteProvider(info);
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "El votante se han subido con éxito" }));
            console.log("Actualizando votante");
            getVotantesbyJornada();
            setTimeout(() => {
                funcion();
            }, 800);


        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo subir el votante" }));
        }

    }
}

export const putVotante = (curp, info, funcion = () => { }) => {
    console.log(curp)
    console.log(info)
    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Editando votante..."));
        dispatch(onCheckingOperation());


        const { ok, data, errorMessage } = await putVotanteProvider(curp, info);
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "El votante se han editado con éxito" }));
            // console.log("Actualizando votante");
            // getVotantesbyJornada();
            setTimeout(() => {
                funcion();
            }, 800);


        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo editar el votante" }));
        }

    }
}



export const getVotantesbyJornada = (idJornada = "") => {
    // console.log("get votante");
    return async (dispatch, getState) => {
        dispatch(startLoadingVotantes());
        const { ok, data, errorMessage } = await getVotantesPorJornadaProvider(idJornada);
        if (ok) {
            dispatch(setVotantes({ votantes: data }));
        }
    }
}



//CAMBIAR LA FAKEAPI POR PROVIDER

export const envioLink = (idJornada = "", funcion = () => { }) => {
    return async (dispatch, getState) => {
        dispatch(onToastCheckingOperation("Eviando enlaces..."));
        dispatch(onCheckingOperation());


        const { ok, data, errorMessage } = await envioLinkAPI(idJornada);
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Se han enviado con exito" }));

            setTimeout(() => {
                funcion();
            }, 500);


        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo enviar" }));
        }
    }
}


//CAMBIAR A PROVIDER
export const envioLinkPersonal = (curp = "", idJornada = "", funcion = () => { }) => {
    return async (dispatch, getState) => {
        dispatch(onToastCheckingOperation("Eviando enlace..."));
        dispatch(onCheckingOperation());


        const { ok, data, errorMessage } = await envioLinkAPI(idJornada, curp);
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Se han enviado con exito" }));

            setTimeout(() => {
                funcion();
            }, 500);


        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo enviar" }));
        }
    }
}


//Cambiar provider
export const getJornadasFormales = () => {

    return async (dispatch, getState) => {
        dispatch(startLoadingFormales());
        const { ok, data, errorMessage } = await getJornadasNoFormalesProvider();
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
export const getEleccionFormal = () => {
    return async (dispatch, getState) => {
        dispatch(startLoadingEleccion());
        const { ok, data, errorMessage } = await getEleccionAPI();

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