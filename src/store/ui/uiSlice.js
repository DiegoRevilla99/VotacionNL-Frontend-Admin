import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
	name: "ui",
	initialState: {
		status: "off", //off, success, error, checking
		toastCheckingMessage: "",
		toastErrorMessage: "",
		toastSuccessMessage: "",
	},
	reducers: {
		onToastCheckingOperation: (state, { payload }) => {
			state.status = "checking";
			state.toastCheckingMessage = payload?.checkingMessage || "Procesando...";
		},
		onToastSuccessOperation: (state, { payload }) => {
			state.status = "success";
			state.toastSuccessMessage = payload?.successMessage || "Operación realizada con éxito";
		},
		onToastErrorOperation: (state, { payload }) => {
			state.status = "error";
			state.toastErrorMessage = payload?.errorMessage;
		},
		onToastOffOperation: (state) => {
			state.status = "off";
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	onToastCheckingOperation,
	onToastSuccessOperation,
	onToastErrorOperation,
	onToastOffOperation,
} = uiSlice.actions;

// export default consultaCiudadanaSlice.reducer;
