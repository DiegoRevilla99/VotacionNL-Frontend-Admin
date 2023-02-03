import { jornadasAPI } from "./configJornada";

let idJornadas = 0;
let idBoleta = 0;

export const getJornadas = async () => {
	try {
		const { data } = await jornadasAPI.get("jornada/electoral/");
		return { ok: true, data: data.data, errorMessage: "" };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const getJornadasFormales = async () => {
	try {
		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/formales
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
			fechaHoraCreacion: "2019-07-04T20:38:38.604+00:00",
			usuarioCreacion: "DEFAULT",
			entidad: entidad,
			tipoJornada: "ORDINARIA",
		});
		return { ok: true, id: data.data.idJornada };
	} catch (error) {
		return { ok: false };
	}
};

export const deleteJornada = async (id) => {
	try {
		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/JO-EL-GO-OR-20-OAX-2022
		const resp = await jornadasAPI.delete("jornada/electoral/" + id);
		return { ok: true };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const getBoletasJornada = async (idJornadaElectoral) => {
	try {
		console.log("DATA BOLETASSSS", idJornadaElectoral);
		// **FETCH
		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/jornada/JO-EL-GO-OR-20-NUE-2023/estructurasboletas
		const { data } = await jornadasAPI.get(
			"jornada/electoral/jornada/" + idJornadaElectoral + "/estructurasboletas"
		);
		console.log("DATA BOLETASSSS", data);
		return { ok: true, data: data.data };
	} catch (error) {
		return { ok: false };
	}
};

export const getBoletaData = async (idTicket) => {
	try {
		// **FETCH
		const { data } = await jornadasAPI.get("jornada/electoral/estructuraboleta/" + idTicket);
		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/5
		// **Fetch de candidatos
		const { data: data1 } = await jornadasAPI.get(
			"jornada/electoral/candidato/" + idTicket
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/candidato/PEHEFE020722
		);
		// **Fetch de suplentes
		const { data: data2 } = await jornadasAPI.get(
			"jornada/electoral/suplente/" + idTicket
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/suplente/DIRUAL120721
		);
		// **Fetch de partidos
		const { data: data3 } = await jornadasAPI.get(
			"jornada/electoral/estructuraboleta/" + idTicket + "/partidos"
			//https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/5/partidos
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/partido/0
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
			fechaNacimientoCandidato: data1.data.fechaNacimiento,
			generoCandidato: data1.data.genero,
		};
		const formatSuplente = {
			// MY FORMAT || API FORMAT
			id: data2.data.claveElectoral,
			apellidoPSuplente: data2.data.apellidoPSuplente,
			apellidoMSuplente: data2.data.apellidoMSuplente,
			nombreSuplente: data2.data.nombreSuplente,
			fotografiaSuplente: data2.data.fotoSuplente,
			seudonimoSuplente: data2.data.seudonimoSuplente,
			fechaNacimientoSuplente: data2.data.fechaNacimiento,
			generoSuplente: data2.data.genero,
		};
		const formatPartido = {
			// MY FORMAT || API FORMAT
			id: data3.data.clavePartido,
			nombrePartido: data3.data.nombre,
			siglas: data3.data.siglas,
			emblema: data3.data.emblema,
			fotografiaPartido: data3.data.logo,
		};
		const format = {
			// MY FORMAT || API FORMAT
			id: data.data.idEstructuraBoleta,
			encabezado: data.data.encabezadoBoleta,
			nombreCandidatura: data.data.nombreCandidatura,
			modalidadVotacion: data.data.modalidadVotacion,
			entidadFederativa: data.data.entidadFederativa,
			municipio: data.data.municipio,
			distritoElectoralLocal: data.data.distritoElectoralLocal,
			distritoElectoral: data.data.distritoElectoral,
			tipoCasilla: data.data.tipoCasilla,
			primerFirmante: data.data.primerFirmante,
			cargoPrimerFirmante: data.data.cargoPrimerFirmante,
			segundoFirmante: data.data.segundoFirmante,
			cargoSegundoFirmante: data.data.cargoSegundoFirmante,
		};

		return {
			ok: true,
			data: format,
			dataCandidato: formatCandidato,
			dataSuplente: formatSuplente,
			dataPartido: formatPartido,
		};
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const getBoletaData2 = async (idTicket) => {
	try {
		// **FETCH
		const { data } = await jornadasAPI.get("jornada/electoral/estructuraboleta/" + idTicket);
		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/2
		// **Fetch de candidatos + suplentes + partidos
		const { data: data1 } = await jornadasAPI.get(
			"jornada/electoral/estructuraboleta/" + idTicket + "/datos_asociados"
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/4/datos_asociados
		);
		console.log("DATA candidatos + suplentes + partidos", data1);

		const formatcasupa = {
			// MY FORMAT || API FORMAT
			candidatoModel: {
				claveElectoral,
				apellidoPCandidato,
				apellidoMCandidato,
				nombreCandidato,
				fotoCandidato,
				seudonimoCandidato,
				fechaNacimiento,
				genero,
			},
			partidoModels: [
				{
					clavePartido,
					nombre,
					siglas,
					emblema,
					logo,
				},
			],
			suplenteModel: {
				claveElectoral,
				apellidoPSuplente,
				apellidoMSuplente,
				nombreSuplente,
				fotoSuplente,
				seudonimoSuplente,
				fechaNacimiento,
				genero,
				candidatoModel: {
					claveElectoral,
				},
			},
		};

		const format = {
			// MY FORMAT || API FORMAT
			id: data.data.idEstructuraBoleta,
			encabezado: data.data.encabezadoBoleta,
			nombreCandidatura: data.data.nombreCandidatura,
			modalidadVotacion: data.data.modalidadVotacion,
			entidadFederativa: data.data.entidadFederativa,
			municipio: data.data.municipio,
			distritoElectoralLocal: data.data.distritoElectoralLocal,
			distritoElectoral: data.data.distritoElectoral,
			tipoCasilla: data.data.tipoCasilla,
			primerFirmante: data.data.primerFirmante,
			cargoPrimerFirmante: data.data.cargoPrimerFirmante,
			segundoFirmante: data.data.segundoFirmante,
			cargoSegundoFirmante: data.data.cargoSegundoFirmante,
		};

		return { ok: true, data: format, datacasupa: formatcasupa };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const createBoleta = async (data, idJornadaElectoral, candidatoAndSuplente, partidos) => {
	try {
		// Boletas
		const { data: data1 } = await jornadasAPI.post("jornada/electoral/estructuraboleta", {
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta
			nombreEleccion: data.nombreCandidatura,
			municipio: data.municipio,
			distrito: data.distritoElectoral,
			primerFirmanteNombre: data.primerFirmante,
			primerFirmanteCargo: data.cargoPrimerFirmante,
			segundoFirmanteNombre: data.segundoFirmante,
			segundoFirmanteCargo: data.cargoSegundoFirmante,
			jornadaModel: {
				idJornada: idJornadaElectoral,
			},
			modalidadVotacionModel: {
				idModalidadVotacion: 1,
			},
		});


		const { data: candidatoSuplenteRespData } = await jornadasAPI.post(
			"jornada/electoral/candidato",
			{
				candidatoModel: {
					claveElectoral: candidatoAndSuplente[0].claveElectoralCandidato, // esto es new
					apellidoPCandidato: candidatoAndSuplente[0].apellidoPCandidato,
					apellidoMCandidato: candidatoAndSuplente[0].apellidoMCandidato,
					nombreCandidato: candidatoAndSuplente[0].nombreCandidato,
					fotoCandidato: candidatoAndSuplente[0].fotografiaCandidato,
					seudonimoCandidato: candidatoAndSuplente[0].seudonimoCandidato,
					fechaNacimiento: candidatoAndSuplente[0].fechaNacimientoCandidato,
					genero: candidatoAndSuplente[0].generoCandidato,
					// estructuraBoletaModel: {
					// 	idEstructuraBoleta: idJornadaElectoral, // DUDA EXISTENCIAL XDDD
					// },
				},
				suplenteModel: {
					claveElectoral: candidatoAndSuplente[0].claveElectoralSuplente, // esto es new
					apellidoPSuplente: candidatoAndSuplente[0].apellidoPSuplente,
					apellidoMSuplente: candidatoAndSuplente[0].apellidoMSuplente,
					nombreSuplente: candidatoAndSuplente[0].nombreSuplente,
					fotoSuplente: candidatoAndSuplente[0].fotografiaSuplente,
					seudonimoSuplente: candidatoAndSuplente[0].seudonimoSuplente,
					fechaNacimiento: candidatoAndSuplente[0].fechaNacimientoSuplente,
					genero: candidatoAndSuplente[0].generoSuplente,
				},
			}
		);
		console.log("Data de respuesta candidato con suplente", candidatoSuplenteRespData);
		// Partido
		const { data: partidoRespData } = await jornadasAPI.post(
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/partido/candidato/DIRUAL01
			"jornada/electoral/partido/candidato/" + data1.data.idBoleta,
			{
				// API FORMAT || MY FORMAT
				clavePartido:partidos[0].clavePartido,
				nombre: partidos[0].nameParty,
				siglas: partidos[0].siglasParty,
				emblema: partidos[0].emblemParty,
				logo: partidos[0].fotografiaParty,
				fechaCreacion:"2020-07-04T20:38:38.604+00:00",
				status: partidos[0].statusPary,
				estructuraBoletaModel:{
					idEstructuraBoleta: idBoleta,
				},
				candidatoModel:{
					idCandidato: idCandidato,
				},
				coalicionModel:{
					claveCoalicion: idCoalicion,
				}
			}
		);
		console.log("Data de respuesta", partidoRespData);

		return { ok: true, idBoleta: data1.data.idBoleta };
	} catch (error) {
		console.log("ERROR", error);
		return { ok: false, errorMessage: error.message };
	}
};

export const updateBoletaData = async (
	data,
	idJornadaElectoral,
	idBoleta,
	candidatos,
	suplentes,
	partidos
) => {
	try {
		const { data: data1 } = await jornadasAPI.put(
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/10
			"jornada/electoral/estructuraboleta/" + idBoleta,
			{
				encabezadoBoleta: data.encabezado,
				nombreCandidatura: data.nombreCandidatura,
				modalidadVotacion: data.modalidadVotacion,
				entidadFederativa: data.entidadFederativa,
				municipio: data.municipio,
				distritoElectoralLocal: data.distritoElectoralLocal,
				distritoElectoral: data.distritoElectoral,
				tipoCasilla: data.tipoCasilla,
				primerFirmante: data.primerFirmante,
				cargoPrimerFirmante: data.cargoPrimerFirmante,
				segundoFirmante: data.segundoFirmante,
				cargoSegundoFirmante: data.cargoSegundoFirmante,
				jornadaModel: {
					idJornada: idJornadaElectoral,
				},
			}
		);
		// Candidato
		const { data: candidateRespData } = await jornadasAPI.put(
			// ESTA ONDA NO TIENE PUT :C
			"jornada/electoral/candidato/" + candidatos[0].id,
			{
				apellidoPCandidato: candidatos[0].apellidoPCandidato,
				apellidoMCandidato: candidatos[0].apellidoMCandidato,
				nombreCandidato: candidatos[0].nombreCandidato,
				fotoCandidato: candidatos[0].fotografia,
				seudonimoCandidato: candidatos[0].seudonimoCandidato,
				fechaNacimiento: candidatos[0].fechaNacimientoCandidato,
				genero: candidatos[0].generoCandidato,
				estrutucturaBoletaModel: {
					idBoleta: idBoleta,
				},
			}
		);
		console.log("Data de respuesta", candidateRespData);

		// Suplente
		const { data: suplenteRespData } = await jornadasAPI.put(
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/suplente/DIRUAL120721
			"jornada/electoral/suplente/" + suplentes[0].id,
			{
				apellidoPSuplente: suplentes[0].apellidoPSuplente,
				apellidoMSuplente: suplentes[0].apellidoMSuplente,
				nombreSuplente: suplentes[0].nombreSuplente,
				fotoSuplente: suplentes[0].fotografiaSuplente,
				seudonimoSuplente: suplentes[0].seudonimoSuplente,
				fechaNacimiento: suplentes[0].fechaNacimientoSuplente,
				genero: suplentes[0].generoSuplente,
				estrutucturaBoletaModel: {
					idBoleta: idBoleta,
				},
			}
		);
		console.log("Data de respuesta", suplenteRespData);

		// Partido
		const { data: partidoRespData } = await jornadasAPI.put(
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/partido/416841
			"jornada/electoral/partido/" + partidos[0].id,
			{
				nombre: partidos[0].nombre,
				siglas: partidos[0].siglas,
				emblema: partidos[0].emblema,
				logo: partidos[0].fotografia,
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
		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/9
		const resp = await jornadasAPI.delete("jornada/electoral/estructuraboleta/" + id);
		return { ok: true };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const getJornadaVotos = async (id) => {
	try {
		await timeout(200);
		const chartData = [
			{ id: 1, nombre: "Partido verde", votos: 100 },
			{ id: 2, nombre: "Partido 2", votos: 120 },
			{ id: 3, nombre: "Partido 3", votos: 104 },
			{ id: 4, nombre: "Partido 4", votos: 230 },
			{ id: 5, nombre: "Partido 5", votos: 440 },
			{ id: 6, nombre: "Partido 6", votos: 130 },
			{ id: 7, nombre: "Partido 7", votos: 600 },
			{ id: 8, nombre: "Partido 8", votos: 389 },
			{ id: 9, nombre: "Partido 8", votos: 2 },
			{ id: 10, nombre: "Partido 6", votos: 130 },
			{ id: 11, nombre: "Partido 7", votos: 600 },
			{ id: 12, nombre: "Partido 8", votos: 389 },
			{ id: 13, nombre: "Partido 8", votos: 200 },
		];

		return { ok: true, data: chartData };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
