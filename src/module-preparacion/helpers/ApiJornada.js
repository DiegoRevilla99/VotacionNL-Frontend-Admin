const partidos = [
    {
        nombrePartido: "Partido",
        nombrePropietario: "Juan",
        seudonimoCandidato: "J",
        nombreSuplente: "Juan Jr"
    },
    {
        nombrePartido: "Partido",
        nombrePropietario: "Jaime",
        seudonimoCandidato: "J",
        nombreSuplente: "Tyron Jr"
    },
    {
        nombrePartido: "Partido",
        nombrePropietario: "Pancracio",
        seudonimoCandidato: "P",
        nombreSuplente: "Riñón Jr"
    },
    {
        nombrePartido: "Partido",
        nombrePropietario: "Riky ricón",
        seudonimoCandidato: "R",
        nombreSuplente: "Jorge Jr"
    },

]


const boletas = [
    {
        encabezado: "Encabezado",	//Text
        nombreCandidatura: "Gobernador",//Text
        entidadFederativa: "Nuevo León",//Text
        municipio: "Monterrey",//Text
        distritoElectoralLocal: "10",//Number
        distritoElectoral: "045",//Number
        tipoCasilla: "Casilla básica",//text
        primerFirmante: "Pepe",//Text
        cargoPrimerFirmante: "Encargado",//Text
        segundoFirmante: "Papa Juan Pablo",//Text
        cargoSegundoFirmante: "Papa II",//Text
        partidos: partidos,
    },
    {
        encabezado: "Encabezado",	//Text
        nombreCandidatura: "Gobernador",//Text
        entidadFederativa: "Nuevo León",//Text
        municipio: "Municipio02",//Text
        distritoElectoralLocal: "10",//Number
        distritoElectoral: "045",//Number
        tipoCasilla: "Casilla básica",//text
        primerFirmante: "Pepe",//Text
        cargoPrimerFirmante: "Encargado",//Text
        segundoFirmante: "Papa Juan Pablo",//Text
        cargoSegundoFirmante: "Papa II",//Text
        partidos: partidos,
    },
    {
        encabezado: "Encabezado",	//Text
        nombreCandidatura: "Gobernador",//Text
        entidadFederativa: "Nuevo León",//Text
        municipio: "Municipio03",//Text
        distritoElectoralLocal: "10",//Number
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
        encabezado: "",
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
        const respuesta = await addPartido(data)
        console.log("Respuesta");
        console.log(respuesta)
        return respuesta;
    } catch (error) {
        console.log("hay un error " + error)
        return false
    }


}


