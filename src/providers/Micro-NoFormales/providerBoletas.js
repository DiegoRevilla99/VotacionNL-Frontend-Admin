import { jornadaNoFormalAPI } from "./config";

export const getBoletaProvider = async (idBoleta) => {
    // const { data } = await getBoletaAPI(idBoleta);
    return jornadaNoFormalAPI.get(`jornada/no_formal/estructura_boleta/${idBoleta}`).then((response) => {
        console.log(response.data)
        const { httpCode, mensaje, data } = response;
        if (httpCode === "NOT_FOUND") {
            return { ok: true, data: "", errorMessage: "NOT_FOUND" };
        } else {
            return { ok: true, data: data, errorMessage: "" };

        }
    }).catch((error) => {
        console.log(error)
        return { ok: false, data: "", errorMessage: error.message };
    })

}