import { JornadaApi } from "../../../module-preparacion/api/JornadaApi";
import { getConfigJornadaAPI } from "../../../module-preparacion/helpers/ApiConfigJornada";
import {
    onToastCheckingOperation,
    onToastErrorOperation,
    onToastOffOperation,
    onToastSuccessOperation,
} from "../../ui/uiSlice";
import { endLoadingConfigJornada, setErrorJornada, setConfigJornada, startLoadingConfigJornada } from "./configJornadaSlice";

export const getConfigJornada = (idJornada) => {

    return async (dispatch, getState) => {

        dispatch(startLoadingConfigJornada());
        const data = await getConfigJornadaAPI(idJornada);
        console.log(data)
        dispatch(setConfigJornada({ configJornada: data }));


        /* JornadaApi.get(`${idJornada}`).then((response) => {

            const { httpCode, mensaje, data } = response.data;

            if (httpCode === "NOT_FOUND") {
                dispatch(setErrorJornada({ errorJornada: mensaje }));
            } else {

                dispatch(setConfigJornada({ configJornada: data }));
            }


        }).catch((error) => {
            console.log(error)
            dispatch(endLoadingConfigJornada());
        }) */




    }
}