import { EstructuraBoletaApi } from "../../module-preparacion/api/EstructuraBoletaApi";
import { JornadaApi } from "../../module-preparacion/api/JornadaApi"

export const getCoalicionesProvider = async (idBoleta) => {
    //const coaliciones = await getCoalicionesAPI();
    return JornadaApi.get(`boleta/${idBoleta}/coaliciones`).then((response) => {
        return { ok: true, data: response.data.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

}

export const getBoletaProvider = async (idBoleta) => {
    // const { data } = await getBoletaAPI(idBoleta);
    return EstructuraBoletaApi.get(`${idBoleta}`).then((response) => {
        const { httpCode, mensaje, data } = response.data;
        if (httpCode === "NOT_FOUND") {
            return { ok: true, data: "", errorMessage: "NOT_FOUND" };
        } else {
            return { ok: true, data: response.data.data, errorMessage: "" };

        }
    }).catch((error) => {
        console.log(error)
        return { ok: false, data: "", errorMessage: error.message };
    })

}


export const getCandidatosProvider = async (idBoleta) => {

    //const partidos = await getCandidatosAPI();
    return JornadaApi.get(`boleta/${idBoleta}/candidatos_sin_coaliciones`).then((response) => {

        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        return { ok: false, data: "", errorMessage: error.message };
    })
}



/** 
* TODO: Por comprobar funcionalidad
*/
export const postCoalicionProvider = async (data) => {

    return CoalicionApi.post("", data).then((response) => {
        console.log(response)
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        return { ok: false, data: "", errorMessage: error.message };
    });

}



