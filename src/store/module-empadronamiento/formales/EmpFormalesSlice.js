import { createSlice } from '@reduxjs/toolkit';

export const empFormalesSlice = createSlice({
    name: 'empFormales',
    initialState: {
        jornadasFormales: [],
        votantes: [],
        votanteSelected: {},
        isLoadingFormales: false,
        isLoadingVotantes: false,
        status: "off",
        errorMessage: "",
        successMessage: "",
    },

    reducers: {
        startLoadingFormales: (state, /* action */) => {
            state.isLoadingFormales = true;
        },
        setJornadasFormales: (state, action) => {
            state.isLoadingFormales = false;
            state.jornadasFormales = action.payload.jornadasFormales;
        },

        startLoadingVotantes: (state, /* action */) => {
            state.isLoadingVotantes = true;
        },

        setVotantes: (state, action) => {
            state.isLoadingVotantes = false;
            state.votantes = action.payload.votantes;
        },

        setVotanteSelected: (state, action) => {
            // state.isLoadingVotantes = false;
            state.votanteSelected = action.payload.votanteSelected;
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
export const { setVotanteSelected, startLoadingFormales, setJornadasFormales, startLoadingVotantes, setVotantes, onCheckingOperation, onSuccessOperation, onErrorOperation, onOffOperation } = empFormalesSlice.actions;