import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoleta, getCoaliciones } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";


export const useBoleta = (id) => {
    const dispatch = useDispatch();
    let boletaInfo = {};

    const { boleta, isLoadingBoleta, errorBoleta } = useSelector(
        (state) => state.configBoleta
    );

    if (boleta) {
        const { encabezadoBoleta } = boleta;
        const { mostrarCandidaturasNoReg, mostrarVotoNulo, modalidad, minOpciones, maxOpciones } = boleta.modalidadVotacionModel;
        const { formalidad } = boleta.jornadaModel;
        boletaInfo = {
            encabezadoBoleta,
            mostrarCandidaturasNoReg,
            mostrarVotoNulo,
            modalidad,
            formalidad,
            minOpciones,
            maxOpciones
        }
    }


    useEffect(() => {
        dispatch(getBoleta(id));
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
