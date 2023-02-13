import { JornadaVotanteApi } from "../../module-jornada/api/JornadaVotanteAPI";
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

export const postVotanteJornadaProvider = async (data) => {
    console.log("postVotanteJornadaProvider:",data)
    // return { ok: true, data: [], errorMessage: "" };
    return JornadaVotanteApi.post(``, data).then((response) => {
        console.log(response)
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
    return JornadaVotanteApi.get(`votantexjornada/${idJornada}`).then((response) => {
        console.log("votantesbyJornad: ",response)
        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })
}

export const getVotanteDireccionProvider = async (idVotante) => {
    return VotanteApi.get(`${idVotante}/direccion`).then((response) => {

        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })
}

