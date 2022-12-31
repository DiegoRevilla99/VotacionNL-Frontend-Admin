import { jornadasAPI } from "./configJornada";

let idBoleta = 0;

export const getJornadas = async () => {
	try {
		const { data } = await jornadasAPI.get("jornada/electoral/");

		console.log("RESP: ", data);
		return { ok: true, data: data.data };
	} catch (error) {
		console.log(error);
		return { ok: false };
	}
};

export const createJornada = async (titulo, entidad) => {
	const id = "JEO-JUN23-GOB" + Math.floor(Math.random() * 10000);
	try {
		const { data } = await jornadasAPI.post("jornada/electoral/", {
			idJornada: id,
			nombreJornada: titulo,
			dateTimeCreation: "2019-07-04T20:38:38.604+00:00",
            userCreation: "DEFAULT",
			entidad: entidad,
            tipoJornada: "ORDINARIA",
			formalidad: "FORMAL",
		});
		return { ok: true, id: data.data.idJornada };
	} catch (error) {
		return { ok: false };
	}

};

export const deleteJornada = async (id) => {
	try {
		const resp = await jornadasAPI.delete("jornada/electoral/" + id);
		return { ok: true };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};


export const getBoletasJornada = async (idConsulta) => {
	try {
		// **FETCH
		const { data } = await consultasAPI.get(
			// "jornada/electoral/jornada/" + idConsulta + "/boletas"
            "jornada/electoral/jornada/" + idConsulta + "/boletas"
		);

		// console.log("RESPUESTA BOLETA: ", resp);

		return { ok: true, data: data.data };
	} catch (error) {
		return { ok: false };
	}
};

export const getBoleta = (idBoleta) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingBoleta());
        // const { data } = await getBoletaAPI(idBoleta);
        jornadasAPI.get(`${idBoleta}`).then((response) => {

            const { httpCode, mensaje, data } = response.data;

            if (httpCode === "NOT_FOUND") {
                dispatch(setErrorBoleta({ errorBoleta: mensaje }));
            } else {

                dispatch(setBoleta({ boleta: data }));
            }
        }).catch((error) => {
            console.log(error)
            dispatch(endLoadingBoleta());
        })
    }
}



