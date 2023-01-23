const eleccionConfig = {
    eleccionModel: {
        idEleccion: "EL-DE-CO-ES-GE-ORD-2023",
        nombreEleccion: "ELECCION DE CONSEJO ESTUDIANTIL GESTIONN.",
        dateTimeCreation: "2019-07-04T20:38:38.604+00:00",
        userCreation: "ALEJANDRO",
        tipoEleccion: "ORDINARIA"
    },
    configuracionModel: {
        idConfig: 1,
        inicioDisponibilidad: "2022-07-04T20:38:38.604+00:00",
        inicioEmpadronamiento: "2022-07-04T20:38:38.604+00:00",
        inicioRecepVoto: "2022-07-04T20:38:38.604+00:00",
        inicioAssignPass: "2022-07-04T20:38:38.604+00:00",
        finDisponibilidad: "2019-07-04T20:38:38.604+00:00",
        finEmpadronamiento: "2019-07-04T20:38:38.604+00:00",
        finRecepVoto: "2019-07-04T20:38:38.604+00:00",
        finAssignPass: "2019-07-04T20:38:38.604+00:00",
        eleccionModel: {
            idEleccion: "EL-DE-CO-ES-GE-ORD-2023",
            nombreEleccion: "ELECCION DE CONSEJO ESTUDIANTIL GESTIONN.",
            dateTimeCreation: "2019-07-04T20:38:38.604+00:00",
            userCreation: "ALEJANDRO",
            tipoEleccion: "ORDINARIA"
        }
    }
}


const consultaConfig = {
    jornadaModel: {
        idJornada: "Co-de-pr-nu-cu-OAX-2023",
        nombreJornada: "Consulta de prueba numero cuatro",
        dateTimeCreation: "2019-07-04T20:38:38.604+00:00",
        userCreation: "DEFAULT",
        entidad: "OAXACA"
    },
    configuracionModel: {
        idConfig: 1,
        inicioDisponibilidad: "2022-07-04T20:38:38.604+00:00",
        inicioEmpadronamiento: "2022-07-04T20:38:38.604+00:00",
        inicioRecepVoto: "2022-07-04T20:38:38.604+00:00",
        inicioAssignPass: "2022-07-04T20:38:38.604+00:00",
        finDisponibilidad: "2019-07-04T20:38:38.604+00:00",
        finEmpadronamiento: "2019-07-04T20:38:38.604+00:00",
        finRecepVoto: "2019-07-04T20:38:38.604+00:00",
        finAssignPass: "2019-07-04T20:38:38.604+00:00",
        eleccionModel: {
            idEleccion: "EL-DE-CO-ES-GE-ORD-2023",
            nombreEleccion: "ELECCION DE CONSEJO ESTUDIANTIL GESTIONN.",
            dateTimeCreation: "2019-07-04T20:38:38.604+00:00",
            userCreation: "ALEJANDRO",
            tipoEleccion: "ORDINARIA"
        }
    }
}


export const envioLinkAPI = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve({ ok: true, data: "", errorMessage: "" });
        }, 700);

    });

}

export const getEleccionAPI = (id) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve({ ok: true, data: eleccionConfig, errorMessage: "" });
        }, 1200);

    });

}

export const getConsultaAPI = (id) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve({ ok: true, data: consultaConfig, errorMessage: "" });
        }, 1200);

    });

}