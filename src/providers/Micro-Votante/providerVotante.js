import { VotanteApi } from "../../module-jornada/api/VotanteApi";

export const postCSVProvider = async (archivo) => {



    return VotanteApi.post(`upload`, archivo).then((response) => {

        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}


export const postVotanteProvider = async (data) => {
    return VotanteApi.post(`/registrard`, data).then((response) => {

        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })
}

export const putVotanteProvider = async (curp, data) => {
    return VotanteApi.put(`votante/${curp}`, data).then((response) => {

        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })
}


/** 
* TODO: Cambiar
*/
export const getVotantesPorJornadaProvider = async (idJornada) => {
    return VotanteApi.get(``).then((response) => {
        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })
}

export const getVotanteDireccionProvider = async (idVotante) => {
    return VotanteApi.get(`votante/${idVotante}`).then((response) => {

        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })
}
