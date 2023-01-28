import { JornadaFormalApi } from "../../module-jornada/api/JornadaFormalAPI";

export const getJornadasFormalesProvider = async () => {
    return JornadaFormalApi.get(`allConfig/`).then((response) => {
        console.log(response)
        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}

export const getEleccionFormalProvider = async (id) => {
    return JornadaFormalApi.get(`configuraciones_disp/${id}`).then((response) => {
        console.log(response)
        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}