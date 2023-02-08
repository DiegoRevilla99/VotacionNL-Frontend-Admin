export const getEleccionFormalByIDNF = async (id) => {
    return JornadaFormalApi.get(`${id}`).then((response) => {
        console.log(response);
        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}


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