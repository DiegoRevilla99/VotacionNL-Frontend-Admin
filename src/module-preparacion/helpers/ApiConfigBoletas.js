const coaliciones = [
    {
        claveCoalicion: 1,
        nombre: "PRI-PAN-PRD",
        emblema: "VA POR MEXICO",
        logo: "LOGO.PNG",
        partidos: [
            { candidato: "Laura", partido: "Partido Verde" },
            { candidato: "Yessenia", partido: "PAN" },
            { candidato: "Pedro", partido: "PRI" },
            { candidato: "Francisco", partido: "PRD" },
        ],
    },
    {
        claveCoalicion: 2,
        nombre: "PRI-PAN-PRD",
        emblema: "VA POR MEXICO",
        logo: "LOGO.PNG",
        partidos: [
            { candidato: "Diego", partido: "Partido Verde" },
            { candidato: "Antonio", partido: "PAN" },
            { candidato: "Kevin", partido: "PRI" },
            { candidato: "Edilberto", partido: "PRD" },
        ],
    },
];




const candidatos = [
    {
        claveElectoral: "clave1",
        nombreCandidato: "Laura Yessenia",
        partidoModel: { nombre: "PRI,PAN" }
    },
    {
        claveElectoral: "clave2",
        nombreCandidato: "KEvin Edilberto",
        partidoModel: { nombre: "PRD" }
    }
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

export const getBoletaAPI = (idBoleta) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(boleta);
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