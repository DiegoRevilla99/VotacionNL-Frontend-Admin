import { jornadasAPI } from "./configJornada";

let idConsultas = 0;
let idBoleta = 0;

export const getJornadas = async () => {
	try {
		const { data } = await jornadasAPI.get("jornada/electoral/");
		return { ok: true, data: data.data, errorMessage: "" };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const createJornada = async (title, entidad) => {
	// const id = "JEO-JUN23-GOB" + Math.floor(Math.random() * 10000);
	try {
		const { data } = await jornadasAPI.post("jornada/electoral/", {
			// idJornada: id,
			nombreJornada: title,
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
		const { data } = await jornadasAPI.get(
            "jornada/electoral/jornada/" + idConsulta + "/estructurasboletas"
		);
		return { ok: true, data: data.data };
	} catch (error) {
		return { ok: false };

	}
};

export const getBoletaData = async (idBoleta) => {
	try {
		// **FETCH
		// const { data } = await consultasAPI.get("jornada/consulta/estructurapapeleta/" + idBallot);
		const { data } = await jornadasAPI.get(
            "jornada/electoral/estructurasboletas/" + idBoleta);

		// **Fetch de candidatos
		const { data: data1 } = await jornadasAPI.get(
			"jornada/electoral/candidatos/" + idBoleta 
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/candidatos
		);
		// **Fetch de suplentes
		const { data: data2 } = await jornadasAPI.get(
			"jornada/electoral/suplente/" + idBoleta
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/suplente
		);
		// **Fetch de candidatos
		const { data: data3 } = await jornadasAPI.get(
			"jornada/electoral/partido/" + idBoleta
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/partido
		);


		console.log("DATA CANDIDATO", data1);
		console.log("DATA SUPLENTE", data2);
		console.log("DATA PARTIDO", data3);


		const formatCandidato = {
			// MY FORMAT || API FORMAT
			id: data1.data.claveElectoral,
			apellidoPCandidato: data1.data.apellidoPCandidato,
            apellidoMCandidato: data1.data.apellidoMCandidato,
            nombreCandidato: data1.data.nombreCandidato,
            fotografia: data1.data.fotoCandidato,
            seudonimoCandidato: data1.data.seudonimoCandidato,
            fechaNacimientoCandidato:data1.data.fechaNacimiento,
            generoCandidato: data1.data.genero,
		};
		const formatSuplente = {
			// MY FORMAT || API FORMAT
			id: data1.data.claveElectoral,
			apellidoPSuplente: data1.data.apellidoPSuplente,
            apellidoMSuplente: data1.data.apellidoMSuplente,
            nombreSuplente: data1.data.nombreSuplente,
            fotografiaSuplente: data1.data.fotoSuplente,
            seudonimoSuplente: data1.data.seudonimoSuplente,
            fechaNacimientoSuplente:data1.data.fechaNacimiento,
            generoSuplente: data1.data.genero,
		};
		const formatPartido = {
			// MY FORMAT || API FORMAT
			id: data1.data.clavePartido,
			nombrePartido: data1.data.nombre,
            siglas: data1.data.siglas,
            emblema: data1.data.emblema,
            fotografiaPartido: data1.data.logo,
		};
        const format = {
			// MY FORMAT || API FORMAT
			id: data.data.idEstructuraBoleta,
            encabezado: data.data.encabezadoBoleta,
            nombreCandidatura: data.data.nombreCandidatura,
            modalidadVotacion: data.data.modalidadVotacion,
            entidadFederativa: data.data.entidadFederativa,
            municipio: data.data.municipio,
            distritoElectoralLocal:data.data.distritoElectoralLocal,
            distritoElectoral:data.data.distritoElectoral,
            tipoCasilla: data.data.tipoCasilla,
            primerFirmante: data.data.primerFirmante,
            cargoPrimerFirmante: data.data.cargoPrimerFirmante,
            segundoFirmante: data.data.segundoFirmante,
            cargoSegundoFirmante:data.data.cargoSegundoFirmante,
        }

		return { ok: true, data: format, dataCandidato: formatCandidato, dataSuplente: formatSuplente, dataPartido: formatPartido };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	
	}
};

export const createBoleta = async (data, idConsulta, candidato, suplente, partido) => {
	try {
		// Boletas
		const { data: data1 } = await jornadasAPI.post("jornada/electoral/estructurasboletas/", {
            encabezadoBoleta: data.encabezado,
            nombreCandidatura: data.nombreCandidatura,
            modalidadVotacion: data.modalidadVotacion,
            entidadFederativa: data.entidadFederativa,
            municipio: data.municipio,
            distritoElectoralLocal:data.distritoElectoralLocal,
            distritoElectoral:data.distritoElectoral,
            tipoCasilla: data.tipoCasilla,
            primerFirmante: data.primerFirmante,
            cargoPrimerFirmante: data.cargoPrimerFirmante,
            segundoFirmante: data.segundoFirmante,
            cargoSegundoFirmante:data.cargoSegundoFirmante,
			jornadaModel: {
				idJornada: idConsulta,
			},
		});
		// Candidato
		const { data: candidateRespData } = await jornadasAPI.post(
			// "jornada/electoral/boleta/" + data1.data.idPapeleta + "/pregunta",
			"jornada/electoral/boleta/" + data1.data.idBoleta + "/",
			{
				// API FORMAT || MY FORMAT
                apellidoPCandidato: candidato[0].apellidoPCandidato,
                apellidoMCandidato: candidato[0].apellidoMCandidato,
                nombreCandidato: candidato[0].nombreCandidato,
                fotoCandidato: candidato[0].fotografia,
                seudonimoCandidato: candidato[0].seudonimoCandidato,
                fechaNacimiento: candidato[0].fechaNacimientoCandidato,
                genero: candidato[0].generoCandidato,
			}
		);
		console.log("Data de respuesta", candidateRespData);
		// Suplente
		const { data: suplenteRespData } = await jornadasAPI.post(
			// "jornada/electoral/boleta/" + data1.data.idPapeleta + "/pregunta",
			"jornada/electoral/boleta/" + data1.data.idBoleta + "/",
			{
				// API FORMAT || MY FORMAT
				apellidoPSuplente: suplente[0].apellidoPSuplente,
				apellidoMSuplente: suplente[0].apellidoMSuplente,
				nombreSuplente: suplente[0].nombreSuplente,
				fotoSuplente: suplente[0].fotografiaSuplente,
				seudonimoSuplente: suplente[0].seudonimoSuplente,
				fechaNacimiento: suplente[0].fechaNacimientoSuplente,
				genero: suplente[0].generoSuplente,
			}
		);
		console.log("Data de respuesta", suplenteRespData);
		// Partido
		const { data: partidoRespData } = await jornadasAPI.post(
			// "jornada/electoral/boleta/" + data1.data.idPapeleta + "/pregunta",
			"jornada/electoral/boleta/" + data1.data.idBoleta + "/",
			{
				// API FORMAT || MY FORMAT
				nombre: partido[0].nombrePartido,
				siglas: partido[0].siglas,
				emblema: partido[0].emblema,
				logo: partido[0].fotografiaPartido,
			}
		);
		console.log("Data de respuesta", partidoRespData);

		return { ok: true, idBoleta: data1.data.idBoleta };
	} catch (error) {
		console.log("ERROR", error);
		return { ok: false, errorMessage: error.message };
	}
};


export const updateBoletaData = async (data, idConsulta, idBoleta, candidato, suplente, partido) => {
	try {
		const { data: data1 } = await jornadasAPI.put(
			"jornada/electoral/estructurasboletas/" + idBoleta,
			{
				encabezadoBoleta: data.encabezado,
				nombreCandidatura: data.nombreCandidatura,
				modalidadVotacion: data.modalidadVotacion,
				entidadFederativa: data.entidadFederativa,
				municipio: data.municipio,
				distritoElectoralLocal:data.distritoElectoralLocal,
				distritoElectoral:data.distritoElectoral,
				tipoCasilla: data.tipoCasilla,
				primerFirmante: data.primerFirmante,
				cargoPrimerFirmante: data.cargoPrimerFirmante,
				segundoFirmante: data.segundoFirmante,
				cargoSegundoFirmante:data.cargoSegundoFirmante,
				jornadaModel: {
					idJornada: idConsulta,
				},
			}
		);
			// Candidato
		const { data: candidateRespData } = await jornadasAPI.put(
			"jornada/electoral/boleta/" + candidato[0].id,
			{
                apellidoPCandidato: candidato[0].apellidoPCandidato,
                apellidoMCandidato: candidato[0].apellidoMCandidato,
                nombreCandidato: candidato[0].nombreCandidato,
                fotoCandidato: candidato[0].fotografia,
                seudonimoCandidato: candidato[0].seudonimoCandidato,
                fechaNacimiento: candidato[0].fechaNacimientoCandidato,
                genero: candidato[0].generoCandidato,
				estrutucturaBoletaModel: {
					idBoleta: idBoleta,
				},
			}
		);
		console.log("Data de respuesta", candidateRespData);

		// Suplente
		const { data: suplenteRespData } = await jornadasAPI.put(
			"jornada/electoral/boleta/" + suplente[0].id,
			{
				apellidoPSuplente: suplente[0].apellidoPSuplente,
				apellidoMSuplente: suplente[0].apellidoMSuplente,
				nombreSuplente: suplente[0].nombreSuplente,
				fotoSuplente: suplente[0].fotografiaSuplente,
				seudonimoSuplente: suplente[0].seudonimoSuplente,
				fechaNacimiento: suplente[0].fechaNacimientoSuplente,
				genero: suplente[0].generoSuplente,
				estrutucturaBoletaModel: {
					idBoleta: idBoleta,
				},
			}
		);
		console.log("Data de respuesta", suplenteRespData);

		// Partido
		const { data: partidoRespData } = await jornadasAPI.put(
			"jornada/electoral/boleta/" + partido[0].id,
			{
				nombre: partido[0].nombrePartido,
				siglas: partido[0].siglas,
				emblema: partido[0].emblema,
				logo: partido[0].fotografiaPartido,
				estrutucturaBoletaModel: {
					idBoleta: idBoleta,
				},
			}
		);
		console.log("Data de respuesta", partidoRespData);

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
