import { useDispatch, useSelector } from "react-redux";
import {
    onAddCandidato, onAddCandidatoAndSuplente, onAddJornadasNoFormales, onAddPartido, onAddSuplente, onCheckingOperation, onDeleteCandidato, onDeleteCandidatoAndSuplente, onDeletePartido, onDeleteSuplente, onEditBoleta, onEditCandidato, onEditCandidatoAndSuplente, onEditPartido, onEditSuplente, onErrorOperation, onFillJornadasNoFormalesData, onOffOperation, onSetCandidatoAndSuplenteNull, onSetCandidatoAndSuplenteSelectedNull,
    onSetCandidatoNull, onSetCandidatoSelectedNull, onSetPartidoNull, onSetPartidoSelectedNull, onSetSuplenteNull, onSetSuplenteSelectedNull, onSuccessOperation, onUpdateCandidato, onUpdateCandidatoAndSuplente, onUpdatePartido, onUpdateSuplente
} from "../../store/module-preparacion/jornada/SliceJornadaNoFormal";

export const useJornadaNoFormalStore = () => {
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
        jornadasNoFormalesData,
        jornadaNoFormalSelected,
	} = useSelector((state) => state.jornadaNoFormal);

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
        siglasPartido,
        emblemaPartido,
        fotografiaPartido,
    ) => {
        dispatch(onAddPartido({
                id,
                nombrePartido,
                siglasPartido,
                emblemaPartido,
                fotografiaPartido,
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
        apellidoPSuplente,
        apellidoMSuplente,
        nombreSuplente,
        fotografiaSuplente,
        seudonimoSuplente,
        fechaNacimientoSuplente,
        generoSuplente,
    ) => {
        console.log("EL ID DEL CANDIDATO", id);
        dispatch(onAddCandidatoAndSuplente({
            id,
            apellidoPCandidato,
            apellidoMCandidato,
            nombreCandidato,
            fotografiaCandidato,
            seudonimoCandidato,
            fechaNacimientoCandidato,
            generoCandidato,
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
        siglasParty,
        emblemParty,
        fotografiaParty,
    ) => {
        dispatch(onUpdatePartido({
            id,
            nameParty,
            siglasParty,
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
    // JORNADAS NO FORMALES

    const fillJornadasNoFormalesData = () => {
        dispatch(onFillJornadasNoFormalesData());
    };

    const addJornadaNoFormal = (jornadaData) => {
        dispatch(onAddJornadasNoFormales(jornadaData));
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
		jornadasNoFormalesData,
        jornadaNoFormalSelected,

        checkingOperation,
        succesOperation,
        errorOperation,
        offOperation,
        addCandidato,
        addSuplente,
        addPartido,
        addCandidatoAndSuplente,
        updateCandidato,
        updateSuplente,
        updatePartido,
        updateCandidatoAndSuplente,
        editCandidato,
        editSuplente,
        editPartido,
        editCandidatoAndSuplente,
        deletePartido,
        deleteCandidato,
        deleteSuplente,
        deleteCandidatoAndSuplente,
        fillJornadasNoFormalesData,
        setBoletasSelectedNull,
        setPartidoSelectedNull,
        setCandidatoAndSuplenteSelectedNull,
	};
};
