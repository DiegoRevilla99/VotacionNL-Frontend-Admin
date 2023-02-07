import { useDispatch, useSelector } from "react-redux";
import {
    onAddAsociacion,
    onAddCandidato, onAddJornadasNoFormales, onCheckingOperation, onDeleteAsociacion, onDeleteCandidato, onEditAsociacion, onEditBoleta, onEditCandidato, onErrorOperation, onFillJornadasNoFormalesData, onOffOperation,
    onSetAsociacionSelectedNull,
    onSetCandidatoNull, onSetCandidatoSelectedNull, onSetPartidoSelectedNull, onSuccessOperation, onUpdateCandidato
} from "../../store/module-preparacion/jornada/SliceJornadaNoFormal";

export const useJornadaNoFormalStore = () => {
	const dispatch = useDispatch();

	const {
		status,
		errorMessage,
		successMesage,
		candidatos,
        candidatoSelected,
        asociaciones,
        asociacionesSelected,
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
    const deleteAsociacion = (id) => {
        dispatch(onDeleteAsociacion(id));
    };

    // EDIT
    const editBoleta = (id) => {
        dispatch(onEditBoleta(id));
    };
    const editCandidato = (id) => {
        dispatch(onEditCandidato(id));
    };
    const editAsociacion = (id) => {
        dispatch(onEditAsociacion(id));
    };

    // Selected Null
    const setCandidatosSelectedNull = () => {
        dispatch(onSetCandidatoSelectedNull());
    };
    const setAsociacionesSelectedNull = () => {
        dispatch(onSetAsociacionSelectedNull());
    };

    // Null
    const setCandidatoNull = () => {
        dispatch(onSetCandidatoNull());
    };


    // Add
    const addCandidato = (
        id,
        claveCandidato,
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
                claveCandidato,
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

    const addAsociacion = (
        id,
        nombreAsociacion,
        emblema,
        logo,
    ) => {
        dispatch(
            onAddAsociacion({
                id,
                nombreAsociacion,
                emblema,
                logo,
            })
        );
    };
    // Update
    
    const updateCandidato = (
        id,
        claveCandidato,
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
            claveCandidato,
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
        candidatoSelected,
        asociaciones,
        asociacionesSelected,
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
        editAsociacion,
        deleteAsociacion,
        fillJornadasNoFormalesData,
        setBoletasSelectedNull,
        setCandidatosSelectedNull,

        setAsociacionesSelectedNull,
        addAsociacion,
	};
};
