import { createSlice } from "@reduxjs/toolkit";

export const consultaCiudadanaSlice = createSlice({
	name: "consultaCiudadana",
	initialState: {
		status: "off", //off, success, error, checking
		errorMessage: "",
		successMessage: "",
		questions: [],
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
			state.questions.push([payload?.question, payload?.answers]);
			// state.successMessage = "Pregunta añadida correctamente";
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
	onFillConsultasData,
} = consultaCiudadanaSlice.actions;

// export default consultaCiudadanaSlice.reducer;
