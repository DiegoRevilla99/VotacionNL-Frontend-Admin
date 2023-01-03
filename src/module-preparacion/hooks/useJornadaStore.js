import { useDispatch, useSelector } from "react-redux";
import {
    onAddCandidato,
    onAddSuplente,
    onAddPartido,
    onAddCandidatoAndSuplente,
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
    onEditBoleta,
    onUpdateBoleta,
    onUpdateCandidatoAndSuplente,
    onUpdatePartido,
    onUpdateSuplente,
    onUpdateCandidato,
    onCheckingOperation,
    onSuccessOperation,
    onErrorOperation,
    onOffOperation,
    onDeleteCandidato,
    onDeleteSuplente,
    onDeletePartido,
    onDeleteCandidatoAndSuplente,
    onEditCandidato,
    onEditSuplente,
    onEditPartido,
    onEditCandidatoAndSuplente,
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
        candidatoAndSuplente,
        candidatoandSuplenteSelected,
		jornadasData,
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
    const addCandidato = (
        id,
        apellidoPCandidato,
        apellidoMCandidato,
        nombreCandidato,
        fotografiaCandidato,
        seudonimoCandidato,
        fechaNacimientoCandidato,
        generoCandidato,
    ) => {
        dispatch(
            onAddCandidato({
                id,
                apellidoPCandidato,
                apellidoMCandidato,
                nombreCandidato,
                fotografiaCandidato,
                seudonimoCandidato,
                fechaNacimientoCandidato,
                generoCandidato,
            })
        );
    };

    const addSuplente = (
        id,
        apellidoPSuplente,
        apellidoMSuplente,
        nombreSuplente,
        fotografiaSuplente,
        seudonimoSuplente,
        fechaNacimientoSuplente,
        generoSuplente,
    ) => {
        dispatch(onAddSuplente({
                id,
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

    const addPartido = (
        id,
        nombrePartido,
        emblemPartido,
        fotografiaPartido,
    ) => {
        dispatch(onAddPartido({
                id,
                nombrePartido,
                emblemPartido,
                fotografiaPartido,
            })
        );
    };

    const addCandidatoAndSuplente = (
        idCandidato,
        apellidoPCandidato,
        apellidoMCandidato,
        nombreCandidato,
        fotografiaCandidato,
        seudonimoCandidato,
        fechaNacimientoCandidato,
        generoCandidato,
        idSuplente,
        apellidoPSuplente,
        apellidoMSuplente,
        nombreSuplente,
        fotografiaSuplente,
        seudonimoSuplente,
        fechaNacimientoSuplente,
        generoSuplente,
    ) => {
        dispatch(onAddCandidatoAndSuplente({
            idCandidato,
            apellidoPCandidato,
            apellidoMCandidato,
            nombreCandidato,
            fotografiaCandidato,
            seudonimoCandidato,
            fechaNacimientoCandidato,
            generoCandidato,
            idSuplente,
            apellidoPSuplente,
            apellidoMSuplente,
            nombreSuplente,
            fotografiaSuplente,
            seudonimoSuplente,
            fechaNacimientoSuplente,
            generoSuplente,
        }));
    };

    const updateCandidato = (
        id,
        apellidoPCandidate,
        apellidoMCandidate,
        nameCandidate,
        fotografiaCandidate,
        seudonimoCandidate,
        fechaNacimientoCandidate,
        generoCandidate,
    ) => {
        dispatch( onUpdateCandidato({
            id,
            apellidoPCandidate,
            apellidoMCandidate,
            nameCandidate,
            fotografiaCandidate,
            seudonimoCandidate,
            fechaNacimientoCandidate,
            generoCandidate,
        }));
    };

    const updateSuplente = (
        id,
        apellidoPSubstitute,
        apellidoMSubstitute,
        nameSubstitute,
        fotografiaSubstitute,
        seudonimoSubstitute,
        fechaNacimientoSubstitute,
        generoSubstitute,
    ) => {
        dispatch(onUpdateSuplente({
            id,
            apellidoPSubstitute,
            apellidoMSubstitute,
            nameSubstitute,
            fotografiaSubstitute,
            seudonimoSubstitute,
            fechaNacimientoSubstitute,
            generoSubstitute,
        }));
    };

    const updatePartido = (
        id,
        nameParty,
        emblemParty,
        fotografiaParty,
    ) => {
        dispatch(onUpdatePartido({
            id,
            nameParty,
            emblemParty,
            fotografiaParty,
        }));
    };

    const updateCandidatoAndSuplente = (
        idCandidate,
        apellidoPCandidate,
        apellidoMCandidate,
        nameCandidate,
        fotografiaCandidate,
        seudonimoCandidate,
        fechaNacimientoCandidate,
        generoCandidate,
        idSubstitute,
        apellidoPSubstitute,
        apellidoMSubstitute,
        nameSubstitute,
        fotografiaSubstitute,
        seudonimoSubstitute,
        fechaNacimientoSubstitute,
        generoSubstitute,
    ) => {
        dispatch(onUpdateCandidatoAndSuplente({
            idCandidate,
            apellidoPCandidate,
            apellidoMCandidate,
            nameCandidate,
            fotografiaCandidate,
            seudonimoCandidate,
            fechaNacimientoCandidate,
            generoCandidate,
            idSubstitute,
            apellidoPSubstitute,
            apellidoMSubstitute,
            nameSubstitute,
            fotografiaSubstitute,
            seudonimoSubstitute,
            fechaNacimientoSubstitute,
            generoSubstitute,
        }));
    };

    const updateBoleta = (encabezadoConsulta) => {
        dispatch(onUpdateBoleta({ encabezadoConsulta }));
    };

    const fillJornadasData = () => {
        dispatch(onFillJornadasData());
    };

    const addJornada = (jornadaData) => {
        dispatch(onAddJornadas(jornadaData));
    };

    const setBoletasSelectedNull = () => {
        dispatch(onSetCandidatoSelectedNull());
        dispatch(onSetSuplenteSelectedNull());
        dispatch(onSetPartidoSelectedNull());
        // dispatch(onSetCandidatoAndSuplenteSelectedNull()); NEW
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
        candidatoAndSuplente,
        candidatoandSuplenteSelected,
		jornadasData,
        jornadaSelected,

        checkingOperation,
        succesOperation,
        errorOperation,
        offOperation,
        addJornada,
        addCandidato,
        addSuplente,
        addPartido,
        addCandidatoAndSuplente,
        updateCandidato,
        updateSuplente,
        updatePartido,
        updateCandidatoAndSuplente,
        updateBoleta,
        editCandidato,
        editSuplente,
        editPartido,
        editCandidatoAndSuplente,
        fillJornadasData,
        setBoletasSelectedNull,
        setPartidoSelectedNull,
	};
};
