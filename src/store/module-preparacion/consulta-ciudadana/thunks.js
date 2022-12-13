import { useNavigate } from "react-router-dom";
import {
	createConsultaCiudadana,
	createPapeleta,
	getBallotData,
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
	onEditBallot,
	onErrorOperation,
	onOffOperation,
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

export const onCreateConsultaCiudadana = (titulo, navigate = (id) => {}) => {
	return async (dispatch) => {
		dispatch(onToastCheckingOperation("Guardando consulta..."));
		dispatch(onCheckingOperation());

		const { ok, id } = await createConsultaCiudadana();

		console.log("ENTRA");

		if (ok) {
			dispatch(onAddConsultaCiudadana({ id: id, titulo: titulo }));
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

export const onCreatePapeleta = (encabezado, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onToastCheckingOperation("Guardando papeleta..."));
		dispatch(onCheckingOperation());

		const { ok, id } = await createPapeleta();

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
