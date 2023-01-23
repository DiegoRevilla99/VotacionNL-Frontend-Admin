import { createSlice } from '@reduxjs/toolkit';

export const consultasSlice = createSlice({
    name: 'consultasSlice',
    initialState: {
        consultas: [],
        isLoadingConsultas: false,
        status: "off",
        errorMessage: "",
        successMessage: "",
    },
    reducers: {
        startLoadingConsultas: (state, /* action */) => {
            state.isLoadingConsultas = true;
        },
        setConsultas: (state, action) => {
            state.isLoadingConsultas = false;
            state.consultas = action.payload.consultas;
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
export const { startLoadingConsultas, setConsultas, onCheckingOperation, onSuccessOperation, onErrorOperation, onOffOperation } = consultasSlice.actions;