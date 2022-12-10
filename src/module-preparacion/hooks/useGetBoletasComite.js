
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoletas } from "../../store/module-preparacion/comite/thunksComite";

export const useGetBoletasComite = () => {
    const dispatch = useDispatch();
    const { status, isLoadingBoletas, boletas = [] } = useSelector((state) => state.comite);
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
