import { createSlice } from '@reduxjs/toolkit';

export const comiteSlice = createSlice({
    name: 'comite',
    initialState: {
        comites: [],
        comiteSelected: {
            nombre: "",
            boletas: []
        },
        boletaSelected: {
            encabezado: "",
            nombre: "",
            entidad: "",
            municipio: "",
            planillas: [],
            representantes: [],
        },
        planillaSelected: {
            nombrePlanilla: "",
            nombre: "",
            seudonimo: "",
            cargo: ""
        },
        boletas: [],
        planillas: [],
        representantes: [],
        status: "off",
        errorMessage: "",
        successMessage: "",
        isLoadingBoletas: false,
        isLoadingComites: false,
    },
    reducers: {
        startLoadingComites: (state, /* action */) => {
            state.isLoadingComites = true;
        },
        startLoadingBoletas: (state, /* action */) => {
            state.isLoadingBoletas = true;
        },
        setComites: (state, action) => {
            state.isLoading = false;
            state.comites = action.payload.comites;
        },
        setBoletas: (state, action) => {
            state.isLoadingBoletas = false;
            state.boletas = action.payload.boletas;
        },
        setPlanillas: (state, action) => {
            state.isLoading = false;
            state.planillas = action.payload.planillas;
        },
        setRepresentantes: (state, action) => {
            state.isLoading = false;
            state.representantes = action.payload.representantes;
        },
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
export const { startLoadingBoletas, setComites, setBoletas, setPlanillas, setRepresentantes, onCheckingOperation, startLoadingComites, onSuccessOperation, onErrorOperation, onOffOperation } = comiteSlice.actions;