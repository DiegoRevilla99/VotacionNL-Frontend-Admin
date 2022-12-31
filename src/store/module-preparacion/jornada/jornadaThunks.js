import { addBoletaApi, addJornadaApi, addPartidoApi, addCandidatoandSuplenteApi, editBoletaApi } from "../../../module-preparacion/helpers/ApiJornada";
import { onCheckingOperation, onErrorOperation, onSuccessOperation, setBoletas, setCandidatosandSuplente,setErrorPartidos,  setErrorBoletas, setErrorCandidateandSuplente, setPartidos, startLoadingBoletas, startLoadingCandidatosandSuplente, startLoadingJornadas } from "./jornadaSlice";
import {
    onToastCheckingOperation,
    onToastErrorOperation,
    onToastOffOperation,
    onToastSuccessOperation,
} from "../../ui/uiSlice";

import { jornadasAPI } from "../../../providers/Micro-Preparacion/configJornada";

const getDataBoletas = async (idBoleta) => {
	try {
		// **FETCH
		const { data } = await jornadasAPI.get(
			"jornada/electoral/estructuraboleta/" + idBoleta 
		);
		// console.log("RESPUESTA PAPELETAS: ", resp);
		return { ok: true, data: data.data };
	} catch (error) {
		return { ok: false };
	}
}

export const getBoletas = () => {

    return async (dispatch, getState) => {

        dispatch(startLoadingBoleta());
        jornadasAPI.get(`jornada/electoral/estructurasboletas`).then((response) => {
            const { httpCode, mensaje, data } = response.data;
            if (httpCode === "NOT_FOUND") {
                dispatch(setErrorBoletas({ errorBoleta: mensaje }));
            } else {

                dispatch(setBoletas({ boleta: data }));
            }
        }).catch((error) => {
            console.log(error)
            dispatch(endLoadingBoleta());
        })
    }
}

// export const getPartidos = (idpartido) => {

//     return async (dispatch, getState) => {

//         dispatch(startLoadingPartidos());
//         jornadasAPI.get(`jornada/electoral/partido/`+idpartido).then((response) => {
//             const { httpCode, mensaje, data } = response.data;
//             if (httpCode === "NOT_FOUND") {
//                 dispatch(setErrorPartidos({ errorBoleta: mensaje }));
//             } else {

//                 dispatch(setPartidos({ boleta: data }));
//             }
//         }).catch((error) => {
//             console.log(error)
//             dispatch(endLoadingPartidos());
//         })
//     }
// }

export const getPartidos = () => 
{
    return async (dispatch) => {
        const { ok, data, errorMessage } = await getDataPartidos();
        if (ok) {
            dispatch(setPartidos({ partidos: data }));
        }
        else {
            dispatch(setErrorPartidos({ errorPartidos: errorMessage }));
            dispatch(onToastErrorOperation({ errorMessage: errorMessage }));
        }
    }
}

export const updateBoleta = (idBoleta, data) => {
    return async (dispatch, getState) => {
        const response = await jornadasAPI.put(`jornada/electoral/estructuraboleta/${idBoleta}`, data);
        jornadasAPI.get(`jornada/electoral/estructuraboleta/${idBoleta}`).then((response) => {
            const { httpCode, mensaje, data } = response.data;
            if (httpCode === "NOT_FOUND") {
                dispatch(setErrorBoletas({ errorBoleta: mensaje }));
            } else {
                dispatch(setBoletas({ boleta: data }));
            }
        }).catch((error) => {
            console.log(error)
            dispatch(endLoadingBoleta());
        })
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

export const saveCandidatoandSuplente = (valores = {}, guardar = () => { }) => {

    return async (dispatch) => {
        dispatch(onToastCheckingOperation("Guardando candidato..."));
        dispatch(onCheckingOperation());

        const result = await addCandidatoandSuplenteApi(valores);

        if (result) {
            dispatch(onSuccessOperation());
            dispatch(onToastSuccessOperation({ successMessage: "El candidato con su suplente se guardó con éxito" }));
            guardar();
        } else {
            dispatch(onErrorOperation());
            dispatch(onToastErrorOperation({ errorMessage: "El candidato con su suplente no se pudo guardar" }));
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

export const getCandidatosandSuplentes = (idBoleta) => {

    return async (dispatch, getState) => {

        dispatch(startLoadingCandidatosandSuplente());
        // const { data } = await EstructuraBoletaApi.get(`${idBoleta}/candidatos`);
        // const partidos = data.data
        const candidatosandSuplentes = await addCandidatoandSuplenteApi();
        // const newPartidos = partidos.filter((candidato) => {
        //     if (candidato.partidoModel.coalicionModel.claveCoalicion == 12) return candidato
        // })
        dispatch(setCandidatosandSuplente({ candidatos: candidatosandSuplentes }));
    }
    
}

export const getCandidatosSuplentes = (idBoleta) => {
    return async (dispatch, getState) => {

        dispatch(startLoadingCandidatosandSuplente());
        jornadasAPI.get(`jornada/electoral/candidatos`).then((response) => {
            const { httpCode, mensaje, data } = response.data;
            if (httpCode === "NOT_FOUND") {
                dispatch(setErrorCandidateandSuplente({ errorBoleta: mensaje }));
            } else {

                dispatch(setCandidatosandSuplente({ boleta: data }));
            }
        }).catch((error) => {
            console.log(error)
            dispatch(endLoadingBoleta());
        })
    }
}