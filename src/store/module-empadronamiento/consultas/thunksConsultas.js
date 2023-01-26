import { getConsultaAPI } from "../../../module-empadronamiento/helpers/FakeAPI";
import { getStatusEmp } from "../../../module-empadronamiento/helpers/getStatusEmp";
import { transformDate } from "../../../module-empadronamiento/helpers/transformDate";
import { getConsultaConfigbyID, getConsultasCiudadanasConfig } from "../../../providers/Micro-Consultas/provider";
import { setConsultas, setEleccion, startLoadingConsultas, startLoadingEleccion } from "./consultasSlice";

export const getConsultasConfig = () => {

    return async (dispatch, getState) => {
        dispatch(startLoadingConsultas());
        const { ok, data, errorMessage } = await getConsultasCiudadanasConfig();


        if (ok) {
            let newData = data.map((eleccion) => {
                let ne = {
                    ...eleccion.jornadaModel
                    , ...eleccion.configuracionModel,
                }
                ne.status = getStatusEmp(ne.inicioEmpadronamiento, ne.finEmpadronamiento)
                ne.inicioEmpadronamiento = transformDate(ne.inicioEmpadronamiento)
                ne.finEmpadronamiento = transformDate(ne.finEmpadronamiento)
                return ne;
            })
            dispatch(setConsultas({ consultas: newData }));
        }
    }
}

//Cambiar provider
//Get Eleccion con su config
export const getEleccionFormal = (id) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingEleccion());
        const { ok, data, errorMessage } = await getConsultaConfigbyID(id);

        let newData = {
            ...data.jornadaModel
            , ...data.configuracionModel,
        }
        newData.status = getStatusEmp(newData.inicioEmpadronamiento, newData.finEmpadronamiento)
        newData.inicioEmpadronamiento = transformDate(newData.inicioEmpadronamiento)
        newData.finEmpadronamiento = transformDate(newData.finEmpadronamiento)
        console.log(newData)

        if (ok) {
            dispatch(setEleccion({ eleccion: newData }));
        }
    }
}