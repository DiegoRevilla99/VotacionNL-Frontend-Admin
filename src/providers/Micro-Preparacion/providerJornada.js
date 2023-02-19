import { votoConsultaAPI } from "../Micro-VotoConsultas/configVotoConsultas";
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

export const getJornadasNoFormales = async () => {
	try {
		// https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/elecciones
		const { data } = await jornadasNoFormalesAPI.get("jornada/no_formal/elecciones");
		return { ok: true, data: data, errorMessage: "" };
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
		// **FETCH
		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/jornada/JO-EL-GO-OR-20-NUE-2023/estructurasboletas
		const { data } = await jornadasAPI.get(
			"jornada/electoral/jornada/" + idJornadaElectoral + "/estructurasboletas"
		);
		// console.log("DATA BOLETASSSS", data);
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
		// **Fetch de candidatos y suplentes por boleta
		const { data: data1 } = await jornadasAPI.get(
			"jornada/electoral/estructuraboleta/" + idTicket + "/candidatoSuplente"
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/5/candidatoSuplente
		);
		// **Fetch de partidos por boleta
		const { data: data2 } = await jornadasAPI.get(
			"jornada/electoral/estructuraboleta/" + idTicket + "/partidos"
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/5/partidos
		);
		// **Fetch de candidatos por partido
		const { data: data3 } = await jornadasAPI.get(
			"jornada/electoral/candidatoPartido/" + data2.data[0].clavePartido
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/candidatoPartido/PRI-01
		);

		// console.log("DATA BOLETA", data.data);
		// console.log("DATA candidatos y suplentes por boleta", data1.data);
		// console.log("DATA candidatos  por boleta", data1.data);
		// console.log("DATA  partidos por boleta", data2.data);
		// // console.log("clave del partido", data2.data[0].clavePartido);
		// console.log("DATA candidatos por partido", data3);

		const [objeto] = data1.data;

		const formatCandidatoSuplente = {
			candidatoModel: {
				id: objeto.candidatoModel.idCandidato,
				claveElectoralCandidato: objeto.candidatoModel.claveElectoral,
				apellidoPCandidato: objeto.candidatoModel.apellidoPCandidato,
				apellidoMCandidato: objeto.candidatoModel.apellidoMCandidato,
				nombreCandidato: objeto.candidatoModel.nombreCandidato,
				fotografia: objeto.candidatoModel.fotoCandidato,
				seudonimoCandidato: objeto.candidatoModel.seudonimoCandidato,
				fechaNacimientoCandidato: objeto.candidatoModel.fechaNacimiento,
				generoCandidato: objeto.candidatoModel.genero,
			},
			suplenteModel: {
				id: objeto.suplenteModel.idSuplente,
				claveElectoralSuplente: objeto.suplenteModel.claveElectoral,
				apellidoPSuplente: objeto.suplenteModel.apellidoPSuplente,
				apellidoMSuplente: objeto.suplenteModel.apellidoMSuplente,
				nombreSuplente: objeto.suplenteModel.nombreSuplente,
				fotografiaSuplente: objeto.suplenteModel.fotoSuplente,
				seudonimoSuplente: objeto.suplenteModel.seudonimoSuplente,
				fechaNacimientoSuplente: objeto.suplenteModel.fechaNacimiento,
				generoSuplente: objeto.suplenteModel.genero,
			},
		};

		const formatPartidos = data2.data.map((partido) => ({
			clavePartido: partido.clavePartido,
			emblemParty: partido.emblema,
			fotografiaParty: partido.logo,
			nameParty: partido.nombre,
			siglasParty: partido.siglas,
			statusPary: partido.status,
			candidatosPartido: [
				{
					// MY FORMAT || API FORMAT
					id: data3.data.idCandidato,
					claveElectoralCandidato: data3.data.claveElectoral,
					apellidoPCandidato: data3.data.apellidoPCandidato,
					apellidoMCandidato: data3.data.apellidoMCandidato,
					nombreCandidato: data3.data.nombreCandidato,
					fotografia: data3.data.fotoCandidato,
					seudonimoCandidato: data3.data.seudonimoCandidato,
					fechaNacimientoCandidato: data3.data.fechaNacimiento,
					generoCandidato: data3.data.genero,
				},
			],
		}));

		const format = {
			// MY FORMAT || API FORMAT
			// id: data.data.idEstructuraBoleta,
			nombreCandidatura: data.data.nombreEleccion,
			municipio: data.data.municipio,
			distritoElectoral: data.data.distrito,
			primerFirmante: data.data.primerFirmanteNombre,
			cargoPrimerFirmante: data.data.primerFirmanteCargo,
			segundoFirmante: data.data.segundoFirmanteNombre,
			cargoSegundoFirmante: data.data.segundoFirmanteCargo,
			// modalidadVotacionModel: {
			// 	idModalidadVotacion: 1,
			// },
		};

		// console.log("FORMAT", format);
		// console.log("FORMAT CANDIDATO SUPLENTE", formatCandidatoSuplente);
		// console.log("FORMAT PARTIDO", formatPartidos);

		return {
			ok: true,
			data: format,
			dataCandidatoSuplente: formatCandidatoSuplente,
			dataPartido: formatPartidos,
		};
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const createBoletaFormal = async (
	data,
	idJornadaElectoral,
	candidatoandSuplentes,
	partidos
) => {
	try {
		// console.log("DATA PROVIDER", data); // si esta
		// console.log("ID JORNADA ELECTORAL", idJornadaElectoral); // si esta
		// // console.log("CANDIDATO AND SUPLENTE", candidatoAndSuplente);
		// console.log("PARTIDOS", partidos); // si esta
		// console.log("candidato del partido", partidos.candidatosPartido);
		// Boletas
		const boletaInformacion = {
			estructuraBoletaModel: {
				nombreEleccion: data.nombreCandidatura,
				distrito: data.distritoElectoral,
				municipio: data.municipio,
				primerFirmanteNombre: data.primerFirmante,
				primerFirmanteCargo: data.cargoPrimerFirmante,
				segundoFirmanteNombre: data.segundoFirmante,
				segundoFirmanteCargo: data.cargoSegundoFirmante,
				modalidadVotacionModel: {
					idModalidadVotacion: 1,
				},
				jornadaModel: {
					idJornada: idJornadaElectoral,
				},
			},
			partidos: [],
		};
		console.log("boletaInformacion", boletaInformacion);
		partidos.forEach((partido) => {
			const boletaPartido = {
				partidoModel: {
					clavePartido: partido.clavePartido,
					nombre: partido.nameParty,
					siglas: partido.siglasParty,
					emblema: partido.emblemParty,
					logo: partido.fotografiaParty,
					status: partido.statusPary,
				},
				candidatoModel: {
					claveElectoral: partido.candidatosPartido[0].claveElectoralCandidato,
					apellidoPCandidato: partido.candidatosPartido[0].apellidoPCandidato,
					apellidoMCandidato: partido.candidatosPartido[0].apellidoMCandidato,
					nombreCandidato: partido.candidatosPartido[0].nombreCandidato,
					fotoCandidato: partido.candidatosPartido[0].fotografiaCandidato,
					seudonimoCandidato: partido.candidatosPartido[0].seudonimoCandidato,
					fechaNacimiento: partido.candidatosPartido[0].fechaNacimientoCandidato,
					genero: partido.candidatosPartido[0].generoCandidato,
				},
				suplenteModel: {
					claveElectoral: partido.candidatosPartido[0].claveElectoralSuplente,
					apellidoPSuplente: partido.candidatosPartido[0].apellidoPSuplente,
					apellidoMSuplente: partido.candidatosPartido[0].apellidoMSuplente,
					nombreSuplente: partido.candidatosPartido[0].nombreSuplente,
					fotoSuplente: partido.candidatosPartido[0].fotografiaSuplente,
					seudonimoSuplente: partido.candidatosPartido[0].seudonimoSuplente,
					fechaNacimiento: partido.candidatosPartido[0].fechaNacimientoSuplente,
					genero: partido.candidatosPartido[0].generoSuplente,
				},
			};
			boletaInformacion.partidos.push(boletaPartido);
		});

		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/boletapartidos
		const respuesta = await jornadasAPI.post(
			"jornada/electoral/boletapartidos",
			boletaInformacion
		);
		return {
			ok: true,
			idEstructuraBoleta: respuesta.data.data.estructuraBoletaModel.idEstructuraBoleta,
		};
	} catch (error) {
		console.log("ERROR", error);
		return { ok: false, errorMessage: error.message };
	}
};

export const updateBoletaData = async (
	data,
	idJornadaElectoral,
	candidatoandSuplentes,
	idBoleta
) => {
	try {
		console.log("data provider", data);
		console.log("idJornadaElectoral provider", idJornadaElectoral);
		console.log("candidatoandSuplentes provider", candidatoandSuplentes);
		// console.log("asociaciones provider",partidos);
		console.log("idBoleta provider", idBoleta);

		const boletaInformacion = {
			nombreEleccion: data.nombreCandidatura,
			distrito: data.distritoElectoral,
			municipio: data.municipio,
			primerFirmanteNombre: data.primerFirmante,
			primerFirmanteCargo: data.cargoPrimerFirmante,
			segundoFirmanteNombre: data.segundoFirmante,
			segundoFirmanteCargo: data.cargoSegundoFirmante,
			jornadaModel: {
				idJornada: idJornadaElectoral,
			},
		};
		const { data: data1 } = await jornadasAPI.put(
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/10
			"jornada/electoral/estructuraboleta/" + idBoleta,
			boletaInformacion
		);

		// Candidato
		const { data: candidateRespData } = await jornadasAPI.put(
			// ESTA ONDA NO TIENE PUT :C
			"jornada/electoral/candidato/" + candidatoandSuplentes[0].idCandidato,
			{
				apellidoPCandidato: candidatoandSuplentes[0].apellidoPCandidato,
				apellidoMCandidato: candidatoandSuplentes[0].apellidoMCandidato,
				nombreCandidato: candidatoandSuplentes[0].nombreCandidato,
				fotoCandidato: candidatoandSuplentes[0].fotografia,
				seudonimoCandidato: candidatoandSuplentes[0].seudonimoCandidato,
				fechaNacimiento: candidatoandSuplentes[0].fechaNacimientoCandidato,
				genero: candidatoandSuplentes[0].generoCandidato,
			}
		);
		console.log("Data de respuesta", candidateRespData);

		// Suplente
		const { data: suplenteRespData } = await jornadasAPI.put(
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/suplente/DIRUAL120721
			"jornada/electoral/suplente/" + candidatoandSuplentes[0].idSuplente,
			{
				apellidoPSuplente: candidatoandSuplentes[0].apellidoPSuplente,
				apellidoMSuplente: candidatoandSuplentes[0].apellidoMSuplente,
				nombreSuplente: candidatoandSuplentes[0].nombreSuplente,
				fotoSuplente: candidatoandSuplentes[0].fotografiaSuplente,
				seudonimoSuplente: candidatoandSuplentes[0].seudonimoSuplente,
				fechaNacimiento: candidatoandSuplentes[0].fechaNacimientoSuplente,
				genero: candidatoandSuplentes[0].generoSuplente,
			}
		);
		console.log("Data de respuesta", suplenteRespData);

		// Partido
		// const { data: partidoRespData } = await jornadasAPI.put(
		// 	// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/partido/416841
		// 	"jornada/electoral/partido/" + partidos[0].id,
		// 	{
		// 		nombre: partidos[0].nombre,
		// 		siglas: partidos[0].siglas,
		// 		emblema: partidos[0].emblema,
		// 		logo: partidos[0].fotografia,
		// 		estrutucturaBoletaModel: {
		// 			idBoleta: idBoleta,
		// 		},
		// 	}
		// );
		// console.log("Data de respuesta", partidoRespData);

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

export const getJornadaRespuestasConsultas = async (idPapeleta, id) => {
	try {
		const { data } = await votoConsultaAPI.get(`votos/consulta/jornada/${id}/resultados`);

		console.log("DATA PAPALETA XXXX", data);

		const papeleta = data.papeletas.find(
			(papeleta) => papeleta.estructuraPapeleta.idPapeleta === idPapeleta
		);

		let dataChart = [];

		if (papeleta.pregunta.subtipo === "2respuestas") {
			dataChart = [
				{
					id: 0,
					respuesta: "SI",
					resultados: papeleta.resultados.opc1,
				},
				{
					id: 1,
					respuesta: "NO",
					resultados: papeleta.resultados.opc2,
				},
			];
		} else if (papeleta.pregunta.subtipo === "3respuestas") {
			dataChart = [
				{
					id: 0,
					respuesta: "EN DESACUERDO",
					resultados: papeleta.resultados.opc1,
				},
				{
					id: 1,
					respuesta: "NEUTRAL",
					resultados: papeleta.resultados.opc2,
				},
				{
					id: 2,
					respuesta: "DE ACUERDO",
					resultados: papeleta.resultados.opc3,
				},
			];
		} else if (papeleta.pregunta.subtipo === "5respuestas") {
			dataChart = [
				{
					id: 0,
					respuesta: "TOTALMENTE EN DESACUERDO",
					resultados: papeleta.resultados.opc1,
				},
				{
					id: 1,
					respuesta: "EN DESACUERDO",
					resultados: papeleta.resultados.opc2,
				},
				{
					id: 2,
					respuesta: "NEUTRAL",
					resultados: papeleta.resultados.opc3,
				},
				{
					id: 3,
					respuesta: "DE ACUERDO",
					resultados: papeleta.resultados.opc4,
				},
				{
					id: 4,
					respuesta: "TOTALMENTE DE ACUERDO",
					resultados: papeleta.resultados.opc5,
				},
			];
		} else if (papeleta.pregunta.subtipo === "personalizado1") {
			dataChart = [
				{
					id: 0,
					respuesta: papeleta.pregunta.opcion1,
					resultados: papeleta.resultados.opc1,
				},
				{
					id: 1,
					respuesta: papeleta.pregunta.opcion2,
					resultados: papeleta.resultados.opc2,
				},
			];
		} else if (papeleta.pregunta.subtipo === "personalizado2") {
			dataChart = [
				{
					id: 0,
					respuesta: papeleta.pregunta.opcion1,
					resultados: papeleta.resultados.opc1,
				},
				{
					id: 1,
					respuesta: papeleta.pregunta.opcion2,
					resultados: papeleta.resultados.opc2,
				},
				{
					id: 2,
					respuesta: papeleta.pregunta.opcion3,
					resultados: papeleta.resultados.opc3,
				},
			];
		} else if (papeleta.pregunta.subtipo === "personalizado3") {
			dataChart = [
				{
					id: 0,
					respuesta: papeleta.pregunta.opcion1,
					resultados: papeleta.resultados.opc1,
				},
				{
					id: 1,
					respuesta: papeleta.pregunta.opcion2,
					resultados: papeleta.resultados.opc2,
				},
				{
					id: 2,
					respuesta: papeleta.pregunta.opcion3,
					resultados: papeleta.resultados.opc3,
				},
				{
					id: 3,
					respuesta: papeleta.pregunta.opcion4,
					resultados: papeleta.resultados.opc4,
				},
				{
					id: 4,
					respuesta: papeleta.pregunta.opcion5,
					resultados: papeleta.resultados.opc5,
				},
			];
		}

		const dataFinal = {
			jornadaModel: data.jornadaModel,
			papeleta: papeleta,
			resultados: dataChart,
		};

		console.log("dataChart", dataChart);
		console.log("papeleta", papeleta);

		data.resultados = dataChart;

		return { ok: true, data: dataFinal };
	} catch (error) {
		console.log(error.message);
		return { ok: false, errorMessage: error.message };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
