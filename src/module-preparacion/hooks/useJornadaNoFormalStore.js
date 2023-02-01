import { useDispatch, useSelector } from "react-redux";
import {
    onAddCandidato, onAddJornadasNoFormales, onCheckingOperation, onDeleteCandidato, onEditBoleta, onEditCandidato, onErrorOperation, onFillJornadasNoFormalesData, onOffOperation,
    onSetCandidatoNull, onSetCandidatoSelectedNull, onSetPartidoSelectedNull, onSuccessOperation, onUpdateCandidato
} from "../../store/module-preparacion/jornada/SliceJornadaNoFormal";

export const useJornadaNoFormalStore = () => {
	const dispatch = useDispatch();

	const {
		status,
		errorMessage,
		successMesage,
		candidatos,
        candidatosSelected,

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


    // EDIT
    const editBoleta = (id) => {
        dispatch(onEditBoleta(id));
    };
    const editCandidato = (id) => {
        dispatch(onEditCandidato(id));
    };

    // Selected Null
    const setCandidatosSelectedNull = () => {
        dispatch(onSetCandidatoSelectedNull());
    };


    // Null
    const setCandidatoNull = () => {
        dispatch(onSetCandidatoNull());
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

   
    // JORNADAS NO FORMALES

    const fillJornadasNoFormalesData = () => {
        dispatch(onFillJornadasNoFormalesData());
    };

    const addJornadaNoFormal = (jornadaData) => {
        dispatch(onAddJornadasNoFormales(jornadaData));
    };

    const setBoletasSelectedNull = () => {
        dispatch(onSetCandidatoSelectedNull());
        dispatch(onSetPartidoSelectedNull());
    };


	return {
		status,
		errorMessage,
		successMesage,
		candidatos,
        candidatosSelected,


		jornadasNoFormalesData,
        jornadaNoFormalSelected,

        checkingOperation,
        succesOperation,
        errorOperation,
        offOperation,
        addCandidato,
        updateCandidato,
        editCandidato,
        deleteCandidato,
        fillJornadasNoFormalesData,
        setBoletasSelectedNull,
        setCandidatosSelectedNull,
	};
};
