const configVote = {
    tiempoDuracionVoto: "03:00:00",
    tiempoExtraVoto: "00:30:00",
    dispVerificacion: false
}
const configJornada = {
    configuracionModel: {
        idConfig: 1,
        inicioDisponibilidad: "2029-06-04T20:38:38.604+00:00",
        inicioEmpadronamiento: "2029-06-04T20:38:38.604+00:00",
        inicioRecepVoto: "2029-07-24T08:00:00.050+00:00",
        inicioAssignPass: "2029-07-24T20:38:38.604+00:00",
        finDisponibilidad: "2029-07-24T20:38:38.604+00:00",
        finEmpadronamiento: "2029-07-23T20:38:38.604+00:00",
        finRecepVoto: "2029-07-24T20:00:00.050+00:00",
        finAssignPass: "2029-07-24T20:39:00.604+00:00"
    },
    configVotoModel: {
        idConfigvoto: 20,
        tiempoDuracionVoto: "00:01:00",
        tiempoExtraVoto: "00:10:00",
        dispVerificacion: true
    }
}



export const getConfigJornadaAPI = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(configJornada);
        }, 1000);

    });

}

export const putConfigJornadaAPI = () => {
    console.log("entre en dongi2");
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve("Guuaradado");
        }, 1500);

    });

}

