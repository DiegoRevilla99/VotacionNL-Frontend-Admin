import { getStatusEmp } from "../../../module-empadronamiento/helpers/getStatusEmp";
import { transformDate } from "../../../module-empadronamiento/helpers/transformDate";
import { getJornadasNoFormalesProvider } from "../../../providers/Micro-NoFormales/providerNoFormales";
import { getVotantesPorJornadaProvider } from "../../../providers/Micro-Votante/providerVotante";
import { onToastCheckingOperation, onToastErrorOperation, onToastSuccessOperation } from "../../ui/uiSlice";
import { setJornadasNoFormales, setVotantes, startLoadingJornadasNoFormales, startLoadingVotantes } from "./noFormalesSlice";

export const getJornadasNoFormales = () => {

    return async (dispatch, getState) => {
        dispatch(startLoadingJornadasNoFormales());
        const { ok, data, errorMessage } = await getJornadasNoFormalesProvider();


        if (ok) {
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
            dispatch(setJornadasNoFormales({ jornadasNoFormales: newData }));
        }
    }
}

export const getVotantesbyJornada = (idJornada = "") => {
    console.log("get votante en no formales");
    return async (dispatch, getState) => {
        dispatch(startLoadingVotantes());
        const { ok, data, errorMessage } = await getVotantesPorJornadaProvider(idJornada);
        if (ok) {
            dispatch(setVotantes({ votantes: data }));
        }
    }
}