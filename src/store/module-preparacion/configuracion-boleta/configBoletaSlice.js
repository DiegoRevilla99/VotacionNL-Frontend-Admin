import { createSlice } from '@reduxjs/toolkit';

export const configBoletaSlice = createSlice({
    name: 'configBoleta',
    initialState: {
        boleta: null,
        errorBoleta: null,
        coaliciones: [],
        coalicionSelected: null,
        asociaciones: [],
        candidatos: [],
        partidos: [],
        isLoadingBoleta: false,
        isLoadingCoaliciones: false,
        isLoadingPartidos: false,
        isLoadingCandidatos: false,
        isLoadingAsociaciones: false,
        status: "off",
        errorMessage: "",
        successMessage: "",
    },

    reducers: {
        //COALICIONES
        startLoadingCoaliciones: (state, /* action */) => {
            state.isLoadingCoaliciones = true;
        },
        setCoaliciones: (state, action) => {
            state.isLoadingCoaliciones = false;
            state.coaliciones = action.payload.coaliciones;
        },
        setCoalicionSelected: (state, action) => {
            state.coalicionSelected = action.payload.coalicionSelected;
        },
        endLoadingCoaliciones: (state, /* action */) => {
            state.isLoadingCoaliciones = false;
        },

        //ASOCIONES
        startLoadingAsociaciones: (state, /* action */) => {
            state.isLoadingAsociaciones = true;
        },
        setAsociaciones: (state, action) => {
            state.isLoadingAsociaciones = false;
            state.asociaciones = action.payload.asociaciones;
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



        startLoadingAsociaciones: (state, /* action */) => {
            state.isLoadingAsociaciones = true;
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
export const { endLoadingCoaliciones, startLoadingAsociaciones, setAsociaciones, setCoalicionSelected, setErrorBoleta, endLoadingBoleta, setBoleta, startLoadingBoleta, onCheckingOperation, onSuccessOperation, onErrorOperation, onOffOperation, startLoadingCoaliciones, startLoadingCandidatos, setCandidatos, setCoaliciones } = configBoletaSlice.actions;