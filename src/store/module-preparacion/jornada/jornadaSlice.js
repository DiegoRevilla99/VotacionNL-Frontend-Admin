import { createSlice } from '@reduxjs/toolkit';

export const jornadaSlice = createSlice({
    name: 'jornada',
    initialState: {
        jornadas: [],
        jornadaSelected: {
            nombre: "",
            boletas: []
        },
        boletaSelected: {
            encabezado: "",	//Text
			nombreCandidatura: "",//Text
            modalidadVotacion: "",//Text
			entidadFederativa: "",//Text
			municipio: "",//Text
			distritoElectoralLocal: "",//Number
			distritoElectoral: "",//Number
			tipoCasilla: "",//text
			primerFirmante: "",//Text
			cargoPrimerFirmante: "",//Text
			segundoFirmante: "",//Text
			cargoSegundoFirmante: "",//Text
            partidos: [],
            candidatos: [],
            suplentes: [],
        },
        partidoSelected: {
			nombrePartido: "",	//Text
			siglas: "",//Text
        },
        candidatoSelected: {
            apellidoPCandidato: "", 
            apellidoMCandidato: "", 
            nombreCandidato: "", 
            fotoCandidato: "",
            seudonimoCandidato: "", 
            fechaNacimiento: "", 
            genero: ""
        },
        suplenteSelected: {
            apellidoPSuplente: "", 
            apellidoMSuplente: "", 
            nombreSuplente: "", 
            fotoSuplente: "",
            seudonimoSuplente: "", 
            fechaNacimiento: "", 
            genero: ""
        },
        boletas: [],
        partidos: [],
        candidatos: [],
        suplentes: [],
        status: "off",
        errorMessage: "",
        successMessage: "",
        isLoadingBoletas: false,
        isLoadingJornadas: false,
    },
    reducers: {
        startLoadingJornadas: (state, /* action */) => {
            state.isLoadingJornadas = true;
        },
        startLoadingBoletas: (state, /* action */) => {
            state.isLoadingBoletas = true;
        },
        setJornadas: (state, action) => {
            state.isLoading = false;
            state.jornadas = action.payload.jornadas;
        },
        setBoletas: (state, action) => {
            state.isLoadingBoletas = false;
            state.boletas = action.payload.boletas;
        },
        setPartidos: (state, action) => {
            state.isLoading = false;
            state.partidos = action.payload.partidos;
        },
        setCandidatos: (state, action) => {
            state.isLoading = false;
            state.candidatos = action.payload.candidatos;
        },
        setSuplentes: (state, action) => {
            state.isLoading = false;
            state.suplentes = action.payload.suplentes;
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
export const { startLoadingBoletas, setJornadas, setBoletas, setPartidos, setRepresentantes, onCheckingOperation, startLoadingJornadas, onSuccessOperation, onErrorOperation, onOffOperation } = jornadaSlice.actions;