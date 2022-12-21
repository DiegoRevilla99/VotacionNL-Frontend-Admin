import { useNavigate } from "react-router-dom";
import {
	createConsultaCiudadana,
	createPapeleta,
	deleteConsultaCiudadana,
	getBallotData,
	getConfig,
	getConsultasCiudadanas,
	getPapeletas,
	saveConfig,
	updateBallotData,
} from "../../../providers/Micro-Consultas/provider";
import { simulacionFetch } from "../../../providers/Micro-Preparacion/providerPreparacion";
import {
	onToastCheckingOperation,
	onToastErrorOperation,
	onToastOffOperation,
	onToastSuccessOperation,
} from "../../ui/uiSlice";
import {
	onAddBallot,
	onAddConsultaCiudadana,
	onCheckingOperation,
	onDeleteConsultaCiudadanaData,
	onEditBallot,
	onErrorOperation,
	onFillConsultasData,
	onOffOperation,
	onSetConfigSelected,
	onSetConsultaSelected,
	onSuccessOperation,
	onUpdateBallot,
} from "./consultaCiudadanaSlice";

export const saveConsultaPrueba = () => {
	return async (dispatch) => {
		dispatch(onToastCheckingOperation("Guardando consulta..."));
		dispatch(onCheckingOperation());

		const result = await simulacionFetch();

		if (result) {
			dispatch(onSuccessOperation());
			dispatch(onToastSuccessOperation({ successMessage: "Consulta guardada con éxito" }));
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "La consulta no se pudo guardar" }));
		}
	};
};

export const onGetConsultasCiudadanas = () => {
	return async (dispatch) => {
		// dispatch(onToastCheckingOperation("Guardando consulta..."));
		dispatch(onCheckingOperation());

		const { ok, data } = await getConsultasCiudadanas();

		if (ok) {
			console.log("ENTRA");
			// dispatch(onAddConsultaCiudadana({ id: id, titulo: titulo }));
			dispatch(onSuccessOperation());
			// dispatch(onToastSuccessOperation({ successMessage: "Consulta guardada con éxito" }));
			// dispatch(onSetConsultaSelected({ id, titulo, ballots: [] }));
			dispatch(onFillConsultasData(data));
			// navigate(id);
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "La consulta no se pudo guardar" }));
		}
	};
};

export const onCreateConsultaCiudadana = (titulo, entidad, navigate = (id) => {}) => {
	return async (dispatch) => {
		dispatch(onToastCheckingOperation("Guardando consulta..."));
		dispatch(onCheckingOperation());

		const { ok, id } = await createConsultaCiudadana(titulo, entidad);

		console.log("ENTRA");

		if (ok) {
			dispatch(onAddConsultaCiudadana({ idJornada: id, nombreJornada: titulo }));
			dispatch(onSuccessOperation());
			dispatch(onToastSuccessOperation({ successMessage: "Consulta guardada con éxito" }));
			dispatch(onSetConsultaSelected({ id, titulo, ballots: [] }));
			navigate(id);
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "La consulta no se pudo guardar" }));
		}
	};
};

export const onDeleteConsultaCiudadana = (id) => {
	return async (dispatch) => {
		dispatch(onToastCheckingOperation("Eliminando consulta ciudadana..."));
		dispatch(onCheckingOperation());

		const { ok } = await deleteConsultaCiudadana(id);

		if (ok) {
			dispatch(onDeleteConsultaCiudadanaData(id));
			console.log("ENTRÓ A BORRAR LA CONSULTA");
			dispatch(onSuccessOperation());
			dispatch(onToastSuccessOperation({ successMessage: "Consulta eliminada con éxito" }));
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "La consulta no se pudo eliminar" }));
		}
	};
};

export const onGetPapeletas = (idConsulta, navigate = () => {}) => {
	return async (dispatch) => {
		// dispatch(onToastCheckingOperation("Guardando papeleta..."));
		dispatch(onCheckingOperation());

		const { ok } = await getPapeletas(data, idConsulta);

		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onToastSuccessOperation({ successMessage: "Pepeleta guardada con éxito" }));
			dispatch(onAddBallot({ id, encabezado }));
			navigate();
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "La papeleta no se pudo guardar" }));
		}
	};
};

export const onCreatePapeleta = (data, idConsulta, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onToastCheckingOperation("Guardando papeleta..."));
		dispatch(onCheckingOperation());

		const { ok } = await createPapeleta(data, idConsulta);

		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(onToastSuccessOperation({ successMessage: "Pepeleta guardada con éxito" }));
			dispatch(onAddBallot({ id, encabezado }));
			navigate();
		} else {
			dispatch(onErrorOperation());
			dispatch(onToastErrorOperation({ errorMessage: "La papeleta no se pudo guardar" }));
		}
	};
};

export const onGetBallotData = (idBallot, navigate = () => {}) => {
	return async (dispatch) => {
		// dispatch(onToastCheckingOperation("Guardando papeleta..."));
		dispatch(onCheckingOperation());

		const { ok, id, encabezadoConsulta } = await getBallotData(idBallot);

		if (ok) {
			dispatch(onSuccessOperation());
			// dispatch(onToastSuccessOperation({ successMessage: "Pepeleta guardada con éxito" }));
			dispatch(onEditBallot({ id, encabezadoConsulta }));
			navigate();
		} else {
			dispatch(onErrorOperation());
			// dispatch(onToastErrorOperation({ errorMessage: "La papeleta no se pudo guardar" }));
		}
	};
};

export const onUpdateBallotData = (idBallot, navigate = () => {}) => {
	return async (dispatch) => {
		// dispatch(onToastCheckingOperation("Guardando papeleta..."));
		dispatch(onCheckingOperation());

		const { ok } = await updateBallotData({ idBallot, encabezadoConsulta });

		if (ok) {
			dispatch(onSuccessOperation());
			// dispatch(onToastSuccessOperation({ successMessage: "Pepeleta guardada con éxito" }));
			// dispatch(onEditBallot({ id, encabezadoConsulta }));
			// dispatch(onUpdateBallot());
			console.log("PAPELETA ACTUALIZADA");
			navigate();
		} else {
			dispatch(onErrorOperation());
			// dispatch(onToastErrorOperation({ errorMessage: "La papeleta no se pudo guardar" }));
		}
	};
};
export const onSaveConfig = (id, data, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onToastCheckingOperation("Guardando configuracion..."));
		dispatch(onCheckingOperation());

		const { ok } = await saveConfig(id, data);

		if (ok) {
			dispatch(onSuccessOperation());
			dispatch(
				onToastSuccessOperation({ successMessage: "Configuración guardada con éxito" })
			);
			console.log("CONFIGURACION HECHA");
			// navigate();
		} else {
			dispatch(onErrorOperation());
			dispatch(
				onToastErrorOperation({ errorMessage: "La configuración no se pudo guardar" })
			);
		}
	};
};
export const onGetConfig = (id) => {
	return async (dispatch) => {
		// dispatch(onToastCheckingOperation("Guardando configuracion..."));
		dispatch(onCheckingOperation());

		const { ok, data } = await getConfig(id);

		if (ok) {
			dispatch(onSuccessOperation());
			// dispatch(
			// 	onToastSuccessOperation({ successMessage: "Configuración guardada con éxito" })
			// );
			dispatch(onSetConfigSelected(data.data));
			console.log("CONFIGURACION: ", data);
			navigate();
		} else {
			dispatch(onErrorOperation());
			// dispatch(
			// 	onToastErrorOperation({ errorMessage: "La configuración no se pudo guardar" })
			// );
		}
	};
};
