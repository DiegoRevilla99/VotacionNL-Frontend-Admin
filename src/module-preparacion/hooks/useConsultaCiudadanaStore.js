import { useDispatch, useSelector } from "react-redux";
import {
	onAddQuestion,
	onCheckingOperation,
	onErrorOperation,
	onFillConsultasData,
	onOffOperation,
	onSuccessOperation,
} from "../../store/module-preparacion/consulta-ciudadana/consultaCiudadanaSlice";

export const useConsultaCiudadanaStore = () => {
	const dispatch = useDispatch();

	const { status, errorMessage, successMesage, questions, consultasData, consultaSelected } =
		useSelector((state) => state.consultaCiudadana);

	const checkingOperation = () => {
		dispatch(onCheckingOperation());
	};

	const succesOperation = (successMessage) => {
		dispatch(onSuccessOperation({ successMessage }));
	};

	const errorOperation = () => {
		dispatch(onErrorOperation());
	};

	const offOperation = () => {
		dispatch(onOffOperation());
	};

	const addQuestion = (question, answers) => {
		dispatch(onAddQuestion({ question, answers }));
	};

	const fillConsultasData = () => {
		dispatch(onFillConsultasData());
	};

	return {
		status,
		errorMessage,
		successMesage,
		questions,
		consultasData,
		consultaSelected,
		checkingOperation,
		succesOperation,
		errorOperation,
		offOperation,
		addQuestion,
		fillConsultasData,
	};
};
