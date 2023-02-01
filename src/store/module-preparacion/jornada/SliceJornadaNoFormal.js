import { createSlice } from '@reduxjs/toolkit';

export const SliceJornadaNoFormal = createSlice({
    name: 'jornadaNoFormal',
    initialState: {
        status: "off",
        errorMessage: "",
        successMessage: "",
        partidos: [],
        partidoSelected: {},
        candidatos:[],
        candidatoSelected: {},
        suplentes: [],
        suplenteSelected: {},
        jornadasNoFormalesData: [],
        jornadaNoFormalSelected: {
            id: "",
            title: "",
            nombre: "",
            boletasNoFormales: [],
            boletaNoFormalSelected: {},
        },
    },
    reducers: {
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
        onAddCandidato: (state, { payload }) => {
            console.log("candidatos en mi payload", payload);

                if (!Array.isArray(payload)) {
                    state.candidatos.push({
                        id: payload?.id,
                        curp: payload?.curp,
                        apellidoPCandidato: payload?.apellidoPCandidato,
                        apellidoMCandidato: payload?.apellidoMCandidato,
                        nombreCandidato: payload?.nombreCandidato,
                        fotografiaCandidato: payload?.fotografiaCandidato,
                        seudonimoCandidato: payload?.seudonimoCandidato,
                        fechaNacimientoCandidato: payload?.fechaNacimientoCandidato,
                        generoCandidato: payload?.generoCandidato,
                    });
                    return;
                }
                payload.forEach((candidato) => {
                    state.candidatos.push({
                        id: candidato?.id,
                        curp: payload?.curp,
                        apellidoPCandidato: candidato?.apellidoPCandidato,
                        apellidoMCandidato: candidato?.apellidoMCandidato,
                        nombreCandidato: candidato?.nombreCandidato,
                        fotografiaCandidato: candidato?.fotografiaCandidato,
                        seudonimoCandidato: candidato?.seudonimoCandidato,
                        fechaNacimientoCandidato: candidato?.fechaNacimientoCandidato,
                        generoCandidato: candidato?.generoCandidato,
                    });
                });
        
            console.log("candidatos en el slice", state.candidatos);
        },

        onDeleteCandidato: (state, { payload }) => {
            const candidatoFound = state.candidatos.find((candidato) => candidato.id === payload?.id);
            state.candidatos.splice(state.candidatos.indexOf(candidatoFound), 1);
        },

        onEditCandidato: (state, { payload }) => {
            state.candidatoSelected = state.candidatos[0];
        },

        onEditPartido: (state, { payload }) => {
            state.partidoSelected = state.partidos[0];
            // const index = state.partidos.findIndex(partido => partido.id === state.partidoSelected.id);
            // state.partidos.splice(index, 1, {
            //   id: payload.id,
            //   nombrePartido: payload.nombrePartido,
            //   siglasPartido: payload.siglasPartido,
            //   emblemaPartido: payload.emblemaPartido,
            //   fotografiaPartido: payload.fotografiaPartido
            // });
        },

        onUpdateCandidato: (state, { payload }) => {
            const candidato = state.candidatos.find(
                (candidato) => candidato.id === state.candidatoSelected.id
            );
            candidato.id = payload?.id;
            candidato.curp = payload?.curp;
            candidato.apellidoPCandidato = payload?.apellidoPCandidate;
            candidato.apellidoMCandidato = payload?.apellidoMCandidate;
            candidato.nombreCandidato = payload?.nameCandidate;
            candidato.fotografiaCandidato = payload?.fotografiaCandidate;
            candidato.seudonimoCandidato = payload?.seudonimoCandidate;
            candidato.fechaNacimientoCandidato = payload?.fechaNacimientoCandidate;
            candidato.generoCandidato = payload?.generoCandidate;
        },

        onSetCandidatoSelectedNull: (state, { payload }) => {
            state.candidatoSelected = {};
        },


        onSetCandidatoNull: (state, { payload }) => {
            state.candidatos = [];
        },


        onFillCandidatosNoFormalesData: (state, { payload }) => {
            state.candidatosNoFormalesData = payload;
        },
        onFillJornadasNoFormalesData: (state, { payload }) => {
            state.jornadasNoFormalesData = payload;
        },
        onAddJornadasNoFormales: (state, { payload }) => {
            state.jornadasNoFormalesData.push(payload);
        },
        onDeleteJornadaData: (state, { payload }) => {
            console.log("ELIMIANDO EN EL SLIDE",payload);
            const id = state.jornadasNoFormalesData.findIndex((consulta) => consulta.idJornada === payload);
            console.log(id);
            state.jornadasNoFormalesData.splice(id, 1);
        },
        onDeleteBoletaData: (state, { payload }) => {
            console.log(payload);
            const id = state.jornadaNoFormalSelected.boletasNoFormales.findIndex(
                (consulta) => consulta.idBoleta === payload);
            console.log(id);
            state.jornadaNoFormalSelected.boletasNoFormales.splice(id, 1);
        },
        onSetjornadaNoFormalSelected: (state, { payload }) => {
            console.log(payload);
            state.jornadaNoFormalSelected.id = payload.idJornada;
            state.jornadaNoFormalSelected.title = payload.title;
            state.jornadaNoFormalSelected.boletasNoFormales = payload.boletasNoFormales || [];
        },
        onAddBoleta: (state, { payload }) => {
            // console.log("AYUDA 1",state.jornadaNoFormalSelected.boletasNoFormales);
            if (!Array.isArray(state.jornadaNoFormalSelected.boletasNoFormales)) {
                state.jornadaNoFormalSelected.boletasNoFormales = [];
            }
            state.jornadaNoFormalSelected.boletasNoFormales.push(payload);
            // console.log("AYUDA 2",state.jornadaNoFormalSelected.boletasNoFormales);
        },
        onSetBoletaNoFormal( state, { payload } ) {
            state.jornadaNoFormalSelected.boletaNoFormalSelected = payload;
        },
        onFillBoletas: (state, { payload }) => {
            state.jornadaNoFormalSelected.boletasNoFormales = payload;
            // console.log("fill boletas", payload);
			// state.jornadaSelected.boletas = payload;
			// state.jornadaNoFormalSelected.boletas = [];

			// state.jornadaNoFormalSelected.boletas.push({
			// 	idEstructuraBoleta: 23,
			// 	nombreEleccion: "Boleta para planilla",
			// });
        },
        onEditBoleta: (state, { payload }) => {
            state.jornadaNoFormalSelected.boletaNoFormalSelected = payload;
        },
        onUpdateBoleta: (state, { payload }) => {
            const boleta = state.jornadaNoFormalSelected.boletasNoFormales.find(
                (boleta) => boleta.id === state.jornadaNoFormalSelected.boletaNoFormalSelected.id
            );
            boleta.encabezadoJornada = payload.encabezadoJornada;
        },
        onSetBoletasSelectedNull: (state, { payload }) => {
            state.jornadaNoFormalSelected.boletaNoFormalSelected = {};
        },
    },
});


