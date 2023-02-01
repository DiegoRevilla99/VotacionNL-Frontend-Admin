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
			// entidad: entidad,
            tipoEleccion: tipoEleccion,
			// formalidad: "FORMAL",
		});
		return { ok: true, id: data.idEleccion };
	} catch (error) {
		return { ok: false };
	}
};

export const deleteJornada = async (id) => {
	try {
		// https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/estructura_boleta/10
		// Ya funciona, Kevin del futuro elimina el comentario nada m[as]s
		// const resp = await jornadasNoFormalesAPI.delete("jornada/no_formal/estructura_boleta/" + id);
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
		return { ok: true, data: data };
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
		// console.log("FormatAAAAAAAAAAAA: ", format);

		// const formatCandidato = {
		// 	// MY FORMAT || API FORMAT
		// 	id: data1.candidatoModels.claveCandidato,
		// 	apellidoPCandidato: data1.candidatoModels.apellidoPCandidato,
        //     apellidoMCandidato: data1.candidatoModels.apellidoMCandidato,
        //     nombreCandidato: data1.candidatoModels.nombreCandidato,
        //     fotografiaCandidato: data1.candidatoModels.fotoCandidato,
        //     seudonimoCandidato: data1.candidatoModels.seudonimoCandidato,
        //     fechaNacimientoCandidato:data1.candidatoModels.fechaNacimiento,
        //     generoCandidato: data1.candidatoModels.genero,
		// };

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
		// console.log("format candidatoooooooooooo: ", formatCandidato);
		// formatCandidato.forEach(candidato => {
		// 	console.log("candidatoooooooooooo: ",candidato);
		//   });
		return { ok: true, data: format, dataCandidato: formatCandidato };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	
	}
};

export const createBoleta = async (data, idJornadaElectoral, candidatos) => {
	try {
		console.log("datos PROVIDER",data);
		console.log("id PROVIDER",idJornadaElectoral);
		console.log("candidato PROVIDER",candidatos);
		
		// Boletas
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
				idModalidadVotacion: 1,
			},
			eleccionModel: {
				idEleccion: idJornadaElectoral,
			},
		});
		console.log("DATA IDBOLETA PROVIDER",data1.idEstructuraBoleta);

		const variable = {
			claveCandidato: candidatos[0].curp,
			apellidoPCandidato: candidatos[0].apellidoPCandidato,
			apellidoMCandidato: candidatos[0].apellidoMCandidato,
			nombreCandidato: candidatos[0].nombreCandidato,
			fotoCandidato: candidatos[0].fotografiaCandidato,
			seudonimoCandidato: candidatos[0].seudonimoCandidato,
			// fechaNacimiento: candidatos[0].fechaNacimientoCandidato,
			fechaNacimiento: "2019-07-04T20:38:38.604+00:00",
			genero: candidatos[0].generoCandidato,
		}
		console.log("variable",variable);
		const candidatoData = await jornadasNoFormalesAPI.post(
			"jornada/no_formal/"+data1.idEstructuraBoleta+"/registrar_candidato",
			//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/11/registrar_candidato
			variable
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
		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/9
		const resp = await jornadasNoFormalesAPI.delete("jornada/electoral/estructuraboleta/" + id);
		return { ok: true };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
