import { simulacionFetch } from "../../../providers/Micro-Preparacion/providerPreparacion";
import {
	onToastCheckingOperation,
	onToastErrorOperation,
	onToastSuccessOperation,
} from "../../ui/uiSlice";

export const saveConsultaPrueba = () => {
	return async (dispatch) => {
		dispatch(onToastCheckingOperation("Guardando consulta..."));

		const result = await simulacionFetch();

		if (result) {
			dispatch(onToastSuccessOperation({ successMessage: "Consulta guardada con éxito" }));
		} else {
			dispatch(onToastErrorOperation({ errorMessage: "La operación no se pudo completar" }));
		}
	};
};