// Action creators are generated for each case reducer function
export const { 
    onCheckingOperation,
    onSuccessOperation,
    onErrorOperation,
    onOffOperation,
    onAddCandidato,
    onAddSuplente,
    onAddPartido,
    onAddCandidatoAndSuplente,
    onDeleteCandidato,
    onDeleteSuplente,
    onDeletePartido,
    onDeleteCandidatoAndSuplente,
    onEditCandidato,
    onEditSuplente,
    onEditPartido,
    onEditCandidatoAndSuplente,
    onUpdateCandidato,
    onUpdateSuplente,
    onUpdatePartido,
    onUpdateCandidatoAndSuplente,
    onSetCandidatoSelectedNull,
    onSetSuplenteSelectedNull,
    onSetPartidoSelectedNull,
    onFillCandidatosNoFormalesData,
    onSetCandidatoNull,
    onSetSuplenteNull,
    onSetPartidoNull,
    onSetCandidatoAndSuplenteNull,
    onFillJornadasNoFormalesData,
    onAddJornadasNoFormales,
    onDeleteJornadaData,
    onDeleteBoletaData,
    onSetjornadaNoFormalSelected,
    onAddBoleta,
    onFillBoletas,
    onEditBoleta,
    onUpdateBoleta,
    onSetBoletasSelectedNull,
} = SliceJornadaNoFormal.actions;