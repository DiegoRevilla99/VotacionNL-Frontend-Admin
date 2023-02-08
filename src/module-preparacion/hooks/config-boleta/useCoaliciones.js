import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCoaliciones } from '../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta';

export const useCoaliciones = (id) => {

    const dispatch = useDispatch();
    const { coaliciones = [], isLoadingCoaliciones } = useSelector(
        (state) => state.configBoleta
    );

    const update=()=>{
        //dispatch(getCoaliciones(id));
    }

    useEffect(() => {
        dispatch(getCoaliciones(id));

    }, []);


    return { coaliciones, isLoadingCoaliciones }
}
