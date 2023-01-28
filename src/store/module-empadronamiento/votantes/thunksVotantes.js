import { envioLinkAPI } from "../../../module-empadronamiento/helpers/FakeAPI";
import { getStatusEmp } from "../../../module-empadronamiento/helpers/getStatusEmp";
import { transformDate } from "../../../module-empadronamiento/helpers/transformDate";
import { getJornadasNoFormalesProvider } from "../../../providers/Micro-NoFormales/providerNoFormales";
import { sendEmailProvider } from "../../../providers/Micro-TokeEmail/provider";
import { getVotanteDireccionProvider, getVotantesPorJornadaProvider, postCSVProvider, postVotanteProvider, putVotanteProvider } from "../../../providers/Micro-Votante/providerVotante";
import { onToastCheckingOperation, onToastErrorOperation, onToastSuccessOperation } from "../../ui/uiSlice";
import { onCheckingOperation, onErrorOperation, onSuccessOperation, setJornadasFormales, setVotantes, setVotanteSelected, startLoadingFormales, startLoadingVotantes } from "./empVotantesSlice";

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

    return async (dispatch, getState) => {
        console.log("obteniendo los votantes votante");
        dispatch(startLoadingVotantes());
        const { ok, data, errorMessage } = await getVotantesPorJornadaProvider(idJornada);
        if (ok) {
            dispatch(setVotantes({ votantes: data }));
        } else {
            console.log("ocurrio un error")
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
export const envioLinkPersonal = (senddata, funcion = () => { }) => {
    return async (dispatch, getState) => {
        dispatch(onToastCheckingOperation("Eviando enlace..."));
        dispatch(onCheckingOperation());


        const { ok, data, errorMessage } = await sendEmailProvider(senddata);

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


export const getVotanteDireccion = (idVotante) => {
    return async (dispatch, getState) => {
        dispatch(setVotanteSelected({ votanteSelected: null }));
        const { ok, data, errorMessage } = await getVotanteDireccionProvider(idVotante);
        let newData = { ...data.votanteModel, ...data.direccionModel }
        if (ok) {
            dispatch(setVotanteSelected({ votanteSelected: newData }));
        } else {
            dispatch(setVotanteSelected({ votanteSelected: null }));
        }
    }
}
