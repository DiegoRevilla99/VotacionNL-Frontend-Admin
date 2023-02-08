import { useDispatch, useSelector } from "react-redux";
import {
	onAddCandidatoAndSuplente, onAddJornadas, onAddPartido, onCheckingOperation, onDeleteCandidato, onDeleteCandidatoAndSuplente, onDeletePartido, onDeleteSuplente, onEditBoleta, onEditCandidato, onEditCandidatoAndSuplente, onEditPartido, onEditSuplente, onErrorOperation, onFillJornadasData, onOffOperation, onSetCandidatoAndSuplenteNull, onSetCandidatoAndSuplenteSelectedNull,
	onSetCandidatoNull, onSetCandidatoSelectedNull, onSetPartidoNull, onSetPartidoSelectedNull, onSetSuplenteNull, onSetSuplenteSelectedNull, onSuccessOperation, onUpdateBoleta, onUpdateCandidatoAndSuplente,
	onUpdatePartido
} from "../../store/module-preparacion/jornada/SliceJornada";

export const useJornadaStore = () => {
	const dispatch = useDispatch();

	const {
		status,
		errorMessage,
		successMesage,
		candidatos,
		candidatosSelected,
		suplentes,
		suplentesSelected,
		partidos,
		partidoSelected,
		candidatoandSuplentes,
		candidatoandSuplenteSelected,
		jornadasData,
		jornadaVotosData,
		jornadaSelected,
	} = useSelector((state) => state.jornada);

	const checkingOperation = () => {
		dispatch(onCheckingOperation());
	};

	const succesOperation = (successMessage) => {
		dispatch(onSuccessOperation({ successMessage }));
	};

	const errorOperation = () => {
		dispatch(onErrorOperation());
	};

	const offOperation = () => {
		dispatch(onOffOperation());
	};
	// DELETE
	const deleteCandidato = (id) => {
		dispatch(onDeleteCandidato(id));
	};
	const deleteSuplente = (id) => {
		dispatch(onDeleteSuplente(id));
	};
	const deletePartido = (id) => {
		dispatch(onDeletePartido(id));
	};
	const deleteCandidatoAndSuplente = (id) => {
		dispatch(onDeleteCandidatoAndSuplente(id));
	};
	// EDIT
	const editBoleta = (id) => {
		dispatch(onEditBoleta(id));
	};
	const editCandidato = (id) => {
		dispatch(onEditCandidato(id));
	};
	const editSuplente = (id) => {
		dispatch(onEditSuplente(id));
	};
	const editPartido = (id) => {
		console.log("EL ID DEL PARTIDO", id);
		dispatch(onEditPartido(id));
	};
	const editCandidatoAndSuplente = (id) => {
		dispatch(onEditCandidatoAndSuplente(id));
	};
	// Selected Null
	const setCandidatosSelectedNull = () => {
		dispatch(onSetCandidatoSelectedNull());
	};
	const setSuplentesSelectedNull = () => {
		dispatch(onSetSuplenteSelectedNull());
	};
	const setPartidoSelectedNull = () => {
		dispatch(onSetPartidoSelectedNull());
	};
	const setCandidatoAndSuplenteSelectedNull = () => {
		dispatch(onSetCandidatoAndSuplenteSelectedNull());
	};
	// Null
	const setCandidatoNull = () => {
		dispatch(onSetCandidatoNull());
	};
	const setSuplenteNull = () => {
		dispatch(onSetSuplenteNull());
	};
	const setPartidoNull = () => {
		dispatch(onSetPartidoNull());
	};
	const setCandidatoAndSuplenteNull = () => {
		dispatch(onSetCandidatoAndSuplenteNull());
	};

	// Add
	// const addCandidato = (
	// 	id,
	// 	apellidoPCandidato,
	// 	apellidoMCandidato,
	// 	nombreCandidato,
	// 	fotografiaCandidato,
	// 	seudonimoCandidato,
	// 	fechaNacimientoCandidato,
	// 	generoCandidato
	// ) => {
	// 	dispatch(
	// 		onAddCandidato({
	// 			id,
	// 			apellidoPCandidato,
	// 			apellidoMCandidato,
	// 			nombreCandidato,
	// 			fotografiaCandidato,
	// 			seudonimoCandidato,
	// 			fechaNacimientoCandidato,
	// 			generoCandidato,
	// 		})
	// 	);
	// };

	// const addSuplente = (
	// 	id,
	// 	apellidoPSuplente,
	// 	apellidoMSuplente,
	// 	nombreSuplente,
	// 	fotografiaSuplente,
	// 	seudonimoSuplente,
	// 	fechaNacimientoSuplente,
	// 	generoSuplente
	// ) => {
	// 	dispatch(
	// 		onAddSuplente({
	// 			id,
	// 			apellidoPSuplente,
	// 			apellidoMSuplente,
	// 			nombreSuplente,
	// 			fotografiaSuplente,
	// 			seudonimoSuplente,
	// 			fechaNacimientoSuplente,
	// 			generoSuplente,
	// 		})
	// 	);
	// };

	const addPartido = (
		id, 
		clavePartido,
		nameParty,
		siglasParty,
		emblemParty,
		fotografiaParty,
		statusParty,
		) => {
		dispatch(
			onAddPartido({
				id, 
				clavePartido,
				nameParty,
				siglasParty,
				emblemParty,
				fotografiaParty,
				statusParty,
			})
		);
	};

	const addCandidatoAndSuplente = (
		id,
		apellidoPCandidato,
		apellidoMCandidato,
		nombreCandidato,
		fotografiaCandidato,
		seudonimoCandidato,
		fechaNacimientoCandidato,
		generoCandidato,
		claveElectoralCandidato,
		claveElectoralSuplente,
		apellidoPSuplente,
		apellidoMSuplente,
		nombreSuplente,
		fotografiaSuplente,
		seudonimoSuplente,
		fechaNacimientoSuplente,
		generoSuplente
	) => {
		dispatch(
			onAddCandidatoAndSuplente({
				id,
				apellidoPCandidato,
				apellidoMCandidato,
				nombreCandidato,
				fotografiaCandidato,
				seudonimoCandidato,
				fechaNacimientoCandidato,
				generoCandidato,
				claveElectoralCandidato,
				claveElectoralSuplente,
				apellidoPSuplente,
				apellidoMSuplente,
				nombreSuplente,
				fotografiaSuplente,
				seudonimoSuplente,
				fechaNacimientoSuplente,
				generoSuplente,
			})
		);
	};

	// const updateCandidato = (
	// 	id,
	// 	apellidoPCandidate,
	// 	apellidoMCandidate,
	// 	nameCandidate,
	// 	fotografiaCandidate,
	// 	seudonimoCandidate,
	// 	fechaNacimientoCandidate,
	// 	generoCandidate
	// ) => {
	// 	dispatch(
	// 		onUpdateCandidato({
	// 			id,
	// 			apellidoPCandidate,
	// 			apellidoMCandidate,
	// 			nameCandidate,
	// 			fotografiaCandidate,
	// 			seudonimoCandidate,
	// 			fechaNacimientoCandidate,
	// 			generoCandidate,
	// 		})
	// 	);
	// };

	// const updateSuplente = (
	// 	id,
	// 	apellidoPSubstitute,
	// 	apellidoMSubstitute,
	// 	nameSubstitute,
	// 	fotografiaSubstitute,
	// 	seudonimoSubstitute,
	// 	fechaNacimientoSubstitute,
	// 	generoSubstitute
	// ) => {
	// 	dispatch(
	// 		onUpdateSuplente({
	// 			id,
	// 			apellidoPSubstitute,
	// 			apellidoMSubstitute,
	// 			nameSubstitute,
	// 			fotografiaSubstitute,
	// 			seudonimoSubstitute,
	// 			fechaNacimientoSubstitute,
	// 			generoSubstitute,
	// 		})
	// 	);
	// };

	const updatePartido = (id, clavePartido, nameParty, siglasParty, emblemParty, fotografiaParty,statusParty ) => {
		dispatch(
			onUpdatePartido({
				id,
				clavePartidot,
				namePartyt,
				siglasPartyt,
				emblemPartyt,
				fotografiaPartyt,
				statusParty,
			})
		);
	};

	const updateCandidatoAndSuplente = (
		id,
		apellidoPCandidate,
		apellidoMCandidate,
		nameCandidate,
		fotografiaCandidate,
		seudonimoCandidate,
		fechaNacimientoCandidate,
		generoCandidate,
		claveElectoralCandidato,
		claveElectoralSuplente,
		apellidoPSubstitute,
		apellidoMSubstitute,
		nameSubstitute,
		fotografiaSubstitute,
		seudonimoSubstitute,
		fechaNacimientoSubstitute,
		generoSubstitute
	) => {
		dispatch(
			onUpdateCandidatoAndSuplente({
				id,
				apellidoPCandidate,
				apellidoMCandidate,
				nameCandidate,
				fotografiaCandidate,
				seudonimoCandidate,
				fechaNacimientoCandidate,
				generoCandidate,
				claveElectoralCandidato,
				claveElectoralSuplente,
				apellidoPSubstitute,
				apellidoMSubstitute,
				nameSubstitute,
				fotografiaSubstitute,
				seudonimoSubstitute,
				fechaNacimientoSubstitute,
				generoSubstitute
			})
		);
	};

	const updateBoleta = (encabezadoJornada) => {
		dispatch(onUpdateBoleta({ encabezadoJornada }));
	};

	const fillJornadasData = () => {
		dispatch(onFillJornadasData());
	};

	const addJornada = (jornadaData) => {
		dispatch(onAddJornadas(jornadaData));
	};
	const setBoletasSelectedNull = () => {
		// dispatch(onSetCandidatoSelectedNull());
		// dispatch(onSetSuplenteSelectedNull());
		dispatch(onSetPartidoSelectedNull());
		dispatch(onSetCandidatoAndSuplenteSelectedNull());
	};

	return {
		status,
		errorMessage,
		successMesage,
		candidatos,
		candidatosSelected,
		suplentes,
		suplentesSelected,
		partidos,
		partidoSelected,
		candidatoandSuplentes,
		candidatoandSuplenteSelected,
		jornadasData,
		jornadaSelected,
		checkingOperation,
		succesOperation,
		errorOperation,
		offOperation,
		addJornada,
		// addCandidato,
		// addSuplente,
		addPartido,
		addCandidatoAndSuplente,
		// updateCandidato,
		// updateSuplente,
		updatePartido,
		updateCandidatoAndSuplente,
		updateBoleta,
		editCandidato,
		editSuplente,
		editPartido,
		editCandidatoAndSuplente,
		deletePartido,
		deleteCandidato,
		deleteSuplente,
		deleteCandidatoAndSuplente,
		fillJornadasData,
		setBoletasSelectedNull,
		setPartidoSelectedNull,
		setCandidatoAndSuplenteSelectedNull,
		jornadaVotosData,
	};
};
