import { votoConsultaAPI } from "../Micro-VotoConsultas/configVotoConsultas";
import { votosNoFormalesAPI } from "../Micro-VotosNoFormales/configVotosNoFormales";
import { ImagesAPI } from "./configImage";
import { jornadasAPI } from "./configJornada";
import { jornadasNoFormalesAPI } from "./configNoFormales";
import { votoFormalAPI } from "../Micro-VotoFormal/configVotoFormal";
import { authAPI } from "../Micro-Auth/configAuth";
let idJornadas = 0;
let idBoleta = 0;

export const postImage = async (file) => {
	try {
		const formData1 = new FormData();
		formData1.append("file", file);
		const response = await ImagesAPI.post("file/upload", formData1);
		console.log(response);
		return { ok: true, data: response.data.link, errorMessage: "" };
	} catch (error) {
		console.log("Error la imagen: ", error);
		return { ok: false };
	}
};

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
		console.log("DATA JORNADAS", data);
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
export const getBoletasJornadaNoFormal = async (idJornadaElectoral) => {
	try {
		// **FETCH
		console.log("ID JORNADA QUE LLEGAAAAAAA", idJornadaElectoral);
		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/jornada/JO-EL-GO-OR-20-NUE-2023/estructurasboletas
		const { data } = await jornadasNoFormalesAPI.get(
			`jornada/no_formal/${idJornadaElectoral}/boletas`
		);
		console.log("RESPUESTA", data);
		// console.log("DATA BOLETASSSS", data);
		return { ok: true, data: data.listBoletas };
	} catch (error) {
		return { ok: false };
	}
};

