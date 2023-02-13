import { jornadaNoFormalAPI } from "./config";

export const getConfigEleccionFormalProviderNF = async (id) => {

    //REAL
    /* return JornadaFormalApi.get(`configuraciones_disp/${id}`).then((response) => {

        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    }) */

    //FAKE
    console.log("entre a config ")
    return getConfigJornadaAPI(id).then((response) => {
        return { ok: true, data: response, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}


export const putConfigEleccionFormalProviderNF = async (idboleta,datainfo) => {

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



//______________________CONFIGURACION____________________________________________

export const getConfigEleccionNFProvider = async (id) => {
    console.log("get config no formal")
    //REAL
    return jornadaNoFormalAPI.get(`jornada/no_formal/${id}/informacion/`).then((response) => {
        console.log(response);
        return { ok: true, data: response.data, errorMessage: "" };
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

export const getEleccionFormalByIDNF = async (id) => {
    console.log("get jornada no formal")
    return jornadaNoFormalAPI.get(`jornada/no_formal/${id}`).then((response) => {
        console.log(response);
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}

export const postConfigEleccionNFProvider = async (id,datainfo) => {
    console.log("entre a postprovider: ",datainfo);
    //REAL
    return jornadaNoFormalAPI.post(`jornada/no_formal/${id}/registrar/configuraciones`,datainfo).then((response) => {
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
