import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCandidatos } from '../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta';

export const useCandidatos = (id) => {
    const dispatch = useDispatch();
    const {
        candidatos = [],
        isLoadingCandidatos,
      } = useSelector((state) => state.configBoleta);


    useEffect(() => {
        // console.log("useCandiatos")
        dispatch(getCandidatos(id));
    }, []);

  return (
    {
candidatos,
isLoadingCandidatos,
    }
  )
}
