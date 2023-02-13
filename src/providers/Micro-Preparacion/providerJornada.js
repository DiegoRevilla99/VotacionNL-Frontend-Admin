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
		// **Fetch de candidatos
		const { data: data1 } = await jornadasAPI.get(
			"jornada/electoral/estructuraboleta/" + idTicket+ "/candidatoSuplente"
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/candidato/PEHEFE020722
			//https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/5/candidatoSuplente
		);
		// **Fetch de suplentes
		// const { data: data2 } = await jornadasAPI.get(
		// 	"jornada/electoral/suplente/" + idTicket
		// 	// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/suplente/DIRUAL120721
		// );
		// **Fetch de partidos
		// const { data: data3 } = await jornadasAPI.get(
		// 	"jornada/electoral/estructuraboleta/" + idTicket + "/partidos"
		// 	//https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/5/partidos
		// 	// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/partido/0
		// );

		// console.log("DATA BOLETA", data);
		console.log("DATA CANDIDATO", data1);
		// console.log("DATA SUPLENTE", data2);
		// console.log("DATA PARTIDO", data3);

		const formatCandidato = {
			// MY FORMAT || API FORMAT
			id: "",
			claveElectoral: data1.data.claveElectoralCandidato,
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
			id: "",
			claveElectoral: data2.data.claveElectoralSuplente,
			apellidoPSuplente: data2.data.apellidoPSuplente,
			apellidoMSuplente: data2.data.apellidoMSuplente,
			nombreSuplente: data2.data.nombreSuplente,
			fotografiaSuplente: data2.data.fotoSuplente,
			seudonimoSuplente: data2.data.seudonimoSuplente,
			fechaNacimientoSuplente: data2.data.fechaNacimiento,
			generoSuplente: data2.data.genero,
		};
		// const formatPartido = {
		// 	// MY FORMAT || API FORMAT
		// 	id: data3.data.clavePartido,
		// 	nombrePartido: data3.data.nombre,
		// 	siglas: data3.data.siglas,
		// 	emblema: data3.data.emblema,
		// 	fotografiaPartido: data3.data.logo,
		// };
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

		return {
			ok: true,
			data: format,
			dataCandidato: formatCandidato,
			dataSuplente: formatSuplente,
			// dataPartido: formatPartido,
		};
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};


export const createBoleta = async (data, idJornadaElectoral, candidatoAndSuplente, partidos) => {

	try {
		console.log("DATA PROVIDER", data); // si esta
		console.log("ID JORNADA ELECTORAL", idJornadaElectoral); // si esta
		// console.log("CANDIDATO AND SUPLENTE", candidatoAndSuplente);
		// console.log("PARTIDOS", partidos); // si esta
		// Boletas

		const boletaInformacion = {
			nombreEleccion: data.nombreCandidatura,
			distrito: data.distritoElectoral,
			municipio: data.municipio,
			primerFirmanteNombre: data.primerFirmante,
			primerFirmanteCargo: data.cargoPrimerFirmante,
			segundoFirmanteNombre: data.segundoFirmante,
			segundoFirmanteCargo: data.cargoSegundoFirmante,
			modalidadVotacionModel: {
				idModalidadVotacion: 4,
			},
			jornadaModel: {
				idJornada: idJornadaElectoral,
			},
		}
		const respuesta = await jornadasAPI.post("jornada/electoral/estructuraboleta", 
			boletaInformacion
		);
		console.log("RESPUESTA PETICIÓN", respuesta);

		const { data: candidatoSuplenteRespData } = await jornadasAPI.post(
			"jornada/electoral/candidato",
			{
				// API FORM 		// MY FORM
				candidatoModel: {
					claveElectoral: candidatoAndSuplente[0].claveElectoralCandidato, // esto es new
					apellidoPCandidato: candidatoAndSuplente[0].apellidoPCandidato,
					apellidoMCandidato: candidatoAndSuplente[0].apellidoMCandidato,
					nombreCandidato: candidatoAndSuplente[0].nombreCandidato,
					fotoCandidato: candidatoAndSuplente[0].fotografiaCandidato,
					seudonimoCandidato: candidatoAndSuplente[0].seudonimoCandidato,
					fechaNacimiento: candidatoAndSuplente[0].fechaNacimientoCandidato,
					genero: candidatoAndSuplente[0].generoCandidato,
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
		console.log("ID DEL CANDIDATO", candidatoSuplenteRespData.data.candidatoModel.idCandidato);
		// Partido
		const { data: partidoRespData } = await jornadasAPI.post(
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/partido/candidato/DIRUAL01
			"jornada/electoral/partido/" + respuesta.data.data.idEstructuraBoleta,
			{
				// API FORMAT || MY FORMAT
				clavePartido:partidos[0].clavePartido,
				nombre: partidos[0].nameParty,
				siglas: partidos[0].siglasParty,
				emblema: partidos[0].emblemParty,
				logo: partidos[0].fotografiaParty,
				status: partidos[0].statusPary,
				estructuraBoletaModel:{
					idEstructuraBoleta: respuesta.data.data.idEstructuraBoleta,
				},
				// candidatoModel:{
				// 	idCandidato: candidatoSuplenteRespData.data.candidatoModel.idCandidato,
				// },
				// candidatoModel:{
				// 	idCandidato: candidatoSuplenteRespData.data.candidatoModel.idCandidato,
				// },
				// candidatoModel: 
				// 	candidatos.map(candidato => ({
				// 		idCandidato: candidato.idCandidato
				// }))
			}
		);
		console.log("Data de respuesta ", partidoRespData);
			// console.log("ID DE LA BOLETA",respuesta.idEstructuraBoleta);
		return { ok: true, idEstructuraBoleta: respuesta.data.data.idEstructuraBoleta };
	} catch (error) {
		console.log("ERROR", error);
		return { ok: false, errorMessage: error.message };
	}
};

export const updateBoletaData = async (
	data,
	idJornadaElectoral,
	candidatoandSuplentes, 
	idBoleta,
) => {
	try {
		console.log("data provider",data);
		console.log("idJornadaElectoral provider",idJornadaElectoral);
		console.log("candidatoandSuplentes provider",candidatoandSuplentes);
		// console.log("asociaciones provider",partidos);
		console.log("idBoleta provider",idBoleta);


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
		}
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

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
