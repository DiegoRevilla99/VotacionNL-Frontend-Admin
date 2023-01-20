import { getJornadasNoFormalesProvider } from "../../../providers/Micro-NoFormales/providerNoFormales";
import { onToastCheckingOperation, onToastErrorOperation, onToastSuccessOperation } from "../../ui/uiSlice";
import { setJornadasNoFormales, startLoadingJornadasNoFormales } from "./noFormalesSlice";

export const getJornadasNoFormales = () => {

    return async (dispatch, getState) => {
        dispatch(startLoadingJornadasNoFormales());
        const { ok, data, errorMessage } = await getJornadasNoFormalesProvider();
        if (ok) {
            dispatch(setJornadasNoFormales({ jornadasNoFormales: data }));
        }
    }
}