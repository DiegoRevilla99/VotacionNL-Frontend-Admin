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

export const getBoletaData = async (idBoleta) => {
	try {
		// **FETCH
		const { data } = await jornadasNoFormalesAPI.get(
            `jornada/no_formal/estructura_boleta/${idBoleta}`);
			//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/estructura_boleta/17
		// console.log("Data boleta: ", data);
		// **Fetch de candidatos
		const { data: data1 } = await jornadasNoFormalesAPI.get(
			`jornada/no_formal/estructura_boleta/${idBoleta}/candidatos`
			//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/estructura_boleta/11/candidatos
		);
		// console.log("Data candidato: ", data1.candidatoModels);
		// console.log("Data candidato: ", data1);
		// **Fetch de asociaciones
		// const { data: data2 } = await jornadasNoFormalesAPI.get(
		// 	`jornada/no_formal/estructura_boleta/${idBoleta}/asociaciones_candidatos`
		// 	//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/estructura_boleta/11/asociaciones_candidatos
		// );
		// console.log("Data asociacion: ", data2);
		const format = {
			// MY FORMAT || API FORMAT
			// id: data.data.idEstructuraBoleta,
			encabezado: data.encabezadoBoleta,
			entidadFederativa: data.entidadFederativa,
			municipio: data.municipio,
			primerFirmante: data.primerFirmanteNombre,
			cargoPrimerFirmante: data.primerFirmanteCargo,
			segundoFirmante: data.segundoFirmanteNombre,
			cargoSegundoFirmante:data.segundoFirmanteCargo,
			modalidadVotacionModel: {
				modalidadVotacion: data.modalidadVotacionModel.idModalidadVotacion,
			},
		}
		console.log("Format: ", format);
		const formatCandidato = data1.candidatoModels.map(candidato => {
			return {
			  id: "",
			  curp: candidato.claveCandidato,
			  apellidoPCandidato: candidato.apellidoPCandidato,
			  apellidoMCandidato: candidato.apellidoMCandidato,
			  nombreCandidato: candidato.nombreCandidato,
			  fotografiaCandidato: candidato.fotoCandidato,
			  seudonimoCandidato: candidato.seudonimoCandidato,
			  fechaNacimientoCandidato: candidato.fechaNacimiento,
			  generoCandidato: candidato.genero
			};
		  });
		  console.log("candidato: ", formatCandidato);

		return { ok: true, data: format, dataCandidato: formatCandidato};
		// return { ok: true, data: format, dataCandidato: formatCandidato, dataAsociacion: formatAsociacion };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	
	}
};

