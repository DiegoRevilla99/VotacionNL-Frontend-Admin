import {
	createBoletaFormal,
	createJornada,
	deleteBoleta,
	deleteJornada,
	getBoletaData,
	getBoletasJornada,
	getBoletasJornadaNoFormal,
	getJornadaNoFormalVotos,
	getJornadaNoFormalVotosInicio,
	getJornadaRespuestasConsultas,
	getJornadaRespuestasConsultasInicio,
	getJornadas,
	getJornadasFormales,
	getJornadasNoFormales,
	getJornadaVotos,
	getJornadaVotosInicio,
	getSesionesActivas,
	postImage,
	updateBoletaData
} from "../../../providers/Micro-Preparacion/providerJornada";
import {
	onToastCheckingOperation,
	onToastErrorOperation,
	onToastSuccessOperation
} from "../../ui/uiSlice";

import {
	onAddBoleta,
	onAddCandidatoAndSuplente,
	onAddJornadas,
	onAddPartido,
	onCheckingOperation,
	onDeleteBoletaData,
	onDeleteJornadaData,
	onDeleteSesionesActivas,
	onEditBoleta,
	onErrorOperation,
	onFillBoletas,
	onFillJornadasData,
	onSetBoletasSelectedNull,
	onSetCandidatoAndSuplenteNull,
	onSetCandidatoAndSuplenteSelectedNull,
	onSetJornadaSelected,
	onSetJornadasVotosData,
	onSetPartidoNull,
	onSetPartidoSelectedNull,
	onSetSesionesActivas,
	onSuccessOperation
} from "./SliceJornada";
export const onPostImage = (image) => {
	return async (dispatch) => {
		dispatch(onToastCheckingOperation("Subiendo imagen..."));
		dispatch(onCheckingOperation());
		const { ok, data, errorMessage } = await postImage(image); // PROVIDER
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onToastSuccessOperation({ successMessage: "Imagen subida con éxito" }));
			return data;
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "No se pudo subir la imagen" }));
			return false;
		}
	};
};
export const onGetAlljornadas = () => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());
		const { ok, data, errorMessage } = await getJornadas(); // PROVIDER
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onFillJornadasData(data)); // SLICE
		} else {
			dispatch(onErrorOperation());
			dispatch(
				onToastErrorOperation({
					errorMessage: errorMessage || "No se pudo obtener las jornadas",
				})
			);
		}
	};
};

export const onGetjornadas = () => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());
		const { ok, data, errorMessage } = await getJornadasFormales(); // PROVIDER
		if (ok) {
			console.log("DATA DE JORNADAS en el thunks", data);
			dispatch(onSuccessOperation());
			dispatch(onFillJornadasData(data)); // SLICE
		} else {
			dispatch(onErrorOperation());
			dispatch(
				onToastErrorOperation({
					errorMessage: errorMessage || "No se pudo obtener las jornadas",
				})
			);
		}
	};
};

export const onGetjornadasNoFormales = () => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());
		const { ok, data, errorMessage } = await getJornadasNoFormales(); // PROVIDER
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onFillJornadasData(data)); // SLICE
		} else {
			dispatch(onErrorOperation());
			dispatch(
				onToastErrorOperation({
					errorMessage: errorMessage || "No se pudo obtener las jornadas",
				})
			);
		}
	};
};

export const onCreateJornada = (title, entidad, navigate = (id) => {}) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());
		dispatch(onToastCheckingOperation("Guardando consulta..."));
		const { ok, id } = await createJornada(title, entidad); // PROVIDER
		if (ok) {
			dispatch(onAddJornadas({ idJornada: id, nombreJornada: title })); // SLICE
			dispatch(onSuccessOperation());
			dispatch(onToastSuccessOperation({ successMessage: "Jornada creada con éxito" }));
			dispatch(onSetJornadaSelected({ id, title, boletas: [] }));
			navigate(id);
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "No se pudo crear la jornada" }));
		}
	};
};

export const onDeleteJornada = (id) => {
	return async (dispatch) => {
		dispatch(onToastCheckingOperation("Eliminando jornada..."));
		dispatch(onCheckingOperation());
		const { ok } = await deleteJornada(id); // PROVIDER
		if (ok) {
			dispatch(onDeleteJornadaData(id)); // SLICE
			dispatch(onSuccessOperation());
			dispatch(onToastSuccessOperation({ successMessage: "Jornada eliminada con éxito" }));
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "No se pudo eliminar la jornada" }));
		}
	};
};

