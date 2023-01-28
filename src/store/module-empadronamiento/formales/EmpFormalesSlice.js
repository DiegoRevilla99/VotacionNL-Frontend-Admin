import { createSlice } from '@reduxjs/toolkit';

export const empFormalesSlice = createSlice({
    name: 'empFormales',
    initialState: {
        jornadasFormales: [],
        eleccion: {},
        isLoadingFormales: false,
        isLoadingEleccion: false,
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
        startLoadingEleccion: (state, /* action */) => {
            state.isLoadingEleccion = true;
        },
        setEleccion: (state, action) => {
            state.isLoadingEleccion = false;
            state.eleccion = action.payload.eleccion;
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
export const { setEleccion, startLoadingEleccion, setVotanteSelected, startLoadingFormales, setJornadasFormales, onCheckingOperation, onSuccessOperation, onErrorOperation, onOffOperation } = empFormalesSlice.actions;