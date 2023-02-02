import { jornadasNoFormalesAPI } from "./configNoFormales";

let idEleccion = 0;
let idBoleta = 0;

export const getJornadasNoFormales = async () => {
	try {
		// https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/elecciones
		const { data } = await jornadasNoFormalesAPI.get("jornada/no_formal/elecciones");
		return { ok: true, data: data, errorMessage: "" };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const createJornada = async (title, tipoEleccion) => {
	// const id = "JEO-JUN23-GOB" + Math.floor(Math.random() * 10000);
	try {
		// https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/
		const { data } = await jornadasNoFormalesAPI.post("jornada/no_formal/", {
			// idEleccion: id,
			nombreEleccion: title,
			dateTimeCreation: "2019-07-04T20:38:38.604+00:00",
            userCreation: "DEFAULT",
            tipoEleccion: tipoEleccion,
		});
		return { ok: true, id: data.idEleccion };
	} catch (error) {
		return { ok: false };
	}
};

export const deleteJornada = async (id) => {
	try {
		// https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/EL-DE-CO-ES-PA-BO-ORD-2023
		const resp = await jornadasNoFormalesAPI.delete("jornada/no_formal/" + id);
		return { ok: true };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};


export const getBoletasJornadaNoFormal = async (idJornadaElectoral) => {
	try {
		// **FETCH
		const  {data}  = await jornadasNoFormalesAPI.get(
			`jornada/no_formal/${idJornadaElectoral}/boletas`
		);
		return { ok: true, data: data, errorMessage: "" };
	} catch (error) {
		console.log("Error al obtener las boletas: ", error);
		return { ok: false };
	}
};

export const getCandidatoBoletaNoFormal = async (idJornadaElectoral) => {
	try {
		// **FETCH
		//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/candidato/PEHEFE000701
		//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/estructura_boleta/11/candidatos
		const { data } = await jornadasNoFormalesAPI.get(
			`jornada/no_formal/candidato/estructura_boleta/${idJornadaElectoral}/candidatos`
		);
		console.log("Data candidatos: ", data);
		return { ok: true, data: data };
	} catch (error) {
		console.log("Error al obtener las boletas: ", error);
		return { ok: false };
	}
};

export const getBoletaData = async (idJornadaElectoral) => {
	try {
		// **FETCH
		const { data } = await jornadasNoFormalesAPI.get(
            `jornada/no_formal/estructura_boleta/${idJornadaElectoral}`);
			//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/estructura_boleta/17
		// console.log("Data boleta: ", data);
		// **Fetch de candidatos
		const { data: data1 } = await jornadasNoFormalesAPI.get(
			`jornada/no_formal/estructura_boleta/${idJornadaElectoral}/candidatos`
			//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/estructura_boleta/11/candidatos
		);
		// console.log("Data candidato: ", data1);
		// **Fetch de asociaciones
		// const { data: data2 } = await jornadasNoFormalesAPI.get(
		// 	`jornada/no_formal/estructura_boleta/${idJornadaElectoral}/candidatos`
		// 	//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/asociacion/14
		// );
		// console.log("Data candidato: ", data1);
		const format = {
			// MY FORMAT || API FORMAT
			// id: data.data.idEstructuraBoleta,
			encabezado: data.encabezadoBoleta,
			// modalidadVotacion: data.data.modalidadVotacion,
			entidadFederativa: data.entidadFederativa,
			municipio: data.municipio,
			primerFirmante: data.primerFirmanteNombre,
			cargoPrimerFirmante: data.primerFirmanteCargo,
			segundoFirmante: data.segundoFirmanteNombre,
			cargoSegundoFirmante:data.segundoFirmanteCargo,
		}

		const formatCandidato = data1.candidatoModels.map(candidato => {
			return {
			  id: candidato.claveCandidato,
			  apellidoPCandidato: candidato.apellidoPCandidato,
			  apellidoMCandidato: candidato.apellidoMCandidato,
			  nombreCandidato: candidato.nombreCandidato,
			  fotografiaCandidato: candidato.fotoCandidato,
			  seudonimoCandidato: candidato.seudonimoCandidato,
			  fechaNacimientoCandidato: candidato.fechaNacimiento,
			  generoCandidato: candidato.genero
			};
		  });

		return { ok: true, data: format, dataCandidato: formatCandidato };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	
	}
};

export const createBoleta = async (data, idJornadaElectoral, candidatos, asociaciones) => {
	try {		
		console.log("Data: ", asociaciones);
		const { data: data1 } = await jornadasNoFormalesAPI.post("jornada/no_formal/estructuraboleta", {
			// https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/estructuraboleta
            encabezadoBoleta: data.encabezado,
            // modalidadVotacion: data.modalidadVotacion,
            entidadFederativa: data.entidadFederativa,
            municipio: data.municipio,
            primerFirmanteNombre: data.primerFirmante,
            primerFirmanteCargo: data.cargoPrimerFirmante,
            segundoFirmanteNombre: data.segundoFirmante,
            segundoFirmanteCargo:data.cargoSegundoFirmante,
			modalidadVotacionModel: {
				idModalidadVotacion: data.modalidadVotacion,
			},
			eleccionModel: {
				idEleccion: idJornadaElectoral,
			},
		});
		const candidatoDatos = {
			claveCandidato: candidatos[0].curp,
			apellidoPCandidato: candidatos[0].apellidoPCandidato,
			apellidoMCandidato: candidatos[0].apellidoMCandidato,
			nombreCandidato: candidatos[0].nombreCandidato,
			fotoCandidato: candidatos[0].fotografiaCandidato,
			seudonimoCandidato: candidatos[0].seudonimoCandidato,
			fechaNacimiento: candidatos[0].fechaNacimientoCandidato,
			// fechaNacimiento: "2019-07-04T20:38:38.604+00:00",
			genero: candidatos[0].generoCandidato,
		}

		const candidatoData = await jornadasNoFormalesAPI.post(
			"jornada/no_formal/"+data1.idEstructuraBoleta+"/registrar_candidato",
			//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/11/registrar_candidato
			candidatoDatos
		);
		
		let asociacionDatos = {};
		if (asociaciones.length) {
			asociacionDatos = {
				nombreAsociacion: asociaciones[0].nombreAsociacion,
				emblema: asociaciones[0].emblema,
				logo: asociaciones[0].logo,
			};
		} else {
			asociacionDatos = {
				nombreAsociacion: "",
				emblema: "",
				logo: "",
			};
		}
		const asociacionData = await jornadasNoFormalesAPI.post("jornada/no_formal/asociacion",
			asociacionDatos
		);

		return { ok: true, idEstructuraBoleta: data1.idEstructuraBoleta };
	} catch (error) {
		console.log("ERROR", error);
		return { ok: false, errorMessage: error.message };
	}
};


export const updateBoletaData = async (data, idJornadaElectoral, idBoleta, candidatos, suplentes, partidos) => {
	try {
		const { data: data1 } = await jornadasNoFormalesAPI.put(
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/10
			"jornada/electoral/estructuraboleta/" + idBoleta,
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
					idJornada: idJornadaElectoral,
				},
			}
		);
			// Candidato
		const { data: candidateRespData } = await jornadasNoFormalesAPI.put(
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
		const { data: suplenteRespData } = await jornadasNoFormalesAPI.put(
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
		const { data: partidoRespData } = await jornadasNoFormalesAPI.put(
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
		console.log("ID de provider", id);
		// https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/estructura_boleta/10
		const resp = await jornadasNoFormalesAPI.delete("jornada/no_formal/estructura_boleta/" + id);
		return { ok: true };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
