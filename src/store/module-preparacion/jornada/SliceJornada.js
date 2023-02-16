import { createSlice } from "@reduxjs/toolkit";

export const SliceJornada = createSlice({
	name: "jornada",
	initialState: {
		status: "off",
		errorMessage: "",
		successMessage: "",
		partidos: [],
		partidoSelected: {},
		candidatoandSuplentes: [],
		candidatoandSuplenteSelected: {
			// assignedToParty: false,
		},
		candidatosAMostrar: [],
		candidatos: [],
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
		jornadaVotosData: [],
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
			if (Array.isArray(payload)) {
			  payload.forEach(partido => {
				state.partidos.push({
				  id: partido.id,
				  clavePartido: partido.clavePartido,
				  nameParty: partido.nameParty,
				  siglasParty: partido.siglasParty,
				  emblemParty: partido.emblemParty,
				  fotografiaParty: partido.fotografiaParty,
				  statusParty: partido.statusParty,
				  candidatosPartido: partido.candidatosPartido || [], // Agregar un arreglo vacío por defecto si no hay candidatos
				});
			  });
			} else {
			  state.partidos.push({
				id: payload?.id,
				clavePartido: payload?.clavePartido,
				nameParty: payload?.nameParty,
				siglasParty: payload?.siglasParty,
				emblemParty: payload?.emblemParty,
				fotografiaParty: payload?.fotografiaParty,
				statusParty: payload?.statusParty,
				candidatosPartido: payload?.candidatosPartido || [], // Agregar un arreglo vacío por defecto si no hay candidatos
			  });
			}
		  },
		  
		// Este cambio se tuvo que hacer para que jale lo del back
		// onAddPartido: (state, { payload }) => {
			// 	console.log(" payload en SLICE", payload);
			// state.partidos.push({
			// 	id: payload?.id,
			// 	clavePartido: payload?.clavePartido,
			// 	nameParty: payload?.nameParty,
			// 	siglasParty: payload?.siglasParty,
			// 	emblemParty: payload?.emblemParty,
			// 	fotografiaParty: payload?.fotografiaParty,
			// 	statusParty: payload?.statusParty,
			// 	candidatosPartido: payload?.candidatosPartido || [], // Agregar un arreglo vacío por defecto si no hay candidatos
			// });
		// 	console.log("state.partidos en SLICE", state.partidos[0]);
		// },
		
		onAddCandidatoAndSuplente: (state, { payload }) => {

			if(payload.suplenteModel) {
			const { candidatoModel, suplenteModel } = payload;
		  
			state.candidatoandSuplentes.push({
			  id: candidatoModel?.id,
			  apellidoPCandidato: candidatoModel?.apellidoPCandidato,
			  apellidoMCandidato: candidatoModel?.apellidoMCandidato,
			  nombreCandidato: candidatoModel?.nombreCandidato,
			  fotografiaCandidato: candidatoModel?.fotografiaCandidato,
			  seudonimoCandidato: candidatoModel?.seudonimoCandidato,
			  fechaNacimientoCandidato: candidatoModel?.fechaNacimientoCandidato,
			  generoCandidato: candidatoModel?.generoCandidato,
			  claveElectoralCandidato: candidatoModel?.claveElectoralCandidato,
			  claveElectoralSuplente: suplenteModel?.claveElectoralSuplente,
			  apellidoPSuplente: suplenteModel?.apellidoPSuplente,
			  apellidoMSuplente: suplenteModel?.apellidoMSuplente,
			  nombreSuplente: suplenteModel?.nombreSuplente,
			  fotografiaSuplente: suplenteModel?.fotografiaSuplente,
			  seudonimoSuplente: suplenteModel?.seudonimoSuplente,
			  fechaNacimientoSuplente: suplenteModel?.fechaNacimientoSuplente,
			  generoSuplente: suplenteModel?.generoSuplente,
			});
		  
			console.log("CANDIDATOS CON SUPLENTES en SLICE", state.candidatoandSuplentes[0]);
		} else {
			console.log("payload SLICE", payload);
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
				claveElectoralCandidato: payload?.claveElectoralCandidato,
				claveElectoralSuplente: payload?.claveElectoralSuplente,
				apellidoPSuplente: payload?.apellidoPSuplente,
				apellidoMSuplente: payload?.apellidoMSuplente,
				nombreSuplente: payload?.nombreSuplente,
				fotografiaSuplente: payload?.fotografiaSuplente,
				seudonimoSuplente: payload?.seudonimoSuplente,
				fechaNacimientoSuplente: payload?.fechaNacimientoSuplente,
				generoSuplente: payload?.generoSuplente,
			});
			console.log("CANDIDATOS CON SUPLENTES en SLICE", state.candidatoandSuplentes[0]);
		}
		  },
		  
		  
		// Este cambio se tuvo que hacer para que jale lo del back
		// onAddCandidatoAndSuplente: (state, { payload }) => {
			// console.log("payload SLICE", payload);
			// state.candidatoandSuplentes.push({
			// 	id: payload?.id,
			// 	apellidoPCandidato: payload?.apellidoPCandidato,
			// 	apellidoMCandidato: payload?.apellidoMCandidato,
			// 	nombreCandidato: payload?.nombreCandidato,
			// 	fotografiaCandidato: payload?.fotografiaCandidato,
			// 	seudonimoCandidato: payload?.seudonimoCandidato,
			// 	fechaNacimientoCandidato: payload?.fechaNacimientoCandidato,
			// 	generoCandidato: payload?.generoCandidato,
			// 	// idSuplente: payload?.idSuplente,
			// 	claveElectoralCandidato: payload?.claveElectoralCandidato,
			// 	claveElectoralSuplente: payload?.claveElectoralSuplente,
			// 	apellidoPSuplente: payload?.apellidoPSuplente,
			// 	apellidoMSuplente: payload?.apellidoMSuplente,
			// 	nombreSuplente: payload?.nombreSuplente,
			// 	fotografiaSuplente: payload?.fotografiaSuplente,
			// 	seudonimoSuplente: payload?.seudonimoSuplente,
			// 	fechaNacimientoSuplente: payload?.fechaNacimientoSuplente,
			// 	generoSuplente: payload?.generoSuplente,
			// });
			// console.log("CANDIDATOS CON SUPLENTES en SLICE", state.candidatoandSuplentes[0]);
		// },
		
		onDeleteCandidato: (state, { payload }) => {
			const candidatoFound = state.candidatos.find(
				(candidato) => candidato.id === payload?.id
			);
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
			partido.id= payload?.id;
			partido.clavePartido= payload?.clavePartido;
			partido.nameParty= payload?.nameParty;
			partido.siglasParty= payload?.siglasParty;
			partido.emblemParty= payload?.emblemParty;
			partido.fotografiaParty= payload?.fotografiaParty;
			partido.statusParty= payload?.statusParty;
			partido.candidatosPartido= payload?.candidatosPartido || [];
		},
		// Vamos a probar este
		DeleteCanidatosSuccess(state, action) {
			const arrids = action.payload;
			state.candidatoandSuplentes = state.candidatoandSuplentes.filter(candidate => !arrids.includes(candidate.id));
		},
		onUpdateCandidatoAndSuplente: (state, { payload }) => {
			console.log("Estoy editando en el update",payload);
			const candidatoandSuplente = state.candidatoandSuplentes.find(
				(candidatoandSuplente) =>
					candidatoandSuplente.id === state.candidatoandSuplenteSelected.id
			);
			// candidatoandSuplente.idCandidato = payload?.idCandidate;
			candidatoandSuplente.id = payload?.id;
			candidatoandSuplente.apellidoPCandidato = payload?.apellidoPCandidate;
			candidatoandSuplente.apellidoMCandidato = payload?.apellidoMCandidate;
			candidatoandSuplente.nombreCandidato = payload?.nameCandidate;
			candidatoandSuplente.fotografiaCandidato = payload?.fotografiaCandidate;
			candidatoandSuplente.seudonimoCandidato = payload?.seudonimoCandidate;
			candidatoandSuplente.fechaNacimientoCandidato = payload?.fechaNacimientoCandidate;
			candidatoandSuplente.generoCandidato = payload?.generoCandidate;
			// candidatoandSuplente.idSuplente = payload?.idSubstitute;
			candidatoandSuplente.claveElectoralCandidato = payload?.claveElectoralCandidato;
			candidatoandSuplente.claveElectoralSuplente = payload?.claveElectoralSuplente;
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
		onFillJornadasData: (state, { payload }) => {
			state.jornadasData = payload;
		},
		onAddJornadas: (state, { payload }) => {
			state.jornadasData.push(payload);
		},
		onDeleteJornadaData: (state, { payload }) => {
			// console.log(payload);
			const id = state.jornadasData.findIndex((consulta) => consulta.idJornada === payload);
			// console.log(id);
			state.jornadasData.splice(id, 1);
		},
		onDeleteBoletaData: (state, { payload }) => {
			const id = state.jornadaSelected.boletas.findIndex(
				(consulta) => consulta.idEstructuraBoleta === payload
			);
			state.jornadaSelected.boletas.splice(id, 1);
		},

		onSetJornadaSelected: (state, { payload }) => {
			console.log(payload);
			state.jornadaSelected.id = payload.id;
			state.jornadaSelected.title = payload.title;
			state.jornadaSelected.boletas = payload.boletas || [];
		},
		onAddBoleta: (state, { payload }) => {
			console.log("PAYLOAD", payload);
			state.jornadaSelected.boletas.push(payload);
			// console.log(state.jornadaSelected.boletas);
		},
		onFillBoletas: (state, { payload }) => {
			console.log("fill boletas", payload);
			state.jornadaSelected.boletas = payload; //!DEJA ESTE
			// state.jornadaSelected.boletas = []; //!BORRA ESTE

			// state.jornadaSelected.boletas.push({
			// 	idEstructuraBoleta: 23,
			// 	nombreEleccion: "Boleta para presidente",
			// });
		},
		onEditBoleta: (state, { payload }) => {
			console.log("PAYLOAD", payload);
			state.jornadaSelected.boletaSelected = payload;
		},
		onUpdateBoleta: (state, { payload }) => {
			const boleta = state.jornadaSelected.boletas.find(
				(boleta) => boleta.id === state.jornadaSelected.boletaSelected.id
			);
			boleta.encabezadoJornada = payload.encabezadoJornada;
		},
		onSetBoletasSelectedNull: (state, { payload }) => {
			state.jornadaSelected.boletaSelected = {};
		},
		onSetJornadasVotosData: (state, { payload }) => {
			state.jornadaVotosData = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	DeleteCanidatosSuccess,//Probando
	candidatosAMostrar,
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
	onSetJornadasVotosData,
} = SliceJornada.actions;