export const getBoletaData = async (idTicket) => {
	try {
		// console.log("idTicket", idTicket);
		// **FETCH
		const { data } = await jornadasAPI.get("jornada/electoral/estructuraboleta/" + idTicket);
		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/5
		// **Fetch de candidatos y suplentes por boleta
		// console.log("idTicket", idTicket);
		const { data: data1 } = await jornadasAPI.get(
			"jornada/electoral/estructuraboleta/" + idTicket + "/candidatoSuplente"
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/44/candidatoSuplente
			//https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/41/candidatoSuplente
		);

		// console.log("data2", data1.data);
		// **Fetch de partidos por boleta
		const { data: data2 } = await jornadasAPI.get(
			"jornada/electoral/estructuraboleta/" + idTicket + "/partidos"
			// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/estructuraboleta/5/partidos
		);

		const formatPartidos = await Promise.all(
			data2.data.map(async (partido) => {
				const { data: candidatos } = await jornadasAPI.get(
					`jornada/electoral/candidatoPartido/${partido.clavePartido}`
				);
				console.log(candidatos);
				return {
					id: "",
					// clavePartido: partido.clavePartido,
					nameParty: partido.nombre,
					siglasParty: partido.siglas,
					emblemParty: partido.emblema,
					fotografiaParty: partido.logo,
					statusParty: partido.status,
					candidatosPartido: [
						{
							id: candidatos.data.idCandidato,
							claveElectoralCandidato: candidatos.data.curp,
							apellidoPCandidato: candidatos.data.apellidoPCandidato,
							apellidoMCandidato: candidatos.data.apellidoMCandidato,
							nombreCandidato: candidatos.data.nombreCandidato,
							fotografia: candidatos.data.fotoCandidato,
							seudonimoCandidato: candidatos.data.seudonimoCandidato,
							fechaNacimientoCandidato: candidatos.data.fechaNacimiento,
							generoCandidato: candidatos.data.genero,
						},
					],
				};
			})
		);

		console.log("PARTIDOS", formatPartidos);
		// console.log("DATA candidatos y suplentes por boleta", data1.data);

		const formatCandidatoSuplente = data1.data.map((objeto) => ({
			candidatoModel: {
				id: objeto.candidatoModel.idCandidato,
				claveElectoralCandidato: objeto.candidatoModel.curp,
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
				claveElectoralSuplente: objeto.suplenteModel.curp,
				apellidoPSuplente: objeto.suplenteModel.apellidoPSuplente,
				apellidoMSuplente: objeto.suplenteModel.apellidoMSuplente,
				nombreSuplente: objeto.suplenteModel.nombreSuplente,
				fotografiaSuplente: objeto.suplenteModel.fotoSuplente,
				seudonimoSuplente: objeto.suplenteModel.seudonimoSuplente,
				fechaNacimientoSuplente: objeto.suplenteModel.fechaNacimiento,
				generoSuplente: objeto.suplenteModel.genero,
			},
		}));

		const format = {
			// MY FORMAT || API FORMAT
			// id: data.data.idEstructuraBoleta,
			nombreCandidatura: data.data.nombreEstructuraBoleta,
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

		console.log("FORMAT", format);
		console.log("FORMAT CANDIDATO SUPLENTE", formatCandidatoSuplente);
		console.log("FORMAT PARTIDO", formatPartidos);

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
				nombreEstructuraBoleta: data.nombreCandidatura,
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

		partidos.forEach((partido) => {
			const boletaPartido = {
				partidoModel: {
					// clavePartido: partido.clavePartido,
					nombre: partido.nameParty,
					siglas: partido.siglasParty,
					emblema: partido.emblemParty,
					logo: partido.fotografiaParty,
					status: partido.statusParty,
				},
				candidatoModel: {
					curp: partido.candidatosPartido[0].claveElectoralCandidato,
					apellidoPCandidato: partido.candidatosPartido[0].apellidoPCandidato,
					apellidoMCandidato: partido.candidatosPartido[0].apellidoMCandidato,
					nombreCandidato: partido.candidatosPartido[0].nombreCandidato,
					fotoCandidato: partido.candidatosPartido[0].fotografiaCandidato,
					seudonimoCandidato: partido.candidatosPartido[0].seudonimoCandidato,
					fechaNacimiento: partido.candidatosPartido[0].fechaNacimientoCandidato,
					genero: partido.candidatosPartido[0].generoCandidato,
				},
				suplenteModel: {
					curp: partido.candidatosPartido[0].claveElectoralSuplente,
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
		console.log("boletaInformacion", boletaInformacion);
		// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/boletapartidos
		const respuesta = await jornadasAPI.post(
			"jornada/electoral/boletapartidos",
			boletaInformacion
		);

		console.log("datraaaaaaaaaaa", respuesta);
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
		console.log("partidos provider", partidos);
		console.log("idBoleta provider", idBoleta);

		const boletaInformacion = {
			nombreEstructuraBoleta: data.nombreCandidatura,
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
		candidatoandSuplentes.forEach(async (candidato) => {
			const { data: candidateRespData } = await jornadasAPI.put(
				"jornada/electoral/candidato/" + candidato.idCandidato,
				{
					curp: candidato.claveElectoralCandidato,
					apellidoPCandidato: candidato.apellidoPCandidato,
					apellidoMCandidato: candidato.apellidoMCandidato,
					nombreCandidato: candidato.nombreCandidato,
					fotoCandidato: candidato.fotografia,
					seudonimoCandidato: candidato.seudonimoCandidato,
					fechaNacimiento: candidato.fechaNacimientoCandidato,
					genero: candidato.generoCandidato,
				}
			);
		});

		console.log("Data de respuesta", candidateRespData);

		// Suplente
		candidatoandSuplentes.forEach(async (candidato) => {
			const { data: suplenteRespData } = await jornadasAPI.put(
				"jornada/electoral/suplente/" + candidato.idSuplente,
				{
					curp: candidato.claveElectoralSuplente,
					apellidoPSuplente: candidato.apellidoPSuplente,
					apellidoMSuplente: candidato.apellidoMSuplente,
					nombreSuplente: candidato.nombreSuplente,
					fotoSuplente: candidato.fotografiaSuplente,
					seudonimoSuplente: candidato.seudonimoSuplente,
					fechaNacimiento: candidato.fechaNacimientoSuplente,
					genero: candidato.generoSuplente,
				}
			);
		});

		console.log("Data de respuesta", suplenteRespData);

		// Partido
		partidos.forEach(async (partido) => {
			const { data: partidoRespData } = await jornadasAPI.put(
				`jornada/electoral/partido/${partido.id}`,
				{
					nombre: partido.nameParty,
					siglas: partido.siglasParty,
					emblema: partido.emblemParty,
					logo: partido.fotografiaParty,
					status: partido.statusParty,
					estructuraBoletaModel: {
						idEstructuraBoleta: idBoleta,
					},
				}
			);
		});

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

export const getJornadaVotos = async (idBoleta, idJornada) => {
	try {
		console.log("ID BOLETA QUE LLEGA", idBoleta);
		const { data } = await votoFormalAPI.get(
			`votos_seguros/jornadaelectoral/${idJornada}/resultados`
		);

		console.log("RESULTADOS FORMALES", data);

		const boleta = data.boletas.find((boleta) => boleta.idBoleta === idBoleta);

		console.log("BOLETA FORMALES", boleta);

		let dataChart = [];

		if (boleta === undefined) {
			console.log("entr a undefined");
		} else {
			boleta.boletaCandidatos.forEach((paquete) => {
				// const candidatox = boleta.boletaCandidatos.candidatoModels.find(
				// 	(candidato) => candidato.claveCandidato === paquete.id
				// );

				// console.log("CANDIDATO BUSCADO", candidatox);
				if (paquete.id === 99999) {
				} else
					dataChart.push({
						id: paquete.id,
						candiato:
							paquete.id === 99999
								? "Votos nulos"
								: paquete.id === "NULO"
								? "Votos nulos"
								: paquete.name,
						resultados: paquete.candidad,
						fotos:
							paquete.id === 99999
								? [
										"https://cdn.pixabay.com/photo/2013/07/13/01/20/forbidden-155564_1280.png",
								  ]
								: paquete.datosCandidato.partidos.map((partido) => partido.logo),
					});
			});
		}

		console.log("DATA CHART PRE", dataChart);

		const nulo = boleta.boletaCandidatos.find((resul) => {
			if (resul.id === 99999) return resul;
		});

		if (nulo !== undefined) {
			console.log("NULOOOOOOOOOOOOO", nulo);
			dataChart.push({
				id: nulo.id,
				candiato: "Votos nulos",
				resultados: nulo.candidad,
				fotos: ["https://cdn.pixabay.com/photo/2013/07/13/01/20/forbidden-155564_1280.png"],
			});
		}

		// !!ELIMINAR
		dataChart.push({
			id: 99998,
			candiato: "Candidaturas no registradas",
			resultados: 3,
			fotos: [
				"https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper.png",
			],
		});

		// if(boleta.candidaturasNoReg)

		const dataFinal = {
			jornadaModel: {},
			boleta: boleta || null,
			resultados: dataChart,
		};

		console.log("DATA CHART FINAL", dataChart);

		return { ok: true, data: dataFinal };
	} catch (error) {
		console.log("ERRORRRRRRRRR", error.message);
		return { ok: false, errorMessage: error.message };
	}
};
export const getJornadaVotosInicio = async (idBoleta, idJornada) => {
	try {
		console.log("ID BOLETA QUE LLEGA", idBoleta);
		const { data } = await votoFormalAPI.get(
			`votos_seguros/jornadaelectoral/${idJornada}/resultados`
		);

		console.log("RESULTADOS FORMALES", data);

		const boleta = data.boletas.find((boleta) => boleta.idBoleta === idBoleta);

		console.log("BOLETA FORMALES", boleta);

		let dataChart = [];

		if (boleta === undefined) {
			console.log("entr a undefined");
		} else {
			boleta.boletaCandidatos.forEach((paquete) => {
				// const candidatox = boleta.boletaCandidatos.candidatoModels.find(
				// 	(candidato) => candidato.claveCandidato === paquete.id
				// );

				// console.log("CANDIDATO BUSCADO", candidatox);
				if (paquete.id === 99999) {
				} else
					dataChart.push({
						id: paquete.id,
						candiato:
							paquete.id === 99999
								? "Votos nulos"
								: paquete.id === "NULO"
								? "Votos nulos"
								: paquete.name,
						resultados: 0,
						fotos:
							paquete.id === 99999
								? [
										"https://cdn.pixabay.com/photo/2013/07/13/01/20/forbidden-155564_1280.png",
								  ]
								: paquete.datosCandidato.partidos.map((partido) => partido.logo),
					});
			});
		}

		console.log("DATA CHART PRE", dataChart);

		const nulo = boleta.boletaCandidatos.find((resul) => {
			if (resul.id === 99999) return resul;
		});

		if (nulo !== undefined || nulo !== null) {
			console.log("NULOOOOOOOOOOOOO", nulo);
			dataChart.push({
				id: nulo.id,
				candiato: "Votos nulos",
				resultados: 0,
				fotos: ["https://cdn.pixabay.com/photo/2013/07/13/01/20/forbidden-155564_1280.png"],
			});
		}

		// if(boleta.candidaturasNoReg)

		const dataFinal = {
			jornadaModel: {},
			boleta: boleta || null,
			resultados: dataChart,
		};

		console.log("DATA CHART INICIAL", dataChart);

		return { ok: true, data: dataFinal };
	} catch (error) {
		console.log("ERRORRRRRRRRR", error.message);
		return { ok: false, errorMessage: error.message };
	}
};

export const getJornadaNoFormalVotos = async (idBoleta, id) => {
	try {
		const { data } = await votosNoFormalesAPI.get(`votos/no/formal/jornada/${id}/resultados`);
		// votos/no/formal/jornada/546622-EL-DE-PR-ES-ORD-2023/resultados
		// https://ms-jornada-votos-no-formales.herokuapp.com/votos/no/formal/jornada/546622-EL-DE-PR-ES-ORD-2023/resultados

		console.log("DATA DE NO FORMALES", data);

		const boleta = data.boletas.find((boleta) => boleta.idBoleta === idBoleta);

		console.log("BOLETA ENCONTRADA", boleta);

		let dataChart = [];

		if (boleta.boletaCandidatos.modalidad.modalidad === "PLANILLA") {
			console.log("ENRTRA AQUI EN PLANILLA");
			dataChart = boleta.representanteResultado.map((paquete) => {
				console.log("paso 1", boleta.boletaCandidatos);
				const planilla = boleta.boletaCandidatos.candidatosAsociaciones.find(
					(cands) => cands.idCombinacion === paquete.id
				);
				console.log("PLANILLA ENCONTRADA", planilla);

				const candidatosDePlanilla = planilla.candidatos.map(
					(candidato) => candidato.nombreCandidato
				);

				// candidatosDePlanilla.push(" ");

				const nombresPlanillas = planilla.asociacionModel.map((as) => as.nombreAsociacion);

				// candidatosDePlanilla.push(...nombresPlanillas);

				return {
					id: paquete.id,
					candiato: candidatosDePlanilla,
					planillas: nombresPlanillas,
					resultados: paquete.candidad,
				};
			});
		} else {
			if (boleta === undefined) {
				console.log("entr a undefined");
			} else {
				dataChart = boleta.representanteResultado.map((paquete) => {
					const candidatox = boleta.boletaCandidatos.candidatoModels.find(
						(candidato) => candidato.claveCandidato === paquete.id
					);

					console.log("CANDIDATO BUSCADO", candidatox);
					return {
						id: paquete.id,
						candiato:
							paquete.id === "CANORE"
								? "Candidatura no registrada"
								: paquete.id === "NULO"
								? "Votos nulos"
								: candidatox.nombreCandidato +
								  candidatox.apellidoPCandidato +
								  candidatox.apellidoMCandidato,
						resultados: paquete.candidad,
					};
				});
			}
		}
		const dataFinal = {
			jornadaModel: {},
			boleta: boleta || null,
			resultados: dataChart,
		};

		console.log("DATA CHAAARTS", dataChart);
		return { ok: true, data: dataFinal };
	} catch (error) {
		console.log("ERROR NO FORMALES", error.message);
		return { ok: false, errorMessage: error.message };
	}
};

export const getJornadaNoFormalVotosInicio = async (idBoleta, id) => {
	try {
		const { data } = await votosNoFormalesAPI.get(`votos/no/formal/jornada/${id}/resultados`);
		// votos/no/formal/jornada/546622-EL-DE-PR-ES-ORD-2023/resultados
		// https://ms-jornada-votos-no-formales.herokuapp.com/votos/no/formal/jornada/546622-EL-DE-PR-ES-ORD-2023/resultados

		console.log("DATA DE NO FORMALES", data);

		const boleta = data.boletas.find((boleta) => boleta.idBoleta === idBoleta);

		console.log("BOLETA ENCONTRADA", boleta);

		let dataChart = [];

		if (boleta.boletaCandidatos.modalidad.modalidad === "PLANILLA") {
			console.log("ENRTRA AQUI EN PLANILLA");
			dataChart = boleta.representanteResultado.map((paquete) => {
				console.log("paso 1", boleta.boletaCandidatos);
				const planilla = boleta.boletaCandidatos.candidatosAsociaciones.find(
					(cands) => cands.idCombinacion === paquete.id
				);
				console.log("PLANILLA ENCONTRADA", planilla);

				const candidatosDePlanilla = planilla.candidatos.map(
					(candidato) => candidato.nombreCandidato
				);

				// candidatosDePlanilla.push(" ");

				const nombresPlanillas = planilla.asociacionModel.map((as) => as.nombreAsociacion);

				// candidatosDePlanilla.push(...nombresPlanillas);

				return {
					id: paquete.id,
					candiato: candidatosDePlanilla,
					planillas: nombresPlanillas,
					resultados: 0,
				};
			});
		} else {
			if (boleta === undefined) {
				console.log("entr a undefined");
			} else {
				dataChart = boleta.representanteResultado.map((paquete) => {
					const candidatox = boleta.boletaCandidatos.candidatoModels.find(
						(candidato) => candidato.claveCandidato === paquete.id
					);

					console.log("CANDIDATO BUSCADO", candidatox);
					return {
						id: paquete.id,
						candiato:
							paquete.id === "CANORE"
								? "Candidatura no registrada"
								: paquete.id === "NULO"
								? "Votos nulos"
								: candidatox.nombreCandidato +
								  candidatox.apellidoPCandidato +
								  candidatox.apellidoMCandidato,
						resultados: 0,
					};
				});
			}
		}
		const dataFinal = {
			jornadaModel: {},
			boleta: boleta || null,
			resultados: dataChart,
		};

		console.log("DATA CHAAARTS DE INICIOOOOOOOOOOO", dataChart);
		return { ok: true, data: dataFinal };
	} catch (error) {
		console.log("ERROR NO FORMALES", error.message);
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

		console.log("PAPELETA ENCONTRADAAAAAAAA", papeleta);

		if (papeleta === undefined) {
			console.log("entr a undefined");
		} else if (papeleta.pregunta.subtipo === "2respuestas") {
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
			papeleta: papeleta || null,
			resultados: dataChart,
		};

		data.resultados = dataChart;

		return { ok: true, data: dataFinal };
	} catch (error) {
		console.log("ERRORXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", error.message);
		return { ok: false, errorMessage: error.message };
	}
};

export const getJornadaRespuestasConsultasInicio = async (idPapeleta, id) => {
	try {
		const { data } = await votoConsultaAPI.get(`votos/consulta/jornada/${id}/resultados`);

		console.log("DATA PAPALETA XXXX", data);

		const papeleta = data.papeletas.find(
			(papeleta) => papeleta.estructuraPapeleta.idPapeleta === idPapeleta
		);

		let dataChart = [];

		console.log("PAPELETA ENCONTRADAAAAAAAA", papeleta);

		if (papeleta === undefined) {
			console.log("entr a undefined");
		} else if (papeleta.pregunta.subtipo === "2respuestas") {
			dataChart = [
				{
					id: 0,
					respuesta: "SI",
					resultados: 0,
				},
				{
					id: 1,
					respuesta: "NO",
					resultados: 0,
				},
			];
		} else if (papeleta.pregunta.subtipo === "3respuestas") {
			dataChart = [
				{
					id: 0,
					respuesta: "EN DESACUERDO",
					resultados: 0,
				},
				{
					id: 1,
					respuesta: "NEUTRAL",
					resultados: 0,
				},
				{
					id: 2,
					respuesta: "DE ACUERDO",
					resultados: 0,
				},
			];
		} else if (papeleta.pregunta.subtipo === "5respuestas") {
			dataChart = [
				{
					id: 0,
					respuesta: "TOTALMENTE EN DESACUERDO",
					resultados: 0,
				},
				{
					id: 1,
					respuesta: "EN DESACUERDO",
					resultados: 0,
				},
				{
					id: 2,
					respuesta: "NEUTRAL",
					resultados: 0,
				},
				{
					id: 3,
					respuesta: "DE ACUERDO",
					resultados: 0,
				},
				{
					id: 4,
					respuesta: "TOTALMENTE DE ACUERDO",
					resultados: 0,
				},
			];
		} else if (papeleta.pregunta.subtipo === "personalizado1") {
			dataChart = [
				{
					id: 0,
					respuesta: papeleta.pregunta.opcion1,
					resultados: 0,
				},
				{
					id: 1,
					respuesta: papeleta.pregunta.opcion2,
					resultados: 0,
				},
			];
		} else if (papeleta.pregunta.subtipo === "personalizado2") {
			dataChart = [
				{
					id: 0,
					respuesta: papeleta.pregunta.opcion1,
					resultados: 0,
				},
				{
					id: 1,
					respuesta: papeleta.pregunta.opcion2,
					resultados: 0,
				},
				{
					id: 2,
					respuesta: papeleta.pregunta.opcion3,
					resultados: 0,
				},
			];
		} else if (papeleta.pregunta.subtipo === "personalizado3") {
			dataChart = [
				{
					id: 0,
					respuesta: papeleta.pregunta.opcion1,
					resultados: 0,
				},
				{
					id: 1,
					respuesta: papeleta.pregunta.opcion2,
					resultados: 0,
				},
				{
					id: 2,
					respuesta: papeleta.pregunta.opcion3,
					resultados: 0,
				},
				{
					id: 3,
					respuesta: papeleta.pregunta.opcion4,
					resultados: 0,
				},
				{
					id: 4,
					respuesta: papeleta.pregunta.opcion5,
					resultados: 0,
				},
			];
		}

		const dataFinal = {
			jornadaModel: data.jornadaModel,
			papeleta: papeleta || null,
			resultados: dataChart,
		};

		// data.resultados = dataChart;

		// console.log("DATA REP INICIAL", dataFinal);

		return { ok: true, data: dataFinal };
	} catch (error) {
		console.log("ERRORXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", error.message);
		return { ok: false, errorMessage: error.message };
	}
};

export const getSesionesActivas = async (idJornada) => {
	try {
		const { data } = await authAPI.get(`api/auth/sesionCount/active/${idJornada}`);

		// console.log("DATA SESIONES", response);
		return { ok: true, data: data };
	} catch (error) {
		console.log("Error sesiones: ", error);
		return { ok: false };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
