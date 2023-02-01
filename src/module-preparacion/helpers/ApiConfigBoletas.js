const coaliciones = [
    {
        claveCoalicion: 1,
        nombre: "PRI-PAN-PRD",
        emblema: "VA POR MEXICO",
        logo: "LOGO.PNG",
        candidato: {
            claveElectoral: "DIRUAL05",
            apellidoPCandidato: "DIAZ",
            apellidoMCandidato: "RUIZ",
            nombreCandidato: "JOSE ANTONIO DIEGO REVILLA",
            fotoCandidato: "TOÑO,jpg",
            seudonimoCandidato: "TOÑO",
        },
        partidos: [
            {
                clavePartido: "PRI-01",
                nombre: "PARTIDO REVOLUCIONARIO INSTITUCIONAL",
                siglas: "PRI",
                emblema: "POR MEXICO",
                logo: "PRI.PNG",
            },
            {
                clavePartido: "PAN-01",
                nombre: "PARTIDO ACCION NACIONAL",
                siglas: "PAN",
                emblema: "POR MEXICO",
                logo: "PAN.PNG",
            }
        ],
    },
    {
        claveCoalicion: 2,
        nombre: "PRI-PAN-PRD",
        emblema: "VA POR MEXICO",
        logo: "LOGO.PNG",
        candidato: {
            claveElectoral: "DIRUAL06",
            apellidoPCandidato: "DIAZ",
            apellidoMCandidato: "RUIZ",
            nombreCandidato: "LAURA YESSENIA SANCHEZ LOPEZ",
            fotoCandidato: "TOÑO,jpg",
            seudonimoCandidato: "TOÑO",
        },
        partidos: [
            {
                clavePartido: "PRI-01",
                nombre: "PARTIDO REVOLUCIONARIO INSTITUCIONAL",
                siglas: "PRI",
                emblema: "POR MEXICO",
                logo: "PRI.PNG",
            },
            {
                clavePartido: "PAN-01",
                nombre: "PARTIDO ACCION NACIONAL",
                siglas: "PAN",
                emblema: "POR MEXICO",
                logo: "PAN.PNG",
            }
        ]
    },
];


const asociaciones = [
    {
        idAsociacion: 1,
        nombreAsociacion: "ASOCIACION 1",
        emblema: "VA POR MEXICO",
        logo: "LOGO.PNG",
        candidatos: [
            {
                claveElectoral: "DIRUAL05",
                apellidoPCandidato: "DIAZ",
                apellidoMCandidato: "RUIZ",
                nombreCandidato: "JOSE ANTONIO DIEGO REVILLA",
                fotoCandidato: "TOÑO,jpg",
                seudonimoCandidato: "TOÑO",
            },
            {
                claveElectoral: "DIRUAL04",
                apellidoPCandidato: "DIAZ",
                apellidoMCandidato: "RUIZ",
                nombreCandidato: "LAURA YESSENIA SANCHEZ LOPEZ",
                fotoCandidato: "TOÑO,jpg",
                seudonimoCandidato: "TOÑO",
            },
        ],

    },
    {
        idAsociacion: 2,
        nombreAsociacion: "ASOCIACION 2",
        emblema: "VA POR MEXICO",
        logo: "LOGO.PNG",
        candidatos: [
            {
                claveElectoral: "DIRUAL06",
                apellidoPCandidato: "DIAZ",
                apellidoMCandidato: "RUIZ",
                nombreCandidato: "KEVIN EDILBERTO",
                fotoCandidato: "TOÑO,jpg",
                seudonimoCandidato: "TOÑO",
            },
            {
                claveElectoral: "DIRUAL04",
                apellidoPCandidato: "DIAZ",
                apellidoMCandidato: "RUIZ",
                nombreCandidato: "LAURA YESSENIA SANCHEZ LOPEZ",
                fotoCandidato: "TOÑO,jpg",
                seudonimoCandidato: "TOÑO",
            },
        ],

    },
];



