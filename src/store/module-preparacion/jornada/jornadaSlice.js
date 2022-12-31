import { createSlice } from '@reduxjs/toolkit';

export const jornadaSlice = createSlice({
    name: 'jornada',
    initialState: {
        jornadas: [],
        errorBoleta: null,
        errorPartido: null,
        errorCandidate: null,
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
        candidatoandSuplenteSelected: {
            apellidoPCandidato: "", 
            apellidoMCandidato: "", 
            nombreCandidato: "", 
            fotografiaCandidato: "",
            seudonimoCandidato: "", 
            fechaNacimientoCandidato: "", 
            generoCandidato: "",
            apellidoPSuplente: "", 
            apellidoMSuplente: "", 
            nombreSuplente: "", 
            fotografiaSuplente: "",
            seudonimoSuplente: "", 
            fechaNacimientoSuplente: "", 
            generoSuplente: ""
        },
        boletas: [],
        partidos: [],
        candidatoandSuplente: [],

        status: "off",
        errorMessage: "",
        successMessage: "",
        isLoadingBoletas: false,
        isLoadingJornadas: false,
        isLoadingPartidos: false,
        isLoadingCandidatosandSuplente: false,
    },
    reducers: {
        startLoadingJornadas: (state, /* action */) => {
            state.isLoadingJornadas = true;
        },
        setJornadas: (state, action) => {
            state.isLoading = false;
            state.jornadas = action.payload.jornadas;
        },
        
        // BOLETA
        startLoadingBoletas: (state, /* action */) => {
            state.isLoadingBoletas = true;
        },
        endLoadingBoletas: (state, /* action */) => {
            state.isLoadingBoletas = false;
        },
        setErrorBoletas: (state, action) => {
            state.isLoadingBoletas = false;
            state.errorBoleta = action.payload.errorBoleta;
        },
        setBoletas: (state, action) => {
            state.isLoadingBoletas = false;
            state.boletas = action.payload.boletas;
        },        


        //CANDIDATOS
        startLoadingCandidatosandSuplente: (state, /* action */) => {
            state.isLoadingCandidatosandSuplente = true;
        },
        setCandidatosandSuplente: (state, action) => {
            state.isLoadingCandidatosandSuplente = false;
            state.candidatoandSuplente = action.payload.candidatoandSuplente;
        },
        setErrorCandidateandSuplente: (state, action) => {
            state.isLoadingCandidatosandSuplente = false;
            state.errorCandidateandSuplente = action.payload.errorCandidateandSuplente;
        },
        endLoadingCandidateandSuplente: (state, /* action */) => {
            state.isLoadingCandidatosandSuplente = false;
        },

        //PARTIDOS
        setPartidos: (state, action) => {
            state.isLoadingPartidos = false;
            state.partidos = action.payload.partidos;
        },
        setErrorPartidos: (state, action) => {
            state.isLoadingPartidos = false;
            state.errorPartido = action.payload.errorPartido;
        },
        startLoadingPartidos: (state, /* action */) => {
            state.isLoadingPartidos = true;
        },
        endLoadingPartidos: (state, /* action */) => {
            state.isLoadingPartidos = false;
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
export const { 
    startLoadingBoletas, 
    setJornadas, 
    setBoletas, 
    setPartidos, 
    setErrorPartidos,
    endLoadingBoletas,
    setErrorBoletas,
    setErrorCandidateandSuplente,
    endLoadingCandidateandSuplente,
    setRepresentantes, 
    onCheckingOperation, 
    startLoadingJornadas, 
    startLoadingCandidatosandSuplente, 
    setCandidatosandSuplente,
    onSuccessOperation, 
    onErrorOperation, 
    onOffOperation } = jornadaSlice.actions;