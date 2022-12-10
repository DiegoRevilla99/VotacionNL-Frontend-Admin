import { createSlice } from "@reduxjs/toolkit";

export const consultaCiudadanaSlice = createSlice({
	name: "consultaCiudadana",
	initialState: {
		status: "off", //off, success, error, checking
		errorMessage: "",
		successMessage: "",
		questions: [],
		questionSelected: {},
		consultasData: [],
		consultaSelected: {
			data: "",
			questions: [],
		},
	},
	reducers: {
		onCheckingOperation: (state) => {
			state.status = "checking";
		},
		onSuccessOperation: (state, { payload }) => {
			state.status = "success";
			state.okMessage = payload?.successMessage || "Operación realizada con éxito";
		},
		onErrorOperation: (state, { payload }) => {
			state.status = "error";
			state.errorMessage = payload?.errorMessage;
		},
		onOffOperation: (state) => {
			state.status = "off";
		},
		onAddQuestion: (state, { payload }) => {
			state.questions.push({
				id: payload?.id,
				pregunta: payload?.question,
				tipoDeRespuesta: payload?.type,
				subtipo: payload?.closeType,
				respuesta1: payload?.answer1,
				respuesta2: payload?.answer2,
				respuesta3: payload?.answer3,
				respuesta4: payload?.answer4,
				respuesta5: payload?.answer5,
			});
		},
		onDeleteQuestion: (state, { payload }) => {
			const questionFound = state.questions.find((question) => question.id === payload);
			state.questions.splice(state.questions.indexOf(questionFound), 1);
		},
		onEditQuestion: (state, { payload }) => {
			state.questionSelected = state.questions[payload];
		},
		onUpdateQuestion: (state, { payload }) => {
			const question = state.questions.find(
				(question) => question.id === state.questionSelected.id
			);
			question.id = payload?.id;
			question.pregunta = payload?.question;
			question.tipoDeRespuesta = payload?.type;
			question.subtipo = payload?.closeType;
			question.respuesta1 = payload?.answer1;
			question.respuesta2 = payload?.answer2;
			question.respuesta3 = payload?.answer3;
			question.respuesta4 = payload?.answer4;
			question.respuesta5 = payload?.answer5;
		},
		onSetQuestionsSelectedNull: (state, { payload }) => {
			state.questionSelected = {};
		},
		onFillConsultasData: (state, { payload }) => {
			state.consultasData = payload?.data;
			// state.status = "success";
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	onCheckingOperation,
	onSuccessOperation,
	onErrorOperation,
	onOffOperation,
	onAddQuestion,
	onDeleteQuestion,
	onEditQuestion,
	onSetQuestionsSelectedNull,
	onFillConsultasData,
	onUpdateQuestion,
} = consultaCiudadanaSlice.actions;

// export default consultaCiudadanaSlice.reducer;
