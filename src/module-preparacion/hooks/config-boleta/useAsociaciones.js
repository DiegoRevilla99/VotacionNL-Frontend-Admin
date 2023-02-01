import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAsociaciones } from '../../../store/module-preparacion/configuracion-boletaNF/thunksConfigBoletaNF';



export const useAsociaciones = (id) => {

    const dispatch = useDispatch();
    const { asociaciones = [], isLoadingAsociaciones } = useSelector(
        (state) => state.configBoletaNFSlice
    );

    useEffect(() => {
        dispatch(getAsociaciones(id));

    }, []);


    return { asociaciones, isLoadingAsociaciones }
}
