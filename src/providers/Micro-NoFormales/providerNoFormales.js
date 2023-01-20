import { JornadaNoFormalApi } from "../../module-jornada/api/JornadaNoFormalApi";


export const getJornadasNoFormalesProvider = async () => {
    return JornadaNoFormalApi.get(`elecciones`).then((response) => {
        console.log(response)
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}