export const getCandidatoData = async (idCandidato) => {

	try {
        // **FETCH
        const { data } = await jornadasAPI.get("jornada/electoral/estructurasboletas/" + idCandidato);
        // **FETCH suplente
		// const { data:data2 } = await jornadasAPI.get(
        //     "jornada/electoral/suplente/" + idCandidato
        //     );
        // **FETCH candidato
		const { data:data1 } = await jornadasAPI.get(
            "jornada/electoral/candidatos/" + idCandidato + "/candidato"
            );
        console.log("CANDIDATO 1"+data1);

        const formatCandidate ={
			id: data1.data.claveElectoral,
			apellidoPCandidato: data1.data.apellidoPCandidato,
            apellidoMCandidato: data1.data.apellidoMCandidato,
            nombreCandidato: data1.data.nombreCandidato,
            fotografia: data1.data.fotoCandidato,
            seudonimoCandidato: data1.data.seudonimoCandidato,
            fechaNacimientoCandidato:data1.data.fechaNacimiento,
            generoCandidato: data1.data.genero,
		};

        // const formatSuplente = {
        //     id: data2.data.claveElectoral,
		// 	apellidoPSuplente: data2.data.apellidoPCandidato,
        //     apellidoMSuplente: data2.data.apellidoMCandidato,
        //     nombreSuplente: data2.data.nombreCandidato,
        //     fotografiaSuplente: data2.data.fotoCandidato,
        //     seudonimoSuplente: data2.data.seudonimoCandidatoa,
        //     fechaNacimientoSuplente:data2.data.fechaNacimiento,
        //     generoSuplente: data2.data.genero,
        // }


        // "idJornada": "JEO-JUN23-GOB",
        // "nombreJornada": "JORNADA ELECTORAL GOBERNADOR ORDINARIA 2023",
        // "dateTimeCreation": "2019-07-04T20:38:38.604+00:00",
        // "userCreation": "ALEJANDRO",
        // "entidad": "OAXACA",
        // "tipoJornada": "ORDINARIA",
        // "formalidad": "FORMAL"

        // encabezado: "",	//Text
		// nombreCandidatura: "",//Text
		// modalidadVotacion: "1",//Text
		// entidadFederativa: "",//Text
		// municipio: "",//Text
		// distritoElectoralLocal: "",//Number
		// distritoElectoral: "",//Number
		// tipoCasilla: "",//text
		// primerFirmante: "",//Text
		// cargoPrimerFirmante: "",//Text
		// segundoFirmante: "",//Text
		// cargoSegundoFirmante: "",//Text
        
        // const format = {
        //     encabezado: data.data.idJornada,
        //     nombreCandidatura: data.data.nombreJornada,
        //     modalidadVotacion: data.data.
        //     entidadFederativa: data.data.entidad,
        //     municipio: data.data.
        //     distritoElectoralLocal:data.data.
        //     distritoElectoral:data.data.
        //     tipoCasilla: data.data.
        //     primerFirmante: data.data.
        //     cargoPrimerFirmante: data.data.
        //     segundoFirmante: data.data.
        //     cargoSegundoFirmante:data.data.
        // }

		return { ok: true, candidatosP: formatCandidate };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const createBoleta = async (data, idConsulta, candidato) => {
	try {
		// console.log("DATA QUE LLEGA", questions);
		const { data: data1 } = await jornadasAPI.post("jornada/electoral/estructurasboletas/", {

        //     encabezado: data.data.idJornada,
        //     nombreCandidatura: data.data.nombreJornada,
        //     modalidadVotacion: data.data.
        //     entidadFederativa: data.data.entidad,
        //     municipio: data.data.
        //     distritoElectoralLocal:data.data.
        //     distritoElectoral:data.data.
        //     tipoCasilla: data.data.
        //     primerFirmante: data.data.
        //     cargoPrimerFirmante: data.data.
        //     segundoFirmante: data.data.
        //     cargoSegundoFirmante:data.data.

		});

		const { data: candidateRespData } = await jornadasAPI.post(
			// "jornada/electoral/boleta/" + data1.data.idPapeleta + "/pregunta",
			"jornada/electoral/boleta/" + data1.data.idBoleta + "/boleta",
			{
                apellidoPCandidato: candidato[0].apellidoPCandidato,
                apellidoMCandidato: Cadidato[0].apellidoMCandidato,
                nombreCandidato: candidato[0].nombreCandidato,
                fotoCandidato: candidato[0].fotografia,
                seudonimoCandidato: candidato[0].seudonimoCandidato,
                fechaNacimiento: candidato[0].fechaNacimientoCandidato,
                genero: candidato[0].generoCandidato,
			}
		);

		console.log("Data de respuesta", candidateRespData);

		return { ok: true, idBoleta: data1.data.idBoleta };
	} catch (error) {
		console.log("ERROR", error);
		return { ok: false, errorMessage: error.message };
	}
};


export const updateBoletaData = async (data, candidato, idConsulta, idBoleta) => {
	try {
		const { data: data1 } = await jornadasAPI.put(
			"jornada/electoral/estructurasboletas/" + idBoleta,
			{
				nombre: data.encabezadoConsulta,
				distrito: data.distritoElectoral,
				municipio: data.municipio,
				primerFirmanteNombre: data.nombrePrimerFirmante,
				primerFirmanteCargo: data.cargoPrimerFirmante,
				segundoFirmanteNombre: data.nombreSegundoFirmante,
				segundoFirmanteCargo: data.cargoSegundoFirmante,
				jornadaModel: {
					idJornada: idConsulta,
				},
        //     encabezado: data.data.idJornada,
        //     nombreCandidatura: data.data.nombreJornada,
        //     modalidadVotacion: data.data.
        //     entidadFederativa: data.data.entidad,
        //     municipio: data.data.
        //     distritoElectoralLocal:data.data.
        //     distritoElectoral:data.data.
        //     tipoCasilla: data.data.
        //     primerFirmante: data.data.
        //     cargoPrimerFirmante: data.data.
        //     segundoFirmante: data.data.
        //     cargoSegundoFirmante:data.data.
			}
		);

		const { data: candidateRespData } = await jornadasAPI.put(
			"jornada/electoral/boleta/" + questions[0].id,
			{
                apellidoPCandidato: candidato[0].apellidoPCandidato,
                apellidoMCandidato: Cadidato[0].apellidoMCandidato,
                nombreCandidato: candidato[0].nombreCandidato,
                fotoCandidato: candidato[0].fotografia,
                seudonimoCandidato: candidato[0].seudonimoCandidato,
                fechaNacimiento: candidato[0].fechaNacimientoCandidato,
                genero: candidato[0].generoCandidato,
			    // NO SPE QUE ES ESTO
				// estructuraPapeletaModel: {
				// 	idPapeleta: idPapeleta,
				// },
			}
		);

		console.log("Data de respuesta", candidateRespData);

		return { ok: true };
	} catch (error) {
		return { ok: false };
	}
};

export const deleteBoleta = async (id) => {
	try {
		const resp = await jornadasAPI.delete("jornada/electoral/estructurasboletas/" + id);
		return { ok: true };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
