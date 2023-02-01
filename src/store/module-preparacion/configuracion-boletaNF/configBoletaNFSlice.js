import { createSlice } from '@reduxjs/toolkit';

export const configBoletaNFSlice = createSlice({
    name: 'configBoletaNFSlice',
    initialState: {
        boleta: null,
        errorBoleta: null,
        asociaciones: [],
        candidatos: [],
        partidos: [],
        isLoadingBoleta: false,
        isLoadingCandidatos: false,
        isLoadingAsociaciones: false,
        status: "off",
        errorMessage: "",
        successMessage: "",
    },

    reducers: {
        
        //ASOCIONES
        startLoadingAsociaciones: (state, /* action */) => {
            state.isLoadingAsociaciones = true;
        },
        setAsociaciones: (state, action) => {
            state.isLoadingAsociaciones = false;
            state.asociaciones = action.payload.asociaciones;
        },
        endLoadingAsociaciones: (state, /* action */) => {
            state.isLoadingAsociaciones = false;
        },



        //BOLETA SELECCIONADA
        startLoadingBoleta: (state, /* action */) => {
            state.isLoadingBoleta = true;
        },
        endLoadingBoleta: (state, /* action */) => {
            state.isLoadingBoleta = false;
        },
        setBoleta: (state, action) => {
            state.isLoadingBoleta = false;
            state.boleta = action.payload.boleta;
            state.errorBoleta = null;
        },


        setErrorBoleta: (state, action) => {
            state.isLoadingBoleta = false;
            state.errorBoleta = action.payload.errorBoleta;
        },

        //CANDIDATOS
        startLoadingCandidatos: (state, /* action */) => {
            state.isLoadingCandidatos = true;
        },

        setCandidatos: (state, action) => {
            state.isLoadingCandidatos = false;
            state.candidatos = action.payload.candidatos;
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
export const { startLoadingAsociaciones, setAsociaciones, setErrorBoleta, endLoadingBoleta, setBoleta, startLoadingBoleta, onCheckingOperation, onSuccessOperation, onErrorOperation, onOffOperation,  startLoadingCandidatos, setCandidatos } = configBoletaNFSlice.actions;