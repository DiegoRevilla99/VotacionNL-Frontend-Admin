import {
    createBoleta, createBoletaAsociaciones, createJornada, deleteBoleta, deleteJornada, getBoletaData, getBoletasJornadaNoFormal, getCandidatoBoletaNoFormal, getJornadasNoFormales, postImage, updateBoletaData
} from "../../../providers/Micro-Preparacion/providerJornadaNoFormal";
import {
    onToastCheckingOperation,
    onToastErrorOperation, onToastSuccessOperation
} from "../../ui/uiSlice";

import { onAddAsociacion, onAddBoleta, onAddCandidato, onAddJornadasNoFormales, onCheckingOperation, onDeleteBoletaData, onDeleteJornadaData, onEditBoleta, onErrorOperation, onFillBoletas, onFillCandidatosNoFormalesData, onFillJornadasNoFormalesData, onSetAsociacionNull, onSetAsociacionSelectedNull, onSetBoletasSelectedNull, onSetCandidatoNull, onSetCandidatoSelectedNull, onSetjornadaNoFormalSelected, onSuccessOperation } from "./SliceJornadaNoFormal";

// Jornadas No Formales
export const onPostImage = (image) => {
    return async (dispatch) => {
        dispatch(onToastCheckingOperation("Subiendo imagen..."));
        dispatch(onCheckingOperation());
        const {ok, data, errorMessage } = await postImage(image);// PROVIDER
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Imagen subida con éxito" }));
            return data;
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo subir la imagen" }));
            return false;
        }
    }
};
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
        dispatch(onToastCheckingOperation("Guardando consulta..."));
        dispatch(onCheckingOperation());
        const {ok, id } = await createJornada(title, tipoEleccion);// PROVIDER
        if (ok) {
            dispatch(onAddJornadasNoFormales({idEleccion: id, nombreEleccion: title}));// SLICE
            dispatch(onSuccessOperation());
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
        dispatch(onToastCheckingOperation("Eliminando jornada..."));
        dispatch(onCheckingOperation());
        const {ok } = await deleteJornada(id);// PROVIDER
        if (ok) {
            dispatch(onDeleteJornadaData(id));// SLICE
            dispatch(onSuccessOperation());
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
            dispatch(onSetCandidatoNull());// SLICE
            dispatch(onSetAsociacionNull());// SLICE
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

export const onCreateBoleta = (data, idJornada, candidatos, onBoletaCreated, navigate = () => {}) => {
    return async (dispatch) => {

        dispatch(onToastCheckingOperation("Guardando boleta..."));
        dispatch(onCheckingOperation());
        const {ok, idEstructuraBoleta } = await createBoleta(data, idJornada, candidatos);// PROVIDER

        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Boleta creada con éxito" }));
            dispatch(onAddBoleta({idEstructuraBoleta, encabezado: data.encabezado}));// SLICE
            onBoletaCreated(idEstructuraBoleta);
            navigate();
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo crear la boleta" }));
        }
    }
};
export const onCreateBoletaAsociaciones = (data, idJornada, candidatos, asociaciones, onBoletaCreated, navigate = () => {}) => {
    return async (dispatch) => {

        dispatch(onToastCheckingOperation("Guardando boleta..."));
        dispatch(onCheckingOperation());
        const {ok, idEstructuraBoleta } = await createBoletaAsociaciones(data, idJornada, candidatos, asociaciones);// PROVIDER
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Boleta creada con éxito" }));
            dispatch(onAddBoleta({idEstructuraBoleta, encabezado: data.encabezado}));// SLICE
            onBoletaCreated(idEstructuraBoleta);
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
        // console.log("IDBOLETA THUNKS: ", idBoleta);
        const {ok, data, dataCandidato, dataAsociacion } = await getBoletaData(idBoleta);// PROVIDER
        console.log("CANDIDATOS EN EL THUNKS",dataCandidato);
        // console.log("boleta EN EL THUNKS",data);
        // console.log("asociacion EN EL THUNKS",dataAsociacion);
        if (ok) {
            dispatch(onSuccessOperation());
            dispatch(onEditBoleta({idBoleta, ...data}));// SLICE
            dispatch(onAddCandidato(dataCandidato));// SLICE
            dispatch(onAddAsociacion(dataAsociacion));// SLICE
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
        dispatch(onToastCheckingOperation("Eliminando boleta..."));
        // dispatch(onCheckingOperation());
        const {ok} = await deleteBoleta(idBoleta);// PROVIDER
        if (ok) {
            dispatch(onDeleteBoletaData(idBoleta));// SLICE
            // dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Boleta eliminada con éxito" }));
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "No se pudo eliminar la boleta" }));
        }
    }
};


