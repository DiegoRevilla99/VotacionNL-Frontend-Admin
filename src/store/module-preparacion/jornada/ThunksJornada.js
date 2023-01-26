import { id } from "date-fns/locale";
import {
	getJornadas,
	createJornada,
	deleteJornada,
	getBoletasJornada,
	getBoletaData,
	createBoleta,
	updateBoletaData,
	deleteBoleta,
	getJornadaVotos,
} from "../../../providers/Micro-Preparacion/providerJornada";
import {
	onToastCheckingOperation,
	onToastErrorOperation,
	onToastOffOperation,
	onToastSuccessOperation,
} from "../../ui/uiSlice";

import {
	onFillCandidatosData,
	onFillSuplentesData,
	onFillPartidosData,
	onFillCandidatoAndSuplenteData,
	onAddBoleta,
	onAddCandidato,
	onAddSuplente,
	onAddPartido,
	onAddCandidatoAndSuplente,
	onSetCandidatoSelected,
	onSetSuplenteSelected,
	onSetPartidoSelected,
	onSetCandidatoAndSuplenteSelected,
	onSetCandidatoSelectedNull,
	onSetSuplenteSelectedNull,
	onSetPartidoSelectedNull,
	onSetCandidatoAndSuplenteSelectedNull,
	onSetCandidatoNull,
	onSetSuplenteNull,
	onSetPartidoNull,
	onSetCandidatoAndSuplenteNull,
	onFillJornadasData,
	onAddJornadas,
	onDeleteJornadaData,
	onDeleteBoletaData,
	onSetJornadaSelected,
	onFillBoletas,
	onEditBoleta,
	onUpdateBoleta,
	onSetBoletasSelectedNull,
	onCheckingOperation,
	onSuccessOperation,
	onErrorOperation,
	onSetJornadasVotosData,
} from "./SliceJornada";

export const onGetjornadas = () => {
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

export const onCreateJornada = (title, entidad, navigate = (id) => {}) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());
		dispatch(onToastCheckingOperation("Guardando consulta..."));
		const { ok, id } = await createJornada(title, entidad); // PROVIDER
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onAddJornadas({ idJornada: id, nombreJornada: title })); // SLICE
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
		dispatch(onCheckingOperation());
		dispatch(onToastCheckingOperation("Eliminando jornada..."));
		const { ok } = await deleteJornada(id); // PROVIDER
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onDeleteJornadaData(id)); // SLICE
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
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onSetBoletasSelectedNull());
			// dispatch(onSetCandidatoSelectedNull());
			// dispatch(onSetSuplenteSelectedNull());
			// dispatch(onSetPartidoSelectedNull());
			// dispatch(onSetCandidatoAndSuplenteSelectedNull());//New
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
			dispatch(onSetJornadaSelected({ idJornada, title }));
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
	navigate = () => {}
) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());
		dispatch(onToastCheckingOperation("Guardando boleta..."));

		const { ok, idBoleta } = await createBoleta(
			data,
			idJornada,
			candidatoandSuplentes,
			partidos
		); // PROVIDER
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onToastSuccessOperation({ successMessage: "Boleta creada con éxito" }));
			dispatch(onAddBoleta({ idBoleta, encabezado: data.encabezadoJornada })); // SLICE
			navigate();
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "No se pudo crear la boleta" }));
		}
	};
};

// export const onCreateBoleta = (data, idJornada, candidatos, suplentes, partidos, navigate = () => {}) => {
//     return async (dispatch) => {
//         dispatch(onCheckingOperation());
//         dispatch(onToastCheckingOperation("Guardando boleta..."));

//         const {ok, idBoleta } = await createBoleta(data, idJornada, candidatos, suplentes, partidos);// PROVIDER
//         if (ok) {
//             dispatch(onSuccessOperation());
//             dispatch(onToastSuccessOperation({ successMessage: "Boleta creada con éxito" }));
//             dispatch(onAddBoleta({idBoleta, encabezado: data.encabezadoJornada}));// SLICE
//             navigate();
//         } else {
//             dispatch(onErrorOperation());
//             dispatch(onToastErrorOperation({ errorMessage: "No se pudo crear la boleta" }));
//         }
//     }
// };

export const onGetBoletaData = (idBoleta, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());
		const { ok, data, dataPartido, dataCandidato, dataSuplente } = await getBoletaData(
			idBoleta
		); // PROVIDER
		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onEditBoleta({ idBoleta, ...data })); // SLICE
			dispatch(onAddPartido(dataPartido)); // SLICE
			// dispatch(onAddCandidato(dataCandidato));// SLICE
			// dispatch(onAddSuplente(dataSuplente));// SLICE
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
	idBoleta,
	candidatos,
	suplentes,
	partidos,
	navigate = () => {}
) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());
		const { ok } = await updateBoletaData(
			values,
			candidatos,
			suplentes,
			partidos,
			idBoleta,
			idJornada
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

export const onGetJornadaVotos = (idBoleta) => {
	return async (dispatch) => {
		dispatch(onCheckingOperation());

		const { ok, data } = await getJornadaVotos(idBoleta); // PROVIDER
		if (ok) {
			dispatch(onSetJornadasVotosData(data)); // SLICE
			dispatch(onSuccessOperation());
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "No se pudo eliminar la boleta" }));
		}
	};
};
