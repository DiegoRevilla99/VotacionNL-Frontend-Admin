import { addBoletaApi, addComiteApi, addPlanillaApi, editBoletaApi, getBoletasApi } from "../../../module-preparacion/helpers/ApiComite";
import { onCheckingOperation, onErrorOperation, onSuccessOperation, setBoletas, startLoadingBoletas, startLoadingComites } from "./comiteSlice";
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


export const saveComite = (valores = {}, guardar = () => { }) => {

    return async (dispatch) => {
        dispatch(onToastCheckingOperation("Guardando comite..."));
        dispatch(onCheckingOperation());

        const result = await addComiteApi(valores);

        if (result) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Comité se guardó con éxito" }));
            guardar();
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "El comité no se pudo guardar" }));
        }
    };
};

export const savePlanilla = (valores = {}, guardar = () => { }) => {

    return async (dispatch) => {
        dispatch(onToastCheckingOperation("Guardando planilla..."));
        dispatch(onCheckingOperation());

        const result = await addPlanillaApi(valores);

        if (result) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "Planilla se guardó con éxito" }));
            guardar();
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "La Planilla no se pudo guardar" }));
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