export const onGetBoletas = (idJornada, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());
		const { ok, data } = await getBoletasJornada(idJornada); // PROVIDER
		// console.log("info de la peticion",data);
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onSetBoletasSelectedNull());
			dispatch(onSetPartidoSelectedNull());
			dispatch(onSetCandidatoAndSuplenteSelectedNull()); //New
			dispatch(onSetCandidatoAndSuplenteNull());
			dispatch(onSetPartidoNull());
			dispatch(onFillBoletas(data)); // SLICE
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "No se pudo obtener las boletas" }));
		}
	};
};

export const onGetBoletasParaJornada = (idJornada, title, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());
		const { ok, data } = await getBoletasJornada(idJornada);
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onSetBoletasSelectedNull());

			dispatch(onSetJornadaSelected({ id: idJornada, title }));
			dispatch(onFillBoletas(data));
			navigate();
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "No se pudo obtener las boletas" }));
		}
	};
};

export const onGetBoletasParaJornadaNoFormal = (idJornada, title, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());

		console.log("SELECCIONAAAAA", idJornada, title);
		const { ok, data } = await getBoletasJornadaNoFormal(idJornada);

		console.log("DATA DE JORNADAS NO FORMALES", data);
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onSetBoletasSelectedNull());

			dispatch(onSetJornadaSelected({ id: idJornada, title }));
			dispatch(onFillBoletas(data));
			navigate();
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "No se pudo obtener las boletas" }));
		}
	};
};

export const onCreateBoleta = (
	data,
	idJornada,
	candidatoandSuplentes,
	partidos,
	onBoletaCreated,
	navigate = () => {}
) => {
	return async (dispatch) => {
		console.log("dataaaaaa", data);
		console.log("idJornada", idJornada);
		console.log("partidos", partidos);
		// console.log("dataaaaaa",data);

		dispatch(onCheckingOperation());
		dispatch(onToastCheckingOperation("Guardando boleta..."));
		const { ok, idEstructuraBoleta } = await createBoletaFormal(
			data,
			idJornada,
			candidatoandSuplentes,
			partidos
		); // PROVIDER
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onToastSuccessOperation({ successMessage: "Boleta creada con éxito" }));
			dispatch(onAddBoleta({ idEstructuraBoleta, encabezado: data.nombreCandidatura })); // SLICE
			onBoletaCreated(idEstructuraBoleta); // ejecutar la función de devolución de llamada con el idEstructuraBoleta como argumento
			navigate();
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "No se pudo crear la boleta" }));
		}
	};
};

export const onGetBoletaData = (idBoleta, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());
		const { ok, data, dataCandidatoSuplente, dataPartido } = await getBoletaData(idBoleta); // PROVIDER
		console.log("DATA PROVIDER", data);
		console.log("candidatosuplente PROVIDER", dataCandidatoSuplente);
		console.log("partido PROVIDER", dataPartido);

		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onEditBoleta({ idBoleta, ...data })); // SLICE aqui si llega sin p2
			dispatch(onAddPartido(dataPartido)); // SLICE
			dispatch(onAddCandidatoAndSuplente(dataCandidatoSuplente)); // SLICE
			navigate();
		} else {
			dispatch(onErrorOperation());
			// dispatch(onToastErrorOperation({ errorMessage: errorMessage || "No se pudo obtener la boleta" }));
		}
	};
};

export const onUpdateBoletaData = (
	values,
	idJornada,
	candidatoandSuplentes,
	partidos,
	idBoleta,
	navigate = () => {}
) => {
	return async (dispatch) => {
		console.log("VALUES THUNKS", values);
		console.log("idJornada THUNKS", idJornada);
		console.log("candidatoandSuplentes THUNKS", candidatoandSuplentes);
		console.log("idBoleta THUNKS", idBoleta);
		dispatch(onCheckingOperation());
		const { ok } = await updateBoletaData(
			values,
			idJornada,
			candidatoandSuplentes,
			partidos,
			idBoleta
		); // PROVIDER
		if (ok) {
			dispatch(onSuccessOperation());
			console.log("BOLETA ACTUALIZADA");
			navigate();
		} else {
			dispatch(onErrorOperation());
			// dispatch(onToastErrorOperation({ errorMessage: errorMessage || "No se pudo actualizar la boleta" }));
		}
	};
};

