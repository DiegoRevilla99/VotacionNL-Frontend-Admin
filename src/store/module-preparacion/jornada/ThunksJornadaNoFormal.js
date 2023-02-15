import {
    createBoleta, createJornada, deleteBoleta, deleteJornada, getBoletaData, getBoletasJornadaNoFormal, getCandidatoBoletaNoFormal, getJornadasNoFormales, updateBoletaData
} from "../../../providers/Micro-Preparacion/providerJornadaNoFormal";
import {
    onToastCheckingOperation,
    onToastErrorOperation, onToastSuccessOperation
} from "../../ui/uiSlice";

import {
    onAddBoleta, onAddCandidato, onAddJornadasNoFormales, onCheckingOperation, onDeleteBoletaData, onDeleteJornadaData, onEditBoleta, onErrorOperation, onFillBoletas, onFillCandidatosNoFormalesData, onFillJornadasNoFormalesData, onSetAsociacionSelectedNull, onSetBoletasSelectedNull, onSetCandidatoSelectedNull, onSetjornadaNoFormalSelected, onSuccessOperation
} from "./SliceJornadaNoFormal";

// Jornadas No Formales

export const onGetJornadasNoFormales = () => {
    return async (dispatch) => {
        dispatch(onCheckingOperation());
        const {ok, data, errorMessage } = await getJornadasNoFormales(); // PROVIDER
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onFillJornadasNoFormalesData(data));// SLICE
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ 
                errorMessage: errorMessage || "No se pudo obtener las jornadas" }));
        }
    }
};

export const onCreateJornadaNoFormal = (title, tipoEleccion, navigate = (id) => {}) => {
    return async (dispatch) => {
        dispatch(onCheckingOperation());
        dispatch(onToastCheckingOperation("Guardando consulta..."));
        const {ok, id } = await createJornada(title, tipoEleccion);// PROVIDER
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onAddJornadasNoFormales({idEleccion: id, nombreJornada: title}));// SLICE
            dispatch(onToastSuccessOperation({ successMessage: "Jornada creada con éxito" }));
            dispatch(onSetjornadaNoFormalSelected({id, title, boletasNoFormales: []}));
            navigate(id);
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo crear la jornada" }));
        }
    }
};

export const onDeleteJornada = (id) => {
    return async (dispatch) => {
        dispatch(onCheckingOperation());
        dispatch(onToastCheckingOperation("Eliminando jornada..."));
        const {ok } = await deleteJornada(id);// PROVIDER
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onDeleteJornadaData(id));// SLICE
            dispatch(onToastSuccessOperation({ successMessage: "Jornada eliminada con éxito" }));
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo eliminar la jornada" }));
        }
    }
};


export const onGetBoletasNoFormales = (idJornada, navigate = () => {} ) => {
    return async (dispatch) => {
        dispatch(onCheckingOperation());
        const {ok, data, errorMessage } = await getBoletasJornadaNoFormal(idJornada);// PROVIDER
        console.log("retorno del back en boletas",data);  
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onSetBoletasSelectedNull());
            dispatch(onSetCandidatoSelectedNull());
            dispatch(onSetAsociacionSelectedNull());
            dispatch(onFillBoletas(data));// SLICE
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ 
                errorMessage: errorMessage || "No se pudo obtener las boletas" }));
        }
    }
};

export const onGetCandidatosNoFormales = (idBoleta, navigate = () => {} ) => {
    return async (dispatch) => {
        dispatch(onCheckingOperation());
        const {ok, data } = await getCandidatoBoletaNoFormal(idBoleta);// PROVIDER
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onFillCandidatosNoFormalesData(data));// SLICE
            navigate();
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo obtener los candidatos" }));
        }
    }
};

export const onCreateBoleta = (data, idJornada, candidatos, asociaciones, navigate = () => {}) => {
    return async (dispatch) => {
        console.log("data THUNKS: ", data);
		console.log("idJornadaElectoral THUNKS: ", idJornada);
		console.log("candidatos THUNKS: ", candidatos);
		console.log("asociaciones THUNKS: ", asociaciones);
        dispatch(onCheckingOperation());
        dispatch(onToastCheckingOperation("Guardando boleta..."));
        const {ok, idEstructuraBoleta } = await createBoleta(data, idJornada, candidatos, asociaciones);// PROVIDER
        console.log("IDBOLETA THUNKS: ", idEstructuraBoleta);
		// console.log("idJornadaElectoral THUNKS: ", idJornadaElectoral);
		// console.log("candidatos THUNKS: ", candidatos);
		// console.log("asociaciones THUNKS: ", asociaciones);
        // dispatch(onSetjornadaNoFormalSelected({id, title, boletasNoFormales: []}));
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Boleta creada con éxito" }));
            dispatch(onAddBoleta({idEstructuraBoleta, encabezado: data.encabezado}));// SLICE
            navigate();
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo crear la boleta" }));
        }
    }
};

export const onGetBoletaData = (idBoleta, navigate = () => {}) => {
    return async (dispatch) => {
        dispatch(onCheckingOperation());
        console.log("IDBOLETA THUNKS: ", idBoleta);
        const {ok, data, dataCandidato } = await getBoletaData(idBoleta);// PROVIDER
        console.log("CANDIDATOS EN EL THUNKS",dataCandidato);
        console.log("boleta EN EL THUNKS",data);
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onEditBoleta({idBoleta, ...data}));// SLICE
            dispatch(onAddCandidato(dataCandidato));// SLICE
            navigate();
        } else {
            dispatch(onErrorOperation());
            // dispatch(onToastErrorOperation({ errorMessage: errorMessage || "No se pudo obtener la boleta" }));
        }
    }
};


export const onUpdateBoletaData = (
    values, 
    idJornada, 
    candidatos, 
    asociaciones, 
    idBoleta,
    navigate = () => {}) => {
        return async (dispatch) => {
            dispatch(onCheckingOperation());
            console.log("VALORES EN EL THUNKS",idBoleta);
            const { ok } = await updateBoletaData(values, idJornada, candidatos, asociaciones, idBoleta );// PROVIDER
            if (ok) {
                dispatch(onSuccessOperation());
                console.log("BOLETA ACTUALIZADA");
                navigate();
            } else {
            dispatch(onErrorOperation());
            // dispatch(onToastErrorOperation({ errorMessage: errorMessage || "No se pudo actualizar la boleta" }));
            }
        }
    };

export const onDeleteBoleta = (idBoleta) => {
    return async (dispatch) => {
        dispatch(onCheckingOperation());
        dispatch(onToastCheckingOperation("Eliminando boleta..."));
        const {ok} = await deleteBoleta(idBoleta);// PROVIDER
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onDeleteBoletaData(idBoleta));// SLICE
            dispatch(onToastSuccessOperation({ successMessage: "Boleta eliminada con éxito" }));
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo eliminar la boleta" }));
        }
    }
};


