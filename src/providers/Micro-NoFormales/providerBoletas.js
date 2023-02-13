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



export const putCandVotoNFProvider = async (idBoleta,datasend) => {
    // const { data } = await getBoletaAPI(idBoleta);
    console.log("data:",datasend)
    return jornadaNoFormalAPI.put(`jornada/no_formal/boleta/${idBoleta}/modalidad/config_candnoreg_votonull`,datasend).then((response) => {
        console.log("CandReg: ",response)
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error)
        return { ok: false, data: "", errorMessage: error.message };
    })

}

export const putMaxMinNFProvider = async (idBoleta,datasend) => {
    // const { data } = await getBoletaAPI(idBoleta);
    console.log("data:",datasend)
    return jornadaNoFormalAPI.put(`jornada/no_formal/boleta/${idBoleta}/modalidadvotacion/config_min_max`,datasend).then((response) => {
        console.log("MAxMin:",response)
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error)
        return { ok: false, data: "", errorMessage: error.message };
    })

}


/* export const getBoletaProvider = async (idBoleta) => {
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

} */