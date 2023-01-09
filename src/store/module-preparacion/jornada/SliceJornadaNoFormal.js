import { createSlice } from '@reduxjs/toolkit';

export const SliceJornadaNoFormal = createSlice({
    name: 'jornada',
    initialState: {
        status: "off",
        errorMessage: "",
        successMessage: "",
        partidos: [],
        partidoSelected: {},
        candidatoandSuplentes: [],
        candidatoandSuplenteSelected: {},
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
            state.candidatos.push({
                id: payload?.id,
                apellidoPCandidato: payload?.apellidoPCandidato,
                apellidoMCandidato: payload?.apellidoMCandidato,
                nombreCandidato: payload?.nombreCandidato,
                fotografiaCandidato: payload?.fotografiaCandidato,
                seudonimoCandidato: payload?.seudonimoCandidato,
                fechaNacimientoCandidato: payload?.fechaNacimientoCandidato,
                generoCandidato: payload?.generoCandidato,
            });
        },
        onAddSuplente: (state, { payload }) => {
            state.suplentes.push({
                id: payload?.id,
                apellidoPSuplente: payload?.apellidoPSuplente,
                apellidoMSuplente: payload?.apellidoMSuplente,
                nombreSuplente: payload?.nombreSuplente,
                fotografiaSuplente: payload?.fotografiaSuplente,
                seudonimoSuplente: payload?.seudonimoSuplente,
                fechaNacimientoSuplente: payload?.fechaNacimientoSuplente,
                generoSuplente: payload?.generoSuplente,
            });
        },
        onAddPartido: (state, { payload }) => {

            state.partidos.push({
                id: payload?.id,
                nombrePartido: payload?.nombrePartido,
                siglasPartido: payload?.siglasPartido,
                emblemaPartido: payload?.emblemaPartido,
                fotografiaPartido: payload?.fotografiaPartido,
            });

            console.log("state.partidos en SLICE", state.partidos[0]);
        },

        onAddCandidatoAndSuplente: (state, { payload }) => {
            state.candidatoandSuplentes.push({
                id: payload?.id,
                apellidoPCandidato: payload?.apellidoPCandidato,
                apellidoMCandidato: payload?.apellidoMCandidato,
                nombreCandidato: payload?.nombreCandidato,
                fotografiaCandidato: payload?.fotografiaCandidato,
                seudonimoCandidato: payload?.seudonimoCandidato,
                fechaNacimientoCandidato: payload?.fechaNacimientoCandidato,
                generoCandidato: payload?.generoCandidato,
                // idSuplente: payload?.idSuplente,
                apellidoPSuplente: payload?.apellidoPSuplente,
                apellidoMSuplente: payload?.apellidoMSuplente,
                nombreSuplente: payload?.nombreSuplente,
                fotografiaSuplente: payload?.fotografiaSuplente,
                seudonimoSuplente: payload?.seudonimoSuplente,
                fechaNacimientoSuplente: payload?.fechaNacimientoSuplente,
                generoSuplente: payload?.generoSuplente,
            });
            console.log("CANDIDATOS CON SUPLENTES en SLICE", state.candidatoandSuplentes[0]);
        },

        onDeleteCandidato: (state, { payload }) => {
            const candidatoFound = state.candidatos.find((candidato) => candidato.id === payload?.id);
            state.candidatos.splice(state.candidatos.indexOf(candidatoFound), 1);
        },
        onDeleteSuplente: (state, { payload }) => {
            const suplenteFound = state.suplentes.find((suplente) => suplente.id === payload?.id);
            state.suplentes.splice(state.suplentes.indexOf(suplenteFound), 1);
        },
        onDeletePartido: (state, { payload }) => {
            const partidoFound = state.partidos.find((partido) => partido.id === payload?.id);
            state.partidos.splice(state.partidos.indexOf(partidoFound), 1);
        },
        onDeleteCandidatoAndSuplente: (state, { payload }) => {
            const candidatoandSuplenteFound = state.candidatoandSuplentes.find(
                (candidatoandSuplente) => candidatoandSuplente.id === payload?.id
            );
            state.candidatoandSuplentes.splice(
                state.candidatoandSuplentes.indexOf(candidatoandSuplenteFound),
                1
            );
        },
        onEditCandidato: (state, { payload }) => {
            state.candidatoSelected = state.candidatos[0];
        },
        onEditSuplente: (state, { payload }) => {
            state.suplenteSelected = state.suplentes[0];
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
        onEditCandidatoAndSuplente: (state, { payload }) => {
            state.candidatoandSuplenteSelected = state.candidatoandSuplentes[0];
        },
        onUpdateCandidato: (state, { payload }) => {
            const candidato = state.candidatos.find(
                (candidato) => candidato.id === state.candidatoSelected.id
            );
            candidato.id = payload?.id;
            candidato.apellidoPCandidato = payload?.apellidoPCandidate;
            candidato.apellidoMCandidato = payload?.apellidoMCandidate;
            candidato.nombreCandidato = payload?.nameCandidate;
            candidato.fotografiaCandidato = payload?.fotografiaCandidate;
            candidato.seudonimoCandidato = payload?.seudonimoCandidate;
            candidato.fechaNacimientoCandidato = payload?.fechaNacimientoCandidate;
            candidato.generoCandidato = payload?.generoCandidate;
        },
        onUpdateSuplente: (state, { payload }) => {
            const suplente = state.suplentes.find(
                (suplente) => suplente.id === state.suplenteSelected.id
            );
            suplente.id = payload?.id;
            suplente.apellidoPSuplente = payload?.apellidoPSubstitute;
            suplente.apellidoMSuplente = payload?.apellidoMSubstitute;
            suplente.nombreSuplente = payload?.nameSubstitute;
            suplente.fotografiaSuplente = payload?.fotografiaSubstitute;
            suplente.seudonimoSuplente = payload?.seudonimoSubstitute;
            suplente.fechaNacimientoSuplente = payload?.fechaNacimientoSubstitute;
            suplente.generoSuplente = payload?.generoSubstitute;
        },
        onUpdatePartido: (state, { payload }) => {
            const partido = state.partidos.find(
                (partido) => partido.id === state.partidoSelected.id
            );
            partido.id = payload?.id;
            partido.nombre = payload?.nameParty;
            partido.siglas = payload?.siglasParty;
            partido.emblema = payload?.emblemParty;
            partido.fotografia = payload?.fotografiaParty;
        },
        onUpdateCandidatoAndSuplente: (state, { payload }) => {
            const candidatoandSuplente = state.candidatoandSuplentes.find(
                (candidatoandSuplente) => candidatoandSuplente.id === state.candidatoandSuplenteSelected.id
            );
            candidatoandSuplente.idCandidato = payload?.idCandidate;
            candidatoandSuplente.apellidoPCandidato = payload?.apellidoPCandidate;
            candidatoandSuplente.apellidoMCandidato = payload?.apellidoMCandidate;
            candidatoandSuplente.nombreCandidato = payload?.nameCandidate;
            candidatoandSuplente.fotografiaCandidato = payload?.fotografiaCandidate;
            candidatoandSuplente.seudonimoCandidato = payload?.seudonimoCandidate;
            candidatoandSuplente.fechaNacimientoCandidato = payload?.fechaNacimientoCandidate;
            candidatoandSuplente.generoCandidato = payload?.generoCandidate;
            candidatoandSuplente.idSuplente = payload?.idSubstitute;
            candidatoandSuplente.apellidoPSuplente = payload?.apellidoPSubstitute;
            candidatoandSuplente.apellidoMSuplente = payload?.apellidoMSubstitute;
            candidatoandSuplente.nombreSuplente = payload?.nameSubstitute;
            candidatoandSuplente.fotografiaSuplente = payload?.fotografiaSubstitute;
            candidatoandSuplente.seudonimoSuplente = payload?.seudonimoSubstitute;
            candidatoandSuplente.fechaNacimientoSuplente = payload?.fechaNacimientoSubstitute;
            candidatoandSuplente.generoSuplente = payload?.generoSubstitute;
        },
        onSetCandidatoSelectedNull: (state, { payload }) => {
            state.candidatoSelected = {};
        },
        onSetSuplenteSelectedNull: (state, { payload }) => {
            state.suplenteSelected = {};
        },
        onSetPartidoSelectedNull: (state, { payload }) => {
            state.partidoSelected = {};
        },
        onSetCandidatoAndSuplenteSelectedNull: (state, { payload }) => {
            state.candidatoandSuplenteSelected = {};
        },
        onSetCandidatoNull: (state, { payload }) => {
            state.candidatos = [];
        },
        onSetSuplenteNull: (state, { payload }) => {
            state.suplentes = [];
        },
        onSetPartidoNull: (state, { payload }) => {
            state.partidos = [];
        },
        onSetCandidatoAndSuplenteNull: (state, { payload }) => {
            state.candidatoandSuplentes = [];
        },
        onFillJornadasNoFormalesData: (state, { payload }) => {
            state.jornadasNoFormalesData = payload;
        },
        onAddJornadasNoFormales: (state, { payload }) => {
            state.jornadasNoFormalesData.push(payload);
        },
        onDeleteJornadaData: (state, { payload }) => {
            console.log(payload);
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
            state.jornadaNoFormalSelected.boletasNoFormales = payload.boletasNoFormales;
        },
        onAddBoleta: (state, { payload }) => {
            state.jornadaNoFormalSelected.boletasNoFormales.push(payload);
            console.log(state.jornadaNoFormalSelected.boletasNoFormales);
        },
        onFillBoletas: (state, { payload }) => {
            state.jornadaNoFormalSelected.boletasNoFormales = payload;
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
    onSetCandidatoAndSuplenteSelectedNull,
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