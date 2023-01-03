import { createSlice } from '@reduxjs/toolkit';

export const SliceJornada = createSlice({
    name: 'jornada',
    initialState: {
        status: "off",
        errorMessage: "",
        successMessage: "",
        partidos: [],
        partidoSelected: {},
        candidatoandSuplente: [],
        candidatoandSuplenteSelected: {},
        candidatos:[],
        candidatoSelected: {},
        suplentes: [],
        suplenteSelected: {},
        jornadasData: [],
        jornadaSelected: {
            id: "",
            title: "",
            nombre: "",
            boletas: [],
            boletaSelected: {},
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
                nombre: payload?.nombre,
                siglas: payload?.siglas,
                emblema: payload?.emblema,
                fotografia: payload?.fotografia,
            });
        },

        onAddCandidatoAndSuplente: (state, { payload }) => {
            state.candidatoandSuplente.push({
                idCandidato: payload?.idCandidato,
                apellidoPCandidato: payload?.apellidoPCandidato,
                apellidoMCandidato: payload?.apellidoMCandidato,
                nombreCandidato: payload?.nombreCandidato,
                fotografiaCandidato: payload?.fotografiaCandidato,
                seudonimoCandidato: payload?.seudonimoCandidato,
                fechaNacimientoCandidato: payload?.fechaNacimientoCandidato,
                generoCandidato: payload?.generoCandidato,
                idSuplente: payload?.idSuplente,
                apellidoPSuplente: payload?.apellidoPSuplente,
                apellidoMSuplente: payload?.apellidoMSuplente,
                nombreSuplente: payload?.nombreSuplente,
                fotografiaSuplente: payload?.fotografiaSuplente,
                seudonimoSuplente: payload?.seudonimoSuplente,
                fechaNacimientoSuplente: payload?.fechaNacimientoSuplente,
                generoSuplente: payload?.generoSuplente,
            });
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
            const candidatoandSuplenteFound = state.candidatoandSuplente.find(
                (candidatoandSuplente) => candidatoandSuplente.id === payload?.id
            );
            state.candidatoandSuplente.splice(
                state.candidatoandSuplente.indexOf(candidatoandSuplenteFound),
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
        },
        onEditCandidatoAndSuplente: (state, { payload }) => {
            state.candidatoandSuplenteSelected = state.candidatoandSuplente[0];
        },
        onUpdateCandidato: (state, { payload }) => {
            const candidato = state.candidatos.find(
                (candidato) => candidato.id === state.candidatoSelected.id
            );
            candidato.id = payload?.id;
            candidato.apellidoPCandidato = payload?.apellidoPCandidato;
            candidato.apellidoMCandidato = payload?.apellidoMCandidato;
            candidato.nombreCandidato = payload?.nombreCandidato;
            candidato.fotografiaCandidato = payload?.fotografiaCandidato;
            candidato.seudonimoCandidato = payload?.seudonimoCandidato;
            candidato.fechaNacimientoCandidato = payload?.fechaNacimientoCandidato;
            candidato.generoCandidato = payload?.generoCandidato;
        },
        onUpdateSuplente: (state, { payload }) => {
            const suplente = state.suplentes.find(
                (suplente) => suplente.id === state.suplenteSelected.id
            );
            suplente.id = payload?.id;
            suplente.apellidoPSuplente = payload?.apellidoPSuplente;
            suplente.apellidoMSuplente = payload?.apellidoMSuplente;
            suplente.nombreSuplente = payload?.nombreSuplente;
            suplente.fotografiaSuplente = payload?.fotografiaSuplente;
            suplente.seudonimoSuplente = payload?.seudonimoSuplente;
            suplente.fechaNacimientoSuplente = payload?.fechaNacimientoSuplente;
            suplente.generoSuplente = payload?.generoSuplente;
        },
        onUpdatePartido: (state, { payload }) => {
            const partido = state.partidos.find(
                (partido) => partido.id === state.partidoSelected.id
            );
            partido.id = payload?.id;
            partido.nombre = payload?.nombre;
            partido.siglas = payload?.siglas;
            partido.emblema = payload?.emblema;
            partido.fotografia = payload?.fotografia;
        },
        onUpdateCandidatoAndSuplente: (state, { payload }) => {
            const candidatoandSuplente = state.candidatoandSuplente.find(
                (candidatoandSuplente) => candidatoandSuplente.id === state.candidatoandSuplenteSelected.id
            );
            candidatoandSuplente.idCandidato = payload?.idCandidato;
            candidatoandSuplente.apellidoPCandidato = payload?.apellidoPCandidato;
            candidatoandSuplente.apellidoMCandidato = payload?.apellidoMCandidato;
            candidatoandSuplente.nombreCandidato = payload?.nombreCandidato;
            candidatoandSuplente.fotografiaCandidato = payload?.fotografiaCandidato;
            candidatoandSuplente.seudonimoCandidato = payload?.seudonimoCandidato;
            candidatoandSuplente.fechaNacimientoCandidato = payload?.fechaNacimientoCandidato;
            candidatoandSuplente.generoCandidato = payload?.generoCandidato;
            candidatoandSuplente.idSuplente = payload?.idSuplente;
            candidatoandSuplente.apellidoPSuplente = payload?.apellidoPSuplente;
            candidatoandSuplente.apellidoMSuplente = payload?.apellidoMSuplente;
            candidatoandSuplente.nombreSuplente = payload?.nombreSuplente;
            candidatoandSuplente.fotografiaSuplente = payload?.fotografiaSuplente;
            candidatoandSuplente.seudonimoSuplente = payload?.seudonimoSuplente;
            candidatoandSuplente.fechaNacimientoSuplente = payload?.fechaNacimientoSuplente;
            candidatoandSuplente.generoSuplente = payload?.generoSuplente;
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
            state.candidatoandSuplente = [];
        },
        onFillJornadasData: (state, { payload }) => {
            state.jornadasData = payload;
        },
        onAddJornadas: (state, { payload }) => {
            state.jornadasData.push(payload);
        },
        onDeleteJornadaData: (state, { payload }) => {
            console.log(payload);
            const id = state.jornadasData.findIndex((consulta) => consulta.idJornada === payload);
            console.log(id);
            state.jornadasData.splice(id, 1);
        },
        onDeleteBoletaData: (state, { payload }) => {
            console.log(payload);
            const id = state.jornadaSelected.boletas.findIndex(
                (consulta) => consulta.idBoleta === payload);
            console.log(id);
            state.jornadaSelected.boletas.splice(id, 1);
        },
        onSetJornadaSelected: (state, { payload }) => {
            console.log(payload);
            state.jornadaSelected.id = payload.idJornada;
            state.jornadaSelected.title = payload.title;
            state.jornadaSelected.boletas = payload.boletas;
        },
        onAddBoleta: (state, { payload }) => {
            state.jornadaSelected.boletas.push(payload);
        },
        onFillBoletas: (state, { payload }) => {
            state.jornadaSelected.boletas = payload;
        },
        onEditBoleta: (state, { payload }) => {
            state.jornadaSelected.boletaSelected = payload;
        },
        onUpdateBoleta: (state, { payload }) => {
            const boleta = state.jornadaSelected.boletas.find(
                (boleta) => boleta.idBoleta === state.jornadaSelected.boletaSelected.idBoleta
            );
            boleta.encabezadoBoleta = payload.encabezadoBoleta;
        },
        onSetBoletasSelectedNull: (state, { payload }) => {
            state.jornadaSelected.boletaSelected = {};
        },
    },
});


