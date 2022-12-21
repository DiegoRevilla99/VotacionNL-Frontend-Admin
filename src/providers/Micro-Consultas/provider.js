import { consultasAPI } from "./config";

let idConsultas = 0;
let idPapeleta = 0;

export const getConsultasCiudadanas = async () => {
	try {
		const { data } = await consultasAPI.get("jornada/consulta/");

		console.log("RESP: ", data);
		// await timeout(1000);
		// idConsultas++;
		return { ok: true, data: data.data };
	} catch (error) {
		console.log(error);
		return { ok: false };
	}
};

export const createConsultaCiudadana = async (titulo, entidad) => {
	const id = "JEO-JUN23-GOB" + Math.floor(Math.random() * 10000);
	try {
		const resp = await consultasAPI.post("jornada/consulta/", {
			idJornada: id,
			nombreJornada: titulo,
			dateTimeCreation: "2019-07-04T20:38:38.604+00:00",
			entidad: entidad,
			userCreation: "DEFAULT",
		});

		console.log("RESP: ", resp);
		// await timeout(1000);
		// idConsultas++;
		return { ok: true, id: id };
	} catch (error) {
		return { ok: false };
	}
};

export const deleteConsultaCiudadana = async (id) => {
	try {
		const resp = await consultasAPI.delete("jornada/consulta/" + id);
		return { ok: true };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const getPapeletas = async (idConsulta) => {
	try {
		// **FETCH
		// const resp = await consultasAPI.get("jornada/consulta/estructurapapeleta")

		// console.log("RESPUESTA PAPELETAS: ", resp);

		return { ok: true };
	} catch (error) {
		return { ok: false };
	}
};

export const createPapeleta = async (data, idConsulta) => {
	try {
		// **FETCH
		const id = "PAPELETA" + Math.floor(Math.random() * 10000);
		const resp = await consultasAPI.post("jornada/consulta/estructurapapeleta", {
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
		});

		console.log("RESPUESTA PAPELETAS: ", resp);

		return { ok: true };
	} catch (error) {
		return { ok: false };
	}
};
export const saveConfig = async (id, data) => {
	try {
		const resp = await consultasAPI.post("jornada/consulta/" + id + "/configuracion", {
			inicioDisponibilidad: data.inicioDisponibilidad,
			inicioEmpadronamiento: data.inicioEmpadronamiento,
			inicioRecepVoto: data.inicioRecepcionVotos,
			inicioAssignPass: data.inicioAsignacionContrasenia,
			finDisponibilidad: data.finDisponibilidad,
			finEmpadronamiento: data.inicioEmpadronamiento,
			finRecepVoto: data.finRecepcionVotos,
			finAssignPass: data.finAsignacionContrasenia,
			idJornada: id,
		});
		// const resp1 = await consultasAPI.post("jornada/consulta/" + id + "/configuracionvoto", {
		// 	tiempoDuracionVoto: data.tiempoDuracionRespuesta,
		// 	tiempoExtraVoto: data.tiempoExtra,
		// 	dispVerificacion: data.habilitarVerificacion,
		// 	jornadaModel: {
		// 		idJornada: id,
		// 	},
		// });

		console.log("RESPUESTA PAPELETAS: ", resp, resp);

		return { ok: true };
	} catch (error) {
		console.log(error);
		return { ok: false, errorMessage: error.message };
	}
};
export const getConfig = async (id) => {
	try {
		const { data } = await consultasAPI.get("jornada/consulta/" + id + "/configuracion");

		return { ok: true, data: data };
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const getBallotData = async (idBallot) => {
	try {
		// **FETCH
		await timeout(1000);
		return { ok: true, id: 0, encabezadoConsulta: "Encabezado de prueba" };
	} catch (error) {
		return { ok: false };
	}
};

export const updateBallotData = async (idBallot, encabezadoConsulta) => {
	try {
		await timeout(1000);
		return { ok: true };
	} catch (error) {
		return { ok: false };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
