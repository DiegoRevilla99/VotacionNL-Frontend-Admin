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




export const getCoalicionesAPI = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(coaliciones);
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