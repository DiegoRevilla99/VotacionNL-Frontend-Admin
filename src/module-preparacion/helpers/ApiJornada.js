const partidos = [
    {
        nombrePartido: "Partido 01",
        nombrePropietario: "Juan",
        seudonimoCandidato: "J01",
        nombreSuplente: "Juan Jr"
    },
    {
        nombrePartido: "Partido 02",
        nombrePropietario: "Jaime",
        seudonimoCandidato: "J01",
        nombreSuplente: "Tyron Jr"
    },
    {
        nombrePartido: "Partido 03",
        nombrePropietario: "Pancracio",
        seudonimoCandidato: "P01",
        nombreSuplente: "Riñón Jr"
    },
    {
        nombrePartido: "Partido 01",
        nombrePropietario: "Riky ricón",
        seudonimoCandidato: "R01",
        nombreSuplente: "Jorge Jr"
    },

]


const boletas = [
    {
        encabezado: "Encabezado 01",	//Text
        nombreCandidatura: "Gobernador",//Text
        entidadFederativa: "Nuevo León",//Text
        municipio: "Monterrey",//Text
        distritoElectoralLocal: "100",//Number
        distritoElectoral: "045",//Number
        tipoCasilla: "Casilla básica",//text
        primerFirmante: "Pepe",//Text
        cargoPrimerFirmante: "Encargado",//Text
        segundoFirmante: "Papa Juan Pablo",//Text
        cargoSegundoFirmante: "Papa II",//Text
        partidos: partidos,
    },
    {
        encabezado: "Encabezado 02",	//Text
        nombreCandidatura: "Gobernador",//Text
        entidadFederativa: "Nuevo León",//Text
        municipio: "Municipio02",//Text
        distritoElectoralLocal: "100",//Number
        distritoElectoral: "045",//Number
        tipoCasilla: "Casilla básica",//text
        primerFirmante: "Pepe",//Text
        cargoPrimerFirmante: "Encargado",//Text
        segundoFirmante: "Papa Juan Pablo",//Text
        cargoSegundoFirmante: "Papa II",//Text
        partidos: partidos,
    },
    {
        encabezado: "Encabezado 03",	//Text
        nombreCandidatura: "Gobernador",//Text
        entidadFederativa: "Nuevo León",//Text
        municipio: "Municipio03",//Text
        distritoElectoralLocal: "100",//Number
        distritoElectoral: "045",//Number
        tipoCasilla: "Casilla básica",//text
        primerFirmante: "Pepe",//Text
        cargoPrimerFirmante: "Encargado",//Text
        segundoFirmante: "Papa Juan Pablo",//Text
        cargoSegundoFirmante: "Papa II",//Text
        partidos: partidos,
    }
]

const jornadas = [
    {
        nombre: "",
        boletas: boletas,
    }
]

const getJornadas = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(jornadas);
    }, 1000);
});

const getBoletasTime = () => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            resolve(boletas);
        }, 300);

    });

}

const addBoleta = () => {
    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("Resuelta");
        }, 1000);

    });
}

const addJornada = () => {
    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("Resuelta");
        }, 1000);

    });
}

const editBoleta = () => {
    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("Resuelta");
        }, 1000);

    });
}

const getBoletaById = (id) => {
    return new Promise((resolve) => {

        setTimeout(() => {

            resolve({
                encabezado: "Encabezado",	//Text
                nombreCandidatura: "ejemplo",//Text
                entidadFederativa: "ejemplo",//Text
                municipio: "ejemplo",//Text
                distritoElectoralLocal: "01",//Number
                distritoElectoral: "02",//Number
                tipoCasilla: "ejemplo",//text
                primerFirmante: "ejemplo",//Text
                cargoPrimerFirmante: "ejemplo",//Text
                segundoFirmante: "ejemplo",//Text
                cargoSegundoFirmante: "ejemplo",//Text
            });
        }, 500);

    });
}


const addPartido = (id) => {
    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("Partido agregada");
        }, 1000);

    });
}

export const getJornadasApi = async () => {
    const respuesta = getJornadas.then((comi) => {
        return comi
    });

    return respuesta;
}



export const getBoletasApi = async () => {

    try {
        const respuesta = await getBoletasTime()
        return respuesta;
    } catch (error) {
        console.log("hay un error " + error)
        return false
    }
}

export const addBoletaApi = async (data) => {

    try {
        console.log(data)
        const respuesta = await addBoleta()
        console.log(respuesta)
        return respuesta;
    } catch (error) {
        console.log("hay un error " + error)
        return false
    }


}

export const addJornadaApi = async (data) => {

    try {
        console.log(data)
        const respuesta = await addJornada()
        console.log(respuesta)
        return respuesta;
    } catch (error) {
        console.log("hay un error " + error)
        return false
    }


}


export const editBoletaApi = async (data) => {

    try {
        console.log(data)
        const respuesta = await editBoleta()
        console.log(respuesta)
        return respuesta;
    } catch (error) {
        console.log("hay un error " + error)
        return false
    }


}

export const getBoletaByIdApi = async (data) => {

    try {
        console.log(data)
        const respuesta = await getBoletaById(data)
        console.log("Respuesta");
        console.log(respuesta)
        return respuesta;
    } catch (error) {
        console.log("hay un error " + error)
        return false
    }


}


export const addPartidoApi = async (data) => {

    try {
        console.log(data)
        const respuesta = await addPlanilla(data)
        console.log("Respuesta");
        console.log(respuesta)
        return respuesta;
    } catch (error) {
        console.log("hay un error " + error)
        return false
    }


}