export const createBoleta = async (data, idJornadaElectoral, candidatos) => {
	try {		
		console.log("data PROVIDER: ", data);
		console.log("idJornadaElectoral PROVIDER: ", idJornadaElectoral);
		console.log("candidatos PROVIDER: ", candidatos);
		// console.log("asociaciones PROVIDER: ", asociaciones);
		const { data: data1 } = await jornadasNoFormalesAPI.post("jornada/no_formal/estructuraboleta", {
            encabezadoBoleta: data.encabezado,
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
		
		console.log("hjaber la peticion",data1);
		const candidatoDatos = {
			// id: candidatos[0].id,
			claveCandidato: candidatos[0].claveCandidato,
			apellidoPCandidato: candidatos[0].apellidoPCandidato,
			apellidoMCandidato: candidatos[0].apellidoMCandidato,
			nombreCandidato: candidatos[0].nombreCandidato,
			fotoCandidato: candidatos[0].fotografiaCandidato,
			seudonimoCandidato: candidatos[0].seudonimoCandidato,
			fechaNacimiento: candidatos[0].fechaNacimientoCandidato,
			genero: candidatos[0].generoCandidato,
		}

		const candidatoData = await jornadasNoFormalesAPI.post(
			"jornada/no_formal/"+data1.idEstructuraBoleta+"/registrar_candidato",
			candidatoDatos
		);
	
		// let asociacionDatos = {};
		// if (asociaciones.length) {

		// } else {
		// 	asociacionDatos = {
		// 		nombreAsociacion: "",
		// 		emblema: "",
		// 		logo: "",
		// 	};
		// }
		// const asociacionData = await jornadasNoFormalesAPI.post("jornada/no_formal/asociacion",
		// 	asociacionDatos
		// );


		return { ok: true, idEstructuraBoleta: data1.idEstructuraBoleta };
	} catch (error) {
		console.log("ERROR", error);
		return { ok: false, errorMessage: error.message };
	}
};

export const createBoletaAsociaciones = async (data, idJornadaElectoral, candidatos, asociaciones) => {
	try {		
		console.log("data PROVIDER: ", data);
		console.log("idJornadaElectoral PROVIDER: ", idJornadaElectoral);
		console.log("candidatos PROVIDER: ", candidatos);
		console.log("asociaciones PROVIDER: ", asociaciones);

		
		// KEVIN RECUERDA QUE HAY MODALIDADES, Y QUE LA 8 ES DE PLANILLA, 7 COMITE Y 6 REPRESENTANTE
		const boletaAsosiaciones = {
			estructuraBoletaModel : {
			  encabezadoBoleta: data.encabezado,
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
			},
			asociaciones: []
		  };
		  
		  asociaciones.forEach(asociacion => {
			const boletaAsociacion = {
			  asociacionModel : {
				nombreAsociacion: asociacion.nombreAsociacion,
				emblema: asociacion.emblema,
				logo: asociacion.logo,
			  },
			  candidatos: []
			}
		  
			candidatos.forEach(candidato => {
			  const candidatoObject = {
				claveCandidato: candidato.claveCandidato,
				apellidoPCandidato: candidato.apellidoPCandidato,
				apellidoMCandidato: candidato.apellidoMCandidato,
				nombreCandidato: candidato.nombreCandidato,
				fotoCandidato: candidato.fotografiaCandidato,
				seudonimoCandidato: candidato.seudonimoCandidato,
				fechaNacimiento: candidato.fechaNacimientoCandidato,
				genero: candidato.generoCandidato,	
			  }
		  
			  boletaAsociacion.candidatos.push(candidatoObject)
			})
		  
			boletaAsosiaciones.asociaciones.push(boletaAsociacion);
		  });
		  
		//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/boletaasociaciones
		const asociacionData = await jornadasNoFormalesAPI.post("jornada/no_formal/boletaasociaciones",
			boletaAsosiaciones

		);

		return { ok: true, idEstructuraBoleta: asociacionData.idEstructuraBoleta };
	} catch (error) {
		console.log("ERROR", error);
		return { ok: false, errorMessage: error.message };
	}
};


export const updateBoletaData = async (data, idJornadaElectoral, candidatos, asociaciones, idBoleta) => {
	try {
		console.log("data provider",data);
		console.log("idJornadaElectoral provider",idJornadaElectoral);
		console.log("candidatos provider",candidatos);
		console.log("asociaciones provider",asociaciones);
		// console.log("idBoleta provider",idBoleta.listBoletas[0].idEstructuraBoleta);
		console.log("idBoleta provider",idBoleta);
		const { data: data1 } = await jornadasNoFormalesAPI.put(
			// https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/estructura_boleta/10
			"jornada/no_formal/estructura_boleta/" + idBoleta,
			{
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
			}
		);
		// console.log("Data CREATE BOLETA de respuesta", data1);
		// console.log("Data candidato", candidatos[0].id);
		// console.log("Data candidato", candidatos[0]);
		// Candidato
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
		
		const { data: candidateRespData } = await jornadasNoFormalesAPI.put(
			// https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/candidato/DIRUAL
			"jornada/no_formal/candidato/" + candidatos[0].claveCandidato,
			candidatoDatos
		);
		// console.log("Data candidato de respuesta", candidateRespData);

		// Asociaciones
		// let asociacionDatos = {};
		// if (asociaciones.length) {
		// 	asociacionDatos = {
		// 		nombreAsociacion: asociaciones[0].nombreAsociacion,
		// 		emblema: asociaciones[0].emblema,
		// 		logo: asociaciones[0].logo,
		// 	};
		// } else {
		// 	asociacionDatos = {
		// 		nombreAsociacion: "",
		// 		emblema: "",
		// 		logo: "",
		// 	};
		// }
		// console.log("Data asociacion", asociaciones[0]);
		// const { data: asociacionRespData } = await jornadasNoFormalesAPI.put(
		// 	// https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/asociacion/14
		// 	"jornada/no_formal/asociacion/" + asociaciones[0].id,
		// 	asociacionDatos
		// );
		// console.log("Data asociacion de respuesta", asociacionRespData);

		return { ok: true };
	} catch (error) {
		return { ok: false };
	}
};

export const deleteBoleta = async (id) => {
	try {
		// https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/estructura_boleta/10
		const resp = await jornadasNoFormalesAPI.delete("jornada/no_formal/estructura_boleta/" + id);
		return { ok: true };
	} catch (error) {
		// return { ok: false, errorMessage: error.message };
		console.log("Intentelo nuevamente en unos minutos, por favor.: ", error);
		return { ok: false };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
