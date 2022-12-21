
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoletas } from "../../store/module-preparacion/jornada/jornadaThunks";

export const useGetBoletasJornada = () => {
    const dispatch = useDispatch();
    const { status, isLoadingBoletas, boletas = [] } = useSelector((state) => state.jornada);
    useEffect(() => {
        dispatch(getBoletas());
    }, []);
    return (
        {        
            boletas,
            isLoadingBoletas,
            status,
        }
    )
}
