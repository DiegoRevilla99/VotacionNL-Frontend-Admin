import { CoalicionApi } from "../../module-preparacion/api/CoalicionApi";
import { EstructuraBoletaApi } from "../../module-preparacion/api/EstructuraBoletaApi";
import { JornadaApi } from "../../module-preparacion/api/JornadaApi"
import { deleteCoalicionAPI, getCandidatosAPI, getCoalicionesAPI, postCoalicionAPI, putCoalicionAPI } from "../../module-preparacion/helpers/ApiConfigBoletas";

export const getCoalicionesProvider = async (idBoleta) => {

    //ENDPOINT REAL
    return JornadaApi.get(`estructuraboleta/${idBoleta}/datos_cand_coalicion`).then((response) => {
        
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    })

    
    //ENDPOINT FAKE
    
    /* return getCoalicionesAPI(idBoleta).then((response) => {
        return { ok: true, data: response, errorMessage: "" };
    }).catch((error) => {
        console.log(error);
        return { ok: false, data: "", errorMessage: error.message };
    }) */

}

export const getBoletaProvider = async (idBoleta) => {
    

    //ENDPOINT REAL
    return EstructuraBoletaApi.get(`${idBoleta}`).then((response) => {

        
        const { httpCode } = response.data;
        if (httpCode === "NOT_FOUND") {
            return { ok: true, data: "", errorMessage: "NOT_FOUND" };
        } else {
            return { ok: true, data: response.data.data, errorMessage: "" };

        }
    }).catch((error) => {
        console.log(error)
        return { ok: false, data: "", errorMessage: error.message };
    })


    //ENDPOINT FAKE
    // const { data } = await getBoletaAPI(idBoleta);
}


export const getCandidatosProvider = async (idBoleta) => {
    //ENDPOINT REAL
   
    return JornadaApi.get(`estructuraboleta/${idBoleta}/datos_cand_sin_coalicion`).then((response) => {
        console.log("Candidatos: ")
        
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




export const postCoalicionProvider = async (idboleta,idcandidato,data) => {

    //ENDPOINT REAL

    return JornadaApi.post(`coalicionpartidos/${idboleta}/${idcandidato}`, data).then((response) => {
        console.log(response)
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        return { ok: false, data: "", errorMessage: error.message };
    });


    //ENDPOINT FAKE
    /* return postCoalicionAPI().then((response) => {

        return { ok: true, data: response, errorMessage: "" };
    }).catch((error) => {
        return { ok: false, data: "", errorMessage: error.message };
    }); */

}

export const putCoalicionProvider = async (id,data) => {

    //ENDPOINT REAL

    /* return JornadaApi.put(`coalicion/${id}`, data).then((response) => {
        console.log(response)
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        return { ok: false, data: "", errorMessage: error.message };
    }); */


    //ENDPOINT FAKE
    return putCoalicionAPI().then((response) => {

        return { ok: true, data: response, errorMessage: "" };
    }).catch((error) => {
        return { ok: false, data: "", errorMessage: error.message };
    });

}


export const deleteCoalicionProvider = async (data) => {

    //ENDPOINT REAL

    /* return CoalicionApi.delete("").then((response) => {
        console.log(response)
        return { ok: true, data: response.data, errorMessage: "" };
    }).catch((error) => {
        return { ok: false, data: "", errorMessage: error.message };
    }); */


    //ENDPOINT FAKE
    return deleteCoalicionAPI().then((response) => {
        return { ok: true, data: response, errorMessage: "" };
    }).catch((error) => {
        return { ok: false, data: "", errorMessage: error.message };
    });

}



