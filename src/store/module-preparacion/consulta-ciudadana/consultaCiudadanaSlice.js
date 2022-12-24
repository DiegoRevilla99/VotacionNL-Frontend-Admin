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
			id: "",
			title: "",
			ballots: [],
			ballotSelected: {},
			// ballorSelectedData:{}
		},
		configSelected: {},
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
				pregunta: payload?.pregunta,
				tipoDeRespuesta: payload?.tipoDeRespuesta,
				subtipo: payload?.tipoCerrada,
				respuesta1: payload?.respuesta1,
				respuesta2: payload?.respuesta2,
				respuesta3: payload?.respuesta3,
				respuesta4: payload?.respuesta4,
				respuesta5: payload?.respuesta5,
			});
		},
		onDeleteQuestion: (state, { payload }) => {
			const questionFound = state.questions.find((question) => question.id === payload);
			state.questions.splice(state.questions.indexOf(questionFound), 1);
		},
		onEditQuestion: (state, { payload }) => {
			// console.log("ENCUENTRA", state.questions[payload]);
			state.questionSelected = state.questions[0];
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
		onSetQuestionsNull: (state, { payload }) => {
			state.questions = [];
		},
		onFillConsultasData: (state, { payload }) => {
			state.consultasData = payload;
			// state.status = "success";
		},
		onAddConsultaCiudadana: (state, { payload }) => {
			state.consultasData.push(payload);
		},
		onDeleteConsultaCiudadanaData: (state, { payload }) => {
			console.log("PAYLOAD: ", payload);
			const id = state.consultasData.findIndex((consulta) => consulta.idJornada === payload);
			console.log("INDEX ENCONTRADO: ", id);
			state.consultasData.splice(id, 1);
		},
		onDeleteBallotData: (state, { payload }) => {
			console.log("PAYLOAD: ", payload);
			const id = state.consultaSelected.ballots.findIndex(
				(ballot) => ballot.idPapeleta === payload
			);
			console.log("INDEX ENCONTRADO: ", id);
			state.consultaSelected.ballots.splice(id, 1);
		},
		onSetConsultaSelected: (state, { payload }) => {
			console.log("PAYLOAD", payload);
			state.consultaSelected.id = payload.id;
			state.consultaSelected.title = payload.titulo;
			state.consultaSelected.ballots = payload?.ballots;
		},
		onSetConfigSelected: (state, { payload }) => {
			// console.log("PAYLOAD", payload);
			state.configSelected = payload || {};
		},
		onSetConfigSelectedNull: (state, { payload }) => {
			state.configSelected = {};
		},
		onAddBallot: (state, { payload }) => {
			state.consultaSelected.ballots.push(payload);
		},
		onFillBallots: (state, { payload }) => {
			state.consultaSelected.ballots = payload;
		},
		onEditBallot: (state, { payload }) => {
			// state.consultaSelected.ballotSelected = state.consultaSelected.ballots[payload];
			state.consultaSelected.ballotSelected = payload;
		},
		onUpdateBallot: (state, { payload }) => {
			const ballot = state.consultaSelected.ballots.find(
				(ballot) => ballot.id === state.consultaSelected.ballotSelected.id
			);
			ballot.encabezadoConsulta = payload?.encabezadoConsulta;
		},
		onSetBallotSelectedNull: (state, { payload }) => {
			state.consultaSelected.ballotSelected = {};
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
	onAddConsultaCiudadana,
	onSetConsultaSelected,
	onAddBallot,
	onEditBallot,
	onUpdateBallot,
	onSetBallotSelectedNull,
	onDeleteConsultaCiudadanaData,
	onSetConfigSelected,
	onSetConfigSelectedNull,
	onFillBallots,
	onSetQuestionsNull,
	onDeleteBallotData,
} = consultaCiudadanaSlice.actions;

// export default consultaCiudadanaSlice.reducer;
