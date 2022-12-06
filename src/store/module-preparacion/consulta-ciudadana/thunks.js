import { simulacionFetch } from "../../../providers/Micro-Preparacion/providerPreparacion";
import {
	onToastCheckingOperation,
	onToastErrorOperation,
	onToastOffOperation,
	onToastSuccessOperation,
} from "../../ui/uiSlice";
import {
	onCheckingOperation,
	onErrorOperation,
	onOffOperation,
	onSuccessOperation,
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