const candidatos = [
    {
        claveElectoral: "DIRUAL09999",
        apellidoPCandidato: "DIEGO",
        apellidoMCandidato: "JOSE",
        nombreCandidato: "REVILLA",
        fotoCandidato: "TOÑO.jgp",
        seudonimoCandidato: "TOÑO",
        partidos: [
            {
               clavePartido: "PRI-01",
               nombre: "PARTIDO REVOLUCIONARIO INSTITUCIONAL",
                siglas: "PRI",
                emblema: "POR MEXICO",
                logo: "PRI.PNG",
            },
             {
                clavePartido: "PAN-01",
                nombre: "PARTIDO ACCION NACIONAL",
                siglas: "PAN",
                 emblema: "POR MEXICO",
                 logo: "PAN.PNG",
            }
        ]
    },
    {
        claveElectoral: "DIRUAL04",
        apellidoPCandidato: "DIAZ",
        apellidoMCandidato: "RUIZ",
        nombreCandidato: "LAURA YESSENIA SANCHEZ LOPEZ",
        fotoCandidato: "TOÑO,jpg",
        seudonimoCandidato: "TOÑO",
        partidos: [
            {
                clavePartido: "PRI-01",
                nombre: "PARTIDO REVOLUCIONARIO INSTITUCIONAL",
                siglas: "PRI",
                emblema: "POR MEXICO",
                logo: "PRI.PNG",
            },
            {
                clavePartido: "PRD-01",
                nombre: "PARTIDO REVOLUCIONARIO DEMOCRATA",
                siglas: "PRD",
                emblema: "POR MEXICO",
                logo: "PRD.PNG",
            },

        ]
    },
    {
        claveElectoral: "DIRUAL06",
        // claveElectoral: "DIRUAL09999",
        apellidoPCandidato: "DIAZ",
        apellidoMCandidato: "RUIZ",
        nombreCandidato: "KEVIN EDILBERTO CHAVEZ SANCHEZ",
        fotoCandidato: "TOÑO,jpg",
        seudonimoCandidato: "TOÑO",
        partidos: [
            {
                clavePartido: "PRI-01",
                nombre: "PARTIDO REVOLUCIONARIO INSTITUCIONAL",
                siglas: "PRI",
                emblema: "POR MEXICO",
                logo: "PRI.PNG",

            },
            {
                clavePartido: "PAN-01",
                nombre: "PARTIDO ACCION NACIONAL",
                siglas: "PAN",
                emblema: "POR MEXICO",
                logo: "PAN.PNG",

            },
            {
                clavePartido: "PRD-01",
                nombre: "PARTIDO REVOLUCIONARIO DEMOCRATA",
                siglas: "PRD",
                emblema: "POR MEXICO",
                logo: "PRD.PNG",

            },

        ]
    },
    {
        claveElectoral: "DIRUAL08",
        apellidoPCandidato: "DIAZ",
        apellidoMCandidato: "RUIZ",
        nombreCandidato: "CANDIDATO PRUEBA",
        fotoCandidato: "TOÑO,jpg",
        seudonimoCandidato: "TOÑO",
        partidos: [
            {
                clavePartido: "PRI-01",
                nombre: "PARTIDO REVOLUCIONARIO INSTITUCIONAL",
                siglas: "PRI",
                emblema: "POR MEXICO",
                logo: "PRI.PNG",

            },
            {
                clavePartido: "PAN-01",
                nombre: "PARTIDO ACCION NACIONAL",
                siglas: "PAN",
                emblema: "POR MEXICO",
                logo: "PAN.PNG",

            },
            {
                clavePartido: "PRD-01",
                nombre: "PARTIDO REVOLUCIONARIO DEMOCRATA",
                siglas: "PRD",
                emblema: "POR MEXICO",
                logo: "PRD.PNG",

            },

        ]
    },
    {
        claveElectoral: "DIRUAL09",
        apellidoPCandidato: "DIAZ",
        apellidoMCandidato: "RUIZ",
        nombreCandidato: "CANDIDATO PRUEBA",
        fotoCandidato: "TOÑO,jpg",
        seudonimoCandidato: "TOÑO",
        partidos: [
            {
                clavePartido: "PRI-01",
                nombre: "PARTIDO REVOLUCIONARIO INSTITUCIONAL",
                siglas: "PRI",
                emblema: "POR MEXICO",
                logo: "PRI.PNG",

            },
            {
                clavePartido: "PAN-01",
                nombre: "PARTIDO ACCION NACIONAL",
                siglas: "PAN",
                emblema: "POR MEXICO",
                logo: "PAN.PNG",

            },
            {
                clavePartido: "PRD-01",
                nombre: "PARTIDO REVOLUCIONARIO DEMOCRATA",
                siglas: "PRD",
                emblema: "POR MEXICO",
                logo: "PRD.PNG",

            },

        ]
    },

]





const boleta = {
    httpCode: "OK",
    data: [
        {
            idEstructuraBoleta: 2,
            encabezadoBoleta: "ELECCIONES MUN",
            entidadFederativa: "OAXACA",
            municipio: "SANTA LUCIA",
            distritoElectoral: 12,
            modalidadVotacionModel: {
                idModalidadVotacion: 1,
                modalidad: "PLANILLA",
                mostrarCandidaturasNoReg: true,
                mostrarVotoNulo: true,
                minOpciones: 1,
                maxOpciones: 3,
                contabilizacion: "INDIVIDUAL"
            }, jornadaModel: {
                idJornada: "JEO-JUN23-GOB",
                nombreJornada: "JORNADA ELECTORAL GOBERNADOR ORDINARIA 2023",
                dateTimeCreation: "2019-07-04T20:38:38.604+00:00",
                userCreation: "ALEJANDRO",
                entidad: "OAXACA",
                tipoJornada: "ORDINARIA",
                formalidad: "FORMAL"
            }
        }
    ],
    mensaje: "Todos los registros existentes:",
    code: 200
}




export const getCoalicionesAPI = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(coaliciones);
        }, 700);

    });
}

export const getAsociacionesAPI = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(asociaciones);
        }, 300);

    });

}

export const getBoletaAPI = (idBoleta) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(boleta);
        }, 700);

    });

}

export const deleteCoalicionAPI = (idCoalicion) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(boleta);
        }, 700);

    });

}

export const postAsociacionAPI = (data) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve("Exito");
        }, 700);

    });

}

export const postCoalicionAPI = (data) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve("Exito");
        }, 700);

    });

}


export const getCandidatosAPI = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(candidatos);
        }, 100);

    });

}


export const putComiteAPI = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve("Actualizacion realizada");
        }, 900);

    });

}


export const putCoalicionAPI = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve("Actualizacion realizada");
        }, 900);

    });

}

export const putPlanillaAPI = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve("Actualizacion realizada");
        }, 900);

    });

}