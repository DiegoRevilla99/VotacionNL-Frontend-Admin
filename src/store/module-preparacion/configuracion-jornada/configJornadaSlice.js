import { createSlice } from '@reduxjs/toolkit';

export const configJornadaSlice = createSlice({
    name: 'configJornada',
    initialState: {
        configJornada: null,
        errorJornada: null,
        isLoadingConfigJornada: false,
        status: "off",
        errorMessage: "",
        successMessage: "",
    },
    reducers: {
        startLoadingConfigJornada: (state, /* action */) => {
            state.isLoadingConfigJornada = true;
        },
        endLoadingConfigJornada: (state, /* action */) => {
            state.isLoadingConfigJornada = false;
        },
        setConfigJornada: (state, action) => {
            state.isLoadingConfigJornada = false;
            state.configJornada = action.payload.configJornada;
            state.errorBoleta = null;
        },
        setErrorJornada: (state, action) => {
            state.isLoadingJornada = false;
            state.errorJornada = action.payload.errorJornada;
        },

        //Transacciones 
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
    }
});


// Action creators are generated for each case reducer function
export const { setErrorJornada, startLoadingConfigJornada, endLoadingConfigJornada, setConfigJornada, onCheckingOperation, onSuccessOperation, onErrorOperation, onOffOperation } = configJornadaSlice.actions;