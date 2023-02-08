import { JornadaFormalApi } from "../../module-jornada/api/JornadaFormalAPI";
import { getConfigJornadaAPI, putConfigJornadaAPI } from "../../module-preparacion/helpers/ApiConfigJornada";

export const getJornadasFormalesProvider = async () => {
    return JornadaFormalApi.get(`allConfig/`).then((response) => {

        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}


export const getEleccionFormalProvider = async (id) => {
    return JornadaFormalApi.get(`configuraciones_disp/${id}`).then((response) => {
        console.log(response);
        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}

export const getEleccionFormalByID = async (id) => {
    return JornadaFormalApi.get(`${id}`).then((response) => {
        console.log(response);
        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}


export const getConfigEleccionFormalProvider = async (id) => {
    
    //REAL
    return JornadaFormalApi.get(`config/${id}`).then((response) => {
        console.log(response);
        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

    //FAKE
    /* console.log("entre a config ")
    return getConfigJornadaAPI(id).then((response) => {
        return { ok: true, data: response, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    }) */

}


export const putConfigEleccionFormalProvider = async (idboleta,datainfo) => {

    //REAL
    /* return JornadaFormalApi.get(`configuraciones_disp/${id}`).then((response) => {

        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    }) */

    //FAKE
    console.log("entre a config ")
    return putConfigJornadaAPI(idboleta,datainfo).then((response) => {
        return { ok: true, data: response, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}


export const postConfigEleccionFormalProvider = async (id,datainfo) => {
    console.log("entre a postprovider: ",datainfo);
    //REAL
    return JornadaFormalApi.post(`regconfigs/${id}`,datainfo).then((response) => {
        console.log("send data: ",datainfo);
        console.log("Post de cnfiguraciones:",response);
        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

    //FAKE
    /* console.log("entre a config ")
    return putConfigJornadaAPI(idboleta,datainfo).then((response) => {
        return { ok: true, data: response, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    }) */

}