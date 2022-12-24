import { addBoletaApi, addJornadaApi, addPartidoApi, editBoletaApi, getBoletasApi } from "../../../module-preparacion/helpers/ApiJornada";
import { onCheckingOperation, onErrorOperation, onSuccessOperation, setBoletas, startLoadingBoletas, startLoadingJornadas } from "./jornadaSlice";
import {
    onToastCheckingOperation,
    onToastErrorOperation,
    onToastOffOperation,
    onToastSuccessOperation,
} from "../../ui/uiSlice";

const getDataBoletas = (boletas) => {
    const newData = boletas.map((boleta) => {
        const newboleta = {
            candidato: boleta.nombre,
        }
        return newboleta;
    })

    return newData;
}

export const getBoletas = () => {

    return async (dispatch, getState) => {
        dispatch(startLoadingBoletas());
        const boletas = await getBoletasApi();
        const data = getDataBoletas(boletas);
        dispatch(setBoletas({ boletas: data }));
    }
}

export const saveBoleta = (valores, guardar) => {

    return async (dispatch) => {
        dispatch(onToastCheckingOperation("Guardando boleta..."));
        dispatch(onCheckingOperation());

        const result = await addBoletaApi(valores);

        if (result) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Boleta guardada con éxito" }));
            guardar();
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La boleta no se pudo guardar" }));
        }
    };
};


export const saveJornada = (valores = {}, guardar = () => { }) => {

    return async (dispatch) => {
        dispatch(onToastCheckingOperation("Guardando jornada..."));
        dispatch(onCheckingOperation());

        const result = await addJornadaApi(valores);

        if (result) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Jornada se guardó con éxito" }));
            guardar();
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La jornada no se pudo guardar" }));
        }
    };
};

export const savePartido = (valores = {}, guardar = () => { }) => {

    return async (dispatch) => {
        dispatch(onToastCheckingOperation("Guardando partido..."));
        dispatch(onCheckingOperation());

        const result = await addPartidoApi(valores);

        if (result) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Partido se guardó con éxito" }));
            guardar();
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "El partido no se pudo guardar" }));
        }
    };
};

export const saveCandidato = (valores = {}, guardar = () => { }) => {

    return async (dispatch) => {
        dispatch(onToastCheckingOperation("Guardando candidato..."));
        dispatch(onCheckingOperation());

        const result = await addPartidoApi(valores);

        if (result) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "candidato se guardó con éxito" }));
            guardar();
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "El candidato no se pudo guardar" }));
        }
    };
};


export const editBoleta = (valores = {}, guardar = () => { }) => {

    return async (dispatch) => {
        dispatch(onToastCheckingOperation("Editando boleta..."));
        dispatch(onCheckingOperation());

        const result = await editBoletaApi(valores);

        if (result) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Boleta se editó con éxito" }));
            guardar();
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La boleta no se pudo guardar" }));
        }
    };
};