// Action creators are generated for each case reducer function
export const { 
    onFillCandidatosData,
    onFillSuplentesData,
    onFillPartidosData,
    onFillCandidatoAndSuplenteData,
    onAddBoleta,
    onAddCandidato,
    onAddSuplente,
    onAddPartido,
    onAddCandidatoAndSuplente,
    onEditCandidato,
    onEditSuplente,
    onEditPartido,
    onEditCandidatoAndSuplente,
    onSetCandidatoSelected,
    onSetSuplenteSelected,
    onSetPartidoSelected,
    onSetCandidatoAndSuplenteSelected,
    onSetCandidatoSelectedNull,
    onSetSuplenteSelectedNull,
    onSetPartidoSelectedNull,
    onSetCandidatoAndSuplenteSelectedNull,
    onSetCandidatoNull,
    onSetSuplenteNull,
    onSetPartidoNull,
    onSetCandidatoAndSuplenteNull,
    onFillJornadasData,
    onAddJornadas,
    onDeleteJornadaData,
    onDeleteBoletaData,
    onDeleteCandidato,
    onDeleteSuplente,
    onDeletePartido,
    onDeleteCandidatoAndSuplente,
    onSetJornadaSelected,
    onFillBoletas,
    onEditBoleta,
    onUpdateBoleta,
    onUpdateCandidatoAndSuplente,
    onUpdatePartido,
    onUpdateSuplente,
    onUpdateCandidato,
    onSetBoletasSelectedNull,
    onCheckingOperation,
    onSuccessOperation,
    onErrorOperation,
    onOffOperation,
} = SliceJornada.actions;