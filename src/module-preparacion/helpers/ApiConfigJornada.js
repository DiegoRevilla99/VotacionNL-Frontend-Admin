const configVote = {
    tiempoDuracionVoto: "03:00:00",
    tiempoExtraVoto: "00:30:00",
    dispVerificacion: false
}
const configJornada = {
    idConfig: 7,
    inicioDisponibilidad: "2019-07-04T20:38:38.604+00:00",
    inicioEmpadronamiento: "2019-07-04T20:38:38.604+00:00",
    inicioRecepVoto: "2019-07-04T20:38:38.604+00:00",
    inicioAssignPass: "2019-07-04T20:38:38.604+00:00",
    finDisponibilidad: "2019-07-04T20:38:38.604+00:00",
    finEmpadronamiento: "2019-07-04T20:38:38.604+00:00",
    finRecepVoto: "2019-07-04T20:38:38.604+00:00",
    finAssignPass: "2019-07-04T20:38:38.604+00:00",
    jornadaModel: {
        idJornada: "JO-EL-GO-OR-20-OAX-2022",
        nombreJornada: "JORNADA ELECTORAL GOBERNADOR ORDINARIA 2023",
        dateTimeCreation: "2019-07-04T20:38:38.604+00:00",
        userCreation: "ALEJANDRO",
        entidad: "OAXACA",
        tipoJornada: "ORDINARIA",
        formalidad: "FORMAL"
    },
    configVote
}



export const getConfigJornadaAPI = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(configJornada);
        }, 2000);

    });

}

