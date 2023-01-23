import { getStatusEmp } from "../../../module-empadronamiento/helpers/getStatusEmp";
import { transformDate } from "../../../module-empadronamiento/helpers/transformDate";
import { getConsultasCiudadanasConfig } from "../../../providers/Micro-Consultas/provider";
import { setConsultas, startLoadingConsultas } from "./consultasSlice";

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