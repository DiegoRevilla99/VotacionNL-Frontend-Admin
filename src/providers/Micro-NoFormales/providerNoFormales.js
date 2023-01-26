import { JornadaNoFormalApi } from "../../module-jornada/api/JornadaNoFormalApi";


export const getJornadasNoFormalesProvider = async () => {
    return JornadaNoFormalApi.get(`informacion`).then((response) => {
        console.log(response)
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}

export const getEleccionConfigByIdProvider = async (idEleccion) => {
    return JornadaNoFormalApi.get(`${idEleccion}/informacion`).then((response) => {
        console.log("respuesta dde la api")
        console.log(response)
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}