export const onDeleteBoleta = (idBoleta) => {
	return async (dispatch) => {
		// dispatch(onCheckingOperation());
		dispatch(onToastCheckingOperation("Eliminando boleta..."));
		const { ok } = await deleteBoleta(idBoleta); // PROVIDER
		if (ok) {
			// dispatch(onSuccessOperation());
			dispatch(onDeleteBoletaData(idBoleta)); // SLICE
			dispatch(onToastSuccessOperation({ successMessage: "Boleta eliminada con éxito" }));
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "No se pudo eliminar la boleta" }));
		}
	};
};

export const onGetJornadaVotos = (idBoleta, idJornada) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());

		console.log("IDBOLETA", idBoleta);

		const { ok, data } = await getJornadaVotos(idBoleta, idJornada); // PROVIDER

		console.log("DATA OBTENIDA DEL PROVIDER", data);
		if (ok) {
			dispatch(onSetJornadasVotosData(data)); // SLICE
			dispatch(onSuccessOperation());
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "Error al obtener las boletas" }));
		}
	};
};

export const onGetJornadaVotosInicio = (idBoleta, idJornada) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());

		console.log("IDBOLETA", idBoleta);

		const { ok, data } = await getJornadaVotosInicio(idBoleta, idJornada); // PROVIDER

		console.log("DATA OBTENIDA DEL PROVIDER", data);
		if (ok) {
			dispatch(onSetJornadasVotosData(data)); // SLICE
			dispatch(onSuccessOperation());
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "Error al obtener las boletas" }));
		}
	};
};

export const onGetJornadaRespuestasConsultas = (idPapeleta, id) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());

		const { ok, data } = await getJornadaRespuestasConsultas(idPapeleta, id); // PROVIDER

		console.log("DATA DE LA BUSQUEDAAAAAAAAAAAAAAAAAAA", data);
		if (ok) {
			dispatch(onSetJornadasVotosData(data)); // SLICE
			dispatch(onSuccessOperation());
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "Error al obtener las boletas" }));
		}
	};
};

export const onGetJornadaRespuestasConsultasInicio = (idPapeleta, id) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());

		console.log("ENTRA A TUUUUUUNK");

		const { ok, data } = await getJornadaRespuestasConsultasInicio(idPapeleta, id); // PROVIDER

		console.log("DATA DE LA BUSQUEDAAA INICIAL", data);
		if (ok) {
			dispatch(onSetJornadasVotosData(data)); // SLICE
			dispatch(onSuccessOperation());
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "No se pudo eliminar la boleta" }));
		}
	};
};

export const onGetJornadaNoFormalVotos = (idBoleta, id) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());

		console.log("IDSSSSSSSSSSSSSSSSSSSSSSS", idBoleta, id);

		const { ok, data } = await getJornadaNoFormalVotos(idBoleta, id); // PROVIDER

		console.log("DATA DE LA BUSQUEDAAAAAAAAAAAAAAAAAAA", data);
		if (ok) {
			dispatch(onSetJornadasVotosData(data)); // SLICE
			dispatch(onSuccessOperation());
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "Error al obtener las boletas" }));
		}
	};
};

export const onGetJornadaNoFormalVotosInicio = (idBoleta, id) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());

		console.log("IDSSSSSSSSSSSSSSSSSSSSSSS", idBoleta, id);

		const { ok, data } = await getJornadaNoFormalVotosInicio(idBoleta, id); // PROVIDER

		console.log("DATA DE LA BUSQUEDAAAAAAAAAAAAAAAAAAA", data);
		if (ok) {
			dispatch(onSetJornadasVotosData(data)); // SLICE
			dispatch(onSuccessOperation());
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "Error al obtener las boletas" }));
		}
	};
};

export const onGetSesionesActivas = (idJornada) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());

		const { ok, data } = await getSesionesActivas(idJornada); // PROVIDER

		console.log("DATA DE LA BUSQUEDAAAAAAAAAAAAAAAAAAA", data);
		if (ok) {
			dispatch(onSetSesionesActivas(data)); // SLICE
			dispatch(onSuccessOperation());
		} else {
			dispatch(onErrorOperation());
			dispatch(onDeleteSesionesActivas()); // SLICE
			dispatch(onToastErrorOperation({ errorMessage: "Error al obtener las sesiones" }));
		}
	};
};
