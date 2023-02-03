import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoleta} from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";


export const useBoleta = (id) => {
    const dispatch = useDispatch();    
    const { boleta, isLoadingBoleta, errorBoleta } = useSelector(
        (state) => state.configBoleta
    );


    useEffect(() => {
        console.log("getBoletas hook")
        dispatch(getBoleta(id));
    }, []);

    


   /*  const changeCandNoReg = (valor) => {
        let data = { ...boleta }
        let { encabezadoBoleta, entidadFederativa, municipio, distritoElectoral, jornadaModel, modalidadVotacionModel } = data;
        // const newMod = { idModalidadVotacion: 1, modalidad: "REPRESENTANTE", mostrarCandidaturasNoReg: true, mostrarVotoNulo: true, minOpciones: 1, maxOpciones: 1, contabilizacion: "INDIVIDUAL" }

        let newMod = { ...modalidadVotacionModel }
        newMod.mostrarCandidaturasNoReg = false;

        let newData = { encabezadoBoleta, entidadFederativa, municipio, distritoElectoral, jornadaModel, modalidadVotacionModel: newMod }
        console.log(newData)
        // dispatch(updateBoleta(id, newData))
    } */


    return { errorBoleta, boleta, isLoadingBoleta}
}
