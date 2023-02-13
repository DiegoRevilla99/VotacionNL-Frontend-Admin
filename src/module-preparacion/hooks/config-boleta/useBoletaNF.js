import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoletaNF } from "../../../store/module-preparacion/configuracion-boletaNF/thunksConfigBoletaNF";



export const useBoletaNF = (id) => {
    const dispatch = useDispatch();
    let boletaInfo = {};

    const { boleta, isLoadingBoleta, errorBoleta } = useSelector(
        (state) => state.configBoletaNFSlice
    );

    if (boleta) {
        const { encabezadoBoleta } = boleta;
        const { mostrarCandidaturasNoReg, mostrarVotoNulo, modalidad, minOpciones, maxOpciones } = boleta.modalidadVotacionModel;

        boletaInfo = {
            encabezadoBoleta,
            mostrarCandidaturasNoReg,
            mostrarVotoNulo,
            modalidad,
            minOpciones,
            maxOpciones
        }
    }


    useEffect(() => {
        console.log("useBoletaNF")
        dispatch(getBoletaNF(id));
    }, []);

    useEffect(() => {
        if (boleta) {
            const { encabezadoBoleta } = boleta;
            const { mostrarCandidaturasNoReg, mostrarVotoNulo, modalidad } = boleta.modalidadVotacionModel;
            boletaInfo = {
                encabezadoBoleta,
                mostrarCandidaturasNoReg,
                mostrarVotoNulo,
                modalidad,
            }
        }
    }, [boleta]);


    const changeCandNoReg = (valor) => {
        let data = { ...boleta }
        let { encabezadoBoleta, entidadFederativa, municipio, distritoElectoral, jornadaModel, modalidadVotacionModel } = data;
        // const newMod = { idModalidadVotacion: 1, modalidad: "REPRESENTANTE", mostrarCandidaturasNoReg: true, mostrarVotoNulo: true, minOpciones: 1, maxOpciones: 1, contabilizacion: "INDIVIDUAL" }

        let newMod = { ...modalidadVotacionModel }
        newMod.mostrarCandidaturasNoReg = false;

        let newData = { encabezadoBoleta, entidadFederativa, municipio, distritoElectoral, jornadaModel, modalidadVotacionModel: newMod }
        console.log(newData)
        // dispatch(updateBoleta(id, newData))
    }


    return { errorBoleta, boletaInfo, isLoadingBoleta, changeCandNoReg }
}
