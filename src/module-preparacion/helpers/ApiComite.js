

const planillas = [
    {
        nombrePlanilla: "Planilla 01",
        nombre: "Planilla-01",
        seudonimo: "p01",
        cargo: "01"
    },
    {
        nombrePlanilla: "Planilla 02",
        nombre: "Planilla-02",
        seudonimo: "p02",
        cargo: "02"
    },
    {
        nombrePlanilla: "Planilla 03",
        nombre: "Planilla-03",
        seudonimo: "p03",
        cargo: "03"
    },
    {
        nombrePlanilla: "Planilla 04",
        nombre: "Planilla-04",
        seudonimo: "p04",
        cargo: "04"
    },

]


const boletas = [
    {
        encabezado: "Encabezado 01",
        nombre: "Boleta01",
        entidad: "Nuevo León",
        municipio: "Abasolo",
        planillas: planillas,
    },
    {
        encabezado: "Encabezado 02",
        nombre: "Boleta02",
        entidad: "Nuevo León",
        municipio: "Agualeguas",
        planillas: planillas,
    },
    {
        encabezado: "Encabezado 03",
        nombre: "Boleta03",
        entidad: "Nuevo León",
        municipio: "Los Aldamas",
        planillas: planillas,
    }
]

const comites = [
    {
        nombre: "",
        boletas: boletas,
    }
]

const getComites = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(comites);
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

const addComite = () => {
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
                encabezado: "Encabezado",
                nombre: "ejemplo",
                entidad: "as",
                municipio: "adasd",
            });
        }, 500);

    });
}


const addPlanilla = (id) => {
    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("Planillla agregada");
        }, 1000);

    });
}

export const getComitesApi = async () => {
    const respuesta = getComites.then((comi) => {
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

export const addComiteApi = async (data) => {

    try {
        console.log(data)
        const respuesta = await addComite()
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


export const addPlanillaApi = async (data) => {

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


