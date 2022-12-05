import { useDispatch, useSelector } from "react-redux";
import {
	onToastCheckingOperation,
	onToastErrorOperation,
	onToastOffOperation,
	onToastSuccessOperation,
} from "../store/ui/uiSlice";

export const useUiStore = () => {
	const dispatch = useDispatch();

	const { status, toastErrorMessage, toastSuccessMessage, toastCheckingMessage } = useSelector(
		(state) => state.ui
	);

	const toastCheckingOperation = (checkingMessage) => {
		dispatch(onToastCheckingOperation({ checkingMessage }));
	};

	const toastSuccesOperation = (successMessage) => {
		dispatch(onToastSuccessOperation({ successMessage }));
	};

	const toastErrorOperation = () => {
		dispatch(onToastErrorOperation());
	};

	const toastOffOperation = () => {
		dispatch(onToastOffOperation());
	};

	return {
		status,
		toastErrorMessage,
		toastSuccessMessage,
		toastCheckingMessage,

		toastCheckingOperation,
		toastSuccesOperation,
		toastErrorOperation,
		toastOffOperation,
	};
};
