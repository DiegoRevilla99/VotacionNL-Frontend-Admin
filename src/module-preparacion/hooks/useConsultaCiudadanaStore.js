import { useDispatch, useSelector } from "react-redux";
import {
	onAddQuestion,
	onCheckingOperation,
	onDeleteQuestion,
	onErrorOperation,
	onFillConsultasData,
	onOffOperation,
	onSuccessOperation,
	onEditQuestion,
	onSetQuestionsSelectedNull,
	onUpdateQuestion,
} from "../../store/module-preparacion/consulta-ciudadana/consultaCiudadanaSlice";

export const useConsultaCiudadanaStore = () => {
	const dispatch = useDispatch();

	const { status, errorMessage, successMesage, questions, consultasData, questionSelected } =
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
	const deleteQuestion = (id) => {
		dispatch(onDeleteQuestion(id));
	};

	const editQuestion = (id) => {
		dispatch(onEditQuestion(id));
	};

	const setQuestionsSelectedNull = (id) => {
		dispatch(onSetQuestionsSelectedNull());
	};

	const addQuestion = (
		id,
		question,
		type,
		closeType,
		answer1,
		answer2,
		answer3,
		answer4,
		answer5
	) => {
		dispatch(
			onAddQuestion({
				id,
				question,
				type,
				closeType,
				answer1,
				answer2,
				answer3,
				answer4,
				answer5,
			})
		);
	};

	const updateQuestion = (
		id,
		question,
		type,
		closeType,
		answer1,
		answer2,
		answer3,
		answer4,
		answer5
	) => {
		dispatch(
			onUpdateQuestion({
				id,
				question,
				type,
				closeType,
				answer1,
				answer2,
				answer3,
				answer4,
				answer5,
			})
		);
	};

	const fillConsultasData = () => {
		dispatch(onFillConsultasData());
	};

	return {
		status,
		errorMessage,
		successMesage,
		questions,
		questionSelected,
		consultasData,
		checkingOperation,
		succesOperation,
		errorOperation,
		offOperation,
		addQuestion,
		editQuestion,
		setQuestionsSelectedNull,
		deleteQuestion,
		fillConsultasData,
		updateQuestion,
	};
};
