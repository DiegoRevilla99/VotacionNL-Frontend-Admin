import { createSlice } from '@reduxjs/toolkit';

export const configBoletaSlice = createSlice({
    name: 'configBoleta',
    initialState: {
        coaliciones: [],
        asociaciones: [],
        candidatos: [],
        partidos: [],
        isLoadingCoaliciones: false,
        isLoadingPartidos: false,
        isLoadingAsociaciones: false,
        status: "off",
        errorMessage: "",
        successMessage: "",
    },
    reducers: {
        startLoadingCoaliciones: (state, /* action */) => {
            state.isLoadingCoaliciones = true;
        },
        setCoaliciones: (state, action) => {
            state.isLoadingCoaliciones = false;
            state.coaliciones = action.payload.coaliciones;
        },


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
export const { onCheckingOperation, onSuccessOperation, onErrorOperation, onOffOperation, startLoadingCoaliciones, startLoadingPartidos, setPartidos, setCoaliciones } = configBoletaSlice.actions;