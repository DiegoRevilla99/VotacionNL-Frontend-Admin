import { createSlice } from '@reduxjs/toolkit';

export const configBoletaSlice = createSlice({
    name: 'configBoleta',
    initialState: {
        boleta: null,
        errorBoleta: null,
        coaliciones: [],
        asociaciones: [],
        candidatos: [],
        partidos: [],
        isLoadingBoleta: false,
        isLoadingCoaliciones: false,
        isLoadingPartidos: false,
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

        //PARTIDOS
        startLoadingPartidos: (state, /* action */) => {
            state.isLoadingPartidos = true;
        },
        setPartidos: (state, action) => {
            state.isLoadingPartidos = false;
            state.partidos = action.payload.partidos;
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
export const { setErrorBoleta, endLoadingBoleta, setBoleta, startLoadingBoleta, onCheckingOperation, onSuccessOperation, onErrorOperation, onOffOperation, startLoadingCoaliciones, startLoadingPartidos, setPartidos, setCoaliciones } = configBoletaSlice.actions;