import { createSlice } from '@reduxjs/toolkit';

export const configJornadaSlice = createSlice({
    name: 'configJornada',
    initialState: {
        configJornada: {},
        jornada: {},
        errorJornada: null,
        errorJornadaSelected: null,
        isLoadingConfigJornada: false,
        isLoadingJornada: false,
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

        //jornadaseleccionada
        startLoadingJornada: (state, /* action */) => {
            state.isLoadingJornada = true;
        },
        endLoadingJornada: (state, /* action */) => {
            state.isLoadingJornada = false;
        },
        setJornada: (state, action) => {
            state.isLoadingJornada = false;
            state.jornada = action.payload.jornada;
            state.errorJornadaSelected = null;
        },
        setErrorJornadaSelected: (state, action) => {
            state.isLoadingJornada = false;
            state.errorJornadaSelected = action.payload.errorJornadaSelected;
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
export const { setErrorJornadaSelected, startLoadingJornada, endLoadingJornada, setJornada,setErrorJornada, startLoadingConfigJornada, endLoadingConfigJornada, setConfigJornada, onCheckingOperation, onSuccessOperation, onErrorOperation, onOffOperation } = configJornadaSlice.actions;