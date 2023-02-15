import { createSlice } from '@reduxjs/toolkit';

export const SliceJornadaNoFormal = createSlice({
    name: 'jornadaNoFormal',
    initialState: {
      status: 'off',
      errorMessage: '',
      successMessage: '',
        candidatos:[],
        candidatoSelected: {},
        asociaciones: [],
        asociacionesSelected: {},
        jornadasNoFormalesData: [],
        jornadaNoFormalSelected: {
          id: '',
          title: '',
          boletasNoFormales: [],
          boletaNoFormalSelected: {},
        },
      },
    reducers: {
        onCheckingOperation: (state) => {
            state.status = 'checking';
          },
          onSuccessOperation: (state, { payload }) => {
            state.status = 'success';
            state.successMessage = payload?.successMessage || 'Operación realizada con éxito';
          },
          onErrorOperation: (state, { payload }) => {
            state.status = 'error';
            state.errorMessage = payload?.errorMessage;
          },
          onOffOperation: (state) => {
            state.status = 'off';
          },

        // Candidato
        onAddCandidato: (state, { payload }) => {
            console.log("candidatos en mi payload", payload);
            if (!Array.isArray(payload)) {
                state.candidatos.push({
                    id: payload?.id,
                    claveCandidato: payload?.claveCandidato,
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
                    claveCandidato: payload?.claveCandidato,
                    apellidoPCandidato: candidato?.apellidoPCandidato,
                    apellidoMCandidato: candidato?.apellidoMCandidato,
                    nombreCandidato: candidato?.nombreCandidato,
                    fotografiaCandidato: candidato?.fotografiaCandidato,
                    seudonimoCandidato: candidato?.seudonimoCandidato,
                    fechaNacimientoCandidato: candidato?.fechaNacimientoCandidato,
                    generoCandidato: candidato?.generoCandidato,
                });
            });
        },

        onDeleteCandidato: (state, { payload }) => {
            const candidatoFound = state.candidatos.find((candidato) => candidato.id === payload?.id);
            state.candidatos.splice(state.candidatos.indexOf(candidatoFound), 1);
        },

        onEditCandidato: (state, { payload }) => {
            state.candidatoSelected = state.candidatos[0];
        },

        onUpdateCandidato: (state, { payload }) => {
            const candidato = state.candidatos.find(
                (candidato) => candidato.id === state.candidatoSelected.id
            );
            candidato.id = payload?.id;
            candidato.claveCandidato = payload?.claveCandidato;
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
        // Asociaciones
        onAddAsociacion: (state, { payload }) => {
            console.log("payload de asociaciones", payload);
            if (!Array.isArray(payload)) {
                state.asociaciones.push({
                    id: payload?.id,
                    nombreAsociacion: payload?.nombreAsociacion,
                    emblema: payload?.emblema,
                    logo: payload?.logo,
                    candidatosAsociacion: payload?.candidatosAsociacion,
                });
                return;
            }
            payload.forEach((asociacion) => {
                state.asociaciones.push({
                    id: asociacion?.id,
                    nombreAsociacion: asociacion?.nombreAsociacion,
                    emblema: asociacion?.emblema,
                    logo: asociacion?.logo,
                    candidatosAsociacion: asociacion?.candidatosAsociacion,
                });
            });
            
        },
        onDeleteAsociacion: (state, { payload }) => {
            const asociacionFound = state.asociaciones.find((asociacion) => asociacion.id === payload?.id);
            state.asociaciones.splice(state.asociaciones.indexOf(asociacionFound), 1);
        },
        onEditAsociacion: (state, { payload }) => {
            state.asociacionesSelected = state.asociaciones[0];
        },
        onUpdateAsociacion : (state, { payload }) => {
            const asociacionFound = state.asociaciones.find((asociacion) => asociacion.id === state.asociacionesSelected.id);
            asociacion.id = payload?.id;
            asociacion.nombreAsociacion = payload?.nombreAsociacion;
            asociacion.emblema = payload?.emblema;
            asociacion.logo = payload?.logo;
            asociacion.candidatosAsociacion = payload?.candidatosAsociacion;
        },
        onSetAsociacionSelectedNull: (state, { payload }) => {
            state.asociacionesSelected = {};
        },
        onSetAsociacionNull: (state, { payload }) => {
            state.asociaciones = [];
        },
        onFillAsociacionesData: (state, { payload }) => {
            state.asociaciones = payload;
        },

            // Jornadas
        onFillJornadasNoFormalesData: (state, { payload }) => {
            state.jornadasNoFormalesData = payload;
        },
        onAddJornadasNoFormales: (state, { payload }) => {
            console.log('onAddJornadasNoFormales', payload);
            state.jornadasNoFormalesData.push(payload);
        },
        onDeleteJornadaData: (state, { payload }) => {
            console.log('ELIMIANDO EN EL SLIDE', state.jornadasNoFormalesData);
            const id = state.jornadasNoFormalesData.findIndex(
            (consulta) => consulta.idEleccion === payload
            );
            state.jornadasNoFormalesData.splice(id, 1);
        },
        onSetjornadaNoFormalSelected: (state, { payload }) => {
            console.log(payload);
            state.jornadaNoFormalSelected.id = payload.id;
            state.jornadaNoFormalSelected.title = payload.title;
            state.jornadaNoFormalSelected.boletasNoFormales =
            payload.boletasNoFormales || [];

            // console.log('jornadaNoFormalSelected', state.jornadaNoFormalSelected);
            // console.log('id', state.jornadaNoFormalSelected.id);
            // console.log('title', state.jornadaNoFormalSelected.title);
            // console.log('boletasNoFormales', state.jornadaNoFormalSelected.boletasNoFormales);
        },

        // Boletas
        onDeleteBoletaData: (state, { payload }) => {
            console.log('ELIMIANDO EN EL SLIDE', payload);
            const id = state.jornadaNoFormalSelected.boletasNoFormales.listBoletas.findIndex(
                (consulta) => consulta.idEstructuraBoleta === payload
            );
            state.jornadaNoFormalSelected.boletasNoFormales.listBoletas.splice(id, 1);
        },
        onAddBoleta: (state, { payload }) => {
            state.jornadaNoFormalSelected.boletasNoFormales.listBoletas.push(payload);
        },
        setBoletaNoFormal: (state, { payload }) => {
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
    onDeleteCandidato,
    onEditCandidato,
    onUpdateCandidato,

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
    onSetAsociacionSelectedNull,
    onAddAsociacion,
    onDeleteAsociacion,
    onEditAsociacion,
    onUpdateAsociacion,
    onSetAsociacionNull,
    onFillAsociacionesData,
} = SliceJornadaNoFormal.actions;