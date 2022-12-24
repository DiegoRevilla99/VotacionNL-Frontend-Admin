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
	onAddConsultaCiudadana,
	onEditBallot,
	onUpdateBallot,
} from "../../store/module-preparacion/consulta-ciudadana/consultaCiudadanaSlice";

export const useConsultaCiudadanaStore = () => {
	const dispatch = useDispatch();

	const {
		status,
		errorMessage,
		successMesage,
		questions,
		consultasData,
		questionSelected,
		consultaSelected,
	} = useSelector((state) => state.consultaCiudadana);

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
	const editBallot = (id) => {
		dispatch(onEditBallot(id));
	};

	const setQuestionsSelectedNull = (id) => {
		dispatch(onSetQuestionsSelectedNull());
	};

	const addQuestion = (
		id,
		pregunta,
		tipoDeRespuesta,
		tipoCerrada,
		respuesta1,
		respuesta2,
		respuesta3,
		respuesta4,
		respuesta5
	) => {
		dispatch(
			onAddQuestion({
				id,
				pregunta,
				tipoDeRespuesta,
				tipoCerrada,
				respuesta1,
				respuesta2,
				respuesta3,
				respuesta4,
				respuesta5,
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

	const updateBallot = (encabezadoConsulta) => {
		dispatch(onUpdateBallot({ encabezadoConsulta }));
	};

	const fillConsultasData = () => {
		dispatch(onFillConsultasData());
	};

	const addConsultaCiudadana = (consultaData) => {
		dispatch(onAddConsultaCiudadana(consultaData));
	};

	const setBallotSelectedNull = () => {
		dispatch(onSetQuestionsSelectedNull());
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
		addConsultaCiudadana,
		consultaSelected,
		editBallot,
		updateBallot,
		setBallotSelectedNull,
	};
};
