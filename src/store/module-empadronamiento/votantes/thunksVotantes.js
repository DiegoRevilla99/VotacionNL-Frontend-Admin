import { envioLinkAPI } from "../../../module-empadronamiento/helpers/FakeAPI";
import { getStatusEmp } from "../../../module-empadronamiento/helpers/getStatusEmp";
import { transformDate } from "../../../module-empadronamiento/helpers/transformDate";
import { getJornadasNoFormalesProvider } from "../../../providers/Micro-NoFormales/providerNoFormales";
import { sendEmailMasivoProvider, sendEmailProvider } from "../../../providers/Micro-TokeEmail/provider";
import { getVotanteDireccionProvider, getVotantesPorJornadaProvider, postCSVProvider, postVotanteJornadaProvider, postVotanteProvider, putVotanteProvider } from "../../../providers/Micro-Votante/providerVotante";
import { onToastCheckingOperation, onToastErrorOperation, onToastSuccessOperation } from "../../ui/uiSlice";
import { endLoadingVotantes, onCheckingOperation, onErrorOperation, onSuccessOperation, setVotantes, setVotanteSelected, startLoadingVotantes } from "./empVotantesSlice";

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


export const postVotante = (info) => {
    return async (dispatch, getState) => {

        // dispatch(onToastCheckingOperation("Subiendo votante..."));
        // dispatch(onCheckingOperation());


        const { ok, data, errorMessage } = await postVotanteProvider(info);
        if (ok) {
            // dispatch(onSuccessOperation());
            // dispatch(onToastSuccessOperation({ successMessage: "El votante se han subido con éxito" }));
            // funcion();

        } else {
            // dispatch(onErrorOperation());
            // dispatch(onToastErrorOperation({ errorMessage: "No se pudo subir el votante" }));
        }

    }
}

export const postJornadaVotante = (info, funcion = () => { }) => {
    console.log("postJornadaVotante: ",info)
    return async (dispatch, getState) => {

        dispatch(onToastCheckingOperation("Subiendo votante..."));
        dispatch(onCheckingOperation());


        const { ok, data, errorMessage } = await postVotanteJornadaProvider(info);
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "El votante se han subido con éxito" }));

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

        dispatch(startLoadingVotantes());
        const { ok, data, errorMessage } = await getVotantesPorJornadaProvider(idJornada);
        try {
            if (ok) {
                if(data.votantes){
                    dispatch(setVotantes({ votantes: data.votantes}));
                }
            } else {
                console.log("ocurrio un error")
            dispatch(setVotantes({ votantes: []}))
            }
        } catch (error) {
            dispatch(setVotantes({ votantes: []}))
        }
        
    }
}



//CAMBIAR LA FAKEAPI POR PROVIDER

export const envioLink = (datan, funcion = () => { }) => {
    return async (dispatch, getState) => {
        dispatch(onToastCheckingOperation("Eviando enlaces..."));
        dispatch(onCheckingOperation());


        const { ok, data, errorMessage } = await sendEmailMasivoProvider(datan);
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
