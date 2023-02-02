import { jornadaNoFormalAPI } from "./config";

export const getCandidatosProviderNF = async (idBoleta) => {
    //ENDPOINT REAL
    console.log("CandidatosNF")
    return jornadaNoFormalAPI.get(`jornada/no_formal/estructura_boleta/${idBoleta}/candidatos`).then((response) => {
        
        console.log(response)
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        return { ok: false, data: "", errorMessage: error.message };
    })

    //ENDPOINT FAKE

    /* return getCandidatosAPI(idBoleta).then((response) => {

        return { ok: true, data: response, errorMessage: "" };
    }).catch((error) => {
        return { ok: false, data: "", errorMessage: error.message };
    })  */
    
}
